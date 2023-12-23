import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateLevel } from "../../redux/slices/levelSlice";


export default function EditLevel({ setEditLevel, level }) {
  const dispatch = useDispatch();

  const [newLevelTitle, setNewLevelTitle] = useState(level?.title);

  const handleClick = () => {
    const newLevelObj = {title: newLevelTitle}
    dispatch(updateLevel({id: level?._id, updatedData: newLevelObj}))
    setEditLevel(false)
  }

  return (
    <div className="w-11/12 sm:w-5/6 md:w-2/3 lg:w-1/3 bg-bgSecondary rounded-md px-5 py-6 z-20">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold">Update Level</h1>
        <div className="my-5 flex flex-col gap-2">
          <p>Title</p>
          <input
            type="text"
            className="py-2 px-3 bg-transparent rounded-md border-[1px] border-gray-400 outline-none"
            value={newLevelTitle}
            placeholder="Input new title..."
            onChange={(e)=>setNewLevelTitle(e.target.value)}
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
          onClick={() => setEditLevel(false)}
        >Cancel</button>
      </div>
    </div>
  )
}
