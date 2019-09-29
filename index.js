const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const middleware = require('./utils/middleware')

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl, { useNewUrlParser: true , useUnifiedTopology: true})
        .then(()=> console.log("Connected to MongoDB"))
        .catch(error => console.log(error.message))

app.use(cors())
app.use(bodyParser.json())
app.use('/api/blogs',require('./controllers/blogs'))


app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})