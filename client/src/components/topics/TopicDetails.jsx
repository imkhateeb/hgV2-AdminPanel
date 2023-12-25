export default function TopicDetails({ data, setTopicDetailPopUp, setEditTopic, handleDeleteTopic }) {

  return (
    <div
      className="w-11/12 sm:w-5/6 md:w-2/3 lg:w-1/3 bg-bgSecondary rounded-3xl p-5  cursor-default"
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
      }}
    >
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold">{data?.title}</h1>
        <p className='text-gray-400 mt-2 mb-4'>{'Md Khateebur Rab'}</p>
      </div>
      <div className="z-20 opacity-100 flex gap-3">
        <button
          type="button"
          className="py-1 px-3 rounded-md cursor-pointer bg-slate-800 hover:bg-bgTertiary text-white transition-all duration-200 ease-linear"
          onClick={() => setTopicDetailPopUp(false)}
        >Cancel</button>
        <button
          type="button"
          className="py-1 px-3 rounded-md cursor-pointer bg-yellow-800 hover:bg-yellow-700 text-white transition-all duration-200 ease-linear"
          onClick={() => {
            setTopicDetailPopUp(false)
            setEditTopic(true)
          }}
        >Edit</button>
        <button
          type="button"
          className="py-1 px-3 rounded-md cursor-pointer bg-red-800 hover:bg-red-700 text-white transition-all duration-200 ease-linear"
          onClick={(e) => {
            setTopicDetailPopUp(false)
            handleDeleteTopic(data?._id, e)
          }}
        >Delete</button>
      </div>
    </div>
  )
}
