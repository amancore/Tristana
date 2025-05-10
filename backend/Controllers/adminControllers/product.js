const Product= require("../../Models/product");
const multer=require("multer")



exports.getProducts = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;
  
      const products = await Product.find()
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });
  
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  
  
  

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage }).array("images", 10); 



exports.addProducts = async (req, res) => {
  upload(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: err.message });
    } else if (err) {
      return res.status(500).json({ msg: "error from the multer", message: err.message });
    }

    try {
      const stockData = JSON.parse(req.body.stock);

      // if (!req.files || req.files.length === 0) {
        if (req.files.length === 0) {
        return res.status(400).json({ message: "At least one product image is required" });
      }

      const imagePaths = req.files.map(file => file.path);

      const product = new Product({
        name: req.body.name, 
        price: parseFloat(req.body.price), 
        description: req.body.description,
        clothType:req.body.clothType,
        category:req.body.category,
        discount:req.body.discount,
        images: imagePaths,
        stock: {
          XS: parseInt(stockData?.XS|| 0),
          S: parseInt(stockData?.S || 0),
          M: parseInt(stockData?.M || 0),
          L: parseInt(stockData?.L || 0),
          XL: parseInt(stockData?.XL || 0),
          XXL: parseInt(stockData?.XXL || 0),
        },
      });

      const newProduct = await product.save();
      res.status(201).json(newProduct);
    } catch (error) {
      console.log(error);
      res.status(400).json({ msg: "Invalid data", message: error.message });
    }
  });
};




exports.updateProducts = async (req, res) => {
  upload(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: err.message });
    } else if (err) {
      return res.status(500).json({ message: err.message });
    }

    try {
      const stockData = JSON.parse(req.body.stock);

      let imagePaths;
      if (req.files && req.files.length > 0) {
        imagePaths = req.files.map(file => file.path);
      } else {
        imagePaths = req.body.existingImages;
      }
      // console.log(stockData)
      const updatedProduct = {
        name: req.body.name,
        price: parseFloat(req.body.price),
        description: req.body.description,
        clothType:req.body.clothType,
        category: req.body.category,
        discount:req.body.discount,
        images: imagePaths, 
        stock: {
          XS: parseInt(stockData.XS) || 0,
          S: parseInt(stockData.S) || 0,
          M: parseInt(stockData.M) || 0,
          L: parseInt(stockData.L) || 0,
          XL: parseInt(stockData.XL) || 0,
          XXL: parseInt(stockData.XXL) || 0,
        },
      };

      const product = await Product.findByIdAndUpdate(req.params.id, updatedProduct, { new: true });

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.json({ msg: "The product is updated", product });
    } catch (error) {
      res.status(400).json({ msg: "Message from update product", message: error.message });
    }
  });
};
     
      
    
  exports.deleteProducts = async (req, res) => {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json({ message: 'Product deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: "the product is deleted",error });
    }
  };