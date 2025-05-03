const Coupon=require("../../Models/coupon");

exports.getAllCoupons = async (req, res) => {
    try {

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
    
        const coupons = await Coupon.find()
          .skip(skip)
          .limit(limit)
          .sort({ createdAt: -1 });
          
        if(!coupons){
            res.status(400).json({msg:"There is no coupon, add one "})
        }
        res.status(200).json({ msg: "Coupons retrieved successfully", coupons });
    } catch (error) {
        res.status(500).json({ msg: "Error from the server", error });
    }
};



exports.addCoupon = async (req, res) => {

    try {
        const { name, discount, couponCount, condition, isActive, expiryDate } = req.body;
    
        if (!name || !discount || !couponCount || !condition || isActive === undefined || !expiryDate) {
            return res.status(400).json({ msg: "All fields are required" });
        }

        const checkCoupon = await Coupon.findOne({ name });
        if (checkCoupon) {
            return res.status(409).json({ msg: "Coupon already exists" });
        }

        const coupon = new Coupon({
            name,
            discount,
            couponCount,
            condition,
            isActive,
            expiryDate,
            userBy: {}
        });

        await coupon.save();
        res.status(201).json({ msg: "Coupon added successfully", coupon });
    } catch (error) {
        res.status(500).json({ msg: "Error from the server, addcoupon", error });
    }
};


exports.deleteCoupon = async (req, res) => {
    try {
        const couponId = req.params.id;

        if (!couponId) {
            return res.status(400).json({ msg: "Coupon ID is required" });
        }

        const deletedCoupon = await Coupon.findByIdAndDelete(couponId);

        if (!deletedCoupon) {
            return res.status(404).json({ msg: "Coupon not found" });
        }

        res.status(200).json({ msg: "Coupon deleted successfully", deletedCoupon });
    } catch (error) {
        res.status(500).json({ msg: "Error from the server", error });
    }
};



exports.updateCoupon = async (req, res) => {
    try {
        const couponId = req.params.id;
        const { name, discount, couponCount, condition, isActive, expiryDate } = req.body;

        if (!couponId) {
            return res.status(400).json({ msg: "Coupon ID is required" });
        }

        const updatedCoupon = await Coupon.findByIdAndUpdate(
            couponId,
            { name, discount, couponCount, condition, isActive, expiryDate },
            { new: true, runValidators: true }
        );

        if (!updatedCoupon) {
            return res.status(404).json({ msg: "Coupon not found" });
        }

        res.status(200).json({ msg: "Coupon updated successfully", updatedCoupon });
    } catch (error) {
        res.status(500).json({ msg: "Error from the server", error });
    }
};

exports.couponByValue = async (req, res) => {
    try {
        const { cartValue } = req.body;

        if (!cartValue) {
            return res.status(400).json({ msg: "Cart value is required" });
        }

        const eligibleCoupon = await Coupon.findOne({ condition: { $gte: cartValue } });
        if (!eligibleCoupon) {
            return res.status(404).json({ msg: "No eligible coupon found" });
        }

        res.status(200).json(eligibleCoupon);
    } catch (error) {
        res.status(500).json({ msg: "Error from the server", error });
    }
}
