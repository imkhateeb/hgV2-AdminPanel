import { Switch } from "antd";
import { deleteFeed, updateFeed } from '../../redux/slices/feedSlice';
import { useDispatch } from "react-redux";
import { useState } from "react";

import { MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";

import EditFeed from "./EditFeed";
import FeedDetails from "./FeedDetails";

export default function Feed({ feed }) {
   const dispatch = useDispatch();
   const [feedDetailPopUp, setFeedDetailPopUp] = useState(false);
   const [editFeed, setEditFeed] = useState(false);

   const handleDeleteFeed = (id) => {
      dispatch(deleteFeed(id))
   }

   return (
      <div className="flex border-t-2 py-4 w-full">
         <div className="w-[15%]">{feed.name}</div>
         <div className="w-[45%]">
            {feed.feedDetails.slice(0, 50)}... {" "}
            <button
               type="button"
               onClick={() => setFeedDetailPopUp(true)}
               className="text-blue-400 hover:text-blue-300 transition-all duration-200 ease-linear cursor-pointer outline-none border-none"
            >
               more
            </button>
         </div>
         <div className="w-[10%]">{feed.createdAt.split("T")[0]}</div>
         <div className="w-[10%] text-center"><Switch checked={feed.staus} onClick={() => { dispatch(updateFeed({ id: feed?._id, updatedData: { staus: !feed.staus } })) }} /></div>
         <div className="w-[10%] text-center">{feed.upVotes.length}</div>
         <div className="flex w-[10%] gap-2 flex justify-center">
            <button
               type="button"
               className="button hover:underline flex justify-center items-center text-yellow-300"
               onClick={() => setEditFeed(true)}
            ><AiFillEdit fontSize={24} /></button>
            <button
               type="button"
               className="button hover:underline flex justify-center items-center text-red-500"
               onClick={() => handleDeleteFeed(feed?._id)}
            ><MdDelete fontSize={24} /></button>
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
               <EditFeed
                  setEditFeed={setEditFeed}
                  feed={feed && feed}
               />
            </div>
         )}
      </div>
   )
}
