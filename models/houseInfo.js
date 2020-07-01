'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const houseScheme = Schema( {
    address: String,
    name: String,
    phone: String,
    email: String,
    bedroom: String,
    bathroom: String,
    price: String,
    startDate: String,
    endDate: String,
    comment: String,
    picUrl: String
})

module.exports = mongoose.model('houseInfo', houseScheme);
