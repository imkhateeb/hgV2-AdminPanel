import { AiOutlineArrowLeft } from 'react-icons/ai';
import { SiLevelsdotfyi } from "react-icons/si";
import { useRef, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createLevel } from '../../redux/slices/levelSlice';
import formStyles from '../../constants/styles/styles';


export default function AddNewLevel() {
  const { wingId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [fields, setFields] = useState(false);

  const levelTitle = useRef(null);
  const levelDesc = useRef(null);

  const handleClick = () => {
    if (!wingId || !levelDesc.current.value || !levelTitle.current.value) {
      setFields(true)
      setTimeout(() => {
        setFields(false)
      }, 3000);
    } else {
      dispatch(
        createLevel({
          wingId,
          title: levelTitle.current.value,
        })
      );
      navigate(`/levels/${wingId}`)
    }
  }

  return (
    <section className={formStyles.sectionStyle}>
      <div className='py-2 text-pink-600'>
        <h1 className='text-5xl font-bold  max-xl:text-4xl max-xs:text-3xl'>New Level</h1>
      </div>
      {fields && <p className="text-center text-lg text-red-500 font-semibold mt-4">Fill all the fields or try again!</p>}
      <div className='flex flex-col w-full my-5'>
        <p className='mb-2'>TITLE</p>
        <div className='flex w-full justify-between'>
          <input
            placeholder='Level title...'
            className={formStyles.eventTypeInputStyle}
            ref={levelTitle}
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
            ref={levelDesc}
          />
        </div>
      </div>
      <div className='flex gap-3 justify-center mt-5'>
        <button
          type='button'
          className={formStyles.btn2}
          onClick={() => navigate(`/levels/${wingId}`)}
        ><AiOutlineArrowLeft /> Go Back</button>

        <button
          type='button'
          className={formStyles.btn3}
          onClick={handleClick}
        >Create Level <SiLevelsdotfyi /></button>
      </div>
    </section>
  )
}