const Habit = require('../models/Habit');
const User = require("../models/User");

exports.createHabit = async (req, res) => {
  try {
    const { name, description, completed } = req.body;
     const userId=req.userId;
    if (!userId) {
      return res.status(404).json({ error: "❌ No users found in the database!" });
    }

    const habit = new Habit({
      userId, 
      name,
      description,
      // completed
    });

    await habit.save();
    res.status(201).json({ message: "✅ Habit created successfully!", habit });

  } catch (err) {
    console.error("❌ Error:", err.message);
    res.status(500).json({ error: err.message });
  }
};


exports.getHabits = async (req, res) => {
  try {
    const habits = await Habit.find({ userId: req.userId });
    res.json(habits);
  } catch (err) {
    res.status(400).json({ error:"user Id not find" ,err });
  }
};


exports.deleteHabit=async(req,res)=>{
 
  try {
    const habitid=req.params.id;
    // console.log(habitid)
    const habit = await Habit.findById(habitid);
    if (!habit) {
      return res.status(404).json({ error: "Habit not found" });
    }
    await Habit.findByIdAndDelete(habitid);
    res.status(200).json({ message: "✅ Habit deleted successfully!" });
  }catch(error){
    res.json({msg:"error deleteing the Habit",error})
  }

}