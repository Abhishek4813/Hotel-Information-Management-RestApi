# Hotel-Information-Management-RestApi
An Express based Api provides create, read, update and delete records of a hotel


## Install 
    npm install
  
## Run 
    npm start
    
# Rest Api Routes
Here is description of all the Routes used in Api.
## Schema
    {                                                                       
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
    }
    
## Create a record

  `POST /api/add/`                                                          
  `http://localhost:3000/api/add/`
  
    Field Name should match with schema. if sending data through form then add 
    enctype to form element as
   `enctype="multipart/form-data`
   
## Get a Record
    
`GET    /api/info/hotel_Name`                                     
`http://localhost:3000/api/info/blue haven`
  
    Response is JSON similar as schema. Image received is a Binary image so before
    rendering it to a page convert is to base64. use code
  
  `var img = new Buffer(filename,"binary").toString("base64");`
  
    the src of image should be of form
   `src="data: image/jpg; base64, img";`
## Update Record

   `POST /api/update/hotel_name`
   `http://localhost:3000/api/update/blue haven`
   
## Delete Record
    
   `DELETE /api/remove/hotel_name`
   `http://localhost:3000/api/remove/blue haven`
