import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { FaPlus } from "react-icons/fa6";
import { CgFeed } from "react-icons/cg";
import feedsStyle from "../../constants/styles/feedsStyle";
import { useRef } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createSubTopic } from "../../redux/slices/subTopicSlice";


export default function AddNewSubTopic() {
  const { topicId } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const subTopicTitle = useRef(null);
  const resourceURL = useRef(null);
  
  const handleClick = () => {
    dispatch(
      createSubTopic({
        topicId,
        title: subTopicTitle.current.value,
      })
    );
    navigate(`/subtopics/${topicId}`);
  };

  return (
    <section className={feedsStyle.sectionStyle}>
      <div className="py-10 px-16 bg-pink-600 rounded-3xl">
        <h1 className="text-5xl font-bold">Add New Subtopic</h1>
      </div>
      <div className="my-4">
        <p className="my-2">Title</p>
        <div className="flex w-full justify-between">
          <input
            type="text"
            placeholder="SubTopic title..."
            className={feedsStyle.eventTypeInputStyle}
            ref={subTopicTitle}
          />
        </div>
      </div>
     
      <div className="flex gap-3 justify-center mt-5">
        <button
          type="button"
          className={feedsStyle.btn2}
          onClick={() => navigate(`/subtopics/${topicId}`)}
        >
          <AiOutlineArrowLeft /> Go Back
        </button>

        <button type="button" className={feedsStyle.btn3} onClick={handleClick}>
          Create Subtopic    <CgFeed />
        </button>
      </div>
    </section>
  );
}
