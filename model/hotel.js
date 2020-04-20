"use strict"
const mongoose=require("mongoose");
const hotelschema=new mongoose.Schema({
Name: String,
Contact: String,
Location: String,
About: String,
Rating: String,
Price_Range: String,
Pictures:{
    Exterior: Buffer,
    Interior: Buffer,
},
Facilities: [{type:String}],
Room_Type: [{type:String}],

});
const hotelmodel=mongoose.model("hotel",hotelschema);
module.exports = hotelmodel;