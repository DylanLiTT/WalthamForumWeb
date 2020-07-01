"use strict";

const houseInfo =require("./models/houseInfo");

const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const User = require('./models/User');
const axios = require("axios");

const mongoose = require( 'mongoose' );
mongoose.connect(
  //'mongodb://localhost/WalthamForum',
  process.env.MONGODB_URI,{useNewUrlParserL:true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we are connected!!!")
});

const authRouter = require('./routes/authentication');
const isLoggedIn = authRouter.isLoggedIn
const loggingRouter = require('./routes/logging');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const dbRouter = require('./routes/db');
// const toDoRouter = require('./routes/todo');


const express = require("express"),
  app = express(),
  homeController = require("./controllers/homeController"),
  errorController = require("./controllers/errorController"),
  layouts = require("express-ejs-layouts");


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(layouts);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(authRouter)
app.use(loggingRouter);
app.use('/', indexRouter);
app.use('/users', usersRouter);



app.get("/houseForRent", homeController.showHouseForRent);
app.get("/restaurant", homeController.showRestaurantOpenNow);
app.post("/houseForRent",
  async(req, res, next) => {
    try{
      let address = req.body.address;
      let name = req.body.name;
      let landlordPhone = req.body.landlordPhone;
      let email = req.body.email;
      let bedroom = req.body.bedroom;
      let bathroom = req.body.bathroom;
      let rent = req.body.rent;
      let startDate  = req.body.startDate;
      let endDate = req.body.endDate;
      let comment = req.body.comment;
      let picUrl  = req.body.picUrl;
      let newHouseInfo = new houseInfo({
        address: address,
        name: name,
        landlordPhone: landlordPhone,
        email: email,
        bedroom: bedroom,
        bathroom: bathroom,
        rent: rent,
        startDate: startDate,
        endDate: endDate,
        comment: comment,
        picUrl: picUrl})
      await newHouseInfo.save();
      res.redirect("/showHouses");
    }
    catch(e){
      console.log("Fail to save new house data.")
    }
})

app.post("/houseForRentMobile",
  async(req, res, next) => {
    try{
      let value=req.body.value;
      let newHouseInfo = new houseInfo(value)
      await newHouseInfo.save();
      res.json("done");
    }
    catch(e){
      console.log("Fail to save new house data.")
    }
})

app.get("/showHouses",
   async (req,res,next) => {
     try {
       res.locals.houses = await houseInfo.find({})
       res.render('showHouses')
     }
     catch(e){
       next(e)
     }
   });

app.get('/remove/:houseId',
   isLoggedIn,
   async (req,res,next) => {
    try {
      await houseInfo.deleteOne({_id:req.params.houseId});
      res.redirect('/showHouses')
    }
    catch(e){
      next(e)
    }
  }
);

app.post("/showHousesMobile",
   async (req,res,next) => {
     try {
       let houses = await houseInfo.find({})
       console.log('returning value')
     //  console.dir(houses)
       res.json(houses)
     }
     catch(e){
       next(e)
     }
   });

app.get("/covid19/:method",
  async (req,res,next) => {
    try {
      let method = req.params.method
      let result = await axios.get("https://covidtracking.com/api/v1/states/current.json");
      //https://covidtracking.com/api/v1/states/daily.json")
      let dataType="Positive"
      let list =result['data']
      let data = result['data']
      if (method=="json"){
         res.json(data)
       } else {
         res.render('covid19',{data:data,list:list,dataType:dataType})
       }
    }
    catch(e){
      next(e)
    }
  })
app.post("/covid19/:method",async (req,res,next) => {
  try {
    let method = req.params.method
    let result = await axios.get("https://covidtracking.com/api/v1/states/current.json");
    //https://covidtracking.com/api/v1/states/daily.json")
    let list=result['data']
    let data = result['data'].filter(x => x.state==req.body.state)
    let dataType=req.body.dataType

    if (method=="json"){
       res.json(data)
     } else {
       res.render('covid19',{data:data,list:list,dataType:dataType})
     }
  }
  catch(e){
    next(e)
  }
});
app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});




module.exports = app;
