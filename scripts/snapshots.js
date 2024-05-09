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
  renderingName: '../osmand-outdoor-explorer-plugin/src/rendering/outdoor-explorer',
  renderingProperties: 'lang=en,contourLines=11,contourWidth=thin,contourDensity=medium,region_hillshade=yes,groundSurveyMode=true'
}

// processSnapshots({
//   id: 'doi-mon-ngo',
//   center: [ 19.141279945598498, 98.78310464322567 ],
//   ...defaults
// });


processSnapshots({
  obfsConfigs: [
    {
      dir: './data/latest',
      name: '2023-06',
      obfs: listOBFs('./data/latest', '23_06_00')
    },
    {
      dir: './data/latest',
      name: '2024-01',
      obfs: listOBFs('./data/latest')
    }
  ],
  zoom: 14,
  xTiles: 18,
  yTiles: 12,
  // renderingName: '../OsmAnd-resources/rendering_styles/desert',
  // renderingName: '/Users/julien/WORKSPACES/OsmAnd/OsmAnd-resources/rendering_styles/enduro',
  renderingName: '/Users/julien/WORKSPACES/OsmAnd/OsmAnd-resources/rendering_styles/outdoor',
  // renderingProperties: 'lang=en,contourLines=11,contourWidth=thin,contourDensity=medium,region_hillshade=yes,groundSurveyMode=false',
  id: 'doi-soi-malai',
  center: [17.1483518,98.8288542]
})
// processSnapshots({ obfsMap, id: 'samoeng-south', zoom, center: [ 18.7620394380547, 98.67446927373197 ], width, height });
// processSnapshots({ obfsMap, id: 'mae-rim', zoom, center: [18.95221280228806, 98.79362694919111 ], width, height });
// processSnapshots({ obfsMap, id: 'doi-mon-lan', zoom, center: [19.483556396738397, 99.3281062839093 ], width, height });
// processSnapshots({ obfsMap, id: 'chiang-dao', zoom, center: [19.297740210722907, 98.86838816106321 ], width, height });
// processSnapshots({ obfsMap, id: 'samoeng-north', zoom, center: [18.985805606984897, 98.65548044443132 ], width, height });
// processSnapshots({ obfsMap, id: 'doi-lanka', zoom, center: [18.946400878789568, 99.35811057686807 ], width, height });
// processSnapshots({ obfsMap, id: 'mae-takhrai', zoom, center: [18.798984281609584, 99.34845730662349 ], width, height });
// processSnapshots({ obfsMap, id: 'lamphun', zoom, center: [18.66579707920592, 99.24496695399284 ], width, height });
// processSnapshots({ obfsMap, id: 'doi-suthep', zoom, center: [18.83086189847519, 98.86510245501997 ], width, height });
// processSnapshots({ obfsMap, id: 'doi-inthanon', zoom, center: [18.60196590366656, 98.58392916619779 ], width, height });
// processSnapshots({ obfsMap, id: 'chomthong', zoom, center: [18.40300834741832, 98.4969585388899 ], width, height });
// processSnapshots({ obfsMap, id: 'mae-chaem', zoom, center: [18.475043957563074, 98.35591457784176 ], width, height });
// processSnapshots({ obfsMap, id: 'mae-ya', zoom, center: [19.18345604410202, 98.56344781816006 ], width, height });
// processSnapshots({ obfsMap, id: 'muang-khong', zoom, center: [19.374554004279393, 98.6808414012194 ], width, height });
// processSnapshots({ obfsMap, id: 'wiang-haeng', zoom, center: [19.655991859268052, 98.63981567323208 ], width, height });
// processSnapshots({ obfsMap, id: 'pa-sak-ngam', zoom, center: [19.05479499819361, 99.14997048676014 ], width, height });