var jwt = require('jsonwebtoken');
const appError =require("../utils/errorHandling")
const httpStatus =require("../utils/httpStatus")
const verifyToken =(req,res,next)=>{
    const authheader=req.headers["Authorization"] || req.headers["authorization"]
    const toke =authheader.split(" ")[1];
    if(!authheader){
        return  res.json("header is required")
    }

    try{
        let currentUser= jwt.verify(toke,process.env.JWT_SECRET_KEY)
        req.currentUser=currentUser;
        
        next()
    }
    catch{
        const error= appError.create("invalid token ",400,httpStatus.ERROR)
        return  next(error);
       
    }
    

}
module.exports=verifyToken