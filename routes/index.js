const express = require('express');
const router = express.Router();
const hotelmodel=require("../model/hotel");
const multer=require("multer");
const fs=require('fs');
const fsextra=require("fs-extra");
const storage=multer.diskStorage({
destination: function(req,file,cb){
  cb(null,'./uploads/');
},
filename: function(req,file,cb){
  cb(null,file.originalname);
}
});
const upload=multer({storage:storage});

/* Add a hotel info */

router.post('/api/add',upload.fields([{
name: "Exterior", maxCount:1},
{
  name:"Interior", maxCount:1,
}
]), function(req, res, next) {
  //checking uniqueness of hotel name before adding to db. hotel name is our primary key.
  hotelmodel.findOne({Name:req.body.Name},function(err,data){
    if(data){
      //removing image file read by multer in uploads directory
      fsextra.remove(req.files.Exterior[0].path);
      fsextra.remove(req.files.Interior[0].path);
      res.send("data not unique");
    }
  else{
  fs.readFile(req.files.Exterior[0].path,function(err,exterior){
  fs.readFile(req.files.Interior[0].path,function(err,interior){
  var hotel=new hotelmodel({
    Name: req.body.Name,
    Contact: req.body.Contact,
    Location: req.body.Location,
    About: req.body.About,
    Rating: req.body.Rating,
    Price_Range: req.body.Price_Range,
    Pictures:{
      Exterior: exterior,
      Interior: interior,
    },
    Facilities: req.body.Facilities,
    Room_Type: req.body.Room_Type,
  })
  hotel.save(function(err,succ){
    if(succ){
    //removing image file read by multer at uploads directory after saving it to db.
    fsextra.remove(req.files.Exterior[0].path);
    fsextra.remove(req.files.Interior[0].path);
    res.send("Success");
    }
    else{
      throw err;
    }
  })
  })
  })
}});
});

/* Read hotel info */

router.get("/api/info/:name",function(req,res,next){
var name= req.params.name;
  hotelmodel.findOne({Name:name},function(err,data){
  if(data){
  res.status(200).json({
    Name:data.Name,
    Contact:data.Contact,
    Location:data.Location,
    About:data.About,
    Rating:data.Rating,
    Price_Range:data.Price_Range,
    Facilities:data.Facilities,
    Room_Type:data.Room_Type,
    Pictures:{
      Exterior:data.Pictures.Exterior,
      Interior:data.Pictures.Interior,
    }
  });
}
else{
  res.send("Record Unavailable");
}
  });
});

/* update hotel info */

router.post('/api/update/:name',upload.fields([{
  name: "Exterior", maxCount:1},
  {
    name:"Interior", maxCount:1,
  }
  ]),function(req,res,next){
var hotel=req.params.name;
//check if data available 
hotelmodel.findOne({Name:hotel},function(err,data){
if(data){
//if available update
const {Name,Contact,Location,About,Rating,Price_Range,Facilities,Room_Type}=req.body;
fs.readFile(req.files.Exterior[0].path,function(err,exterior){
  fs.readFile(req.files.Interior[0].path,function(err,interior){
  hotelmodel.updateOne({Name:hotel},{
    Name: Name,
    Contact: Contact,
    Location: Location,
    About: About,
    Rating: Rating,
    Price_Range: Price_Range,
    Pictures:{
      Exterior: exterior,
      Interior: interior,
    },
    Facilities: Facilities,
    Room_Type: Room_Type,
  },function(err,succ){
    if(succ){
    fsextra.remove(req.files.Exterior[0].path);
    fsextra.remove(req.files.Interior[0].path);
    res.send("Update Success");
    }
  })
  })
  })
}
else{
  //if not available response with 'no data available'
  fsextra.remove(req.files.Exterior[0].path);
  fsextra.remove(req.files.Interior[0].path);
  res.send("No such Record Available");
}
})});


/* Delete Record */

router.delete('/api/remove/:name',function(req,res,next){
const hotel=req.params.name;
hotelmodel.findOne({Name:hotel},function(err,data){
  if(data){
    delete data;
    hotelmodel.deleteOne({Name:hotel},function(err,succ){
      if(succ)
        res.send("Delete Success");
    })
  }
  else{
    res.send('No such record available');
  }
})
});
module.exports = router;
