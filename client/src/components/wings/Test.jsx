import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateWing,
  deleteWing,
  createWing,
} from "../../redux/slices/wingSlice";

import {
  fetchLevels,
  updateLevel,
  deleteLevel,
  createLevel,
} from "../../redux/slices/levelSlice";

import {
  fetchTopics,
  createTopic,
  updateTopic,
  deleteTopic,
} from "../../redux/slices/topicSlice";

import {
    fetchSubTopics,
    createSubTopic,
    updateSubTopic,
    deleteSubTopic
} from '../../redux/slices/subTopicSlice'

import {
    createAssignment,
    verifyAssignment,
    updateAssignment,
    deleteAssignment
} from '../../redux/slices/assignmentSlice'
const Test = () => {
  const dispatch = useDispatch();

  //***********************@Wings***************

  //! Create Wing ->
  const newWing = {
    name: "CP",
    description: "This is Cp wing",
    levels: [""], //*Mongoose IDs
    lead: [""], //*Mongoose IDs
    coordinators: [""], //*Mongoose IDs
  };

  //! Update Wing ->
  const updatedWingData = {
    description: "This is Modified Cp wing",
  };

  const modifyWing = {
    id: "6584dfb9a4b86415e2e15aae",
    updatedData: updatedWingData,
  };

  //! Delete Wing ->
  let id = "6584dfb9a4b86415e2e15aae";

  //**********************@Levels***************

  //!Fetch Level By Wing Id ->
  const levelObj = {
    id: "658305dcea6f28c1d7040ced",
  };

  //! Create Level ->
  const newLevel = {
    wingId: "658305dcea6f28c1d7040ced",
    title: "Intermediate",
  };

  //! Update Level ->
  const updatedLevelData = {
    title: "Advanced",
  };

  const modifyLevel = {
    id: "6584ec196610fac39b6f5e10",
    updatedData: updatedLevelData,
  };

  //! Delete Level ->
  id = "65844f5f3ac17ac34720f2a9";

  //**********************@Topics***************

  // !Fetch Topic By Level Id ->
  const topicObj = {
    id: "6584ec446610fac39b6f5e20",
  };

  //! Create Topic ->
  const newTopic = {
    levelId: "6584ec446610fac39b6f5e20",
    title: "React",
  };

  //! Update Topic ->
  const updatedTopicData = {
    title: "Next",
  };

  const modifyTopic = {
    id: "6584fb59618af5bef7361b0d",
    updatedData: updatedTopicData,
  };

  //! Delete Topic ->
  id = "6584fb59618af5bef7361b0d";

  //**********************@SubTopics***************

  // !Fetch SubTopic By Topic Id ->
  const subTopicObj = {
    id: "65844fb03ac17ac34720f2ad",
  };

  //! Create SubTopic ->
  const newSubTopic = {
    topicId: "65844fb03ac17ac34720f2ad",
    title: "Hooks",
  };

  //! Update SubTopic ->
  const updatedSubTopicData = {
    subtopicId : '6585031caa3bc4b9d022145a',
    title: "Redux",
  };

  const modifySubTopic = {
    updatedData: updatedSubTopicData,
  };

  //! Delete SubTopic ->
  id = "6585031caa3bc4b9d022145a";


  //**********************@Assignments***************

  // !Verify Assignment By Topic Id ->
  const data = {
    projectURL : 'www.testurl.com'
  }

  const assignmentObj = {
    id: "65844fb03ac17ac34720f2ad",
    data
  };

  //! Create Assignment ->
  const newAssignment = {
    levelId: "65844fb03ac17ac34720f2ad",
    name: "Test Assignment",
    description: "This is a test assignment",
  };

  //! Update Assignment ->
  const updatedAssignmentData = {
    name: "Updated Assignment",
  };

  const modifyAssignment = {
    id : '65844fb03ac17ac34720f2ad',
    updatedData: updatedAssignmentData,
  };

  //! Delete Assignment ->
  id = "6585031caa3bc4b9d022145a";

  return (
    <div>
      <button
        className="bg-orange-500 mx-2 h-10 w-40 rounded-lg"
        onClick={() => dispatch(fetchSubTopics(subTopicObj))}
      >
        Fetch
      </button>
      <button
        className="bg-green-500 mx-2 h-10 w-40 rounded-lg"
        onClick={() => dispatch(createAssignment(newAssignment))}
      >
        Create
      </button>
      <button
        className="bg-blue-500 mx-2 h-10 w-40 rounded-lg"
        onClick={() => dispatch(updateAssignment(modifyAssignment))}
      >
        Edit
      </button>
      <button
        className="bg-red-500 mx-2 h-10 w-40 rounded-lg"
        onClick={() => dispatch(deleteAssignment(id))}
      >
        Delete
      </button>
    </div>
  );
};

export default Test;
