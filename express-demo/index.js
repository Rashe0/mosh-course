const config = require('config')
const express = require('express')
const log = require('./logger')
const Joi = require('@hapi/joi')
const helmet = require('helmet')
const morgan = require('morgan')

//Configuration
console.log("Application name: " + config.get('name'))
console.log("Mail server: " + config.get('mail.host'))
console.log("Mail password: " + config.get('mail.password'))

const app = express()

app.use(express.json())
app.use(express.urlencoded( {extended: true} ))
app.use(express.static('public'))
app.use(helmet())

if(app.get('env') === 'development') {
    app.use(morgan('tiny'))
    console.log('Morgan enabled...')
}

app.use(log)

const courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'},
]

app.get('/', (req, res) => {
    res.send('Hello world!!!')
})

app.get('/api/courses', (req, res) => {
    res.send(courses)
})

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) return res.status(404).send('The course with the given ID was not found')
    res.send(course)
})

app.post('/api/courses', (req, res) => {
    const { error } = validateCourse(req.body) 
    if (error) return res.status(400).send(error.details[0].message)
    const course = {
        id: courses.length + 1,
        name:  req.body.name
    }
    courses.push(course)
    res.send(course)
})

app.put('/api/courses/:id', (req, res) => {
    //Look up the course
    //If invalid, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) return res.status(404).send('The course with the given ID was not found')

    //Validate the course
    //If invalid, return 400
    //const result = validateCourse(req.body)
    const { error } = validateCourse(req.body) //result.error Object destructuring
    if (error) return res.status(400).send(error.details[0].message)
        
    //Update course
    //Return the course to the client
    course.name = req.body.name
    res.send(course)

})

app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) return res.status(404).send('The course with the given ID was not found')

    const index = courses.indexOf(course)
    courses.splice(index, 1)

    res.send(course)
})

var port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}...`))

function validateCourse(course) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    })
    return schema.validate(course)
}