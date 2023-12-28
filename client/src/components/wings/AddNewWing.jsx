import { AiOutlineArrowLeft } from 'react-icons/ai';
import { FaMinusCircle } from "react-icons/fa";
import { FaPlusCircle } from "react-icons/fa";
import { GiFluffyWing } from "react-icons/gi";

import { useEffect, useRef, useState } from 'react';
import formStyles from '../../constants/styles/styles';

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createWing } from '../../redux/slices/wingSlice';

import fetchAllUsers from '../../utils/getAllUser';

export default function AddNewWing() {
  const [users, setUsers] = useState(null);
  const [fields, setFields] = useState(false);

  const [leadOptions, setleadOptions] = useState([]);
  const [selectedLead, setSelectedLead] = useState(null);

  const [selectedCoordinators, setSelectedCoordinators] = useState([]);
  const [coordinatorOptions, setCoordinatorOptions] = useState([]);
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
    if (!wingName.current.value || !wingDesc.current.value || !selectedLead._id || !selectedCoordinators.length) {
      setFields(true)
      setTimeout(() => {
        setFields(false)
      }, 3000);
    } else {
      dispatch(
        createWing({
          name: wingName.current.value,
          description: wingDesc.current.value,
          lead: selectedLead._id,
          coordinators: selectedCoordinators.map((item) => item._id),
        })
      );
      navigate("/wings");
    }
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
    <section className={`${formStyles.sectionStyle}`}>
      <div className='py-2 text-pink-600'>
        <h1 className='text-5xl font-bold  max-xl:text-4xl max-xs:text-3xl'>New Wing</h1>
      </div>
      {fields && <p className="text-center text-lg text-red-500 font-semibold mt-4">Fill all the fields!</p>}
      <div className='flex flex-col w-full my-5'>
        <p className='mb-2'>NAME</p>
        <div className='flex w-full justify-between'>
          <input
            placeholder='Wing name...'
            className={formStyles.eventTypeInputStyle}
            ref={wingName}
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
            ref={wingDesc}
          />
        </div>
      </div>

      <div className='flex max-xs:flex-col xs:gap-5 w-full my-5'>
        <div className='relative w-1/2 max-xs:w-full max-xs:mb-5'>
          <p className='mb-2'>LEAD</p>
          {!selectedLead && <div>
            <input
              type='text'
              className={formStyles.eventTypeInputStyle}
              placeholder='Enter lead name...'
              onChange={(e) => findLead(e.target.value)}
            />
          </div>}

          {selectedLead && (
            <div className='relative w-full flex gap-2'>
              <p>{selectedLead.name}</p>
              <FaMinusCircle
                className='text-2xl font-bold text-red-500 hover:text-red-600 transition-all duration-200 ease-linear cursor-pointer'
                onClick={() => setSelectedLead(null)}
              />
            </div>
          )}

          {!!leadOptions.length &&
            <div className='absolute top-20 w-full h-40 overflow-hidden bg-black rounded-md overflow-y-auto'>

              <button
                onClick={() => setleadOptions([])}
                type='button'
                className='py-1 px-2 absolute right-0 bg-red-600 rounded-md text-white cursor-pointer hover:bg-red-500'>
                Cancel
              </button>

              {leadOptions?.map((item) => (
                <div key={item._id} className='cursor-pointer px-2 py-1 hover:bg-gray-900' onClick={() => {
                  setSelectedLead(item)
                  setleadOptions([])
                }}>
                  {item?.name}
                </div>
              ))}
            </div>
          }

        </div>

        {/* Coordinators */}
        <div className='relative w-1/2 max-xs:w-full'>
          <p className='mb-2'>COORDINATORS</p>
          {(selectedCoordinators.length === 0 || addMoreCoordinators) &&
            <div>
              <input
                type='text'
                className={formStyles.textareaStyle}
                placeholder='Enter coordinator name...'
                onChange={(e) => {
                  findCoordinator(e.target.value)
                  setAddMoreCoordinators(true)
                }}
              />
            </div>
          }
          {selectedCoordinators.length !== 0 && (
            <div className='relative flex gap-2 w-full items-center'>
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
                className='text-3xl text-blue-500 hover:text-blue-600 transition-all duration-200 ease-linear cursor-pointer'
                onClick={() => setAddMoreCoordinators(!addMoreCoordinators)}
              />

            </div>
          )}

          {addMoreCoordinators && !!coordinatorOptions.length &&
            <div className='absolute top-20 w-full h-40 overflow-hidden bg-black rounded-md overflow-y-auto'>

              <button
                onClick={() => setAddMoreCoordinators(false)}
                type='button'
                className='py-1 px-2 absolute right-0 bg-red-600 rounded-md text-white cursor-pointer hover:bg-red-500'>
                Cancel
              </button>

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
          className={formStyles.btn2}
          onClick={() => navigate("/wings")}
        ><AiOutlineArrowLeft /> Go Back</button>

        <button
          type='button'
          className={formStyles.btn3}
          onClick={handleClick}
        >Create Wing <GiFluffyWing /></button>
      </div>
    </section>
  );
}
