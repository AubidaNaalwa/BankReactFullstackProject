const express = require('express')
const path = require('path')
const app = express()
const api = require('./server/routes/api')
const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost/BankApp", {useNewUrlParser: true, useUnifiedTopology: true}) 
.then(() => console.log( 'Database Connected' ))
.catch(err => console.log( err ));

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')

    next()
})
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', api)

const port = 8080

app.listen(port, function () {
    console.log(`server runs on port : ${port}`)
})