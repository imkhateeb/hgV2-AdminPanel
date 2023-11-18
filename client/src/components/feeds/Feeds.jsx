import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BiDotsHorizontalRounded, BiSort } from "react-icons/bi";
import { BsFilterRight } from "react-icons/bs";
import { SearchOutlined } from "@ant-design/icons";
import { Input, Select, Pagination, ConfigProvider } from "antd";

import feedsStyle from "../../constants/styles/feedsStyle";

import { Link } from "react-router-dom";
import FeedContent from "./FeedContent";

const Feeds = () => {
  return (
    <section className="bg-bgSecondary rounded-3xl px-7 w-full">
      <div className="w-full h-16 flex items-center">
        <h1 className="text-white text-3xl font-semibold">Feeds</h1>
      </div>
      <div className="flex h-16  items-center justify-between">
        <div className="flex bg-white rounded-md px-2">
          <button>
            {" "}
            <SearchOutlined className="text-black " />
          </button>
          <Input placeholder="Search here" className="" bordered={false} />
        </div>
        <div className="flex items-center gap-4 -ml-16">
          <div className="flex items-center border-2 w-20 bg-white rounded-md h-8 gap-2 px-2">
            <BsFilterRight className="text-black" size={20} />
            <p className="text-[14px] text-[#718096]">Filters</p>
          </div>
          <span className={`${feedsStyle.badgestag} text-green-700`}>
            UI/UX
          </span>
          <span className={`${feedsStyle.badgestag} text-purple-700`}>
            SD
          </span>
          <span className={`${feedsStyle.badgestag} text-red-700`}>
            Blockchain
          </span>
          <span className={`${feedsStyle.badgestag} text-yellow-700`}>
            AI/ML
          </span>
        </div>
        <Link to="/add-feeds" className="bg-pink-600 flex px-4 items-center h-[2.1rem] gap-3 rounded-lg cursor-pointer">
          <AiOutlinePlus />
          <h1>Add New</h1>
        </Link>
      </div>

      <FeedContent />

      <div className="flex  h-16 my-6 justify-between items-center">
        <div className="flex items-center gap-3 ">
          <h1>Show result : </h1>
          <Select
            defaultValue="1"
            options={[
              { value: "1", label: "1" },
              { value: "2", label: "2" },
              { value: "3", label: "3" },
            ]}
          />
        </div>
        <div className="">
          {/* <Pagination defaultCurrent={1} total={50} itemRender={()=>{
              [1,2,3].map((e)=>{
                   return <p>{e}</p>
              })
            }} /> */}
        </div>
      </div>
    </section>
  );
};

export default Feeds;