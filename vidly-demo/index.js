const config = require('config')
const express = require('express')
const genres = require('./routes/genres')
const customers = require('./routes/customers')
const users = require('./routes/users')
const auth = require('./routes/auth')
const app = express()
const mongoose = require('mongoose')

if(!config.get('jwtPrivateKey')){
    console.error('FATAL: jwtPrivateKey is not defined')
    process.exit(1)
}

app.use(express.json())
app.use('/api/genres', genres)
app.use('/api/customers', customers)
app.use('/api/users', users)
app.use('/api/auth', auth)

mongoose.connect('mongodb://localhost/vidly-db', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err))

app.get('/', (req, res) => {
    res.send('Welcome to Vidly!')
})

let port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}`))
