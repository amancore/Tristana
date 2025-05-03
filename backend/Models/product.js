const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        description:{type:String,requred:true},
        clothType:{type:String, required:true},
        category: { type:String, required: true},
        discount:{type:Number,default:0},
        images: [{
            type: String,
            required: true
          }],
        stock: {
            XS: { type: Number, default: 0 },
            S: { type: Number, default: 0 },
            M: { type: Number, default: 0 },
            L: { type: Number, default: 0 },
            XL: { type: Number, default: 0 },
            XXL: { type: Number, default: 0 }
          },
    },
    { timestamps: true }
);

productSchema.index({name:"text",clothType:"text"});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
