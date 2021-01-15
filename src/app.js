const express = require('express')
const cors = require('cors')
const path = require('path')

require('./db/mongoose')

const app = express()
app.use(cors())
app.use(express.json())

module.exports = app
