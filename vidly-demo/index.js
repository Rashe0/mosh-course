const express = require('express')
const genres = require('./routes/genres')
const app = express()
const mongoose = require('mongoose')

app.use(express.json())
app.use('/api/genres', genres)

mongoose.connect('mongodb://localhost/vidly-db', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err))

app.get('/', (req, res) => {
    res.send('Welcome to Vidly!')
})

let port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}`))
