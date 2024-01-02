import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteSubTopic } from "../../redux/slices/subTopicSlice";
import EditSubTopic from "./EditSubTopic";
import AddResource from "./AddResource";
import SubTopicDetails from "./SubTopicDetails";
import Actions from "../utility/Actions";
import { useNotification } from "../utility/Notification";
import { IoIosAddCircleOutline, IoMdAdd } from "react-icons/io";
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
      <div className="w-[20%] pl-5">{subtopic.createdAt.split("T")[0]}</div>
      <div className="w-[20%] pl-5">Siva</div>
      <div className="w-[20%] pl-10">
        <button
          className="bg-blue-500 p-2 rounded-full"
          onClick={() => setAddResource(!addResource)}
        >
          <IoMdAdd/>
        </button>
      </div>
      <div className=" pl-5 w-[20%] gap-2 flex justify-center">
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
