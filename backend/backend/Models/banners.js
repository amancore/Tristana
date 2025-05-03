const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    images: [String], 
    videos: [String] 
  },
  { timestamps: true }
);

module.exports = mongoose.model("Banners", bannerSchema);
