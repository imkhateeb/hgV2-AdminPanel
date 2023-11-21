import { useState } from "react";
import { Switch } from "antd";
import { deleteAnnouncement, updateAnnouncement } from "../../redux/slices/announcementSlice";
import { useDispatch } from "react-redux";

import AnnouncementDetails from "./AnnouncementDetails";

import { MdDelete } from "react-icons/md";
import EditAnnouncement from "./EditAnnouncement";
import { AiFillEdit } from "react-icons/ai";

export default function Announcement({
  announcement
}) {

  const [announcementDetailPopUp, setAnnouncementDetailPopUp] = useState(false);
  const [editAnnouncement, setEditAnnouncement] = useState(false);
  const dispatch = useDispatch();

  const handleDeleteAnnouncement = (id) => {
    dispatch(deleteAnnouncement(id));
  }

  return (

    <div className="flex border-t-2 py-4 w-full">
      <div className="w-[15%]">{announcement?.user.name}</div>
      <div className="w-[50%]">
        {announcement?.announcementDetails.slice(0, 50)}... {" "}
        <button
          type="button"
          onClick={() => setAnnouncementDetailPopUp(true)}
          className="text-blue-400 hover:text-blue-300 transition-all duration-200 ease-linear cursor-pointer outline-none border-none"
        >
          more
        </button>
      </div>
      <div className="w-[15%]">{announcement.createdAt.split("T")[0]}</div>

      <div className="w-[10%] pl-3">
        <Switch
          checked={announcement.status}
          onClick={() => {
            dispatch(
              updateAnnouncement({ id: announcement?._id, updatedData: { status: !announcement?.status }})
            );
          }}
        />
      </div>

      <div className="flex w-[10%] gap-2 flex justify-center">
        <button
          type="button"
          className="button hover:underline flex justify-center items-center text-yellow-300"
          onClick={() => setEditAnnouncement(true)}
        ><AiFillEdit fontSize={24} /></button>
        <button
          type="button"
          className="button hover:underline flex justify-center items-center text-red-500"
          onClick={() => handleDeleteAnnouncement(announcement?._id)}
        ><MdDelete fontSize={24} /></button>
      </div>
      {announcementDetailPopUp && (
        <div className="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-70 flex flex-col items-center justify-center z-10">
          <AnnouncementDetails
            data={announcement}
            setAnnouncementDetailPopUp={setAnnouncementDetailPopUp}
            setEditAnnouncement={setEditAnnouncement}
            handleDeleteAnnouncement={handleDeleteAnnouncement}
          />
        </div>
      )}
      {editAnnouncement && (
        <div className="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-70 flex flex-col items-center justify-center z-10">
          <EditAnnouncement
            setEditAnnouncement={setEditAnnouncement}
            announcement={announcement && announcement}
          />
        </div>
      )}
    </div>
  )
}
