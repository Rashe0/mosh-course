const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true, useUnifiedTopology: true } )
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB', err))

const courseSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true,
        minlength: 5,
        maxlength: 125,
        // match: /pattern/
    },
    category: {
        type: String, 
        required: true,
        enum: ['web', 'mobile', 'network'],
        lowercase: true,
        // uppercase: true,
        trim: true
    },
    author: String,
    tags: {
        type: Array,
        validate: {
            validator: async function(v) {
                //Async work
                setTimeout(() => {
                    console.log('Doing async work...')
                }, 1000)
                const result = v && v.length > 0
                if (!result) return Promise.reject(new Error('Validation failed bitch'))
            },
            message: 'lol'
        }
    },
    date: {type: Date, default: Date.now},
    isPublished: Boolean,
    price: {
        type: Number,
        required: function() { return this.isPublished },
        min: 10,
        max: 200, //same for dates
        get: v => Math.round(v),
        set: v => Math.round(v)
    }
})


const Course = mongoose.model('Course', courseSchema)

async function createCourse(){
    const course = new Course({
        name: "Angular Course",
        category: 'web',
        author: "Mosh",
        tags: ['frontend'],
        isPublished: true,
        price: 15.8
    })

    // try{
    //     // await course.validate().catch(error => {
    //     //     assert.equal(error.errors['tags'].message, 'A course should have at least one tag')
    //     // })
    // } catch (ex){
    //     for (field in ex.errors)
    //         console.log(ex.errors[field].message)
    // }
    
    await course.save()
        .then(result => console.log(result))
        .catch(error => console.log(error.message))
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

createCourse()

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