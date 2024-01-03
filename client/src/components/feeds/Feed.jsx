import { useState } from "react";
import { Switch } from "antd";
import { deleteFeed, updateFeed } from "../../redux/slices/feedSlice";
import { useDispatch } from "react-redux";

import { MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";

import EditFeed from "./EditFeed";
import FeedDetails from "./FeedDetails";
import Actions from "../utility/Actions";
import { useNotification } from "../utility/Notification";
export default function Feed({ feed }) {
  const dispatch = useDispatch();
  const { openNotification } = useNotification();
  const [feedDetailPopUp, setFeedDetailPopUp] = useState(false);
  const [editFeed, setEditFeed] = useState(false);

  const handleDeleteFeed = (id) => {
    dispatch(deleteFeed(id));
    openNotification("success", "Feed", "Deleted");
  };

  return (
    <div className="flex border-t-[1px] py-5 text-[15px] w-full">
      <div className="pl-5 max-res:w-[27%] w-[15%]">{feed.name}</div>
      <div className="pl-5 w-[40%] max-res:hidden">{feed.feedDetails.slice(0, 50)}... </div>
      <div className="pl-5 max-res:w-[27%] w-[15%]">{feed.createdAt.split("T")[0]}</div>
      
      <div className="pl-11 max-res:w-[16%] w-[13%] ">{feed.upVotes.length}</div>
      <div className="pl-5 max-res:w-[15%] w-[8%]">
        <Switch
          checked={feed.staus}
          onClick={() => {
            dispatch(
              updateFeed({ id: feed?._id, updatedData: { staus: !feed.staus } })
            );
          }}
        />
      </div>
      <div className="flex pl-5 max-res:w-[15%] w-[9%] gap-2  justify-center">
        {/* <button
               type="button"
               className="button hover:underline flex justify-center items-center text-yellow-300"
               onClick={() => setEditFeed(true)}
            ><AiFillEdit fontSize={24} /></button>
            <button
               type="button"
               className="button hover:underline flex justify-center items-center text-red-500"
               onClick={() => handleDeleteFeed(feed?._id)}
            ><MdDelete fontSize={24} /></button>
             */}

        <Actions
          handleDelete={handleDeleteFeed}
          setEdit={setEditFeed}
          param={feed}
          setDetailPopUp={setFeedDetailPopUp}
        />
      </div>
      {feedDetailPopUp && (
        <div className="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-70 flex flex-col items-center justify-center z-10">
          <FeedDetails
            data={feed}
            setFeedDetailPopUp={setFeedDetailPopUp}
            setEditFeed={setEditFeed}
            handleDeleteFeed={handleDeleteFeed}
          />
        </div>
      )}
      {editFeed && (
        <div className="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-70 flex flex-col items-center justify-center z-10">
          <EditFeed setEditFeed={setEditFeed} feed={feed && feed} />
        </div>
      )}
    </div>
  );
}
