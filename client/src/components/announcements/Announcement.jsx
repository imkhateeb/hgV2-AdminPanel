import { useState } from "react";
import { Switch } from "antd";
import { BiDotsHorizontalRounded, BiSort } from "react-icons/bi";
import { updateAnnouncement } from "../../redux/slices/announcementSlice";

import AnnouncementDetails from "./AnnouncementDetails";
import { useDispatch } from 'react-redux';

export default function Announcement({e, handleDelete, showModal}) {
        
  const [announcementDetailPopUp, setAnnouncementDetailPopUp] = useState(false);
  const dispatch = useDispatch();


  return (
        <tbody className="border-t-2 h-14" >
        <tr>
          {/* <td>{e.user.name.toUpperCase()}</td> */}
          <td>Siva Sai</td>
          <td>
            {e.announcementDetails.slice(0, 50)}... {" "}
            <button
              type="button"
              onClick={() => { setAnnouncementDetailPopUp(true) }}
              className="text-blue-400 hover:text-blue-300 transition-all duration-200 ease-linear cursor-pointer outline-none border-none"
            >details</button>
          </td>
          <td>{e.createdAt.split('T')[0]}</td>
          <td>
            {" "}
            <Switch
              checked={e.status}
              onClick={() => {
                const updatedData = { status: !e.status };
                dispatch(
                  updateAnnouncement({ id: e._id, updatedData })
                );
              }}
            />
          </td>

          <td>
            {/* <BiDotsHorizontalRounded size={26} /> */}
            <div className="flex items-center gap-3 ">
              <button
                onClick={() => showModal(e._id, e.announcementDetails)}
                className="h-8 w-8 rounded-full  bg-green-500"
              >
                E
              </button>
              <button
                onClick={() => handleDelete(e._id)}
                className="h-8 w-8 rounded-full  bg-red-500"
              >
                D
              </button>
            </div>
          </td>
        </tr>
        {announcementDetailPopUp && (
          <div className="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-70 flex flex-col items-center justify-center z-10">
            <AnnouncementDetails data={e} setAnnouncementDetailPopUp={setAnnouncementDetailPopUp} />
          </div>
        )}
      </tbody>
  )
}
