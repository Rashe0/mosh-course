const Logger = require('./logger')

//console.log(logger)
//logger.log('message')

const path = require('path')

var pathObj = path.parse(__filename)
//console.log(pathObj)

const os = require('os')

var totalMemory = os.totalmem()
var freeMemory = os.freemem()

// console.log('Total memory: ' + totalMemory)

//Template string

// console.log(`Total memory: ${totalMemory}`)
// console.log(`Free memory: ${freeMemory}`)

const fs = require('fs')

// const files = fs.readdirSync('./')
// console.log(files)

// fs.readdir('./', function(err, files){
//     if(err) console.log('Error', err)
//     else console.log('Result', files)
// })
const logger = new Logger()

//Listen for event, order matters
// logger.on('message', (arg) => {
//     console.log('Listener called', arg)
// })
// logger.log('message')
//Raise an event
//emitter.emit('messageLogged', {id: 1, url:'http://'});

const http = require('http')

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.write('Hello World')
        res.end()
    }

    if (req.url === '/api/courses') {
        res.write(JSON.stringify([1, 2, 3]))
        res.end()
    }
})

server.listen(3000)

console.log('Listening on port 3000...')