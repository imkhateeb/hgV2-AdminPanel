import { useState } from "react";
import { Switch } from "antd";

import { useDispatch } from "react-redux";

import { MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";

// import FeedDetails from "./FeedDetails";
import { deleteSubTopic } from "../../redux/slices/subTopicSlice";
import EditSubTopic from "./EditSubTopic";
import AddResource from "./AddResource";

export default function SubTopic({ subtopic }) {
  const dispatch = useDispatch();
  //    const [feedDetailPopUp, setFeedDetailPopUp] = useState(false);
  const [editSubTopic, setEditSubTopic] = useState(false);
  const [addResource, setAddResource] = useState(false);

  const handleDeleteSubTopic = (id) => {
    dispatch(deleteSubTopic(id));
  };
  return (
    <div className="flex border-t-2 py-4 w-full">
      <div className="w-[20%]">{subtopic.title}</div>
      {/* <div className="w-[45%]">
            {feed.feedDetails.slice(0, 50)}... {" "}
            <button
               type="button"
               onClick={() => setFeedDetailPopUp(true)}
               className="text-blue-400 hover:text-blue-300 transition-all duration-200 ease-linear cursor-pointer outline-none border-none"
            >
               more
            </button>
         </div> */}
      <div className="w-[20%]">{subtopic.createdAt.split("T")[0]}</div>
      {/* <div className="w-[8%] pl-3"><Switch checked={feed.staus} onClick={() => { dispatch(updateFeed({ id: feed?._id, updatedData: { staus: !feed.staus } })) }} /></div> */}
      <div className="w-[20%]">Siva</div>
      <div className="w-[20%]">
        <button
          className="w-20 bg-green-500 h-8 rounded-lg"
          onClick={() => setAddResource(!addResource)}
        >
          Add
        </button>
      </div>
      <div className=" w-[20%] gap-2 flex justify-center">
        <button
          type="button"
          className="button hover:underline flex justify-center items-center text-yellow-300"
          onClick={() => setEditSubTopic(true)}
        >
          <AiFillEdit fontSize={24} />
        </button>
        <button
          type="button"
          className="button hover:underline flex justify-center items-center text-red-500"
          onClick={() => handleDeleteSubTopic(subtopic?._id)}
        >
          <MdDelete fontSize={24} />
        </button>
      </div>
      {/* {feedDetailPopUp && (
            <div className="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-70 flex flex-col items-center justify-center z-10">
               <FeedDetails
                  data={feed}
                  setFeedDetailPopUp={setFeedDetailPopUp}
                  setEditFeed={setEditFeed}
                  handleDeleteFeed={handleDeleteFeed}
               />
            </div>
         )} */}
      {editSubTopic && (
            <div className="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-70 flex flex-col items-center justify-center z-10">
               <EditSubTopic
                  setEditSubTopic={setEditSubTopic}
                  subtopic={subtopic}
               />
            </div>
         )}
      {addResource && (
        <div className="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-70 flex flex-col items-center justify-center z-10">
          <AddResource setAddResource={setAddResource} subtopic={subtopic} />
        </div>
      )}
    </div>
  );
}
