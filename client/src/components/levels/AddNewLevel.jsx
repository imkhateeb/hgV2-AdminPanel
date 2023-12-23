import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import { CgFeed } from 'react-icons/cg';
import feedsStyle from '../../constants/styles/feedsStyle';
import { useRef } from 'react';

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createLevel } from '../../redux/slices/levelSlice';


export default function AddNewLevel() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const levelTitle = useRef(null);

  const handleClick = () => {
    dispatch(
      createLevel({
        wingId : '6585cafdb35c9e93e4553462',
        title: levelTitle.current.value,
      })
    );
    navigate("/levels")
  }

  return (
    <section className={feedsStyle.sectionStyle}>
      <div className='py-10 px-16 bg-pink-600 rounded-3xl'>
        <h1 className='text-5xl font-bold'>Add New Level</h1>
      </div>
      <div className='my-4'>
        <p className='my-2'>Title</p>
        <div className='flex w-full justify-between'>
          <input
            placeholder='Level title...'
            className={feedsStyle.eventTypeInputStyle}
            ref={levelTitle}
          />
        </div>
      </div>
      <div className='flex gap-3 justify-center mt-5'>
        <button
          type='button'
          className={feedsStyle.btn2}
          onClick={() => navigate("/levels")}
        ><AiOutlineArrowLeft /> Go Back</button>

        <button
          type='button'
          className={feedsStyle.btn3}
          onClick={handleClick}
        >Create Level <CgFeed /></button>
      </div>
    </section>
  )
}