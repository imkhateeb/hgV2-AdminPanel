import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BiDotsHorizontalRounded, BiSort } from "react-icons/bi";
import { BsFilterRight } from "react-icons/bs";
import { SearchOutlined } from "@ant-design/icons";
import { Input, Select, Tag, Pagination, ConfigProvider } from "antd";

import { Link } from "react-router-dom";
import FeedContent from "../components/feeds/FeedContent";


const tagRender = (props) => {
  const { label, value, closable, onClose } = props;
  const onPreventMouseDown = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <Tag
      color="black"
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{
        marginRight: 3,
      }}
    >
      {label}
    </Tag>
  );
};

const Feeds = () => {
  const [queries, setQueries] = useState([]);
  const [searchTerm, setSearchTerm] = useState(null);

  const options = [{ value: "ui", }, { value: "ml",}, { value: "sd", }, { value: "cp", }, { value: "iot", }, { value: "cyb", },];

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
          <Input placeholder="Search here..." onChange={(e)=>setSearchTerm(e.target.value)} bordered={false} />
        </div>
        <div className="flex bg-white rounded-md">
          <div className="flex items-center w-20 gap-2 px-2">
            <BsFilterRight className="text-black" size={20} />
            <p className="text-[14px] text-[#718096]">Filters</p>
          </div>
          <Select
            mode="multiple"
            tagRender={tagRender}
            defaultValue={[]}
            onChange={(e) => setQueries(e)}
            className="outline-none border-none bg-transparent cursor-pointer"
            options={options}
          />
        </div>
        <Link to="/add-feeds" className="bg-pink-600 flex px-4 items-center h-[2.1rem] gap-3 rounded-lg cursor-pointer">
          <AiOutlinePlus />
          <h1>Add New</h1>
        </Link>
      </div>

      <FeedContent 
        searchTerm={searchTerm}
        queries={queries}
      />

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
