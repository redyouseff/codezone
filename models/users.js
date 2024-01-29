const validator =require("validator")
const mongoose =require("mongoose");
const userRoles =require("../utils/userRoles")
const Users =mongoose.Schema({
    firstname:{
            type:String,
            require:true
    },
    lastname:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true,
        validate:[validator.isEmail,"must be avalid email"]
    },
    password:{
        type:String,
        require:true
    },
    token:{
        type:String
    },
    role:{
        type:String,
        enum:[userRoles.ADMIN,userRoles.USER,userRoles.MANGER],
        default: userRoles.USER
    
    },
    avatar:{
        type:String,
        default:"uploads/profile.png"
    }
    


})

module.exports=mongoose.model("users",Users)
