const asyncHandler = require("express-async-handler");
const Level = require("../models/level_model");
const Topic = require("../models/topic_model");

const createTopic = asyncHandler(async (req, res) => {
    const { title, levelId } = req.body;
    if (!title || !levelId) {
        res.status(400).json({ message: "Please fill all the fields" });
    }
    const newTopic = new Topic({
        title: title
    })
    const result = await newTopic.save();
    const linkLevel = await Level.findByIdAndUpdate(levelId, { $push: { topics: newTopic._id } }, { new: true })
    if (result) {
        res.status(201).json({ newTopic, linkLevel });
    }
    else {
        res.status(400).json({ message: "Invalid Topic data" });
    }
});


const getTopics = asyncHandler(async (req, res) => {
    const topics = await Level.findById(req.params._id).populate("topics");
    res.status(200).json({ msg: "all topics are", topics });
})

//get topic by level id
const getTopicsByLevel = asyncHandler(async (req, res) => {
    const { levelId } = req.params;
    if (levelId == ":levelId") {
        return res.status(200).json({ message: "Cannot get topics without the level id" });
    }
    const findLevel = await Level.findById({ _id: levelId });
    if (!findLevel) {
        return res.status(404).json({ message: "Cannot get the level" });
    }
    const findTopics = await Topic.find({ _id: { $in: findLevel.topics } }).populate("subtopics");
    if (!findTopics) {
        return res.status(501).json({ message: "INTERNAL SERVER ERROR" });
    }
    return res.status(200).json({ findTopics });
})


const update = async (req, res) => { 
    try {
        const updateTopic = await Topic.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updateTopic);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something went wrong, unable to update the topic',
            error: error
        });
    }
  }
  const destroy = async (req, res) => {
    try {
        const deletedTopic = await Topic.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: 'Topic deleted successfully',
            deletedTopic
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: 'Something went wrong, unable to delete the topic',
            error: error
        });
    }
  }


module.exports = { createTopic, getTopics, getTopicsByLevel,update,destroy }
