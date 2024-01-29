

const httpStatus =require("../utils/httpStatus")
const users=require("../models/users")
const asyncWrapper=require("../middleware/asyncWrapper")
const appError =require("../utils/errorHandling")
const { body } = require("express-validator")
const bcrypt=require("bcrypt")
var jwt = require('jsonwebtoken');
const generateJWT=require("../utils/generateJWT")

const getallusers= asyncWrapper( async (req,res)=>{

    
    const query =req.query;
    const limit = query.limit ||5;
    const page = query.page ||1;
    const skip=(page -1)*limit;
     const data = await users.find({},{__v:false}).limit(limit).skip(skip);
     
  
    res.status(200).json({ status : httpStatus.SUCCESS,
    data:{data}
  
})


 })

 const register= asyncWrapper ( async(req,res,next)=>{
  const {firstname,lastname,email,password,role}= req.body
 const find =await users.findOne({email:email})
 const data =users.find()
 const hashedpassword=await bcrypt.hash(password,10);
 console.log(req.file)
 
 if(find){
  const error = appError.create("email is allready exist ",500,httpStatus.ERROR)
  return next(error)
 }
 const newUser=new users({
  firstname,
  lastname,
  email,
  password:hashedpassword,
  role,
  avatar:req.file.filename

 })
 const token =await generateJWT({email:newUser.email,id:newUser._id,role:newUser.role})
 newUser.token=token;
   
 await newUser.save();

 res.json({status:httpStatus.SUCCESS,data:{newUser}})
  

 })

 const login = asyncWrapper( async(req,res,next)=>{
  const {email,password}=req.body;
  
  if(!email && !password){
    const error =appError.create("enter avalid email and password",500,httpStatus.ERROR)
    return next(error)
  }
  const user=await users.findOne({email:email})
  if(!user){
    const error =appError.create("user is not valid ",500,httpStatus.ERROR)
    return next(error)
  }
  const matchPassword= await bcrypt.compare(password,user.password)
 
  if(user&&matchPassword){
     const token =await generateJWT({email:user.email,id:user._id,role:user.role})
    res.json({status:httpStatus.SUCCESS,token:{token}})
  }
  else{
    const error =appError.create("something wrong",500,httpStatus.ERROR)
    return next(error);
  }

 }
 )

  module.exports={
    getallusers,
    register,
    login
  }






