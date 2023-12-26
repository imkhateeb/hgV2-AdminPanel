import { useState } from "react";
import { useDispatch } from "react-redux";

import { updateAssignment } from '../../redux/slices/assignmentSlice';

export default function EditAssignment({ setEditAssignment, assignment }) {
  const dispatch = useDispatch();

  const [name, setName] = useState(assignment.name);
  const [description, setDescription] = useState(assignment.description)

  const [fields, setFields] = useState(false);

  const handleSave = () => {
    if (name && description) {

      const newassignmentObj = {
        name,
        description,
      }
      dispatch(updateAssignment({ id: assignment?._id, updatedData: newassignmentObj }))
      setEditAssignment(false)

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
        <h1 className="text-3xl font-bold">Update Assignment</h1>
        {fields && <p className="my-4 text-red-500 text-center">Fill all the fields</p>}
        <div className="my-4 flex flex-col gap-2">
          <p>NAME</p>
          <input
            className="py-1 px-3 bg-transparent rounded-md border-[1px] border-gray-400 outline-none"
            value={name}
            placeholder="Input new name..."
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="my-4 flex flex-col gap-2">
          <p>DESCRIPTION</p>
          <textarea
            
            className="py-1 px-3 bg-transparent rounded-md border-[1px] border-gray-400 outline-none"
            value={description}
            placeholder="Input new description..."
            onChange={(e) => setDescription(e.target.value)}
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
          onClick={() => setEditAssignment(false)}
        >Cancel</button>
      </div>
    </div>
  )
}
