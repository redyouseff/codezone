module.exports=(...role)=>{
    
    
    return (req,res,next)=>{
        
     if(!role.includes(req.currentUser.role)){
        return next(app.Error.creat("this role is not autherized",404))
     }
     else{
        next()

     }
       
      

        
    }

}