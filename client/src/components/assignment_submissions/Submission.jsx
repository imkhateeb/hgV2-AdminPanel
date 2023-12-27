import { useState } from "react";
import { useDispatch } from "react-redux";
import { IoIosEye } from "react-icons/io";

import { BsPatchQuestionFill } from "react-icons/bs";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { IoMdRadioButtonOn } from "react-icons/io";

import SubmissionDetails from "./SubmissionDetails";
import { Link } from "react-router-dom";
import { verifyAssignment } from "../../redux/slices/assignmentSlice";
import Actions from "../utility/Actions";

export default function Submission({ submission, assignmentId }) {
  const dispatch = useDispatch();
  const [verifying, setVerifying] = useState(false);
  const [alreadyVerified, setAlreadyVerified] = useState(false);
  const [submissionDetailPopUp, setSubmissionDetailPopUp] = useState(false);

  const handleVerifyAssignment = () => {
    setVerifying(true);

    if (!submission?.submitted?.verified) {
      const newAssignmentObj = {
        id: assignmentId,
        data: {
          projectURL: submission?.projectURL,
        },
      };

      dispatch(verifyAssignment(newAssignmentObj));
    }
  };
  return (
    <>
      <div className="flex z-30 border-t-[1px] py-5 w-full hover:bg-slate-800 hover:bg-opacity-50 transition-all duration-200 ease-in">
        <div className="w-[20%] text-[15px] pl-5  flex items-center gap-1">
          {submission?.user?.name}
        </div>
        <div className="w-[30%] text-[15px] pl-5  flex items-center gap-1">
          <Link target="_blank" to={`https://${submission?.projectURL}`}>
            {submission?.projectURL}
          </Link>
        </div>
        <div className="w-[20%] flex relative gap-1 items-center text-[15px] pl-5 ">
          {submission?.submittedAt.split("T")[0] +
            " : " +
            submission?.submittedAt.split("T")[1].split(".")[0]}
        </div>
        <div className="w-[15%] flex relative gap-1 items-center text-[15px] pl-10 ">
          {submission?.submitted?.verified ? (
            <RiVerifiedBadgeFill
              fontSize={24}
              className="text-green-500 text-xl font-bold"
            />
          ) : (
            <BsPatchQuestionFill
              fontSize={24}
              className="text-red-500 text-xl font-bold"
            />
          )}
        </div>
        <div className="w-[15%] gap-2 flex pl-7">
          {!submission?.submitted?.verified && (
            <div onClick={(e) => e.stopPropagation()}>
              {/* <button
                type="button"
                className="button z-20 hover:underline flex justify-center items-center text-pink-500"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  handleVerifyAssignment(true)
                }}
              >
                <IoMdRadioButtonOn className={verifying ? 'text-green-400' : 'text-yellow-300'} fontSize={24} />
              </button> */}
            </div>
          )}
          <div onClick={(e) => e.stopPropagation()}>
            {/* <button
              type="button"
              className="button z-20 hover:underline flex justify-center items-center text-pink-500"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setSubmissionDetailPopUp(true)
              }}
            >
              <IoIosEye fontSize={24} />
            </button> */}

            <Actions
              handleVerifyAssignment={handleVerifyAssignment}
              setDetailPopUp={setSubmissionDetailPopUp}
            />
          </div>
        </div>
      </div>
      {submissionDetailPopUp && (
        <div
          className="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-70 flex flex-col items-center justify-center z-50"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <SubmissionDetails
            data={submission}
            setSubmissionDetailPopUp={setSubmissionDetailPopUp}
          />
        </div>
      )}
    </>
  );
}
