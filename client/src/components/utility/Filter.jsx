import { useState } from 'react';
import { RxCross2 } from "react-icons/rx";

const FilterDropdown = ({ setQueries }) => {
   const options = [
      'sd', 'cp', 'ml', 'iot',
      'robotics', 'pdm', 'web3', 'cybersec'
   ];
   const colors = [
      'gray', 'red', 'yellow', 'green', 'blue', 'indigo', 'purple', 'pink'
   ]
   const [selectedOptions, setSelectedOptions] = useState([]);
   const [showDropdown, setShowDropdown] = useState(false);

   const toggleDropdown = () => setShowDropdown(!showDropdown);

   const handleSelect = (option) => {

      if (!selectedOptions.includes(option)) {
         setSelectedOptions([...selectedOptions, option]); setQueries([...selectedOptions, option])
      } else {
         setSelectedOptions([...selectedOptions].filter((item) => item !== option));
         setQueries([...selectedOptions].filter((item) => item !== option))
      }
      setShowDropdown(false);
   };

   const removeFilter = (filter) => {
      setSelectedOptions(selectedOptions.filter(option => option !== filter));
      setQueries(selectedOptions.filter(option => option !== filter))

   };

   return (
      <div className="relative inline-block flex gap-1">
         <button onClick={toggleDropdown} className="px-3 py-[4px] bg-gray-200 hover:bg-gray-300 rounded cursor-pointer w-24 text-black">
            Filter
         </button>
         {showDropdown && (
            <div className="absolute left-0 mt-8 bg-white border rounded shadow w-24 text-black">
               {options.map(option => (
                  <div key={option} onClick={() => handleSelect(option)} className={`px-3 py-[4px] my-[2px] hover:bg-pink-600 transition-all duration-200 cursor-pointer ${selectedOptions.toString().includes(option) && 'bg-pink-500'}`}>
                     {option}
                  </div>
               ))}
            </div>
         )}

         <div className="flex flex-wrap gap-1">
            {selectedOptions.map((option) => {
               return (
               <span
                  key={option}
                  className='py-1 pl-3 pr-2 bg-slate-600 rounded-full text-black flex items-center gap-1 text-white'
               >
               {option.toUpperCase()}
                  <div className='p-[2px] bg-gray-400 rounded-full'>

                  <RxCross2 
                     onClick={()=>removeFilter(option)}
                     className='cursor-pointer text-black text-sm font-bold'
                  />
                  </div>
               </span>
            )})
            }
         </div>
      </div>
   );
};

export default FilterDropdown;