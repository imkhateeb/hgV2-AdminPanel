import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { AiOutlineArrowLeft } from 'react-icons/ai';
import { CgFeed } from 'react-icons/cg';
import feedsStyle from '../../constants/styles/feedsStyle';

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createAssignment } from '../../redux/slices/assignmentSlice';

export default function AddNewTopic() {
  const [fields, setFields] = useState(false);
  const [assignmentName, setAssignmentName] = useState(null);
  const [assignmentDesc, setAssignmentDesc] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { levelId } = useParams();

  const handleClick = () => {
    if (assignmentName && assignmentDesc) {

      dispatch(
        createAssignment({
          name: assignmentName,
          description: assignmentDesc,
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
    <section className={`${feedsStyle.sectionStyle} w-full`}>
      <div className='py-10 px-16 bg-pink-600 rounded-3xl'>
        <h1 className='text-5xl font-bold'>New Assignment</h1>
      </div>
      {fields && <p className='text-center text-red-500 font-bold mt-2'>Fill all the fields</p>}
      <div className='my-4 w-full'>
        <p className='my-2'>NAME</p>
        <div className='flex w-full justify-between'>
          <input
            placeholder='Input title...'
            className={feedsStyle.eventTypeInputStyle}
            onChange={(e)=>setAssignmentName(e.target.value)}
          />
        </div>
      </div>
      <div className='my-4 w-full'>
        <p className='my-2'>DESCRIPTION</p>
        <div className='flex w-full justify-between'>
          <input
            placeholder='Input title...'
            className={feedsStyle.eventTypeInputStyle}
            onChange={(e)=>setAssignmentDesc(e.target.value)}
          />
        </div>
      </div>
      <div className='flex gap-3 justify-center mt-5'>
        <button
          type='button'
          className={feedsStyle.btn2}
          onClick={() => navigate(`/assignments/${levelId}`)}
        ><AiOutlineArrowLeft /> Go Back</button>

        <button
          type='button'
          className={feedsStyle.btn3}
          onClick={handleClick}
        >Create Assignment <CgFeed /></button>
      </div>
    </section>
  );
}
