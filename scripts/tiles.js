const { processObfsTiles, processSqliteTiles } = require('./lib');

processObfsTiles({
  obfsDir: './data/latest',
  obfsFilter: (f) => f.match('Thailand'),
  renderingName: '../osmand-outdoor-explorer-plugin/src/rendering/outdoor-explorer',
  renderingProperties: 'lang=en,hideContour=true,hideBuildings=true,hideBoundaries=true,hideLanduse=true,hideWater=true,hidePeaks=true,hidePOIs=true,hideTexts=true,groundSurveyMode=true',
  outputDir: './dist/tiles',
  center: [ 19.070825827131095,99.03986245393754 ],
  tiles: [ 2, 2 ],
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