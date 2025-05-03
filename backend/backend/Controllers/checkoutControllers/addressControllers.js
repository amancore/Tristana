const userAddress=require("../../Models/userAddress");


exports.getAllAddress = async(req,res)=>{
  try{
    const allUserAddress = await userAddress.find({ UserId: req.userId });
     res.status(200).json({allUserAddress});
  }catch(error){
    res.status(500).json({msg:"server from the server ,getAllAddress",message:error.message})
  } 
}

exports.addUserAddress = async (req, res) => {
  try {
    const UserId = req.userId;
    console.log(req.userId);
    const { fullName, streetAddress, city, state, pinCode, phone } = req.body;
    

    if (!fullName || !streetAddress || !city || !state || !pinCode || !phone) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    const address = new userAddress({ UserId, fullName, streetAddress, city, state, pinCode, phone });
    await address.save();

    res.status(201).json({ message: "Address saved successfully", address });
  } catch (error) {
    res.status(400).json({msg : "error from the server addNewAddress", error: error.message });
  }
};
  

exports.updateAddress = async (req, res) => {
  try {
    const addressId = req.params.id;
    const { fullName, streetAddress, city, state, pinCode, phone } = req.body;

    if (!addressId) {
      return res.status(400).json({ msg: "No address is found" });
    }

    const updatedAddress = await userAddress.findByIdAndUpdate(
      addressId,
      { fullName, streetAddress, city, state, pinCode, phone },
      { new: true }
    );

    if (!updatedAddress) {
      return res.status(404).json({ msg: "Address not found" });
    }

    res.status(200).json({ msg: "The address is updated", updatedAddress });
  } catch (error) {
    res.status(500).json({ msg: "Error from the server", message: error.message });
  }
};