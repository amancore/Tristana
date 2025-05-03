const Order= require("../../Models/order")


//   orders
// Get orders with pagination
exports.allOrders = async(req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;
  
      const orders = await Order.find()
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });
  
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Update order status
  exports.updateOrderStatus = async (req, res) => {
    try {
      const order = await Order.findByIdAndUpdate(
        req.params.id,
        { status: req.body.status },
        { new: true }
      );
      res.json(order);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
