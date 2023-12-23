import { AiOutlineArrowLeft } from 'react-icons/ai';
import { CgFeed } from 'react-icons/cg';
import { FaMinusCircle } from "react-icons/fa";
import { FaPlusCircle } from "react-icons/fa";

import feedsStyle from '../../constants/styles/feedsStyle';
import { useEffect, useRef, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createWing } from '../../redux/slices/wingSlice';

import fetchAllUsers from '../../utils/getAllUser';

export default function AddNewWing() {
  const [users, setUsers] = useState(null);

  const [leadOptions, setleadOptions] = useState(null);
  const [selectedLead, setSelectedLead] = useState(null);

  const [selectedCoordinators, setSelectedCoordinators] = useState([]);
  const [coordinatorOptions, setCoordinatorOptions] = useState(null);
  const [addMoreCoordinators, setAddMoreCoordinators] = useState(false);
  const wingName = useRef(null);
  const wingDesc = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();


  useEffect(() => {
    const fetchData = async () => {
      const fetchedUsers = await fetchAllUsers();
      if (fetchedUsers) {
        setUsers(fetchedUsers);
      }
    };
    fetchData();
  }, []);


  const handleClick = () => {
    dispatch(
      createWing({
        name: wingName.current.value,
        description: wingDesc.current.value,
        lead: selectedLead._id,
        coordinators: selectedCoordinators.map((item)=>item._id),
      })
    );
    navigate("/wings");
  }

  const findLead = (e) => {
    const leadOptions = users.filter((item) => (item.name.toLowerCase().includes(e.toLowerCase()) || item.email.toLowerCase().includes(e.toLowerCase())));
    setleadOptions(leadOptions)
  }

  const findCoordinator = (e) => {
    const coordinatorOptions = users.filter((item) => ((item.name.toLowerCase().includes(e.toLowerCase()) || item.email.toLowerCase().includes(e.toLowerCase())) && !selectedCoordinators.toString().includes(item._id)));
    setCoordinatorOptions(coordinatorOptions)
  }


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

      <div className='flex gap-2'>

        <div className='my-4 relative w-1/2'>
          <p className='my-2'>LEAD</p>
          {!selectedLead && <div>
            <input
              type='text'
              className={feedsStyle.textareaStyle}
              placeholder='Enter lead name...'
              onChange={(e) => findLead(e.target.value)}
            />
          </div>}

          {selectedLead && (
            <div className='my-4 relative w-1/2 flex gap-2'>
              <p>{selectedLead.name}</p>
              <FaMinusCircle
                className='text-2xl font-bold text-red-500 hover:text-red-600 transition-all duration-200 ease-linear cursor-pointer'
                onClick={() => setSelectedLead(null)}
              />
            </div>
          )}

          {!selectedLead && <div className='absolute bg-black'>
            {leadOptions?.map((item) => (
              <div key={item._id} className='cursor-pointer px-2 py-1 hover:bg-gray-900' onClick={() => setSelectedLead(item)}>
                {item?.name}
              </div>
            ))}
          </div>}
        </div>

        {/* Coordinators */}
        <div className='my-4 relative w-1/2'>
          <p className='my-2'>COORDINATORS</p>

          {selectedCoordinators.length !== 0 && (
            <div className='my-4 relative flex gap-2 w-1/2 items-center'>
              <div className='flex gap-2 w-full flex-wrap'>
                {selectedCoordinators?.map((item) => {
                  return (
                    <div key={item._id} className='flex items-center gap-1'>
                      {item.name}
                      <FaMinusCircle
                        className='text-red-500 hover:text-red-600 transition-all duration-200 ease-linear cursor-pointer'
                        onClick={() => {
                          let newArray = selectedCoordinators;
                          newArray = newArray.filter(i => i._id !== item._id);
                          setSelectedCoordinators(newArray)
                        }}
                      />
                    </div>
                  )
                })}
              </div>
              <FaPlusCircle
                className='text-2xl font-bold text-blue-500 hover:text-blue-600 transition-all duration-200 ease-linear cursor-pointer'
                onClick={() => setAddMoreCoordinators(!addMoreCoordinators)}
              />

            </div>
          )}

          {(selectedCoordinators.length === 0 || addMoreCoordinators) &&
            <div>
              <input
                type='text'
                className={feedsStyle.textareaStyle}
                placeholder='Enter coordinator name...'
                onChange={(e) => {
                  findCoordinator(e.target.value)
                  setAddMoreCoordinators(true)
                }}
              />
            </div>
          }

          {addMoreCoordinators &&
            <div className='absolute bg-black'>
              {coordinatorOptions?.map((item) => (
                <div
                  key={item._id}
                  className='cursor-pointer px-2 py-1 hover:bg-gray-900'
                  onClick={() => {
                    let newArray = selectedCoordinators;
                    newArray.push(item)
                    setSelectedCoordinators(newArray)
                    setAddMoreCoordinators(false)
                  }}
                >
                  {item?.name}
                </div>
              ))}
            </div>
          }
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
        >Create Wing <CgFeed /></button>
      </div>
    </section>
  );
}
