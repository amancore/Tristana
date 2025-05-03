const Product= require("../../Models/product");
const User=require("../../Models/User")

exports.stats = async (req, res) => {
    try {
      const totalProducts = await Product.countDocuments();
      const lowStock = await Product.countDocuments({ stock: { $lt: 10 } });
      
      const orders = await Order.find({ status: { $ne: 'cancelled' } });
      const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
  
      res.json({
        totalProducts,
        totalRevenue,
        lowStock
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  
  exports.allUsers = async(req, res) => {
      try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
    
        const users = await User.find()
          .skip(skip)
          .limit(limit)
          .sort({ createdAt: -1 });
    
        res.json(users);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    };