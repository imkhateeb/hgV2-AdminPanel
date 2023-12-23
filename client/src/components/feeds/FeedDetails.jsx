export default function AnnouncementDetails({
  data,
  setFeedDetailPopUp,
  setEditFeed,
  handleDeleteFeed,
}) {
  return (
    <div className="w-11/12 sm:w-5/6 md:w-2/3 lg:w-1/3 bg-bgSecondary rounded-3xl p-5 z-20">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold">{data?.name}</h1>
        <p className="text-gray-400 mt-1">
          {data.createdAt.split("T")[0]}{" "}
          {data.createdAt.split("T")[1].split(".")[0]}
        </p>
        <div className="flex gap-2">
          {!data?.tags[0]?.replace(" ", "") ? (
            <p className="text-gray-400 text-sm p-[4px] rounded-md bg-slate-800">
              No tags
            </p>
          ) : (
            data?.tags[0]?.split(" ").map((tag, index) => (
              <p
                key={tag}
                className={
                  (index === 0 && "text-red-400") ||
                  (index % 2 === 0 && "text-green-500") ||
                  (index % 3 === 0 ? "text-pink-500" : "text-blue-400")
                }
              >
                #{tag}
              </p>
            ))
          )}
        </div>
        <p className="my-4">{data.feedDetails}</p>
      </div>
      <div className="z-20 opacity-100 flex gap-3">
        <button
          type="button"
          className="py-1 px-3 rounded-md cursor-pointer bg-slate-800 hover:bg-bgTertiary text-white transition-all duration-200 ease-linear"
          onClick={() => setFeedDetailPopUp(false)}
        >
          Cancel
        </button>
        <button
          type="button"
          className="py-1 px-3 rounded-md cursor-pointer bg-yellow-800 hover:bg-yellow-700 text-white transition-all duration-200 ease-linear"
          onClick={() => {
            setFeedDetailPopUp(false);
            setEditFeed(true);
          }}
        >
          Edit
        </button>
        <button
          type="button"
          className="py-1 px-3 rounded-md cursor-pointer bg-red-800 hover:bg-red-700 text-white transition-all duration-200 ease-linear"
          onClick={() => {
            setFeedDetailPopUp(false);
            handleDeleteFeed(data?._id);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
