import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { deleteAssignment } from "../../redux/slices/assignmentSlice";
import { IoIosEye } from "react-icons/io";

import AssignmentDetails from './AssignmentDetails';
import EditAssignment from "./EditAssignment";

export default function Assignment({ assignment }) {
   const dispatch = useDispatch();

   const [editAssignment, setEditAssignment] = useState(false);
   const [assignmentDetailPopUp, setAssignmentDetailPopUp] = useState(false);

   const handleDeleteAssignment = (id, event) => {
      event.stopPropagation();
      event.preventDefault();
      dispatch(deleteAssignment(id));
   };
   return (
      <>
         <Link
            to={`/assignment/${assignment?._id}/submissions`}
            className="flex z-30 border-t-2 py-4 w-full hover:bg-slate-800 hover:bg-opacity-50 transition-all duration-200 ease-in pl-2"
         >
            <div className="w-[15%] text-[16px] font-semibold flex items-center gap-1">
               {assignment?.name}
            </div>
            <div className="w-[40%] text-[16px] font-semibold flex items-center gap-1">
               {`${assignment.description.length > 50 ? assignment?.description.slice(0, 50) + '...' : assignment.description }`}
            </div>
            <div className="w-[15%] flex relative gap-1 items-center text-[16px] font-semibold">
               {'Md Khateebur Rab'}
            </div>
            <div className="w-[10%] flex relative gap-1 items-center text-[16px] font-semibold">
               {assignment?.submitted?.length}
            </div>
            <div className="flex w-[20%] gap-2 flex justify-center">
               <div onClick={(e) => e.stopPropagation()}>
                  <button
                     type="button"
                     className="button z-20 hover:underline flex justify-center items-center text-yellow-300"
                     onClick={(event) => {
                        event.stopPropagation();
                        event.preventDefault();
                        setEditAssignment(true);
                     }}
                  >
                     <AiFillEdit fontSize={24} />
                  </button>
               </div>
               <div onClick={(e) => e.stopPropagation()}>
                  <button
                     type="button"
                     className="button z-20 hover:underline flex justify-center items-center text-red-500"
                     onClick={(e) => {
                        handleDeleteAssignment(assignment?._id, e)
                     }}
                  >
                     <MdDelete fontSize={24} />
                  </button>
               </div>
               <div onClick={(e) => e.stopPropagation()}>
                  <button
                     type="button"
                     className="button z-20 hover:underline flex justify-center items-center text-pink-500"
                     onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        setAssignmentDetailPopUp(true)
                     }}
                  >
                     <IoIosEye fontSize={24} />
                  </button>
               </div>
            </div>
         </Link>
         {assignmentDetailPopUp && (
            <div
               className="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-70 flex flex-col items-center justify-center z-50"
               onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
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
                  e.preventDefault()
                  e.stopPropagation()
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

