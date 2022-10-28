const express=require("express");
const cors= require("cors");
const swaggerUI=require("swagger-ui-express");
const YAML=require("yamljs");
const fileupload=require("express-fileupload");
const app=express();
const swaggerJsDocs=YAML.load('./api.yaml');
const ProductRouter=require("./routes/productsRouter");
const CategoryRouter=require("./routes/categoriesRouter");
const User=require("./routes/customerRouter");
// middle-ware
app.use(express.json());
app.use(cors());
app.use("/api-docs",swaggerUI.serve,swaggerUI.setup(swaggerJsDocs));
app.use(fileupload());

//import database
require("./database/connection");

//routes---
app.use("/products",ProductRouter);
app.use("/category", CategoryRouter);
app.use("/customerapi", User);
//server
app.listen(8000,()=>{
    console.log("listening to the server!!");
})

