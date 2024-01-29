module.exports=(asycfn)=>{
    return(req,res,next)=>{
        asycfn(req,res,next).catch((error)=>{
            next(error)
        })
    }
}