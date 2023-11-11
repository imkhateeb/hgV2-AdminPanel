import React from "react";
import { BiDotsHorizontalRounded, BiSort } from "react-icons/bi";
const AnnouncementRow = ({ data, handleDelete, showModal, update }) => {
  return (
    <table className="w-full mt-4 overflow-x-scroll">
      <thead className=" border-t-2 h-14">
        <tr>
          <th className="text-left w-[20%] text-[15px]">USER</th>
          <th className="text-left w-[40%] text-[15px]">DESCRIPTION</th>
          <th className="text-left w-[20%] ">
            <div className="flex items-center gap-2 text-[15px]">
              <h1>CREATED ON</h1>
              <BiSort />
            </div>
          </th>
          <th className="text-left w-[10%] text-[15px]">STATUS</th>
          <th className="text-left w-[10%] text-[15px]">ACTION</th>
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
                  <td>{e.status ? "true" : "false"}</td>
                  <td className="flex items-center gap-3 ">
                    {/* <BiDotsHorizontalRounded size={26} /> */}
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
                  </td>
                </tr>
              </tbody>
            );
          })}
    </table>
  );
};

export default AnnouncementRow;
