const banner=require("../../Models/banners")
const multer=require("multer")


const storage = multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,"uploads/")
  },
  filename:function(req,file,cb){
    cb(null, Date.now() + "-" + file.originalname)
  }
});
const upload = multer({ storage: storage }).fields([
 {name:"images",maxCount:10},
 {name:"videos",maxCount:10},
])


exports.getAllBanners = async (req, res) => {
  try {
    const allBanners = await banner.find();
    res.json(allBanners);
  } catch (error) {
    res.status(500).json({ msg: "Server error in getAllBanners", error });
  }
};


exports.addBanners = async(req,res)=>{

  upload(req, res, async function (err){
    if (err instanceof multer.MulterError) {
    return res.status(400).json({ msg:"error from multer",message: err.message });
    } else if (err) {
    return res.status(500).json({ msg: "error from the multer", message: err.message });
    }
    try {
  
    if(!req.files||Object.keys(req.files).length==0){
      res.status(400).json({msg:"atleast one image is requires"})
    }
    
    const imagepaths=req.files["images"] ? req.files["images"].map(file => file.path):[];
    const videopaths=req.files["videos"] ? req.files["videos"].map(file => file.path):[];
    console.log(imagepaths)

    const addimage = new banner({
      name: req.body.name,
      images: imagepaths,
      videos: videopaths
    });
   await addimage.save();
   res.status(200).json({msg:"the image is added"})
    }catch(error) {
      res.status(500).json({ msg: "Server error in addBanners", message:error.message });
    }
  });
  }





exports.deleteBanners = async (req, res) => {
  try {
    const bannerId = req.params.id;
    if (!bannerId) {
      return res.status(400).json({ msg: "bannerId is required" });
    }

    const bannerToDelete = await banner.findByIdAndDelete(bannerId);
    if (!bannerToDelete) {
      return res.status(404).json({ msg: "Banner not found" });
    }

    res.status(200).json({ msg: "Banner deleted successfully", banner: bannerToDelete });
  } catch (error) {
    res.status(500).json({ msg: "Server error in deleteBanners", message:error.message });
  }
};


