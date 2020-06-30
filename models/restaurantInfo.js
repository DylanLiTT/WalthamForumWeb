'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const restaurantScheme = Schema( {
    name: String,
    address: String,
    phone: String,
    price: String,
    picUrl: String,
    Status: String,
})

module.exports = mongoose.model('restaurantInfo', restaurantScheme);