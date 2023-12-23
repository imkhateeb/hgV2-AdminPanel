import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateSubTopic } from "../../redux/slices/subTopicSlice";
import { MdDelete } from "react-icons/md";

export default function EditSubTopic({ setEditSubTopic, subtopic }) {
  const dispatch = useDispatch();

  const [newSubTopicTitle, setNewSubTopicTitle] = useState(subtopic?.title);
  const [newSubTopicResources, setNewSubTopicResources] = useState(
    subtopic?.resources
  );
  const handleDelete = (e) => {
    setNewSubTopicResources((prev) => {
      return prev.filter((item)=>{
        return e.url !== item.url
      })
  })
  };
  const handleClick = () => {
    const newSubTopicObj = {title: newSubTopicTitle,resources : newSubTopicResources}
    dispatch(updateSubTopic({id: subtopic?._id, updatedData: newSubTopicObj}))
    setEditSubTopic(false);
  };

  return (
    <div className="w-11/12 sm:w-5/6 md:w-2/3 lg:w-1/3 bg-bgSecondary rounded-lg px-5 py-6 z-20">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold">Update Subtopic</h1>
        <div className="my-5 flex flex-col gap-2">
          <p>Title</p>
          <input
            type="text"
            className="py-2 px-3 bg-transparent rounded-md border-[1px] border-gray-400 outline-none"
            value={newSubTopicTitle}
            placeholder="Input new title..."
            onChange={(e) => setNewSubTopicTitle(e.target.value)}
          />
        </div>

        <div className="mb-4">
          {newSubTopicResources.map((e, index) => (
            <div
              key={index}
              className="bg-zinc-500 mb-4 p-2 text-md rounded-md flex"
            >
              <p className="w-[90%]">{e.url}</p>
              <MdDelete
                fontSize={24}
                className="text-red-500 cursor-pointer"
                onClick={() => handleDelete(e)}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="z-20 opacity-100 flex gap-3">
        <button
          type="button"
          className="py-1 px-3 rounded-md cursor-pointer bg-pink-600 hover:bg-pink-500 text-white transition-all duration-200 ease-linear"
          onClick={handleClick}
        >
          Save
        </button>
        <button
          type="button"
          className="py-1 px-3 rounded-md cursor-pointer bg-slate-800 hover:bg-bgTertiary text-white transition-all duration-200 ease-linear"
          onClick={() => setEditSubTopic(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
