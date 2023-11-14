import { Switch } from "antd";
import { deleteFeed, updateFeed } from '../../redux/slices/feedSlice';
import { useDispatch } from "react-redux";
import { useState } from "react";

import EditFeed from "./EditFeed";

export default function Feed({ feed }) {
   const dispatch = useDispatch();

   const [editFeed, setEditFeed] = useState(false);

   return (
      <>
         <tbody>
            <tr className="border-t-2 h-14">
               <td>{feed.user.name}</td>
               <td>{feed.feedDetails}</td>
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
