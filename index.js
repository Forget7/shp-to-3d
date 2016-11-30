'use strict';
const shapefile = require('shapefile-stream');
const LogStream = require('./log-stream');
const GeometryStream = require('./geometry-stream');
const GeometryToThreeStream=require('./geometry-to-three');
const GeometryToLocal=require('./to-local');
// /,undefined,{encoding:'UTF-8'}
const logStream = new LogStream();
const geometryStream=new GeometryStream({heightProperty:'heightroof',heightToMeters:0.3048});
const geometryToThreeStream=new GeometryToThreeStream();
const geometryToLocal=new GeometryToLocal();
console.log('start')
shapefile.createReadStream('sample-data/geo_export_272de63e-b230-44b7-a5ff-585fa19ea642.shp')
.pipe(geometryStream)
.pipe(geometryToLocal)
.pipe(geometryToThreeStream)
.pipe(process.stdout);
