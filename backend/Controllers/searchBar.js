const Product=require("../Models/product")

exports.search=async(req,res)=>{
 
    try {
        const query=req.query.q;
        
        if(!query){
            res.status(400).json({msg:"search query is required"})
        }

        const products= await Product.find({$text: {$search : query}});
        res.status(200).json(products);
       }catch(err){
        res.status(500).json({msg:"error from the server",message:err.message});
       }
}