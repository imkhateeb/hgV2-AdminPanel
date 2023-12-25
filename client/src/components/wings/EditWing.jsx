import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { updateWing } from "../../redux/slices/wingSlice";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import feedsStyle from "../../constants/styles/feedsStyle";
import fetchAllUsers from "../../utils/getAllUser";

export default function EditWing({ setEditWing, wing }) {
  const dispatch = useDispatch();
  const [leadOptions, setLeadOptions] = useState(null);
  const [users, setUsers] = useState(null);

  const [newWingDetail, setNewWingDetail] = useState(wing?.description);
  const [newWingName, setNewWingName] = useState(wing?.name);
  const [newLead, setNewLead] = useState(wing?.lead);
  const [newCoordinators, setNewCoordinators] = useState(wing?.coordinators);
  const [coordinatorOptions, setCoordinatorOptions] = useState(null);
  const [addMoreCoordinators, setAddMoreCoordinators] = useState(false);


  const [fields, setFields] = useState(false);

  const handleSave = () => {
    if (newWingName && newWingDetail && newLead && newCoordinators.length !== 0) {

      const newwingObj = {
        name: newWingName,
        description: newWingDetail,
        lead: newLead,
        coordinators: newCoordinators
      }
      dispatch(updateWing({ id: wing?._id, updatedData: newwingObj }))
      setEditWing(false)
    } else {
      setFields(true);
      setTimeout(() => {
        setFields(false)
      }, 3000);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const fetchedUsers = await fetchAllUsers();
      if (fetchedUsers) {
        setUsers(fetchedUsers);
      }
    };
    fetchData();
  }, []);

  const findLead = (e) => {
    const leadOptions = users.filter((item) => (item.name.toLowerCase().includes(e.toLowerCase()) || item.email.toLowerCase().includes(e.toLowerCase())));
    setLeadOptions(leadOptions)
  }

  const findCoordinator = (e) => {
    const coordinatorOptions = users.filter((item) => ((item.name.toLowerCase().includes(e.toLowerCase()) || item.email.toLowerCase().includes(e.toLowerCase())) && !newCoordinators.toString().includes(item._id)));
    setCoordinatorOptions(coordinatorOptions)
  }

  return (
    <div
      className="w-11/12 sm:w-5/6 md:w-2/3 lg:w-1/3 bg-bgSecondary rounded-3xl p-5 z-20 cursor-default"
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
      }}
    >
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold">Update wing</h1>
        {fields && <p className="my-4 text-red-500 text-center">Fill all the fields</p>}
        <div className="my-4 flex flex-col gap-2">
          <p>WING NAME</p>
          <input
            className="py-1 px-3 bg-transparent rounded-md border-[1px] border-gray-400 outline-none"
            value={newWingName}
            placeholder="Input new name..."
            onChange={(e) => setNewWingName(e.target.value)}
          />
        </div>
        <div className="mb-4 flex flex-col gap-2">
          <p>DESCRIPTION</p>
          <textarea
            rows={4}
            className="py-1 px-3 bg-transparent rounded-md border-[1px] border-gray-400 outline-none"
            value={newWingDetail}
            placeholder="Input new description..."
            onChange={(e) => setNewWingDetail(e.target.value)}
          />
        </div>
        <div className="mb-4 flex flex-col">
          <p>LEAD</p>
          {!newLead && <div>
            <input
              type='text'
              className={feedsStyle.textareaStyle}
              placeholder='Enter lead name...'
              onChange={(e) => findLead(e.target.value)}
            />
          </div>}


          {newLead && (
            <div className='relative mb-4 flex gap-2 items-center'>
              <p>{newLead.name}</p>
              <FaMinusCircle
                className='text-lg font-bold text-red-500 hover:text-red-600 transition-all duration-200 ease-linear cursor-pointer'
                onClick={() => setNewLead(null)}
              />
            </div>
          )}

          {!newLead && <div className='absolute bg-black z-20'>
            {leadOptions?.map((item) => (
              <div key={item._id} className='cursor-pointer px-2 py-1 hover:bg-gray-900' onClick={() => setNewLead(item)}>
                {item?.name}
              </div>
            ))}
          </div>}
        </div>

        <div className='mb-4 relative gap-2'>
          <p>COORDINATORS</p>
          {newCoordinators.length !== 0 && (
            <div className='relative flex gap-2 items-center'>
              <div className='flex gap-2 flex-wrap'>
                {newCoordinators?.map((item) => {
                  return (
                    <div key={item._id} className='flex items-center gap-1'>
                      {item.name}
                      <FaMinusCircle
                        className='text-red-500 hover:text-red-600 transition-all duration-200 ease-linear cursor-pointer'
                        onClick={() => {
                          let newArray = newCoordinators;
                          newArray = newArray.filter(i => i._id !== item._id);
                          setNewCoordinators(newArray)
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

          {(newCoordinators.length === 0 || addMoreCoordinators) &&
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
            <div className='absolute bg-black z-20'>
              {coordinatorOptions?.map((item) => (
                <div
                  key={item._id}
                  className='cursor-pointer px-2 py-1 hover:bg-gray-900'
                  onClick={() => {
                    let newArray = [...newCoordinators];
                    newArray.push(item);
                    setNewCoordinators(newArray);
                    setAddMoreCoordinators(false);
                  }}

                >
                  {item?.name}
                </div>
              ))}
            </div>
          }
        </div>
      </div>
      <div className="z-20 opacity-100 flex gap-3">
        <button
          type="button"
          className="py-1 px-3 rounded-md cursor-pointer bg-pink-600 hover:bg-pink-500 text-white transition-all duration-200 ease-linear"
          onClick={handleSave}
        >Save</button>
        <button
          type="button"
          className="py-1 px-3 rounded-md cursor-pointer bg-slate-800 hover:bg-bgTertiary text-white transition-all duration-200 ease-linear"
          onClick={() => setEditWing(false)}
        >Cancel</button>
      </div>
    </div>
  )
}
