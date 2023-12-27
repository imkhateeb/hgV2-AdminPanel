const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    //required: true,
  },
  submitted: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      submittedAt: {
        type: Date,
        default: Date.now,
      },
      projectURL: {
        type: String,
        required: true,
      },
      verified: {
        type: Boolean,
        default: false
      }
    }
  ]
},
{timestamps : true});

const Assignment = mongoose.model("Assignment", assignmentSchema);

module.exports = Assignment;
