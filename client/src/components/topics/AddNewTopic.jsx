import { useRef } from 'react';
import { useParams } from 'react-router-dom';

import { AiOutlineArrowLeft } from 'react-icons/ai';
import { CgFeed } from 'react-icons/cg';
import feedsStyle from '../../constants/styles/styles';

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';


import { createTopic } from '../../redux/slices/topicSlice';


export default function AddNewTopic() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { levelId } = useParams();

  const topicTitle = useRef();

  const handleClick = () => {
    dispatch(
      createTopic({
        title: topicTitle.current.value,
        levelId,
      })
    );
    navigate(`/topics/${levelId}`);
  }


  return (
    <section className={`${feedsStyle.sectionStyle} w-full`}>
      <div className='py-10 px-16 bg-pink-600 rounded-3xl'>
        <h1 className='text-5xl font-bold'>Add New Wing</h1>
      </div>
      <div className='my-4 w-full'>
        <p className='my-2'>TITLE</p>
        <div className='flex w-full justify-between'>
          <input
            placeholder='Input title...'
            className={feedsStyle.eventTypeInputStyle}
            ref={topicTitle}
          />
        </div>
      </div>
      <div className='flex gap-3 justify-center mt-5'>
        <button
          type='button'
          className={feedsStyle.btn2}
          onClick={() => navigate(`/topics/${levelId}`)}
        ><AiOutlineArrowLeft /> Go Back</button>

        <button
          type='button'
          className={feedsStyle.btn3}
          onClick={handleClick}
        >Create Topic <CgFeed /></button>
      </div>
    </section>
  );
}
