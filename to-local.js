'use strict'
const stream = require('stream');
const defaults = require('defaults');
const proj4 = require('proj4');
class GeometryToLocal extends stream.Transform {
    constructor(options){
        super({objectMode: true});
        this._options=defaults(options,{
            
        });
        

    }
    _transform (chunk,encoding,done){
        if (chunk.geometry.type != 'Polygon'){
            return done();
        }
        const transform=proj4('WGS84','EPSG:3857');
        const points = chunk.geometry.coordinates[0];
        const centerGeo = this._center(points); 
        let mercatorPoints = points.map(p=>transform.forward(p));
        const centerMerc = this._center(mercatorPoints);
        mercatorPoints=mercatorPoints.map(p=>[p[0]-centerMerc[0],p[1]-centerMerc[1]])
        const local=Object.assign({},chunk);
        local.geometry=mercatorPoints;
        local.position=centerGeo;
        this.push(local,encoding);
        done();
    }

    _center(points){
        let sum=[0,0];
        points.forEach(p=>{
            sum[0]+=p[0];
            sum[1]+=p[1];
        })
        sum[0]/=points.length;
        sum[1]/=points.length;
        return sum;
        
    }
}

module.exports = GeometryToLocal;