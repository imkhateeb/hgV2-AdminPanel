import { useEffect, useState } from "react";
import { BiSort } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { fetchAssignments } from '../../redux/slices/assignmentSlice';
import SkeletonAnimation from "../utility/SkeletonAnimation";

import { filterAssignments } from "../../utils/filterAssignments";

import Assignment from "./Assignment";

export default function AssignmentContent({ queries, levelId }) {
  const [assignments, setAssignments] = useState([]);

  const [showOldest, setShowOldest] = useState(false);
  const [sortByName, setSortByName] = useState(false);
  const [sortByDesc, setSortByDesc] = useState(false);

  const dispatch = useDispatch();
  const { assignmentData, loading, error } = useSelector((state) => state.assignments);

  const fetchAssignmentByLevelId = () => {
    try {
      dispatch(fetchAssignments({id: levelId}));
    } catch (error) {
      console.log("Error while gettting all Assignments", error);
    }
  };

  useEffect(() => {
    fetchAssignmentByLevelId();
  }, [dispatch]);


  useEffect(() => {
    if (assignmentData?.length) {
      if (!queries?.length) {
        setAssignments(assignmentData);
      } else {
        const filteredAssignments = filterAssignments(assignmentData, queries);
        setAssignments(filteredAssignments);
      }
    }
  }, [assignmentData, queries]);


  const sortByTimeDate = () => {};

  const sortByLexicalUser = () => {};

  const sortByLexicalDesc = () => {};

  if (error)
    return <p>Error loading Assignments: {error.message || "Unknown error"}</p>;

  return (
    <div className="flex flex-col w-full mt-4">
      <div className="flex border-t-2 py-4 w-full">
        <div className="w-[15%] text-[16px] font-semibold flex items-center gap-1">
          NAME
          <BiSort
            className="cursor-pointer hover:shadow-inner hover:shadow-pink-600"
            onClick={() => {
              setSortByName(!sortByName);
              sortByLexicalUser();
            }}
          />
        </div>
        <div className="w-[40%] text-[16px] font-semibold flex items-center gap-1">
          DESCRIPTION
          <BiSort
            className="cursor-pointer hover:shadow-inner hover:shadow-pink-600"
            onClick={() => {
              setSortByDesc(!sortByDesc);
              sortByLexicalDesc();
            }}
          />
        </div>
        <div className="w-[15%] text-[16px] font-semibold flex items-center gap-1">
          CREATED BY
          <BiSort
            className="cursor-pointer hover:shadow-inner hover:shadow-pink-600"
            onClick={() => {
              setSortByDesc(!sortByDesc);
              sortByLexicalDesc();
            }}
          />
        </div>
        <div className="w-[10%] text-[16px] font-semibold flex items-center gap-1">
          SUBMITTED BY
          <BiSort
            className="cursor-pointer hover:shadow-inner hover:shadow-pink-600"
            onClick={() => {
              setSortByDesc(!sortByDesc);
              sortByLexicalDesc();
            }}
          />
        </div>
        <div className="w-[20%] flex relative gap-1 items-center text-[16px] font-semibold justify-center">
          <h1>ACTIONS</h1>
          <BiSort
            className="cursor-pointer hover:shadow-inner hover:shadow-pink-600"
            onClick={() => {
              setShowOldest(!showOldest);
              sortByTimeDate();
            }}
          />
        </div>
      </div>
      {loading ? (
        <SkeletonAnimation />
      ) : (
        assignments.length &&
        assignments.map((assignment, index) => {
          return <Assignment key={assignment._id + index} assignment={assignment} />;
        })
      )}
    </div>
  );
}
