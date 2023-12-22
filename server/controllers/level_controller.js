const asyncHandler = require("express-async-handler");
const Level = require("../models/level_model");
const Wing = require("../models/wing_model");
const createLevel = asyncHandler(async (req, res) => {
  const { title, wingId } = req.body;
  if (!title || !wingId) {
    res.status(400).json({ message: "Please fill all the fields" });
  }
  const newLevel = new Level({
    title: title,
  });
  const result = await newLevel.save();
  const wing = await Wing.findByIdAndUpdate(wingId, { $push: { levels: newLevel._id } }, { new: true })
  if (result) {
    res.status(201).json({ newLevel, wing });
  } else {
    res.status(400).json({ message: "Invalid Level data" });
  }
});


//level by wing id
const getLevelsByWingId = asyncHandler(async (req, res) => {
  const { wingId } = req.params;
  if (wingId == ":wingId") {
    return res.status(400).json({ message: "Cannot get levels without the id" });
  }
  const findWing = await Wing.findById({ _id: wingId });
  if (!findWing) {
    return res.status(404).json({ message: "Cannot find the wing" });
  }
  const findLevels = await Level.find({  _id: { $in : findWing.levels } });
  if (!findLevels) {
    return res.status(501).json({ message: "Internal server error" });
  }
  res.status(200).json({ findLevels });
})

const getParticularLevel=asyncHandler(async(req,res)=>{
  const{levelId}=req.params;
  if(levelId==":levelId"){
    return res.status(402).json({message:"Cannnot get the level without the level id"});
  }
  const findLevel=await Level.findById({_id:levelId}).populate("enrolled").populate("topics").populate("assignments");
  if(!findLevel){
    return res.status(404).json({message:"Cannot find the level"});
  }
  return res.status(200).json(findLevel);
})

const update = async (req, res) => { 
  try {
      const updateLevel = await Level.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.status(200).json(updateLevel);
  } catch (error) {
      console.log(error);
      res.status(500).json({
          message: 'Something went wrong, unable to update the level',
          error: error
      });
  }
}
const destroy = async (req, res) => {
  try {
      const deletedLevel = await Level.findByIdAndDelete(req.params.id);
      res.status(200).json({
          message: 'Level deleted successfully',
          deletedLevel
      });
  } catch (error) {
      console.log(error);
      res.status(400).json({
          message: 'Something went wrong, unable to delete the level',
          error: error
      });
  }
}
module.exports = { createLevel ,getLevelsByWingId,getParticularLevel,update,destroy}
