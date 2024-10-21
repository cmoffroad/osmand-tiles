const { listOBFs, processObfsTiles, processSqliteTiles } = require('./lib');

processObfsTiles({
  obfsDir: './data/latest',
  obfs: listOBFs('./data/latest'),
  renderingName: '../osmand-dirtbike-plugin/src/rendering/dirtbike',
  renderingProperties: 'lang=en,contourColorScheme=brown,contourDensity=high,contourLines=11,contourWidth=thin,groundSurveyMode=true,detailedColors=true,showUnknown=true,hideContour=false,hideContourLabels=true,hideBoundaries=false,showFixme=true',
  // renderingBackgroundColor: '#EEEDDF',
  outputDir: './dist/tiles',
  center: [ 19.070825827131095,99.03986245393754 ],
  tiles: [ 30, 25 ],
  zooms: [ 13 ]
});

// processObfsTiles({
//   obfsDir: './data/latest',
//   obfs: listOBFs('./data/latest'),
//   renderingName: '../osmand-dirtbike-plugin/src/rendering/dirtbike',
//   renderingProperties: 'lang=en,contourColorScheme=brown,contourDensity=high,contourLines=11,contourWidth=thin,groundSurveyMode=true,detailedColors=true,hideContour=true,hideContourLabels=true,showFixme=true',
//   outputDir: './dist/tiles',
//   center: [ 21.721350995105148,104.52409744262697 ],
//   tiles: [ 10, 10 ],
//   zooms: [ 13 ]
// });

