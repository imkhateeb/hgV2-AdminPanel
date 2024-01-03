import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import filterLogo from "../../assets/pngimages/filter.png";

const FilterDropdown = ({ setQueries }) => {
  // const options = [
  //   "sd",
  //   "cp",
  //   "ml",
  //   "iot",
  //   "robotics",
  //   "pdm",
  //   "web3",
  //   "cybersec",
  // ];
  const options = ["SD", "CP", "ML", "IOT", "Robotics", "UI/UX", "Web3", "CS"];

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const handleSelect = (option) => {
    if (!selectedOptions.includes(option)) {
      setSelectedOptions([...selectedOptions, option]);
      setQueries([...selectedOptions, option]);
    } else {
      setSelectedOptions(
        [...selectedOptions].filter((item) => item !== option)
      );
      setQueries([...selectedOptions].filter((item) => item !== option));
    }
    setShowDropdown(false);
  };

  const removeFilter = (filter) => {
    setSelectedOptions(selectedOptions.filter((option) => option !== filter));
    setQueries(selectedOptions.filter((option) => option !== filter));
  };

  return (
    <div className="flex gap-1 z-100 flex-col">
      <div className="relative bg-white w-[110px] rounded-md ">
        <button
          onClick={toggleDropdown}
          className={`py-[4px] pl-3 cursor-pointer flex gap-2 items-center transition-all text-[14px] duration-200 ease-linear text-slate-500 font-semibold `}
        >
          <img
            src={filterLogo}
            alt="filter-logo"
            className="h-[17px] w-[17px]"
          />
          Filter
          {showDropdown ? (
            <IoIosArrowUp className="ml-2" />
          ) : (
            <IoIosArrowDown className="ml-2" />
          )}
        </button>
        {showDropdown && (
          <div className=" absolute rounded-md my-[2px]  bg-white shadow w-28 text-[14px] text-black">
            {options.map((option) => (
              <div
                key={option}
                onClick={() => handleSelect(option)}
                className={`px-3 py-[4px] my-[1px] rounded-md  flex gap-[7px] items-centerhover:bg-gray-100 transition-all duration-200 font-[500] cursor-pointer ${
                  selectedOptions.toString().includes(option) &&
                  "text-[#EE2B7A] bg-gray-200"
                }`}
              >
                <input
                  id="options"
                  name="options"
                  type="checkbox"
                  checked={selectedOptions.toString().includes(option)}
                  className="h-4 w-4 rounded border-gray-100 outline-none custom-checkbox"
                />
                {option}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-1">
        {selectedOptions.map((option) => {
          return (
            <span
              key={option}
              className="py-1 pl-3 pr-2 text-[14px] bg-slate-700 rounded-md flex items-center gap-1 text-white"
            >
              {option}
              <div className="p-[2px] bg-slate-600 hover:bg-slate-500 rounded-full transition-all duration-200 ease-linear">
                <RxCross2
                  onClick={() => removeFilter(option)}
                  className="cursor-pointer text-sm font-bold"
                />
              </div>
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default FilterDropdown;
