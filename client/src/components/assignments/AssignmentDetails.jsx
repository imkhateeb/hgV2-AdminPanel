export default function AssignmentDetails({ data, setAssignmentDetailPopUp, setEditAssignment, handleDeleteAssignment }) {

  return (
    <div
      className="w-11/12 sm:w-5/6 md:w-2/3 lg:w-1/3 bg-bgSecondary rounded-3xl p-5  cursor-default"
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
      }}
    >
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold">{data?.name}</h1>
        <p className="text-gray-400 mt-2">
          {data.createdAt.split("T")[0]}{" "}
          {data.createdAt.split("T")[1].split(".")[0]}
        </p>
        <p className='text-gray-400 mb-2'>{'Md Khateebur Rab'}</p>
      </div>
      <div className="mb-5">
        <p>{data.description}</p>
      </div>
      <div className="z-20 opacity-100 flex gap-3">
        <button
          type="button"
          className="py-1 px-3 rounded-md cursor-pointer bg-slate-800 hover:bg-bgTertiary text-white transition-all duration-200 ease-linear"
          onClick={() => setAssignmentDetailPopUp(false)}
        >Cancel</button>
        <button
          type="button"
          className="py-1 px-3 rounded-md cursor-pointer bg-yellow-800 hover:bg-yellow-700 text-white transition-all duration-200 ease-linear"
          onClick={() => {
            setAssignmentDetailPopUp(false)
            setEditAssignment(true)
          }}
        >Edit</button>
        <button
          type="button"
          className="py-1 px-3 rounded-md cursor-pointer bg-red-800 hover:bg-red-700 text-white transition-all duration-200 ease-linear"
          onClick={(e) => {
            setAssignmentDetailPopUp(false)
            handleDeleteAssignment(data?._id, e)
          }}
        >Delete</button>
      </div>
    </div>
  )
}
