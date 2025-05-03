const Cart = require("../models/cart");

exports.addProduct = async (req, res) => {
  try {
    const userId = req.userId; 
    const { productId } = req.body; 

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    if (!Array.isArray(cart.items)) {
      cart.items = [];
    }

    const productExists = cart.items.some(item => item.productId.toString() === productId);
    if (!productExists) {
      cart.items.push({ productId });
    }
    await cart.save();
    res.status(200).json({ msg: "Product added to cart successfully" });

  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

exports.cartProducts = async (req, res) => {
  try {
    const userId = req.userId;

    let cart = await Cart.findOne({ userId }).populate('items.productId');
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
}


exports.deleteProduct=async(req,res)=>{

  const userId=req.userId;
  const {productId}=req.body;

  let cart = await Cart.findOne({ userId });
  try {
    if (!cart) {
     return res.status(404).json({ msg: "Cart not found" });
    }

    const productIndex = cart.items.findIndex(item => item.productId.toString() === productId);
    if (productIndex === -1) {
     return res.status(404).json({ msg: "Product not found in cart" });
    }

    cart.items.splice(productIndex, 1);
    await cart.save();

    res.status(200).json({ msg: "Product removed from cart successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
}



