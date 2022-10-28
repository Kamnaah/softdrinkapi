const mongoose= require("mongoose");

const CategorySchema= new mongoose.Schema({
    verities: {
        type:String,
        required:true
    },
    customized: {
        type: Boolean,
        required: true
    },
    favor:{
        type: String,
        required: true
    }
});

const CategoryModel= mongoose.model("CategoryModel", CategorySchema);
module.exports=CategoryModel;