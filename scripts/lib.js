const fs = require('fs');
const path = require('path')
const sqlite3 = require('sqlite3')

function coord4326To3857(lat, lon) {
    const X = 20037508.34;

    let long3857 = (lon * X) / 180;

    let lat3857 = parseFloat(lat) + 90;
    lat3857 = lat3857 * (Math.PI/360);
    lat3857 = Math.tan(lat3857);
    lat3857 = Math.log(lat3857);
    lat3857 = lat3857 / (Math.PI / 180);

    lat3857 = (lat3857 * X) / 180;

    return [ lat3857, long3857 ];
}

function tile2lon(x,z) { return (x/Math.pow(2,z)*360-180); }

function tile2lat(y,z) {
  var n=Math.PI-2*Math.PI*y/Math.pow(2,z);
  return (180/Math.PI*Math.atan(0.5*(Math.exp(n)-Math.exp(-n))));
}

const deg2num = (lat_deg, lon_deg, zoom) => {
  const lat_rad = lat_deg * (Math.PI / 180);
  const n = Math.pow(2.0, zoom);
  const xtile = parseInt((lon_deg + 180.0) / 360.0 * n);
  const ytile = parseInt((1.0 - Math.log(Math.tan(lat_rad) + (1 / Math.cos(lat_rad))) / Math.PI) / 2.0 * n)
  return [xtile, ytile];
}

const findSqliteDB = (inputDir, filter) => {
  const file = fs.readdirSync(inputDir)
    .filter(filter)
    .find(fileName => fileName.match(/.*\.sqlitedb$/));
  if (file)
    return path.join(process.cwd(), inputDir, file);
}

const listOBFs = (obfsDir, filter) => {
  let obfs = fs.readdirSync(obfsDir)
    .filter(fileName => fileName.match(/.*\.obf$/))
    .map(fileName => ({
      name: fileName.replace(/\.obf$/, ''),
      time: fs.statSync(`${obfsDir}/${fileName}`).mtime.getTime(),
    }))
    .sort((a, b) => b.time - a.time)
    .map(file => file.name);

  if (filter) {
    const index = obfs.findIndex(obf => obf.match(filter));
    if (index !== -1) {
      obfs = obfs.slice(index);
    }
  }
  return obfs;
};

const processSnapshots = ({ obfsConfigs, id, zoom, center, xTiles, yTiles, renderingName, renderingProperties }) => {
  // console.log(obfsConfigs)
  const snapshots = obfsConfigs.map(obfsConfig => {
    return processSnapshot({id, zoom, center, xTiles, yTiles, obfsConfig, renderingName, renderingProperties});
  })
  const targetGif = `./dist/snapshots/snapshot-${id}-${obfsConfigs.map(c => c.name).join('_')}.gif`;
  console.log(`convert -delay 200 -loop 0 ${snapshots.join(' ')} ${targetGif}`);
}

const processSnapshot = ({id, zoom, center, xTiles, yTiles, obfsConfig, renderingName, renderingProperties, text}) => {
  const snapshotName = `snapshot-${id}-${obfsConfig.name}`;
  const snapshotGpx  = `./dist/tmp/${snapshotName}.gpx`;
  const snapshotPng = `./dist/tmp/${snapshotName}.png`;

  const { dir, name, obfs } = obfsConfig;

  const xml = `<?xml version='1.0' encoding='UTF-8' standalone='yes' ?>
<gpx version='1.1' xmlns='http://www.topografix.com/GPX/1/1'
  width='${xTiles*256}' height='${yTiles*256}' zoom='${zoom}' mapDensity='1'
  renderingProperties='${renderingProperties}'
  renderingName='${renderingName}'
>
  <wpt lat='${center[0]}' lon='${center[1]}'>
    <name>${snapshotName}</name>
    <extensions>
      <maps>${obfsConfig.obfs.join(',')}</maps>
      <zoom>${zoom}</zoom>
    </extensions>
  </wpt>
</gpx>`;

  console.log(`echo "${xml.replace(/\n/g, '\\\n')}" > ${snapshotGpx}`)

  console.log(`java -Xms512M -Xmx3072M -cp ../../OsmAnd/OsmAndMapCreator-main/OsmAndMapCreator.jar net.osmand.swing.OsmAndImageRendering \
  -native=/Users/julien/WORKSPACES/OsmAnd/OsmAnd-core-legacy/binaries/darwin/intel/Release \
  -obfFiles=${obfsConfig.dir}/ \
  -gpxFile=${snapshotGpx} \
  -output=./dist/tmp`);

  if (text)
    console.log(`convert -pointsize 30 -fill red -draw 'text 10,40 "${obfsConfig.name}"' ${snapshotPng} ${snapshotPng}`);

  return snapshotPng;
}

