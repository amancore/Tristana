exports.protectAdmin=(req,res,next)=>{
    try{
        if(req.role!="admin"){
            return res.status(403).json({msg:"only admin are allowed"});
        }
        next();
    }catch(err){
        res.status(500).json({msg:"server error",message:err.message});
    }
}