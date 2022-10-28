const mongoose= require("mongoose");

const ProductSchema= new mongoose.Schema({
    brand: {
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
        default:'',
        required: true
    },
    price:{
        type:Number,
        required:true
    },
    instock:{
        type:Number,
        required:true,
        max:1000,
        min:0
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"CategoryModel",
        required: true
    },
    isFeature:{
        type: Boolean,
        default:false
    },
    dateCreated:{
        type:Date,
        default:Date.now
    }
});

const ProductModel= mongoose.model("ProductModel", ProductSchema);
module.exports=ProductModel;