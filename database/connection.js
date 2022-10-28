const mongoose= require("mongoose");

mongoose.connect("mongodb://localhost/placementdb").then(()=>{
    console.log("connected to the database!!");
}).catch((e)=>{
    console.log(e);
})

