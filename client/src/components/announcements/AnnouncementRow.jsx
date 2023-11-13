import { Switch } from "antd";
import React from "react";
import { BiDotsHorizontalRounded, BiSort } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { updateAnnouncement } from "../../redux/slices/announcementSlice";
const AnnouncementRow = ({ data, handleDelete, showModal }) => {
  const dispatch = useDispatch();
  return (
    <table className="w-full mt-4 overflow-x-scroll">
      <thead className=" border-t-2 h-14">
        <tr>
          <th className="text-left w-[20%] text-[16px]">USER</th>
          <th className="text-left w-[40%] text-[16px]">DESCRIPTION</th>
          <th className="text-left w-[20%] ">
            <div className="flex items-center gap-2 text-[16px]">
              <h1>CREATED ON</h1>
            </div>
          </th>
          <th className="text-left w-[10%] text-[16px]">STATUS</th>
          <th className="text-left w-[10%] text-[16px]">ACTION</th>
        </tr>
      </thead>
      {data.loading
        ? "loading..."
        : data?.announcementData?.map((e) => {
            return (
              <tbody className="border-t-2 h-14" key={e._id}>
                <tr>
                  {/* <td>{e.user.name.toUpperCase()}</td> */}
                  <td>Siva</td>
                  <td>{e.announcementDetails}</td>
                  <td>{e.createdAt.slice(0, 10)}</td>
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
              </tbody>
            );
          })}
    </table>
  );
};

export default AnnouncementRow;
