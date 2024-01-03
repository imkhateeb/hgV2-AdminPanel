import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { deleteTopic } from "../../redux/slices/topicSlice";
import { IoIosEye } from "react-icons/io";
import { useNotification } from "../utility/Notification";
import TopicDetails from "./TopicDetails";
import EditTopic from "./EditTopic";
import Actions from "../utility/Actions";

export default function Topic({ topic }) {
  const dispatch = useDispatch();
  const { openNotification } = useNotification();
  const [editTopic, setEditTopic] = useState(false);
  const [topicDetailPopUp, setTopicDetailPopUp] = useState(false);

  const handleDeleteTopic = (id, event) => {
       dispatch(deleteTopic(id));
       openNotification("success", "Topic", "Deleted");
  };

  return (
    <>
      <Link
        to={`/subtopics/${topic?._id}`}
        className="flex border-t-[1px] py-5 w-full hover:bg-slate-800 hover:bg-opacity-50 transition-all duration-200 ease-in"
      >
        <div
          className="w-[30%] text-[15px]
            pl-5 font-semibold flex items-center gap-1"
        >
          {topic?.title}
        </div>
        <div
          className="w-[30%] text-[15px]
            pl-5 font-semibold flex items-center gap-1"
        >
          {`MD KHATEEBUR RAB`}
        </div>
        <div
          className="w-[20%] flex relative gap-1 items-center text-[15px]
            pl-10 font-semibold"
        >
          {topic?.subtopics?.length || 0}
        </div>
        <div className="flex w-[20%] gap-2  justify-center">
          {/* <div onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="button z-20 hover:underline flex justify-center items-center text-yellow-300"
              onClick={(event) => {
                event.stopPropagation();
                event.preventDefault();
                setEditTopic(true);
              }}
            >
              <AiFillEdit fontSize={24} />
            </button>
          </div> */}
          {/* <div onClick={(e) => e.stopPropagation()}>
            <button
                     type="button"
                     className="button z-20 hover:underline flex justify-center items-center text-red-500"
                     onClick={(e) => {
                        handleDeleteTopic(topic?._id, e)
                     }}
                  >
                     <MdDelete fontSize={24} />
                  </button>
               </div> */}
               <div onClick={(e) => e.stopPropagation()}>
                  {/* <button
                     type="button"
                     className="button z-20 hover:underline flex justify-center items-center text-pink-500"
                     onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        setTopicDetailPopUp(true)
                     }}
                  >
                     <IoIosEye fontSize={24} />
                  </button> */}

                  <Actions
              handleDelete={handleDeleteTopic}
              setEdit={setEditTopic}
              param={topic}
              setDetailPopUp={setTopicDetailPopUp}
            />
        </div>

          </div>
          
      </Link>
      {topicDetailPopUp && (
        <div
          className="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-70 flex flex-col items-center justify-center z-50"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <TopicDetails
            data={topic}
            setTopicDetailPopUp={setTopicDetailPopUp}
            setEditTopic={setEditTopic}
            handleDeleteTopic={handleDeleteTopic}
          />
        </div>
      )}
      {editTopic && (
        <div
          className="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-70 flex flex-col items-center justify-center z-50"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <EditTopic setEditTopic={setEditTopic} topic={topic} />
        </div>
      )}
    </>
  );
}
