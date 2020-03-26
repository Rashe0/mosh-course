const EventEmitter = require('events')

var url = 'http://mylogger.io/log';

class Logger extends EventEmitter{
    log (message) {
        //http request
        console.log(message);
        this.emit('message', {message: 'HELLO'})
    }
    
}


module.exports = Logger;