import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { Input } from "antd";

import { Link } from "react-router-dom";
import FeedContent from "../components/feeds/FeedContent";
import Pagination from "../components/utility/Pagination";
import FilterDropdown from "../components/utility/Filter";

import searchLogo from '../assets/pngimages/search.png';


const Feeds = () => {
  const [queries, setQueries] = useState([]);
  const [searchTerm, setSearchTerm] = useState(null);
  const [feedLimit, setFeedLimit] = useState(8);
  const [totalFeeds, setTotalFeeds] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);



  return (
    <section className="bg-bgSecondary rounded-3xl p-5 w-full">
      <div className="w-full flex items-center my-2">
        <h1 className="text-white text-3xl font-bold">Feeds</h1>
      </div>
      <div className="flex py-2 items-center justify-between">
        <div className="flex gap-1">
          <div className="flex bg-white rounded-md px-2">
            <button>
              <img 
                src={searchLogo}
                alt="search-logo"
                className="h-[18px] w-[20px]"
              />
            </button>
            <Input placeholder="Search here..." onChange={(e) => setSearchTerm(e.target.value)} bordered={false} />
          </div>
          <FilterDropdown setQueries={setQueries} />
        </div>
        <Link to="/add-feed" className="bg-pink-600 flex py-[4px] px-4 items-center gap-3 rounded-lg cursor-pointer">
          <AiOutlinePlus />
          <h1>Add New</h1>
        </Link>
      </div>

      <div className="w-full overflow-auto">
      <FeedContent
        searchTerm={searchTerm}
        queries={queries}
        feedLimit={feedLimit}
        setTotalFeeds={setTotalFeeds}
        pageNumber={pageNumber}
        totalFeeds={totalFeeds}
      />
      </div>

      {totalFeeds !== 0 && <div className="flex mt-4 justify-between items-center">
        <div className="flex items-center gap-3 ">
          <h1>Show result : </h1>
          <select
            onChange={(e) => setFeedLimit(parseInt(e.target.value))}
            defaultValue={8}
            className="cursor-pointer py-[2px] px-[5px] outline-none rounded-md bg-transparent border-[1px] border-gray-400"
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
            totalItems={totalFeeds}
            itemsPerPage={feedLimit}
            onPageChange={setPageNumber}
          />
        </div>
      </div>}
    </section>
  );
};

export default Feeds;