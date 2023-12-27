<<<<<<< HEAD
import React from 'react'

function LevelDetails() {
  return (
    <div>LevelDetails</div>
  )
}

export default LevelDetails
=======
export default function LevelDetails({
    data,
    setLevelDetailPopUp,
    setEditLevel,
    handleDeleteLevel,
  }) {
    return (
      <div className="w-11/12 sm:w-5/6 md:w-2/3 lg:w-1/3 bg-bgSecondary rounded-3xl p-5 z-20">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold">{data?.title}</h1>
          <p className="text-gray-400 mt-1">
            {data.createdAt.split("T")[0]}{" "}
            {data.createdAt.split("T")[1].split(".")[0]}
          </p>
          {/* <div className="my-4">
            {data?.resources?.map((e, index) => (
              <div
                key={index}
                className="bg-zinc-500 mb-4 p-2 text-md rounded-md flex"
              >
                <p className="w-[90%]">{e.url}</p>
              </div>
            ))}
          </div> */}
        </div>
        <div className="z-20 opacity-100 flex gap-3">
          <button
            type="button"
            className="py-1 px-3 rounded-md cursor-pointer bg-slate-800 hover:bg-bgTertiary text-white transition-all duration-200 ease-linear"
            onClick={() => setLevelDetailPopUp(false)}
          >
            Cancel
          </button>
          <button
            type="button"
            className="py-1 px-3 rounded-md cursor-pointer bg-yellow-800 hover:bg-yellow-700 text-white transition-all duration-200 ease-linear"
            onClick={() => {
              setLevelDetailPopUp(false);
              setEditLevel(true);
            }}
          >
            Edit
          </button>
          <button
            type="button"
            className="py-1 px-3 rounded-md cursor-pointer bg-red-800 hover:bg-red-700 text-white transition-all duration-200 ease-linear"
            onClick={() => {
              setLevelDetailPopUp(false);
              handleDeleteLevel(data?._id);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
  
>>>>>>> a7cd7c3784c2309042af861e772054192d47b651
