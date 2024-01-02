import { AiOutlineArrowLeft } from "react-icons/ai";
import { useRef, useState } from "react";

import { MdSubtitles } from "react-icons/md";
import formStyles from "../../constants/styles/styles";

import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createSubTopic } from "../../redux/slices/subTopicSlice";


export default function AddNewSubTopic() {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [fields, setFields] = useState(false);

  const subTopicTitle = useRef(null);
  const subTopicDesc = useRef(null);
  const resourceURL = useRef(null);

  const handleClick = () => {
    if (!topicId || !subTopicTitle.current.value || !subTopicDesc.current.value || !resourceURL.current.value) {
      setFields(true)
      setTimeout(() => {
        setFields(false)
      }, 3000);
    } else {
      dispatch(
        createSubTopic({
          topicId,
          title: subTopicTitle.current.value,
        })
      );
      navigate(`/subtopics/${topicId}`);
    }
  };

  return (
    <section className={formStyles.sectionStyle}>
      <div className="py-2 text-pink-600">
        <h1 className="text-5xl font-bold  max-xl:text-4xl max-xs:text-3xl">New Subtopic</h1>
      </div>
      {fields && <p className="text-center text-lg text-red-500 font-semibold mt-4">Fill all the fields or try again!</p>}
      <div className='flex flex-col w-full my-5'>
        <p className='mb-2'>TITLE</p>
        <div className='flex w-full justify-between'>
          <input
            placeholder='Sub-topic title...'
            className={formStyles.eventTypeInputStyle}
            ref={subTopicTitle}
          />
        </div>
      </div>
      <div className='flex flex-col w-full'>
        <p className='mb-2'>DESCRIPTION</p>
        <div>
          <textarea
            rows={4}
            className={formStyles.textareaStyle}
            placeholder='Enter details...'
            ref={subTopicDesc}
          />
        </div>
      </div>
      <div className='flex flex-col w-full my-5'>
        <p className='mb-2'>RESOURCE URL</p>
        <div className='flex w-full justify-between'>
          <input
            placeholder='Resource url...'
            className={formStyles.eventTypeInputStyle}
            ref={resourceURL}
          />
        </div>
      </div>

      <div className="flex gap-3 justify-center mt-5">
        <button
          type="button"
          className={formStyles.btn2}
          onClick={() => navigate(`/subtopics/${topicId}`)}
        >
          <AiOutlineArrowLeft /> Go Back
        </button>

        <button type="button" className={formStyles.btn3} onClick={handleClick}>
          Create Subtopic    <MdSubtitles />
        </button>
      </div>
    </section>
  );
}
