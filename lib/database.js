"use strict"
const mongoose=require("mongoose");
function connect(){
    mongoose.connect("mongodb+srv://InfoHotel:1234@hotelapi-o1qkp.mongodb.net/test?retryWrites=true&w=majority",{
        useNewUrlParser:true,
        useUnifiedTopology: true,
    });
    const connection=mongoose.connection;
    connection.on("error",function(err){
        console.log("server is Down",err);
        throw err;
    });
    connection.on("open",function(){
        console.log("successfully connected");
    })
}
module.exports={
    connect:connect,
}