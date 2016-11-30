'use strict'
const stream = require('stream');
const defaults = require('defaults');
class GeometryStream extends stream.Transform {
    constructor(options){
        super({objectMode: true});
        this._options=defaults(options,{
            heightProperty:'height',
            heightToMeters:1
        });
        

    }
    _transform (chunk,encoding,done){
        const item = {
            geometry:chunk.geometry,
            height:chunk.properties[this._options.heightProperty] * this._options.heightToMeters
        }
        this.push(item,encoding);
        done();
    }
}

module.exports = GeometryStream;