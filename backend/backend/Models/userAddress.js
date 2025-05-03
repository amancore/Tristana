const mongoose=require("mongoose");

const userAddressSchema = new mongoose.Schema({
  UserId : {
    type:mongoose.Schema.Types.ObjectId,
     ref:"User",
      required:true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true, 
    },
    streetAddress: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    pinCode: {
      type: Number,
      required: true,
      validate: {
        validator: function (v) {
          return /^\d{6}$/.test(v);
        },
        message: "Invalid PIN Code. Must be 6 digits.",
      },
    },
    phone: {
      type: Number,
      required: true,
      validate: {
        validator: function (v) {
          return /^\d{10}$/.test(v); 
        },
        message: "Invalid Phone Number. Must be 10 digits.",
      },
    },
  },{timestamps:true});

module.exports=mongoose.model("UserAddress",userAddressSchema);