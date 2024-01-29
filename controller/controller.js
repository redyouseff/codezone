const {body,validationResult}=require("express-validator")
const asyncWrapper=require("../middleware/asyncWrapper")
const mongoose =require("mongoose");
// let {arr}=require("../data/arr")
let {Course} =require("../models/model")

const httpStatus =require("../utils/httpStatus")
const appError =require("../utils/errorHandling")

const getalldata= async (req,res)=>{
    const query =req.query;
    const limit = query.limit ||5;
    const page = query.page ||1;
    const skip=(page -1)*limit;
     const data = await Course.find({},{__v:false}).limit(limit).skip(skip);
    // res.json(data)
    res.status(200).json({ status : httpStatus.SUCCESS,
    data:{data}
    
})
  

 }
 const getDataWithId= asyncWrapper( async (req,res,next)=>{
   
    const data =await Course.find()
    const id=req.params.id
   
    const result =await  Course.findById(req.params.id,{__v:false})

    
   
    if(!result){
       
      const error= appError.create("not found id ",500,httpStatus.ERROR)
      return next(error)
    }   
   res.status(200).json({status:httpStatus.SUCCESS,data:{result}})
 })
 const postData = asyncWrapper( async (req,res,next)=>{
    const data = await Course.find();
    const errors = validationResult(req)
    if(!errors.isEmpty()){
       const error =appError.create(errors.array(),500,httpStatus.FAILED)
        return next(error)        
    }
    if(!req.body.title){
        res.status(404).json({err:"invalid title"})
    }
   
    const newcoures=new Course(req.body)
    await newcoures.save();
  
    res.json({status:httpStatus.SUCCESS,data:{newcoures}})
    
 })

 const patchData= async (req,res)=>{
    const id=req.params.id
    // let data =await Course.findByIdAndUpdate(id,{$set:{...req.body}})
    // await data.save();
    // res.json(data);

try{
const updatedcourse= await Course.updateOne({_id:id},{$set:{...req.body}})
res.json({status:httpStatus.SUCCESS,data:{updatedcourse}})

}
catch(e){
    res.json({status:httpStatus.FAILED,message:e.message})

}


 }

 const deleteData= async(req,res)=>{
  
    // const exist =arr.find((x)=>x.id==id);
    // if(!exist){
    //  return res.json({ms:'not found '})
    // }
 
    // const data =arr.filter((x)=> x.id!=id)
    // res.status(200).json(data)

    const id=req.params.id;
    try{
        const deletedcourse= await Course.deleteOne({_id:id})
        res.status(200)
        res.json( {status :httpStatus.SUCCESS, data:null})
    } catch(e){
        res.status(401)
        res.json({status:httpStatus.ERROR,message:e.message})
    }
   




  }
  module.exports={
    getalldata,
    getDataWithId,
    postData,
    patchData,
    deleteData

  }


