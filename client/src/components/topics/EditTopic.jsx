import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNotification } from "../utility/Notification";
import { updateTopic } from "../../redux/slices/topicSlice";

export default function EditTopic({ setEditTopic, topic }) {
  const dispatch = useDispatch();
  const { openNotification } = useNotification();
  const [newtopicTitle, setNewtopicTitle] = useState(topic?.title);

  const [fields, setFields] = useState(false);

  const handleSave = () => {
    if (newtopicTitle) {

      const newTopicObj = {
        title: newtopicTitle,
      }
      dispatch(updateTopic({ id: topic?._id, updatedData: newTopicObj }))
      setEditTopic(false)
      openNotification("success", "Topic", "Edited");

    } else {
      setFields(true);
      setTimeout(() => {
        setFields(false)
      }, 3000);
    }
  }


  return (
    <div
      className="w-11/12 sm:w-5/6 md:w-2/3 lg:w-1/3 bg-bgSecondary rounded-3xl p-5 z-20 cursor-default"
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
      }}
    >
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold">Update topic</h1>
        {fields && <p className="my-4 text-red-500 text-center">Fill all the fields</p>}
        <div className="my-4 flex flex-col gap-2">
          <p>TITLE</p>
          <input
            className="py-1 px-3 bg-transparent rounded-md border-[1px] border-gray-400 outline-none"
            value={newtopicTitle}
            placeholder="Input new name..."
            onChange={(e) => setNewtopicTitle(e.target.value)}
          />
        </div>
      </div>
      <div className="z-20 opacity-100 flex gap-3">
        <button
          type="button"
          className="py-1 px-3 rounded-md cursor-pointer bg-pink-600 hover:bg-pink-500 text-white transition-all duration-200 ease-linear"
          onClick={handleSave}
        >Save</button>
        <button
          type="button"
          className="py-1 px-3 rounded-md cursor-pointer bg-slate-800 hover:bg-bgTertiary text-white transition-all duration-200 ease-linear"
          onClick={() => setEditTopic(false)}
        >Cancel</button>
      </div>
    </div>
  )
}
