// import { useState } from "react";

// import { Input } from "antd";
// import AnnouncementContent from "../components/announcements/AnnouncementContent";

// import searchLogo from '../assets/pngimages/search.png';
// import FilterDropdown from "../components/utility/Filter";
// import { Link } from "react-router-dom";
// import { AiOutlinePlus } from "react-icons/ai";
// import Pagination from "../components/utility/Pagination";

// const Announcements = () => {
//   const [queries, setQueries] = useState([]);
//   const [searchTerm, setSearchTerm] = useState(null);
//   const [announcementLimit, setAnnouncementLimit] = useState(8);
//   const [totalAnnouncements, setTotalAnnouncements] = useState(0);
//   const [pageNumber, setPageNumber] = useState(1);

//   const handleChange = (value) => {
//     console.log(`selected ${value}`);
//   };

//   return (
//     <section className="bg-bgSecondary rounded-xl p-5 w-full">

//       <div className="w-full flex items-center my-2">
//         <h1 className="text-white text-3xl font-bold">Announcements</h1>
//       </div>
//       <div className="flex py-2 items-center justify-between">
//         <div className="flex gap-1">
//           <div className="flex bg-white rounded-md px-2">
//             <button>
//               <img
//                 src={searchLogo}
//                 alt="search-logo"
//                 className="h-[18px] w-[20px]"
//               />
//             </button>
//             <Input placeholder="Search here..." onChange={(e) => setSearchTerm(e.target.value)} bordered={false} />
//           </div>

//           <FilterDropdown setQueries={setQueries} />

//         </div>
//         <Link to="/add-announcement" className="bg-pink-600 flex py-[4px] px-4 items-center gap-3 rounded-lg cursor-pointer">
//           <AiOutlinePlus />
//           <h1>Add New</h1>
//         </Link>
//       </div>

//       <AnnouncementContent
//         searchTerm={searchTerm}
//         queries={queries}
//         announcementLimit={announcementLimit}
//         setTotalAnnouncements={setTotalAnnouncements}
//         pageNumber={pageNumber}
//         totalAnnouncements={totalAnnouncements}
//       />

//       {totalAnnouncements !== 0 && <div className="flex mt-4 justify-between items-center">
//         <div className="flex items-center gap-3 ">
//           <h1 className="text-[13.5px]">Show result : </h1>
//           <select
//             onChange={(e) => setAnnouncementLimit(parseInt(e.target.value))}
//             defaultValue={8}
//             className="cursor-pointer py-[5px] px-[8px] outline-none rounded-md bg-transparent border-[1px] border-gray-400 text-[14px]"
//           >
//             <option className="text-black">1</option>
//             <option className="text-black">2</option>
//             <option className="text-black">3</option>
//             <option className="text-black">4</option>
//             <option className="text-black">5</option>
//             <option className="text-black">6</option>
//             <option className="text-black">7</option>
//             <option className="text-black">8</option>
//           </select>
//         </div>

//         <div className="text-pink-600 py-1 pr-2 rounded-md">
//           <Pagination
//             totalItems={totalAnnouncements}
//             itemsPerPage={announcementLimit}
//             onPageChange={setPageNumber}
//           />
//         </div>
//       </div>}
//     </section>
//   );
// };

// export default Announcements;

import React, { useState } from "react";

import { Input } from "antd";
import AnnouncementContent from "../components/announcements/AnnouncementContent";

import searchLogo from "../assets/pngimages/search.png";
import FilterDropdown from "../components/utility/Filter";
import { Link } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import Pagination from "../components/utility/Pagination";

const Announcements = () => {
  const [queries, setQueries] = useState([]);
  const [searchTerm, setSearchTerm] = useState(null);
  const [announcementLimit, setAnnouncementLimit] = useState(8);
  const [totalAnnouncements, setTotalAnnouncements] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  return (
    <section className="bg-bgSecondary rounded-xl p-5 w-full">
      <div className="w-full flex items-center my-2">
        <h1 className="text-white text-3xl font-bold">Announcements</h1>
      </div>
      <div className="flex py-2 items-center justify-between">
        <div className="flex gap-2">
          <FilterDropdown setQueries={setQueries} />
        </div>
        <Link
          to="/add-announcement"
          className="bg-pink-600 flex py-[4px] px-2 items-center justify-center h-8 w-[200px] xs:w-[160px] gap-3 rounded-lg cursor-pointer"
        >
          <AiOutlinePlus />
          <h1>Add New</h1>
        </Link>
      </div>
      <div className="flex bg-white rounded-md px-2 w-60">
            <button>
              <img
                src={searchLogo}
                alt="search-logo"
                className="h-[18px] w-[20px]"
              />
            </button>
            <Input
              placeholder="Search here..."
              onChange={(e) => setSearchTerm(e.target.value)}
              bordered={false}
            />
          </div>

      {/* <TestTable/> */}

      <div className="w-full overflow-auto">
        <AnnouncementContent 
          searchTerm={searchTerm}
          queries={queries}
          announcementLimit={announcementLimit}
          setTotalAnnouncements={setTotalAnnouncements}
          pageNumber={pageNumber}
          totalAnnouncements={totalAnnouncements}
        />
      </div>

      {totalAnnouncements !== 0 && (
        <div className="flex mt-4 justify-between items-center">
          <div className="flex items-center gap-3 ">
            <h1 className="text-[13.5px]">Show result : </h1>
            <select
              onChange={(e) => setAnnouncementLimit(parseInt(e.target.value))}
              defaultValue={8}
              className="cursor-pointer py-[5px] px-[8px] outline-none rounded-md bg-transparent border-[1px] border-gray-400 text-[14px]"
            >
              <option className="text-black">1</option>
              <option className="text-black">2</option>
              <option className="text-black">3</option>
              <option className="text-black">4</option>
              <option className="text-black">5</option>
              <option className="text-black">6</option>
              <option className="text-black">7</option>
              <option className="text-black">8</option>
            </select>
          </div>

          <div className="text-pink-600 py-1 pr-2 rounded-md">
            <Pagination
              totalItems={totalAnnouncements}
              itemsPerPage={announcementLimit}
              onPageChange={setPageNumber}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Announcements;
