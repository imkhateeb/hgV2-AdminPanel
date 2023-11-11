import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import axios from "axios";
import { AiOutlinePlus } from "react-icons/ai";
import { BiDotsHorizontalRounded, BiSort } from "react-icons/bi";
import { BsFilterRight } from "react-icons/bs";
import { SearchOutlined } from "@ant-design/icons";
import { Input, Select, Pagination, ConfigProvider } from "antd";
import {useSelector,useDispatch} from 'react-redux'
import { fetchAnnouncements } from "../../redux/slices/announcementSlice";
const Announcements = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.announcements);
  useEffect(() => {
    dispatch(fetchAnnouncements());
  }, []);
  console.log(data);
  return (
      <section className="bg-bgSecondary rounded-3xl px-7 w-full">
        <div className="w-full h-16 flex items-center">
          <h1 className="text-white text-3xl font-semibold">Announcements</h1>
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
          </div>
          <Link to="/add-announcement" className="bg-pink-600 flex px-4 items-center h-[2.1rem] gap-3 rounded-lg cursor-pointer">
            <AiOutlinePlus />
            <h1>Add New</h1>
          </Link>
        </div>
        <table className="w-full mt-4 overflow-x-scroll">
          <tr className=" border-t-2 h-14">
            <th className="text-left w-[20%] text-[15px]">USER</th>
            <th className="text-left w-[40%] text-[15px]">DESCRIPTION</th>
            <th className="text-left w-[20%] ">
              <div className="flex items-center gap-2 text-[15px]">
                <h1>CREATED ON</h1>
                <BiSort />
              </div>
            </th>
            <th className="text-left w-[10%] text-[15px]">STATUS</th>
            <th className="text-left w-[10%] text-[15px]">ACTION</th>
          </tr>
          <tr className="border-t-2 h-14">
            <td>Siva</td>
            <td>There is an event on sunday</td>
            <td>10-20-3003</td>
            <td>True</td>
            <td>
              <BiDotsHorizontalRounded size={26} />
            </td>
          </tr>
          <tr className="border-y-2 h-14">
            <td>Dora</td>
            <td>What the fuck are you doing</td>
            <td>22-12-2003</td>
            <td>False</td>
            <td>
              <BiDotsHorizontalRounded size={26} />
            </td>
          </tr>
          <tr className="border-y-2 h-14">
            <td>Khateeb</td>
            <td>What the fuck are you doing</td>
            <td>22-12-2003</td>
            <td>False</td>
            <td>
              <BiDotsHorizontalRounded size={26} />
            </td>
          </tr>
          <tr className="border-y-2 h-14">
            <td>Alok</td>
            <td>What the fuck are you doing</td>
            <td>22-12-2003</td>
            <td>False</td>
            <td>
              <BiDotsHorizontalRounded size={26} />
            </td>
          </tr>
          <tr className="border-y-2 h-14">
            <td>Aditya</td>
            <td>What the fuck are you doing</td>
            <td>22-12-2003</td>
            <td>False</td>
            <td>
              <BiDotsHorizontalRounded size={26} />
            </td>
          </tr>
          <tr className="border-y-2 h-14">
            <td>Varad</td>
            <td>What the fuck are you doing</td>
            <td>22-12-2003</td>
            <td>False</td>
            <td>
              <BiDotsHorizontalRounded size={26} />
            </td>
          </tr>
          <tr className="border-y-2 h-14">
            <td>Shubh</td>
            <td>What the fuck are you doing</td>
            <td>22-12-2003</td>
            <td>False</td>
            <td>
              <BiDotsHorizontalRounded size={26} />
            </td>
          </tr>
        </table>

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

export default Announcements;
