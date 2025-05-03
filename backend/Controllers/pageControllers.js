const Product= require("../Models/product")


exports.shopAll=async(req,res)=>{
    try{
        const allItems=await Product.find();
        res.status(201).json(allItems)
    
    } catch (error){
        res.status(404).json({msg:"Error fetching the items"});
    }
}

exports.limitedEdition=async(req,res)=>{

    try {
       const  {category}=req.query;
       let filter={};
       if(category){
        filter.category=category;
       }
       const items=await Product.find(filter);
       res.status(200).json(items);
    } catch (error){
        res.status(404).json({msg:"error.fetching the products",error});
    }
}

exports.basics = async (req, res) => {
    try {
        console.log("Query Params:", req.query); 
        
        const category = req.query.category;
        let filter = {};

        if (category) {
            filter.category = category; 
        }

        const items = await Product.find(filter);
       

        res.status(200).json(items); 
    } catch (error) {
        console.error("Error fetching products:", error); 
        res.status(500).json({ msg: "Error fetching products", error: error.message });
    }
};



exports.limitedStocks = async(req,res)=>{
    
    try {
        const  {category}=req.query;
        let filter={};
        if(category){
         filter.category=category;
        }

        const items=await Product.find(filter);
        res.status(200).json(items);
     } catch (error){
         res.status(404).json({msg:"error.fetching the products",error});
     }
}


exports.productById = async(req,res)=>{
    res.status(200);
    try{
    let Id=req.params.id;
    console.log(Id)
    const items=await Product.findById(Id);
    res.status(200).json(items);
    }
    catch (error){
        res.status(500).json(error);
    }
}
