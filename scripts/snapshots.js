const { listOBFs, processSnapshots } = require('./lib');

const defaults = {
  obfsConfigs: [
    {
      dir: './data/2020',
      name: '2020',
      obfs: ['Thailand_asia.srtm', 'Chiangmai-200101']
    },
    {
      dir: './data/latest',
      name: new Date().getFullYear(),
      obfs: ['Thailand_asia.srtm', 'Thailand_asia']
    }
  ],
  zoom: 13,
  xTiles: 4,
  yTiles: 4,
  renderingName: '../osmand-dirtbike-plugin/src/rendering/dirtbike',
  renderingProperties: 'lang=en,contourLines=11,contourWidth=thin,contourDensity=medium,contourColorScheme=brown,region_hillshade=yes,hideContour=true,groundSurveyMode=false'
}

processSnapshots({ ...defaults, id: 'doi-mon-ngo', center: [ 19.141279945598498, 98.78310464322567 ] });
processSnapshots({ ...defaults, id: 'samoeng-south', center: [ 18.7620394380547, 98.67446927373197 ] });
processSnapshots({ ...defaults, id: 'mae-rim', center: [18.95221280228806, 98.79362694919111 ] });
processSnapshots({ ...defaults, id: 'doi-mon-lan', center: [19.483556396738397, 99.3281062839093 ] });
processSnapshots({ ...defaults, id: 'chiang-dao', center: [19.297740210722907, 98.86838816106321 ] });
processSnapshots({ ...defaults, id: 'samoeng-north', center: [18.985805606984897, 98.65548044443132 ] });
processSnapshots({ ...defaults, id: 'doi-lanka', center: [18.946400878789568, 99.35811057686807 ] });
processSnapshots({ ...defaults, id: 'mae-takhrai', center: [18.798984281609584, 99.34845730662349 ] });
processSnapshots({ ...defaults, id: 'lamphun', center: [18.66579707920592, 99.24496695399284 ] });
processSnapshots({ ...defaults, id: 'doi-suthep', center: [18.83086189847519, 98.86510245501997 ] });
processSnapshots({ ...defaults, id: 'doi-inthanon', center: [18.60196590366656, 98.58392916619779 ] });
processSnapshots({ ...defaults, id: 'chomthong', center: [18.40300834741832, 98.4969585388899 ] });
processSnapshots({ ...defaults, id: 'mae-chaem', center: [18.475043957563074, 98.35591457784176 ] });
processSnapshots({ ...defaults, id: 'mae-ya', center: [19.18345604410202, 98.56344781816006 ] });
processSnapshots({ ...defaults, id: 'muang-khong', center: [19.374554004279393, 98.6808414012194 ] });
processSnapshots({ ...defaults, id: 'wiang-haeng', center: [19.655991859268052, 98.63981567323208 ] });
processSnapshots({ ...defaults, id: 'pa-sak-ngam', center: [19.05479499819361, 99.14997048676014 ] });
processSnapshots({ ...defaults, id: 'mae-jo', center: [18.96125944098272,99.05029959976676 ] });
processSnapshots({ ...defaults, id: 'pa-khao-lam', center: [19.284842310388864,98.70770573616029 ] });
processSnapshots({ ...defaults, id: 'huay-khup-kap', center: [19.253543639179295,98.86196292936803 ] });
processSnapshots({ ...defaults, id: 'doi-soi-ma-lat', center: [ 17.20811674649494, 98.82002835107154 ] });