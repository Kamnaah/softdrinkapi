const mongoose=require('mongoose');
var bcrypt = require('bcryptjs');


const CustomerSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique: true 
    },
    password:{
        type: String,
        required:true
    },
    role:{
        type: String,
        required: true
    }
})  


//hashing password
CustomerSchema.pre('save',async function(next){
   if(this.isModified("password")){
    this.password=await bcrypt.hash(this.password,10);
   }
   next();
})
const user=mongoose.model("user",CustomerSchema);
module.exports=user;