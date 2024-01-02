import { useEffect, useState } from "react";
import { BiSort } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { fetchSingleAssignment } from "../../redux/slices/assignmentSlice";
import SkeletonAnimation from "../utility/SkeletonAnimation";

import Submission from "./Submission";

export default function SubmissionContent({ queries, assignmentId, setAssignmentData }) {

  const [showOldest, setShowOldest] = useState(false);
  const [sortByName, setSortByName] = useState(false);
  const [sortByDesc, setSortByDesc] = useState(false);

  const dispatch = useDispatch();
  const { assignmentData, loading, error } = useSelector(state => state.assignments);


  const fetchAssignmentSubmissions = () => {
    try {
      dispatch(fetchSingleAssignment({ id: assignmentId }))
    } catch (error) {
      console.log("Error while getting the data", error);
    }
  }
  useEffect(() => {
    fetchAssignmentSubmissions();
  }, []);

  useEffect(() => {
    setAssignmentData(assignmentData[0])
  }, [assignmentData])


  const sortByTimeDate = () => { };

  const sortByLexicalUser = () => { };

  const sortByLexicalDesc = () => { };

  if (error)
    return <p>Error loading Assignments: {error.message || "Unknown error"}</p>;

  return (
    <div className="flex flex-col w-full mt-4">
      <div className="flex border-t-[1px] py-5 w-full">
        <div className="w-[20%] text-[14px] pl-5 font-semibold flex items-center gap-1">
          NAME
          <BiSort
            className="cursor-pointer hover:shadow-inner hover:shadow-pink-600"
            onClick={() => {
              setSortByName(!sortByName);
              sortByLexicalUser();
            }}
          />
        </div>
        <div className="w-[30%] text-[14px] pl-5 font-semibold flex items-center gap-1">
          PROJECT URL
          <BiSort
            className="cursor-pointer hover:shadow-inner hover:shadow-pink-600"
            onClick={() => {
              setSortByName(!sortByName);
              sortByLexicalUser();
            }}
          />
        </div>
        <div className="w-[20%] text-[14px] pl-5 font-semibold flex items-center gap-1">
          SUBMITTED AT
          <BiSort
            className="cursor-pointer hover:shadow-inner hover:shadow-pink-600"
            onClick={() => {
              setSortByDesc(!sortByDesc);
              sortByLexicalDesc();
            }}
          />
        </div>
        <div className="w-[15%] text-[14px] pl-5 font-semibold flex items-center gap-1">
          VERIFIED
          <BiSort
            className="cursor-pointer hover:shadow-inner hover:shadow-pink-600"
            onClick={() => {
              setSortByDesc(!sortByDesc);
              sortByLexicalDesc();
            }}
          />
        </div>
        <div className="w-[15%] text-[14px] pl-5 font-semibold flex items-center gap-1">
          ACTIONS
          <BiSort
            className="cursor-pointer hover:shadow-inner hover:shadow-pink-600"
            onClick={() => {
              setSortByDesc(!sortByDesc);
              sortByLexicalDesc();
            }}
          />
        </div>
      </div>
      {loading && !assignmentData ? (
        <SkeletonAnimation />
      ) : (
        assignmentData[0]?.submitted?.length &&
        assignmentData[0]?.submitted?.map((submission, index) => {
          return <Submission 
          key={submission.user + index} 
          submission={submission} 
          assignmentId={assignmentId}

          />;
        })
      )}
    </div>
  );
}