const processSqliteTiles = ({ inputDir, inputFilter, zooms, outputDir }) => {

  const inputFile = findSqliteDB(inputDir, inputFilter);
  if (!inputFile)
    throw new Error(`Sqlite DB file not found!`)

  const sqlite = new sqlite3.Database(inputFile, (err) => {});

  sqlite.serialize((err) => {
    zooms.forEach(zoom => {
      sqlite.all(`SELECT * FROM tiles WHERE z = ${zoom} LIMIT -1`, (err, items) => {
        items.forEach(item => {
          const { z, x, y, image } = item;
          const dir = `${outputDir}/${z}/${x}`;
          fs.mkdirSync(dir, { recursive: true });
          fs.writeFileSync(`${dir}/${y}.png`, image);
        })
      });
    });
  });
}

const processObfsTiles = ({ obfsDir, obfs, outputDir, renderingName, renderingProperties, renderingBackgroundColor, center, tiles, zooms }) => {

  // compute precise lat/lon
  const [x, y] = deg2num(center[0], center[1], zooms[0] - 1);
  const lat = tile2lat(y, zooms[0] - 1);
  const lon = tile2lon(x, zooms[0] - 1);

  // process each zoom
  for (var i=0;i<zooms.length; i++) {

    processObfsTilesZoom({
      obfsDir,
      obfs,
      outputDir,
      renderingName,
      renderingProperties,
      renderingBackgroundColor,
      zoom: zooms[i],
      lat,
      lon,
      xTiles: tiles[0] * Math.pow(2, i+1),
      yTiles: tiles[1] * Math.pow(2, i+1),
    });
  }
}

const processObfsTilesZoom = ({zoom, lat, lon, xTiles, yTiles, outputDir, obfsDir, obfs, renderingName, renderingProperties, renderingBackgroundColor}) => {

  const [ xTileCenter, yTileCenter ] = deg2num(lat, lon, zoom);
  const xTileMin = Math.floor(xTileCenter - (xTiles / 2.0));
  const yTileMin = Math.floor(yTileCenter - (yTiles / 2.0));

  // console.log({xTiles, yTiles, xTileCenter, yTileCenter, xTileMin, yTileMin})

  generateGPX({zoom, lat, lon, xTiles, yTiles, obfs, renderingName, renderingProperties});

  console.log(`rm -rf ${outputDir}/${zoom}/`);

  for (var x=0; x<xTiles; x++) {
    console.log(`mkdir -p ${outputDir}/${zoom}/${xTileMin + x}`);
  }

  console.log(`java -Xms512M -Xmx3072M -cp ../../OsmAnd/OsmAndMapCreator-main/OsmAndMapCreator.jar net.osmand.swing.OsmAndImageRendering \
  -native=/Users/julien/WORKSPACES/OsmAnd/OsmAnd-core-legacy/binaries/darwin/intel/Release \
  -obfFiles=${obfsDir}/ \
  -gpxFile=./dist/tmp/${zoom}.gpx \
  -output=./dist/tmp`);

  if (renderingBackgroundColor !== undefined)
    console.log(`convert ./dist/tmp/${zoom}.png -fuzz 3% -transparent "${renderingBackgroundColor}" ./dist/tmp/${zoom}.png`);

  console.log(`convert -limit memory 2048MiB ./dist/tmp/${zoom}.png -crop 256x256 -set filename:tile "%[fx:page.x/256+${xTileMin}]/%[fx:page.y/256+${yTileMin}]" +repage "${outputDir}/${zoom}/%[filename:tile].png"`);
}

const generateGPX = ({zoom, lat, lon, xTiles, yTiles, obfs, renderingName, renderingProperties}) => {
  const tileSize = 256;

  const xml = `<?xml version='1.0' encoding='UTF-8' standalone='yes' ?>
<gpx version='1.1' xmlns='http://www.topografix.com/GPX/1/1'
  width='${xTiles*tileSize}' height='${yTiles*tileSize}' zoom='${zoom}' mapDensity='1'
  renderingProperties='${renderingProperties}'
  renderingName='${renderingName}'
>
  <wpt lat='${lat}' lon='${lon}'>
    <name>${zoom}</name>
    <extensions>
      <maps>${obfs.join(',')}</maps>
      <zoom>${zoom}</zoom>
    </extensions>
  </wpt>
</gpx>`;

  console.log(`echo "${xml.replace(/\n/g, '')}" > ./dist/tmp/${zoom}.gpx`)
}


module.exports = {
  deg2num, tile2lat, tile2lon, coord4326To3857,
  generateGPX,
  listOBFs,
  processObfsTiles,
  processSqliteTiles,
  processSnapshots
}