const { listOBFs, processObfsTiles, processSqliteTiles } = require('./lib');

processObfsTiles({
  obfsDir: './data/latest',
  obfs: listOBFs('./data/latest'),
  renderingName: '../osmand-dirtbike-plugin/src/rendering/dirtbike',
  renderingProperties: 'lang=en,contourColorScheme=brown,contourDensity=high,contourLines=11,contourWidth=thin,groundSurveyMode=true,detailedColors=true,hideContour=true,hideContourLabels=true',
  // renderingBackgroundColor: '#EEEDDF',
  outputDir: './dist/tiles',
  center: [ 19.070825827131095,99.03986245393754 ],
  tiles: [ 30, 25 ],
  zooms: [ 13 ]
});



// processSqliteTiles({
//   inputDir: './data',
//   inputFilter: (f) => f.match('Hillshade'),
//   outputDir: `./dist/tiles/hillshade`,
//   zoom: [ 12 ]
// });

// processSqliteTiles({
//   inputFile: findSqliteDB('./data/latest', 'Slope Thailand'),
//   outputDir: `./dist/tiles/slope`,
//   zoom: [ 11 ]
// });