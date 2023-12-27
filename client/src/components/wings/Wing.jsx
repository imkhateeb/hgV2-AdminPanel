import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { deleteWing } from "../../redux/slices/wingSlice";
import { IoIosEye } from "react-icons/io";
import { useNotification } from "../utility/Notification";
import WingDetails from "./WingDetails";
import EditWing from "./EditWing";
import Actions from "../utility/Actions";

export default function Wing({ wing }) {
  const dispatch = useDispatch();
  const { openNotification } = useNotification();
  const [editWing, setEditWing] = useState(false);
  const [wingDetailPopUp, setwingDetailPopUp] = useState(false);

  const handleDeleteWing = (id) => {
    // Prevent the event from propagating and stop its default action
    dispatch(deleteWing(id));
    openNotification("success", "Wing", "Deleted");
  };

  return (
    <>
      <Link
        to={`/levels/${wing?._id}`}
        className="flex z-30 border-t-[1px] py-5 w-full hover:bg-slate-800 hover:bg-opacity-50 transition-all duration-200 ease-in pl-2"
      >
        <div className="w-[20%] text-[14px] pl-5  flex items-center gap-1">
          {wing?.name}
        </div>
        <div className="w-[40%] text-[14px] pl-5  flex items-center gap-1">
          {wing?.description}
        </div>
        <div className="w-[15%] flex relative gap-1 items-center text-[14px] pl-10 ">
          {wing?.levels?.length}
        </div>
        <div className="w-[15%] flex relative gap-1 items-center text-[14px] pl-5 ">
          {wing?.lead?.name}
        </div>
        <div className="flex w-[9%] gap-2  justify-center">
          <div onClick={(e) => e.stopPropagation()}>
            {/* <button
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
                  </button> */}

            <Actions
              handleDelete={handleDeleteWing}
              setEdit={setEditWing}
              param={wing}
              setDetailPopUp={setwingDetailPopUp}
            />
          </div>
        </div>
      </Link>
      {wingDetailPopUp && (
        <div
          className="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-70 flex flex-col items-center justify-center z-50"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
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
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <EditWing setEditWing={setEditWing} wing={wing} />
        </div>
      )}
    </>
  );
}
