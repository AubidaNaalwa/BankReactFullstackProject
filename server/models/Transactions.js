const mongoose = require('mongoose')
const Schema = mongoose.Schema

const transaction = new Schema({
    amount : Number,
    vendor : String ,
    category:String,
    type : String
})

const Transaction = mongoose.model('Transaction', transaction) 

module.exports = Transaction