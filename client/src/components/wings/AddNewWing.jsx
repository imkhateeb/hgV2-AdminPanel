import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import { CgFeed } from 'react-icons/cg';
import feedsStyle from '../../constants/styles/feedsStyle';
import { useRef } from 'react';

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createWing } from '../../redux/slices/wingSlice';

export default function AddNewWing() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const wingName = useRef(null);
  const wingDesc = useRef(null);
  const wingLead = useRef(null);
  const wingCoordinators = useRef(null);

  const handleClick = () => {
    dispatch(
      createWing({
        name: wingName.current.value,
        description: wingDesc.current.value,
        lead: wingLead.current.value,
        coordinators: wingCoordinators.current.value,
      })
    );
    navigate("/wings")
  }

  console.log(100);
  return (
    <section className={feedsStyle.sectionStyle}>
      <div className='py-10 px-16 bg-pink-600 rounded-3xl'>
        <h1 className='text-5xl font-bold'>Add New Wing</h1>
      </div>
      <div className='my-4'>
        <p className='my-2'>NAME</p>
        <div className='flex w-full justify-between'>
          <input
            placeholder='Event type...'
            className={feedsStyle.eventTypeInputStyle}
            ref={wingName}
          />
        </div>
      </div>
      <div className='my-4'>
        <p className='my-2'>DESCRIPTION</p>
        <div>
          <textarea
            rows={4}
            className={feedsStyle.textareaStyle}
            placeholder='Enter details'
            ref={wingDesc}
          />
        </div>
      </div>
      <div className='my-4'>
        <p className='my-2'>LEAD</p>
        <div>
          <input
            type='text'
            className={feedsStyle.textareaStyle}
            placeholder='Enter details'
            ref={wingDesc}
          />
        </div>
      </div>
      <div className='flex gap-3 justify-center mt-5'>
        <button
          type='button'
          className={feedsStyle.btn2}
          onClick={() => navigate("/wings")}
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