const {body,validationResult}=require("express-validator")
const validationschema=()=>{
    return(
        [
            body("title").notEmpty().isLength({min:2}).withMessage("name is require")
         ]
    )
}
module.exports={
    validationschema
}
