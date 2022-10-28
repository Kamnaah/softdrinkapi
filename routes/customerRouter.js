const express = require("express");
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require("cors");
const route = express.Router();
const secretKey="1234566789900";
const secretKey2="wearewearegonarocktheworld";
route.use(express.json());
route.use(cors());
//import Model
const user = require("../models/customers");

//import middle ware
const authforadmin= require("../middleware/admin");
const auth=require("../middleware/auth");


//apis for register for customer--------------------------

//post-----------
route.post("/RegisterCustomer", async (req, res) => {
  try {
    const {email,password,role,cpass}=req.body;
    const data= new user({email,password,cpass,role});
    //before saving bycrpt password---
    await data.save()
    res.status(200).json({
      status: "success",
      data: data,
      message:"Registered Successfully"
    });
  } catch (e) {
    res.status(404).json({
      status: "Failed",
      message: e.message,
    });
  }
});

//get----------------
route.get("/getRegisteredCustomer",authforadmin, async (req, res) => {
  try {
    const data = await user.find();
    res.status(200).json({
      status: "success",
      data: data,
    });
  } catch (e) {
    res.status(404).json({
      status: "Failed",
      message: e.message,
    });
  }
});

//api for login -------------------------------
route.post("/login", async (req, res) => {
  try {
    const { email, password , role} = req.body;
    const login = await user.findOne({ email: email });
    if (!login) {
      res.json({
        message: "Invalid email",
      });
    } else {
      const isMatch= await bcrypt.compare(password,login.password)//true or false
      if (isMatch) {
        // console.log(login.role , role);
        if(login.role!=role){
          res.json({message:"role doesnot match"});
        }
        else{
        if(role==="customer"){
           const token1 = jwt.sign(
            {
              exp: Math.floor(Date.now() / 1000) + 60 * 60,
              user: login._id,
            } , secretKey
          );
          res.status(200).json({
            message: "Logged In Successfully",
            tokenforcustomer:token1,
            login
          });
        }
        if(role==="admin"){
          const token2 = jwt.sign(
            {
              exp: Math.floor(Date.now() / 1000) + 60 * 60,
              user: login._id,
            } , secretKey2
          );
          res.status(200).json({
            message: "Logged In Successfully",
            tokenforadmin:token2,
            login
          });
        }
        else{
          res.send("role is not valid")
        }
      }
      } else {
        res.json({
          message: "Invalid password",
        });
      }
    }
  } catch (e) {
    res.status(400).json({
      status: "failed",
      message: e.message,
    });
  }
});

module.exports = route;
