const fs = require('fs');

const { deg2num, tile2lat, tile2lon, coord4326To3857 } = require('./lib');

const center = [ 19.070825827131095,99.03986245393754 ];
const xTiles = 30, yTiles = 25;
const zoom = 14;
const sleep = 0.2;

const [newX, newY] = deg2num(center[0], center[1], zoom);
const lat = tile2lat(newX, zoom);
const lon = tile2lon(newY, zoom);

// process each zoom
const [ xTileCenter, yTileCenter ] = deg2num(lat, lon, zoom);
const xTileMin = parseInt(xTileCenter - (xTiles / 2));
const yTileMin = parseInt(yTileCenter - (yTiles / 2));

const dirTiles = `./dist/tiles`;

let processed = 0;

for (var x=xTileMin; x<xTiles+xTileMin; x++) {
  for (var y=yTileMin; y<yTileMin+yTiles; y++) {
  	const xDir = `${dirTiles}/50K/${zoom}/${x}`;
  	const filename = `${xDir}/${y}.png`;

  	try {
  		fs.statSync(filename);
  		++processed;
  	} catch( e) {
  		continue;
  	}

  	// if (processed >= 5) {
  	// 	process.exit(0)
  	// }

  	console.log(`mkdir -p ${xDir}`);

  	const [ ymin, xmin ] = coord4326To3857(tile2lat(x, zoom), tile2lon(y, zoom));
  	const [ ymax, xmax] = coord4326To3857(tile2lat(x + 1, zoom), tile2lon(y + 1, zoom))

  	const params = new URLSearchParams({
  		token: 'YEMLILDgjEe6VhJ1iFZmWGGokxssz1lAPmNQ6CtK4MRiqMXchW5l5STt5eNKg95x',
  		TRANSPARENT: true,
  		FORMAT: 'jpeg',
  		LAYERS: 'show:0',
  		F: 'image',
  		BBOX: [ xmin, ymin, xmax, ymax].join(','),
  		SIZE: [256,256].join(','),
  		BBOXSR: 3857,
  		IMAGESR: 3857
  	})
  	const url = new URL(`http://gis.drr.go.th/arcgis/rest/services/GISBaseMaps/DRR_L7018_06022015/MapServer/export?${params}`)
  	const curl = `curl '${url}' -H 'Referer: http://cld.drr.go.th/' --output ${filename}`
  	console.log(curl);
  	console.log(`sleep 0.2`);
  	console.log(`echo '[${processed}] ${filename}'`);
  }
}
