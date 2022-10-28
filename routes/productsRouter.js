const express=require("express");
const CategoryModel = require("../models/category");
const ProductModel = require("../models/products");
const router= express.Router();
const auth=require("../middleware/auth");
const authforadmin= require("../middleware/admin");
router.get("/:id",auth ,async (req,res)=>{
    try{
        // console.log(req.params.id)
        const ProductList= await ProductModel.findById(req.params.id).populate('category');
        res.status(200).json({
            status:"Success",
            ProductList:ProductList
        })

    }catch(e){
        res.status(400).json({
            status:"Failed",
            message:e.message
        })
    }
})
router.post("/create",authforadmin, async (req,res)=>{
    const category = await CategoryModel.findById(req.body.category);
    if(!category){
        return res.status(400).send("invalid code");
    }
    try{
        const ProductList=await ProductModel.create(req.body);
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

router.put("/update/:id",authforadmin, async (req,res)=>{
    try{
        const ProductList= await ProductModel.updateOne({id:req.params._id},req.body);
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
        const ProductList= await ProductModel.deleteOne({id:req.params._id},req.body);
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


//static data for admin-----
router.get('/get/count',authforadmin,async(req,res)=>{
    try{
        const ProductCount=await ProductModel.countDocuments();
        res.status(200).json({
            status:"Success",
            count:ProductCount
        });

    }catch(e){
        res.status(400).json({
            status:'Failed',
            message:e.message
        })
    }
    
})


//pagination--------------
router.get("/",auth, async (req,res)=>{
    let {page,limit,brand , price, category}=req.query;
    // console.log(req.query);
    if(!page) page=1;
    if(!limit) limit=1;
    if(!brand && !price && !category){
        // console.log("hii")
        const skip=(page-1)*limit;
        const ProductList=await ProductModel.find().skip(skip).limit(limit).populate('category');
        res.status(200).json({
            status:"Success",
            page:page,
            limit:limit,
            ProductList:ProductList
        })
        
    }else if( brand || price || category){
        const skip=(page-1)*limit;
        console.log({brand,price,category});
        let ProductList
        if(brand){
            ProductList=await ProductModel.find({brand}).skip(skip).limit(limit).populate('category');
        }
        if(price){
            ProductList=await ProductModel.find({price}).skip(skip).limit(limit).populate('category');
        }
        if(category){
            ProductList=await ProductModel.find({category}).skip(skip).limit(limit).populate('category');
        }
        res.status(200).json({
            status:"Success",
            page:page,
            limit:limit,
            brand:brand,
            category:category,
            price:price,
            ProductList:ProductList
        })
    }

})
module.exports=router;