const http =require("node:http")
const express =require("express")
const morgan =require("morgan")
const fs=require("node:fs")
const homepage=fs.readFileSync('./views/home.html',"utf8");
const  app =express();
const {body,validationResult}=require("express-validator")
let {arr}=require("./data/arr")
let controller=require("./controller/controller")
const {router}=require("./routers/routers")
require('dotenv').config()
url =process.env.mongoUrl
const mongoose =require("mongoose")
mongoose.connect(url)
const httpStatus =require("./utils/httpStatus")
let cors=require("cors");
const { error } = require("node:console");
const userRouter=require("./routers/usersRouter")
const path=require('node:path')




app.listen(process.env.port,()=>{
    console.log("listen on 1000");
 
   
})
app.use(cors())

// body.parser is middleware to parse  
app.use(express.json())
app.use("/api/courses",router)
app.use("/api/users",userRouter.router)
app.use('/uploads',express.static(path.join(__dirname,'uploads')))

app.all("*",(req,res ,next)=>{
     res.json({status:httpStatus.ERROR}).status(404)
})
app.use((error,req,res,next)=>{
    res.status(error.statusCode||500).json({status:error.statusText||"not founed id ",error:error.message})
    
})
































// app.use(express.static("./views"))
// // middleware that can happen on each get as the morgan also it gives us the imformations about req 
// app.use((req,res,next)=>{
//     console.log(req.url)
//     next();
// })
// app.use(morgan())
// app.get("/",(req,res)=>{
//     res.send(homepage);
// })
// app.get("/about",(req,res)=>{
//     res.send("about page")
// })
// app.listen(1000,()=>{
//     console.log("listen is done ")
// })


