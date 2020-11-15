if (process.env.NODE_ENV !== "production") {
  require("dotenv").config()
}

const express = require('express')
const app = express()

const mainRoute = require('./routes/mainRoute')
const cors = require('cors')
const errHandler = require('./middlewares/errHandler.js')



app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

app.use(mainRoute)
app.use(errHandler)

module.exports = app
