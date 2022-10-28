const express=require("express");
const CategoryModel=require("../models/category");
const router= express.Router();
const auth=require("../middleware/auth");
const authforadmin= require("../middleware/admin");
router.get("/",auth, async(req,res)=>{
    try{
        const ProductList= await CategoryModel.find();
    res.status(200).json({
        status:"success",
        ProductList
    })

    }catch(e){
        res.status(400).json({
            status:"Failed",
            message:e.message
        })
    }
})

router.get("/:id",auth, async (req,res)=>{
    try{
        const ProductList= await CategoryModel.findOne({_id:req.params.id});
        res.status(200).json({
            status:"Success",
            ProductList
        })

    }catch(e){
        res.status(400).json({
            status:"Failed",
            message:e.message
        })
    }
})

router.post("/postCategory",authforadmin, async (req,res)=>{
    try{
        const ProductList=await CategoryModel.create(req.body);
        res.status(200).json({
            status:"Success",
            ProductList
        })

    }catch(e){
        res.status(400).json({
            status:"Failed",
            message:e.message
        })
    }
})

router.put("/update/:id", authforadmin,async (req,res)=>{
    try{
        const ProductList= await CategoryModel.updateOne({_id:req.params.id},req.body);
        res.status(200).json({
            status:"Success",
            ProductList
        })

    }catch(e){
        res.status(400).json({
            status:"Failed",
            message:e.message
        })
    }
})

router.delete("/delete/:id",authforadmin, async (req,res)=>{
    try{
        const ProductList= await CategoryModel.deleteOne({id:req.params._id},req.body);
        res.status(200).json({
            status:"Success",
            ProductList
        })

    }catch(e){
        res.status(400).json({
            status:"Failed",
            message:e.message
        })
    }
})

module.exports=router;