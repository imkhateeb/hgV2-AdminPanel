import { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import { AiOutlineArrowLeft } from 'react-icons/ai';
import { MdAssignmentAdd } from "react-icons/md";
import formStyles from '../../constants/styles/styles';

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createAssignment } from '../../redux/slices/assignmentSlice';

export default function AddNewTopic() {
  const [fields, setFields] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { levelId } = useParams();

  const assignmentName = useRef(null)
  const assignmentDesc = useRef(null);

  const handleClick = () => {
    if (assignmentName.current.value && assignmentDesc.current.value && levelId) {
      dispatch(
        createAssignment({
          name: assignmentName.current.value,
          description: assignmentDesc.current.value,
          levelId,
        })
      );
      navigate(`/assignments/${levelId}`);
    } else {
      setFields(true)
      setTimeout(() => {
        setFields(false);
      }, 3000);
    }
  }


  return (
    <section className={`${formStyles.sectionStyle}`}>
      <div className='py-2 text-pink-600'>
        <h1 className='text-5xl font-bold  max-xl:text-4xl max-xs:text-3xl'>New Assignment</h1>
      </div>
      {fields && <p className='text-center text-red-500 font-bold mt-2'>Fill all the fields or try again!</p>}
      <div className='flex flex-col w-full my-5'>
        <p className='mb-2'>TITLE</p>
        <div className='flex w-full justify-between'>
          <input
            placeholder='Level title...'
            className={formStyles.eventTypeInputStyle}
            ref={assignmentName}
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
            ref={assignmentDesc}
          />
        </div>
      </div>
      <div className='flex gap-3 justify-center mt-5'>
        <button
          type='button'
          className={formStyles.btn2}
          onClick={() => navigate(`/assignments/${levelId}`)}
        ><AiOutlineArrowLeft /> Go Back</button>

        <button
          type='button'
          className={formStyles.btn3}
          onClick={handleClick}
        >Create Assignment <MdAssignmentAdd /></button>
      </div>
    </section>
  );
}