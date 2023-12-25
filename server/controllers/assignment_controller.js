const Assignment = require("../models/assignment_model");
const Level = require("../models/level_model");
const asyncHandler=require("express-async-handler");
const create = async (req, res) => {
    try {
        const newAssignment = await Assignment.create({
            name: req.body.name,
            description: req.body.description
        });
        const assignment = await Level.findByIdAndUpdate(req.body.levelId, { $push: { assignments: newAssignment._id } }, { new: true });
        res.status(201).json({
            message: "Assignment added successfully",
            newAssignment
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something went wrong, unable to add assignment",
            status: false,
            error: error,
        });
    }
};

const submitAssignment = async (req, res) => {
    try {
        const assignment = await Assignment.findById(req.params.id);
        assignment.submitted.push({
            user: req.user._id,
            projectURL: req.body.projectURL,
        });
        await assignment.save();

        res.status(200).json(assignment);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something went wrong, unable to submit assignment",
            status: false,
            error: error,
        });
    }
};
const verifyAssignment = async (req, res) => {
    try {
        const assignment = await Assignment.findById(req.params.id);
        assignment.submitted.forEach((submission) => {
            if (submission.projectURL == req.body.projectURL) {
                submission.verified = true;
            }
        });
        await assignment.save();
        res.status(200).json({
            message: "Assignment URL verified successfully",
            assignment
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something went wrong, unable to verify assignment",
            status: false,
            error: error,
        });
    }
};


const update = async (req, res) => { 
    try {
        const updatedWing = await Assignment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedWing);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something went wrong, unable to update the assignment',
            error: error
        });
    }
}
const destroy = async (req, res) => {
    try {
        const deletedAssignment = await Assignment.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: 'Assignment deleted successfully',
            deletedAssignment
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: 'Something went wrong, unable to delete the assignment',
            error: error
        });
    }
}

// get assignment by level id 
const getAssignmentbyLevelId = asyncHandler(async(req,res)=>{
    const {id}=req.params;
    if ( !id || id === undefined ){
        return res.status(401).json({
            success: false,
            error: 'No level ID found'
        })
    }

    try {
        const assignments = await Level.findById(id).populate("assignments");
        return res.status(200).json({
            success: true,
            assignments : assignments.assignments
        })
    } catch (error) {
        return res.status(404).json({
            success: false,
            error,
        })
    }

})

module.exports = {
    create,
    submitAssignment,
    verifyAssignment,
    update,
    destroy,
    getAssignmentbyLevelId,
};