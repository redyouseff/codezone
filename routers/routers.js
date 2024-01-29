const express =require("express")
const router= express.Router();
let controller=require("../controller/controller")
const allowedTo=require("../middleware/allowedTo")
const userRoles =require("../utils/userRoles")
const {body,validationResult}=require("express-validator")
const{validationschema} =require("../middleware/validate");
const verifyToken = require("../middleware/verifyToken");
router.route("/").get(controller.getalldata)
.post(verifyToken,validationschema(),controller.postData)

router.route("/:id")
.get(controller.getDataWithId)
 .patch(controller.patchData)
 .delete( verifyToken,allowedTo(userRoles.ADMIN,userRoles.MANGER), controller.deleteData)

module.exports={
    router
}
