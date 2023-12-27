import { useState } from "react";

import { useDispatch } from "react-redux";

import { MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";

import { deleteLevel } from "../../redux/slices/levelSlice";
import EditLevel from "./EditLevel";
import { Link } from "react-router-dom";
import { IoIosEye } from "react-icons/io";
import LevelDetails from "./LevelDetails";
import Actions from "../utility/Actions";
import { useNotification } from "../utility/Notification";
export default function Level({ level }) {
  const dispatch = useDispatch();
  const { openNotification } = useNotification();
  const [levelDetailPopUp, setLevelDetailPopUp] = useState(false);
  const [editLevel, setEditLevel] = useState(false);

  const handleDeleteLevel = (id) => {
    dispatch(deleteLevel(id));
    openNotification("success", "Level", "Deleted");
  };

  return (
    <div className="flex border-t-[1px] py-5 text-[15px]  w-full">
      <div className="w-[30%] pl-5">{level.title}</div>
      <div className="w-[30%] pl-5">{level.createdAt.split("T")[0]}</div>
      <div className="w-[25%]  pl-12">{level.enrolled.length}</div>
      <div className=" w-[15%] pl-5 gap-2 flex justify-center">
        {/* <button
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
            ><IoIosEye fontSize={24} /></button> */}

        <Actions
          handleDelete={handleDeleteLevel}
          setEdit={setEditLevel}
          param={level}
          setDetailPopUp={setLevelDetailPopUp}
          show={true}
        />
      </div>
      {levelDetailPopUp && (
        <div className="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-70 flex flex-col items-center justify-center z-10">
          <LevelDetails
            data={level}
            setLevelDetailPopUp={setLevelDetailPopUp}
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
