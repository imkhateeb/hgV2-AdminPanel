import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import { CgFeed } from 'react-icons/cg';
import feedsStyle from '../../constants/styles/feedsStyle';
import { useRef } from 'react';

import { createFeed } from '../../redux/slices/feedSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

export default function AddNewFeed() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const feedDesc = useRef(null);
  const tagRef = useRef(null);

  const handleClick = () => {
    dispatch(
      createFeed({
        feedDetails: feedDesc.current.value,
        tags: tagRef.current.value,
      })
    );
    navigate("/feeds")
  }

  return (
    <section className={feedsStyle.sectionStyle}>
      <div className='py-10 px-16 bg-pink-600 rounded-3xl'>
        <h1 className='text-5xl font-bold'>Feeds</h1>
      </div>
      <p className='my-5'>DETAILS</p>
      <div className='flex w-full justify-between'>
        <input
          placeholder='Event type...'
          className={feedsStyle.eventTypeInputStyle}
          ref={tagRef}
        />
        <button
          type='button'
          className={feedsStyle.btn1}
        >Set Activities <AiOutlineArrowRight /></button>
      </div>
      <p className='my-5'>DESCRIPTION</p>
      <div>
        <textarea
          rows={4}
          className={feedsStyle.textareaStyle}
          placeholder='Enter details'
          ref={feedDesc}
        />
      </div>
      <div className='flex gap-3 justify-center mt-5'>
        <button
        type='button'
        className={feedsStyle.btn2}
        ><AiOutlineArrowLeft /> Go Back</button>

        <button
        type='button'
        className={feedsStyle.btn3}
        onClick={handleClick}
        >Create Feed <CgFeed /></button>
      </div>
    </section>
  )
}