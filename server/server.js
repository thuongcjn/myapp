const dotenv = require('dotenv').config();
const colors = require('colors');
const PORT = process.env.PORT
const express = require('express')
const cors = require('cors')
const errorHandler = require('./middlewares/error.middleware')
const connectDB = require('./config/db')

const app = express()

app.use(cors())
app.use(express.json())

app.use(express.urlencoded({ extended: false }))

connectDB()

app.get('/', (req, res) => res.send('Welcome to the posts API'))
app.use('/api/posts', require('./routes/post.route'))
app.use('/api/users', require('./routes/user.route'))

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`['cyan']['underline']);
})