import { useEffect, useState } from "react";
import Announcement from "./Announcement";

const AnnouncementRow = ({ data, handleDelete, showModal, search }) => {
  const [array, setArray] = useState([]);
  useEffect(() => {
    setArray(data?.announcementData);
  }, [data?.announcementData]);
  useEffect(() => {
    console.log(search);
    setArray(
      data?.announcementData?.filter((e) => {
        if (
          e.announcementDetails.includes(search) ||
          e.createdAt.slice(0, 10).includes(search)
        ) {
          return e;
        }
      })
    );
  }, [search]);

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
        : array?.map((e) => {
          return (
            <Announcement key={e._id} e={e} handleDelete={handleDelete} showModal={showModal} />
          );
        })}
    </table>
  );
};

export default AnnouncementRow;
