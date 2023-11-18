import { useState } from 'react';

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
      <div className="relative inline-block text-black flex gap-1">
         <button onClick={toggleDropdown} className="px-3 py-[4px] bg-gray-200 hover:bg-gray-300 rounded cursor-pointer w-24">
            Filter
         </button>
         {showDropdown && (
            <div className="absolute left-0 mt-8 bg-white border rounded shadow w-24">
               {options.map(option => (
                  <div key={option} onClick={() => handleSelect(option)} className={`px-3 py-[4px] my-[2px] hover:bg-pink-500 transition-all duration-200 cursor-pointer ${selectedOptions.toString().includes(option) && 'bg-pink-500'}`}>
                     {option}
                  </div>
               ))}
            </div>
         )}

         <div className="flex flex-wrap gap-1">
            {selectedOptions.map((option, index) => (
               <span
                  key={option}
                  onClick={() => removeFilter(option)}
                  className={`inline-flex items-center rounded-md bg-${colors[index]}-50 px-2 py-[4px] text-sm font-medium text-${colors[index]}-600 ring-1 ring-inset ring-${colors[index]}-500/10 cursor-pointer w-16 justify-center`}
               >{option}</span>
            ))}
         </div>
      </div>
   );
};

export default FilterDropdown;