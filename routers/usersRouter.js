const express =require("express");
const router=express.Router();
const multer  = require('multer')
const appError =require("../utils/errorHandling")

const diskStorage =multer.diskStorage({
    destination: (req,file,cb)=>{
        console.log(file)
        cb(null,"uploads")

    },
    filename:(req,file,cb)=>{
        const ext =file.mimetype.split("/")[1];
        const filename =`user-${Date.now()}.${ext}`
        cb(null,filename)
    }
    
})
const fileFilter=(req,file,cb)=>{
    const type =file.mimetype.split("/")[0]
    if(type=="image"){
         cb(null,true)
    }
    else{
        cb(appError.create("the file must be an image"),false)
    }
}


const upload = multer({ storage: diskStorage ,
    fileFilter:fileFilter
})

const verifyToken=require("../middleware/verifyToken")
const usercontroller=require("../controller/usercontroller")
router.route("/").get(verifyToken,usercontroller.getallusers)

router.route("/register").post( upload.single("avatar"),usercontroller.register)

router.route("/login").post(usercontroller.login)



module.exports= {router}
