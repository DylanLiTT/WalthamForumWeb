"use strict";

exports.showHouseForRent = (req, res) => {
  res.render("houseForRent");
};

exports.showRestaurantOpenNow = (req, res) => {
  res.render("restaurant");
};

exports.showSelectedData = (req, res) => {
  let state = req.body.state
  let dataType = req.body.dataType

  const selected_data =
      data.filter(item =>
        ( (!dataType) || data['${dataType}'] )
        &&
        (!req.body.state || data['state']==state)
      )
  


  console.log("faculty = ")
  console.log(JSON.stringify(selected_data))
  res.render("data", {
   item:selected_data,
  });
};
