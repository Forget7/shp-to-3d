'use strict';
const stream = require('stream');
class LogStream extends stream.Writable {
    constructor(){
        super({objectMode: true});
    }
    _write(chunk,encoding,done){
        console.log(chunk);
        done();
    }
}

module.exports = LogStream;