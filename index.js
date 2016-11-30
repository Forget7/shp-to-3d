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
shapefile.createReadStream('data/sample.shp')
.pipe(geometryStream)
.pipe(geometryToLocal)
.pipe(geometryToThreeStream)
.pipe(logStream);
