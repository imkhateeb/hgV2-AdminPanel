export default function WingDetails({ data, setwingDetailPopUp, setEditWing, handleDeleteWing }) {

  return (
    <div 
    className="w-11/12 sm:w-5/6 md:w-2/3 lg:w-1/3 bg-bgSecondary rounded-3xl p-5  cursor-default"
    onClick={(e)=>{
      e.preventDefault()
      e.stopPropagation()
    }}
    >
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold">{data?.name}</h1>
        <p className='text-pink-600 mt-1'>{data.lead.name}</p>
        <div className="flex gap-2">

          {data?.coordinators.length === 0 ? <p className="text-gray-400 text-sm p-[4px] rounded-md bg-slate-800">No Co-ordinators</p> : data?.coordinators?.map((coordinator, index) => (
            <p key={coordinator._id} className={index === 0 && 'text-red-400' || index % 2 === 0 && 'text-green-500' || (index % 3 === 0 ? 'text-pink-500' : 'text-blue-400')}>{coordinator.name}</p>
          ))}
        </div>
        <p className='my-4'>{data?.description}</p>
      </div>
      <div className="z-20 opacity-100 flex gap-3">
        <button
          type="button"
          className="py-1 px-3 rounded-md cursor-pointer bg-slate-800 hover:bg-bgTertiary text-white transition-all duration-200 ease-linear"
          onClick={() => setwingDetailPopUp(false)}
        >Cancel</button>
        <button
          type="button"
          className="py-1 px-3 rounded-md cursor-pointer bg-yellow-800 hover:bg-yellow-700 text-white transition-all duration-200 ease-linear"
          onClick={() => {
            setwingDetailPopUp(false)
            setEditWing(true)
          }}
        >Edit</button>
        <button
          type="button"
          className="py-1 px-3 rounded-md cursor-pointer bg-red-800 hover:bg-red-700 text-white transition-all duration-200 ease-linear"
          onClick={(e) => {
            setwingDetailPopUp(false)
            handleDeleteWing(data?._id, e)
          }}
        >Delete</button>
      </div>
    </div>
  )
}
