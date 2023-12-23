import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { deleteWing } from "../../redux/slices/wingSlice";
import { IoIosEye } from "react-icons/io";

import WingDetails from "./WingDetails";
import EditWing from "./EditWing";

export default function Wing({ wing }) {
   const dispatch = useDispatch();

   const [editWing, setEditWing] = useState(false);
   const [wingDetailPopUp, setwingDetailPopUp] = useState(false);

   const handleDeleteWing = (id, event) => {
      // Prevent the event from propagating and stop its default action
      event.stopPropagation();
      event.preventDefault();
      dispatch(deleteWing(id));
   };


   return (
      <Link
         to={`/wing/${wing?._id}`}
         className="flex z-30 border-t-2 py-4 w-full hover:bg-slate-800 hover:bg-opacity-50 transition-all duration-200 ease-in pl-2"
      >
         <div className="w-[20%] text-[16px] font-semibold flex items-center gap-1">
            {wing?.name}
         </div>
         <div className="w-[40%] text-[16px] font-semibold flex items-center gap-1">
            {wing?.description}
         </div>
         <div className="w-[15%] flex relative gap-1 items-center text-[16px] font-semibold">
            {wing?.levels?.length}
         </div>
         <div className="w-[15%] flex relative gap-1 items-center text-[16px] font-semibold">
            {wing?.lead?.name}
         </div>
         <div className="flex w-[9%] gap-2 flex justify-center">
            <div onClick={(e) => e.stopPropagation()}>
               <button
                  type="button"
                  className="button z-20 hover:underline flex justify-center items-center text-yellow-300"
                  onClick={(event) => {
                     event.stopPropagation();
                     event.preventDefault();
                     setEditWing(true);
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
                     handleDeleteWing(wing?._id, e)
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
                     setwingDetailPopUp(true)
                  }}
               >
                  <IoIosEye fontSize={24} />
               </button>
            </div>
         </div>
         {wingDetailPopUp && (
            <div
               className="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-70 flex flex-col items-center justify-center z-50"
               onClick={(e)=>{
                  e.preventDefault()
                  e.stopPropagation()
               }}
            >
               <WingDetails
                  data={wing}
                  setwingDetailPopUp={setwingDetailPopUp}
                  setEditWing={setEditWing}
                  handleDeleteWing={handleDeleteWing}
               />
            </div>
         )}
         {editWing && (
            <div
               className="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-70 flex flex-col items-center justify-center z-50"
               onClick={(e)=>{
                  e.preventDefault()
                  e.stopPropagation()
               }}
            >
               <EditWing
                  setEditWing={setEditWing}
                  wing={wing}
               />
            </div>
         )}
      </Link>
   );
}

