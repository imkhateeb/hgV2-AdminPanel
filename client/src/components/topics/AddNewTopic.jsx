import { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import { AiOutlineArrowLeft } from 'react-icons/ai';
import { MdTopic } from "react-icons/md";
import formStyles from '../../constants/styles/styles';

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';


import { createTopic } from '../../redux/slices/topicSlice';


export default function AddNewTopic() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [fields, setFields] = useState(false);
  const { levelId } = useParams();

  const topicTitle = useRef(null);
  const topicDesc = useRef(null);

  const handleClick = () => {
    if (!levelId || !topicTitle.current.value || !topicDesc.current.value) {
      setFields(true)
      setTimeout(() => {
        setFields(false)
      }, 3000);
    } else {
      dispatch(
        createTopic({
          title: topicTitle.current.value,
          levelId,
        })
      );
      navigate(`/topics/${levelId}`);
    }
  }


  return (
    <section className={`${formStyles.sectionStyle}`}>
      <div className='py-2 text-pink-600'>
        <h1 className='text-5xl font-bold  max-xl:text-4xl max-xs:text-3xl'>New Topic</h1>
      </div>
      {fields && <p className="text-center text-lg text-red-500 font-semibold mt-4">Fill all the fields or try again!</p>}
      <div className='flex flex-col w-full my-5'>
        <p className='mb-2'>TITLE</p>
        <div className='flex w-full justify-between'>
          <input
            placeholder='Level title...'
            className={formStyles.eventTypeInputStyle}
            ref={topicTitle}
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
            ref={topicDesc}
          />
        </div>
      </div>
      <div className='flex gap-3 justify-center mt-5'>
        <button
          type='button'
          className={formStyles.btn2}
          onClick={() => navigate(`/topics/${levelId}`)}
        ><AiOutlineArrowLeft /> Go Back</button>

        <button
          type='button'
          className={formStyles.btn3}
          onClick={handleClick}
        >Create Topic <MdTopic /></button>
      </div>
    </section>
  );
}
