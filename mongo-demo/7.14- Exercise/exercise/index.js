const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/mongo-exercises', {useNewUrlParser: true})
    .then(() => console.log('Connected to databse...'))
    .catch(err => console.error('Could not connect to database.', err))

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: {type: Date, default: Date.now},
    isPublished: Boolean,
    price: Number
 })

const Course = mongoose.model('Course', courseSchema)

async function getCourses(){
    return await Course
        .find({ isPublished: true})
        .or([
            { name: /.*by.*/i },
            { price: { $gte: 15 }}
        ])
        .select({ name: 1, author: 1, price: 1})
}

async function run(){
    const courses = await getCourses()
    console.log(courses)
}

run()