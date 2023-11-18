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
   return (
      <>
         <tbody>
            <tr className="border-t-2">
               <td className="w-[20%] py-4">{feed.name}</td>
               <td className="w-[40%] py-4">
               {feed.feedDetails.slice(0, 50)}... {" "}
               <button
               type="button"
               onClick={()=>setFeedDetailPopUp(true)}
               className="text-blue-400 hover:text-blue-300 transition-all duration-200 ease-linear cursor-pointer outline-none border-none"
               >
                  details
               </button>
               </td>
               <td className="w-[20%] py-4">{feed.createdAt.split("T")[0]}</td>
               <td className="w-[10%] py-4"><Switch checked={feed.staus} onClick={() => { dispatch(updateFeed({id: feed?._id, updatedData : {staus: !feed.staus}}))}} /></td>
               <td className="w-[10%] py-4 px-8">{feed.upVotes.length}</td>
               <td className="flex w-[10%] py-4 gap-3 items-center">
                  <button
                     type="button"
                     className="button hover:underline flex justify-center items-center text-yellow-400"
                     onClick={() => setEditFeed(true)}
                  ><AiFillEdit fontSize={24}/></button>
                  <button
                     type="button"
                     className="button hover:underline flex justify-center items-center text-pink-500"
                     onClick={() => { dispatch(deleteFeed(feed?._id)) }}
                  ><MdDelete fontSize={24}/></button>
               </td>
            </tr>
            {feedDetailPopUp && (
          <div className="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-70 flex flex-col items-center justify-center z-10">
            <FeedDetails data={feed} setFeedDetailPopUp={setFeedDetailPopUp} />
          </div>
        )}
         </tbody>
         {editFeed && (
            <div className="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-70 flex flex-col items-center justify-center z-10">
               <EditFeed
                  setEditFeed={setEditFeed}
                  feed={feed && feed}
               />
            </div>
         )}
      </>
   )
}
