import { useState } from "react";
import { Switch } from "antd";
import { IoIosEye } from "react-icons/io";
import { useDispatch } from "react-redux";

import { MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";

// import FeedDetails from "./FeedDetails";
import { deleteSubTopic } from "../../redux/slices/subTopicSlice";
import EditSubTopic from "./EditSubTopic";
import AddResource from "./AddResource";
import SubTopicDetails from "./SubTopicDetails";
import Actions from "../utility/Actions";
import { useNotification } from "../utility/Notification";
export default function SubTopic({ subtopic }) {
  const dispatch = useDispatch();
  const { openNotification } = useNotification();
  const [subTopicDetailPopUp, setSubTopicDetailPopUp] = useState(false);
  const [editSubTopic, setEditSubTopic] = useState(false);
  const [addResource, setAddResource] = useState(false);

  const handleDeleteSubTopic = (id) => {
    dispatch(deleteSubTopic(id));
    openNotification("success", "Subtopic", "Deleted");
  };
  return (
    <div className="flex border-t-[1px] py-5 text-[15px] w-full">
      <div className="w-[20%] pl-5">{subtopic.title}</div>
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
      <div className="w-[20%] pl-5">{subtopic.createdAt.split("T")[0]}</div>
      {/* <div className="w-[8%] pl-3"><Switch checked={feed.staus} onClick={() => { dispatch(updateFeed({ id: feed?._id, updatedData: { staus: !feed.staus } })) }} /></div> */}
      <div className="w-[20%] pl-5">Siva</div>
      <div className="w-[20%] pl-5">
        <button
          className="w-20 bg-green-500 h-8 rounded-lg"
          onClick={() => setAddResource(!addResource)}
        >
          Add
        </button>
      </div>
      <div className=" pl-5 w-[20%] gap-2 flex justify-center">
        {/* <button
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
        <button
          type="button"
          className="button hover:underline flex justify-center items-center text-red-500"
          onClick={() => setSubTopicDetailPopUp(!subTopicDetailPopUp)}
        >
         <IoIosEye fontSize={24} />
        </button>      */}

        <Actions
          handleDelete={handleDeleteSubTopic}
          setEdit={setEditSubTopic}
          param={subtopic}
          setDetailPopUp={setSubTopicDetailPopUp}
        />
      </div>
      {subTopicDetailPopUp && (
        <div className="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-70 flex flex-col items-center justify-center z-10">
          <SubTopicDetails
            data={subtopic}
            setSubTopicDetailPopUp={setSubTopicDetailPopUp}
            setEditSubTopic={setEditSubTopic}
            handleDeleteSubTopic={handleDeleteSubTopic}
          />
        </div>
      )}
      {editSubTopic && (
        <div className="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-70 flex flex-col items-center justify-center z-10">
          <EditSubTopic setEditSubTopic={setEditSubTopic} subtopic={subtopic} />
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
