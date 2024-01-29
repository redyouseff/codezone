var jwt = require('jsonwebtoken');
module.exports= async(paloud)=>{
    const token= await jwt.sign(paloud, process.env.JWT_SECRET_KEY,{expiresIn:"2m"});
   
    return token
}