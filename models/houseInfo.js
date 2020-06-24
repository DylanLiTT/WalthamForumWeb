'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const houseScheme = Schema( {
    name: String,
    address: String,
    landlordPhone: String,
    rent: Number,
    startDate: String,
    endDate: String,
    picUrl: String
})

module.exports = mongoose.model('houseInfo', houseScheme);