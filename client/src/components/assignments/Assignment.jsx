import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { deleteAssignment } from "../../redux/slices/assignmentSlice";
import { IoIosEye } from "react-icons/io";

import AssignmentDetails from "./AssignmentDetails";
import EditAssignment from "./EditAssignment";
import Actions from "../utility/Actions";
import { useNotification } from "../utility/Notification";
export default function Assignment({ assignment }) {
  const dispatch = useDispatch();
  const { openNotification } = useNotification();
  const [editAssignment, setEditAssignment] = useState(false);
  const [assignmentDetailPopUp, setAssignmentDetailPopUp] = useState(false);

  const handleDeleteAssignment = (id) => {
    // event.stopPropagation();
    // event.preventDefault();
    dispatch(deleteAssignment(id));
    openNotification("success", "Assignment", "Deleted");
  };
  return (
    <>
      <Link
        to={`/assignment/${assignment?._id}/submissions`}
        className="flex border-t-[1px] py-5 w-full hover:bg-slate-800 hover:bg-opacity-50 transition-all duration-200 ease-in"
      >
        <div className="max-res:w-[25%] w-[15%] text-[15px] pl-5  flex items-center gap-1">
          {assignment?.name}
        </div>
        <div className="w-[40%] max-res:hidden text-[15px] pl-5  flex items-center gap-1">
          {`${
            assignment.description.length > 50
              ? assignment?.description.slice(0, 50) + "..."
              : assignment.description
          }`}
        </div>
        <div className="max-res:w-[25%] w-[15%] flex relative gap-1 items-center text-[15px] pl-5 ">
          {"Md Khateebur Rab"}
        </div>
        <div className="max-res:w-[25%] w-[15%] flex relative gap-1 items-center text-[15px] pl-14 ">
          {assignment?.submitted?.length}
        </div>
        <div className="flex max-res:w-[25%] w-[15%] gap-2 justify-center">
          <div onClick={(e) => e.stopPropagation()}>
            {/* <button
                     type="button"
                     className="button z-20 hover:underline flex justify-center items-center text-yellow-300"
                     onClick={(event) => {
                        event.stopPropagation();
                        event.preventDefault();
                        setEditAssignment(true);
                     }}
                  >
                     <AiFillEdit fontSize={24} />
                  </button> */}
          </div>
          <div onClick={(e) => e.stopPropagation()}>
            {/* <button
                     type="button"
                     className="button z-20 hover:underline flex justify-center items-center text-red-500"
                     onClick={(e) => {
                        handleDeleteAssignment(assignment?._id, e)
                     }}
                  >
                     <MdDelete fontSize={24} />
                  </button> */}
          </div>
          <div onClick={(e) => e.stopPropagation()}>
            {/* <button
                     type="button"
                     className="button z-20 hover:underline flex justify-center items-center text-pink-500"
                     onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        setAssignmentDetailPopUp(true)
                     }}
                  >
                     <IoIosEye fontSize={24} />
                  </button> */}

            <Actions
              handleDelete={handleDeleteAssignment}
              setEdit={setEditAssignment}
              param={assignment}
              setDetailPopUp={setAssignmentDetailPopUp}
            />
          </div>
        </div>
      </Link>
      {assignmentDetailPopUp && (
        <div
          className="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-70 flex flex-col items-center justify-center z-50"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <AssignmentDetails
            data={assignment}
            setAssignmentDetailPopUp={setAssignmentDetailPopUp}
            setEditAssignment={setEditAssignment}
            handleDeleteAssignment={handleDeleteAssignment}
          />
        </div>
      )}
      {editAssignment && (
        <div
          className="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-70 flex flex-col items-center justify-center z-50"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <EditAssignment
            setEditAssignment={setEditAssignment}
            assignment={assignment}
          />
        </div>
      )}
    </>
  );
}
