import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BsFilterRight } from "react-icons/bs";
import { SearchOutlined } from "@ant-design/icons";
import { Input, Select, Tag } from "antd";
import { Link } from "react-router-dom";

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

const AnnouncementHeader = ({ handleQuery, handleSearch }) => {
  const options = [
    {
      //   value: "gold",
      value: "ui",
    },
    {
      //   value: "lime",
      value: "ml",
    },
    {
      //   value: "green",
      value: "sd",
    },
    {
      //   value: "cyan",
      value: "cp",
    },
    {
      //   value: "blue",
      value: "iot",
    },
    {
      //   value: "purple",
      value: "cyb",
    },
  ];

  return (
    <>
      <div className="w-full h-16 flex items-center">
        <h1 className="text-white text-3xl font-semibold">Announcements</h1>
      </div>
      <div className="flex h-16  items-center justify-between ">
        <div className="flex bg-white rounded-md px-2">
          <button>
            {" "}
            <SearchOutlined className="text-black " />
          </button>
          <Input
            placeholder="Search here"
            className=""
            bordered={false}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        {/* 
        <div className="flex items-center gap-4 -ml-16">
          <div className="flex items-center border-2 w-20 bg-white rounded-md h-8 gap-2 px-2">
            <BsFilterRight className="text-black" size={20} />
            <p className="text-[14px] text-[#718096]">Filters</p>
          </div>
          <span className="inline-flex items-center rounded-md bg-green-50 px-3 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
            UI/UX
          </span>
          <span className="inline-flex items-center rounded-md bg-green-50 px-3 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-green-600/20">
            SD
          </span>
          <span className="inline-flex items-center rounded-md bg-green-50 px-3 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-green-600/20">
            Blockchain
          </span>
          <span className="inline-flex items-center rounded-md bg-green-50 px-3 py-1 text-xs font-medium text-yellow-700 ring-1 ring-inset ring-green-600/20">
            AI/ML
          </span>
        </div> */}

        <div className="flex bg-white rounded-md">
          <div className="flex items-center w-20 gap-2 px-2">
            <BsFilterRight className="text-black" size={20} />
            <p className="text-[14px] text-[#718096]">Filters</p>
          </div>
          <Select
            mode="multiple"
            tagRender={tagRender}
            defaultValue={[]}
            onChange={(e) => handleQuery(e)}
            className="outline-none border-none bg-transparent cursor-pointer"
            options={options}
          />
        </div>

        <Link
          to="/add-announcement"
          className="bg-pink-600 flex px-4 items-center h-[2.1rem] gap-3 rounded-lg cursor-pointer"
        >
          <AiOutlinePlus />
          <h1>Add New</h1>
        </Link>
      </div>
    </>
  );
};

export default AnnouncementHeader;
