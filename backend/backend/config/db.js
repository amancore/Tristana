require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
    mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log("✅ MongoDB Connected");
        })
        .catch(err => {
            console.error("❌ MongoDB Connection Error:", err);
        });
};

module.exports = connectDB; 
