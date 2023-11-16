import { useState } from "react";
import { useDispatch } from "react-redux";

import { updateFeed } from "../../redux/slices/feedSlice";

export default function EditFeed({ setEditFeed, feed }) {
  const dispatch = useDispatch();

  const [newFeedDetail, setNewFeedDetail] = useState(feed?.feedDetails);

  const handleClick = () => {
    const newFeedObj = {feedDetails: newFeedDetail}
    dispatch(updateFeed({id: feed?._id, updatedData: newFeedObj}))
    setEditFeed(false)
  }

  return (
    <div className="w-11/12 sm:w-5/6 md:w-2/3 lg:w-1/3 bg-bgSecondary rounded-3xl px-5 py-3 z-20">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold">Update Feed</h1>
        <div className="my-5 flex flex-col gap-2">
          <p>DESCRIPTION</p>
          <textarea
            rows={4}
            className="py-2 px-3 bg-transparent rounded-md border-2 outline-none"
            value={newFeedDetail}
            placeholder="Input new feed..."
            onChange={(e)=>setNewFeedDetail(e.target.value)}
          />
        </div>
      </div>
      <div className="z-20 opacity-100 flex gap-3">
        <button
          type="button"
          className="py-1 px-3 rounded-md cursor-pointer bg-pink-600 hover:bg-pink-500 text-white transition-all duration-200 ease-linear"
          onClick={handleClick}
        >Save</button>
        <button
          type="button"
          className="py-1 px-3 rounded-md cursor-pointer bg-bgSecondary hover:bg-bgTertiary text-white transition-all duration-200 ease-linear"
          onClick={() => setEditFeed(false)}
        >Cancel</button>
      </div>
    </div>
  )
}
