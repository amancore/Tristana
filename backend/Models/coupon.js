const mongoose=require("mongoose")

const CouponSchema = new mongoose.Schema({
  name: { type: String, required: true },  
  discount:{type:Number,required:true},
  couponCount: { type: Number, required: true },
  condition: { type: Number, default: 0 },  
  isActive: { type: Boolean, default: true },  
  expiryDate: { type: Date, required: true }, 
  usedBy: { type: Map, of: Boolean, default: {} },  
},{timestamps:true});

module.exports=mongoose.model("coupon",CouponSchema)