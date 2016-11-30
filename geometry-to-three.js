'use strict'
const stream = require('stream');
const defaults = require('defaults');
const THREE = require('three');
const proj4 = require('proj4');
class GeometryToThreeStream extends stream.Transform {
    constructor(options){
        super({objectMode: true});
        this._options=defaults(options,{
            
        });
        

    }
    _transform (chunk,encoding,done){
        const points = chunk.geometry.map(p=>new THREE.Vector2(p[0],p[1]));
        const shape = new THREE.Shape(points);
        const extruded = new THREE.ExtrudeGeometry(shape,{amount: chunk.height}).toJSON();
        this.push(extruded,encoding);
        done();
    }
}

module.exports = GeometryToThreeStream;