const express = require('express');
const router = express.Router();
const restaurantInfo = require('../models/restaurantInfo')

isLoggedIn = (req,res,next) => {
    if (res.locals.loggedIn) {
      next()
    } else {
      res.redirect('/login')
    }
}

router.get('/',
  isLoggedIn,
  async (req, res, next) => {
      res.locals.restaurants = await RestaurantsInfo.find();
      res.render('restaurant');
});

module.exports = router;