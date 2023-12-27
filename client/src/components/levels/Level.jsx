import { useState } from "react";

import { useDispatch } from "react-redux";

import { MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";

import { deleteLevel } from "../../redux/slices/levelSlice";
import EditLevel from "./EditLevel";
import { Link } from "react-router-dom";
<<<<<<< HEAD
import LevelDetails from "./LevelDetails";
import { IoIosEye } from "react-icons/io";

export default function Level({ level }) {
   const dispatch = useDispatch();
   const [levelDetailPopUp, setLevelDetailPopUp] = useState(false);
   const [editLevel, setEditLevel] = useState(false);
=======
import { IoIosEye } from "react-icons/io";
import LevelDetails from "./LevelDetails";

export default function Level({ level }) {
  const dispatch = useDispatch();
  const [levelDetailPopUp, setLevelDetailPopUp] = useState(false);
  const [editLevel, setEditLevel] = useState(false);
>>>>>>> a7cd7c3784c2309042af861e772054192d47b651

  const handleDeleteLevel = (id) => {
    dispatch(deleteLevel(id));
  };

<<<<<<< HEAD
   return (
      <div className="flex border-t-2 py-4 w-full">
         <div className="w-[25%]">{level.title}</div>
         <div className="w-[25%]">{level.createdAt.split("T")[0]}</div>
         <div className="w-[25%] pl-8">{level.enrolled.length}</div>
         <div className=" w-[25%] gap-2 flex justify-center">
            <button
               type="button"
               className="button hover:underline flex justify-center items-center text-yellow-300"
               onClick={() => setEditLevel(true)}
            ><AiFillEdit fontSize={24} /></button>
            <button
               type="button"
               className="button hover:underline flex justify-center items-center text-red-500"
               onClick={() => handleDeleteLevel(level?._id)}
            ><MdDelete fontSize={24} /></button>

            <Link to={`/topics/${level?._id}`}>T</Link>
            <Link to={`/assignments/${level?._id}`}>A</Link>

            <button
               type="button"
               className="button hover:underline flex justify-center items-center text-red-500"
               onClick={() => setLevelDetailPopUp(true)}
            ><IoIosEye fontSize={24} /></button>

         </div>
         {levelDetailPopUp && (
=======
  return (
    <div className="flex border-t-2 py-4 w-full">
      <div className="w-[25%]">{level.title}</div>
      {/* <div className="w-[45%]">
            {feed.feedDetails.slice(0, 50)}... {" "}
            <button
               type="button"
               onClick={() => setFeedDetailPopUp(true)}
               className="text-blue-400 hover:text-blue-300 transition-all duration-200 ease-linear cursor-pointer outline-none border-none"
            >
               more
            </button>
         </div> */}
      <div className="w-[25%]">{level.createdAt.split("T")[0]}</div>
      {/* <div className="w-[8%] pl-3"><Switch checked={feed.staus} onClick={() => { dispatch(updateFeed({ id: feed?._id, updatedData: { staus: !feed.staus } })) }} /></div> */}
      <div className="w-[25%] pl-8">{level.enrolled.length}</div>
      <div className=" w-[25%] gap-2 flex justify-center">
        <button
          type="button"
          className="button hover:underline flex justify-center items-center text-yellow-300"
          onClick={() => setEditLevel(true)}
        >
          <AiFillEdit fontSize={24} />
        </button>
        <button
          type="button"
          className="button hover:underline flex justify-center items-center text-red-500"
          onClick={() => handleDeleteLevel(level?._id)}
        >
          <MdDelete fontSize={24} />
        </button>
        <button
          type="button"
          className="button hover:underline flex justify-center items-center text-red-500"
          onClick={() => setLevelDetailPopUp(!levelDetailPopUp)}
        >
          <IoIosEye fontSize={24} />
        </button>
        <Link to={`/topics/${level?._id}`}>T</Link>
        <Link to={`/assignments/${level?._id}`}>A</Link>
      </div>
      {levelDetailPopUp && (
>>>>>>> a7cd7c3784c2309042af861e772054192d47b651
            <div className="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-70 flex flex-col items-center justify-center z-10">
               <LevelDetails
                  data={level}
                  setLevelDetailPopUp={setLevelDetailPopUp}
<<<<<<< HEAD
                  setEditLevel={setEditLevel}
                  handleDeleteLevel={handleDeleteLevel}
               />
            </div>
         )}
         {editLevel && (
            <div className="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-70 flex flex-col items-center justify-center z-10">
               <EditLevel
=======
>>>>>>> a7cd7c3784c2309042af861e772054192d47b651
                  setEditLevel={setEditLevel}
                  handleDeleteLevel={handleDeleteLevel}
               />
            </div>
         )}
      {editLevel && (
        <div className="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-70 flex flex-col items-center justify-center z-10">
          <EditLevel setEditLevel={setEditLevel} level={level && level} />
        </div>
      )}
    </div>
  );
}
