import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { updateAnnouncement } from '../../redux/slices/announcementSlice';

export default function EditAnnouncement({ setEditAnnouncement, announcement }) {

  const dispatch = useDispatch();

  const [newAnnouncementDetail, setNewAnnouncementDetail] = useState(announcement?.announcementDetails);

  const handleClick = () => {
    const newFeedObj = { announcementDetails: newAnnouncementDetail }
    dispatch(updateAnnouncement({ id: announcement?._id, updatedData: newFeedObj }))
    setEditAnnouncement(false)
  }

  return (
    <div className="w-11/12 sm:w-5/6 md:w-2/3 lg:w-1/3 bg-bgSecondary rounded-lg px-5 py-3 z-20">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold">Update Announcement</h1>
        <div className="my-5 flex flex-col gap-2">
          <p>DESCRIPTION</p>
          <textarea
            rows={4}
            className="py-2 px-3 bg-transparent rounded-md border-[1px] border-gray-400 outline-none"
            value={newAnnouncementDetail}
            placeholder="Input new announcement..."
            onChange={(e)=>setNewAnnouncementDetail(e.target.value)}
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
          className="py-1 px-3 rounded-md cursor-pointer bg-slate-800 hover:bg-bgTertiary text-white transition-all duration-200 ease-linear"
          onClick={() => setEditAnnouncement(false)}
        >Cancel</button>
      </div>
    </div>
  )
}
