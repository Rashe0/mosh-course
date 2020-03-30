const config = require('config')
const courses = require('./routes/courses')
const home = require('./routes/home')
const express = require('express')
const log = require('./middleware/logger')
const helmet = require('helmet')
const morgan = require('morgan')
const debug = require('debug')('app:startup')

//Configuration
console.log("Application name: " + config.get('name'))
console.log("Mail server: " + config.get('mail.host'))
//console.log("Mail password: " + config.get('mail.password'))

const app = express()

app.set('view engine', 'pug')

app.use(express.json())
app.use(express.urlencoded( {extended: true} ))
app.use(express.static('public'))
app.use(helmet())
app.use('/api/courses', courses)
app.use('/', home)

if(app.get('env') === 'development') {
    app.use(morgan('tiny'))
    debug('Morgan enabled...')
}

app.use(log)

var port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}...`))