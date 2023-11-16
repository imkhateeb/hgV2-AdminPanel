import { Switch } from "antd";
import { deleteFeed, updateFeed } from '../../redux/slices/feedSlice';
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import EditFeed from "./EditFeed";
import FeedDetails from "./FeedDetails";

export default function Feed({ feed }) {
   const dispatch = useDispatch();
   const [feedDetailPopUp, setFeedDetailPopUp] = useState(false);

   const [editFeed, setEditFeed] = useState(false);
   return (
      <>
         <tbody>
            <tr className="border-t-2 h-14">
               <td>{feed.name}</td>
               <td>
               {feed.feedDetails.slice(0, 50)}... {" "}
               <button
               type="button"
               onClick={()=>setFeedDetailPopUp(true)}
               className="text-blue-400 hover:text-blue-300 transition-all duration-200 ease-linear cursor-pointer outline-none border-none"
               >
                  details
               </button>
               </td>
               <td>{feed.createdAt.split("T")[0]}</td>
               <td><Switch checked={feed.staus} onClick={() => { dispatch(updateFeed({id: feed?._id, updatedData : {staus: !feed.staus}}))}} /></td>
               <td className="flex gap-3 items-center">
                  <button
                     type="button"
                     className="button hover:underline"
                     onClick={() => setEditFeed(true)}

                  >E</button>
                  <button
                     type="button"
                     className="button hover:underline"
                     onClick={() => { dispatch(deleteFeed(feed?._id)) }}
                  >D</button>
               </td>
               <td>{feed.upVotes.length}</td>
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
