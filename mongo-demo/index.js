const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/playground', {useNewUrlParser: true})
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB', err))

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: {type: Date, default: Date.now},
    isPublished: Boolean
})

const Course = mongoose.model('Course', courseSchema)

async function createCourse(){
    const course = new Course({
        name: "Angular Course",
        author: "Mosh",
        tags: ['angular', 'frontend'],
        isPublished: true
    })
    const result = await course.save()
    console.log(result)
}

async function getCourses(){
    
    const pageNumber = 2
    const pageSize = 10

    const courses = await Course
        .find({ author: 'Mosh', isPublished: true})
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
        .sort({ name: 1 })
        .select({ name: 1, tags: 1 })
        .count()
    console.log(courses)
}

async function updateCourse(id){
    // Approach: Query first
    // findById()
    // Modify its properties
    // save()
    
    const course = await Course.findById(id)
    if (!course) return

    // course.isPublished = true
    // course.author = 'Another Author'

    course.set({
        isPublished: true,
        author: 'Another Author'
    })

    const result = await course.save()
   
    // Approach: Update first
    // Update directly
    // Optionally: get the updated document

    // const result = await Course.findById(id, {
    //     $set: {
    //         author: 'jack',
    //         isPublished: true
    //     }
    // })
    // console.log(result)
}

updateCourse('5e8321e14bedb514b4116044')

    // eq - equal
    // ne - not equal
    // gt - greater than
    // gte - greater than or equal to
    // lt - less than
    // lte - less than or equal to
    // in
    // nin - not in

    // or
    // and

    // .find({ price: { $gte: 10, $lte: 20}     })
        // .find({ price: { $in: [10, 15, 20] }})

        // .find()
        // .or([ { author: 'Mosh' }, { isPublished: true } ])

        // Start with Mosh
        // find({ author: /^Mosh/})

        // Ends with Hamedani
        // find({ author: /Hamedani$/i })

        // Contains Mosh
        // .find({ author: /.*Mosh.*/i })