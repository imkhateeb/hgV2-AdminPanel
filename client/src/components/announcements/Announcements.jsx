import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AiOutlinePlus } from "react-icons/ai";
import { BsFilterRight } from "react-icons/bs";
import { SearchOutlined } from "@ant-design/icons";
import { Input, Select, Pagination, Button, Modal } from "antd";
import { useSelector, useDispatch } from "react-redux";
import feedsStyle from "../../constants/styles/feedsStyle";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import {
  fetchAnnouncements,
  deleteAnnouncement,
  updateAnnouncement,
} from "../../redux/slices/announcementSlice";
import AnnouncementRow from "./AnnouncementRow";
const Announcements = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.announcements);
  useEffect(() => {
    dispatch(fetchAnnouncements());
  }, []);
  const handleDelete = (id) => {
    dispatch(deleteAnnouncement(id));
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editDesc, setEditDesc] = useState({ id: "", value: "" });
  const handleChange = (e) => {
    setEditDesc({ ...editDesc, value: e.target.value });
  };

  const showModal = (id, value) => {
    setIsModalOpen(true);
    setEditDesc({ id: id, value: value });
  };
  const handleOk = () => {
    const updatedData = { announcementDetails: editDesc.value };
    dispatch(updateAnnouncement({ id: editDesc.id, updatedData }));
    setIsModalOpen(false);
    setEditDesc({ id: "", value: "" });
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setEditDesc({ id: "", value: "" });
  };

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
        <Link
          to="/add-announcement"
          className="bg-pink-600 flex px-4 items-center h-[2.1rem] gap-3 rounded-lg cursor-pointer"
        >
          <AiOutlinePlus />
          <h1>Add New</h1>
        </Link>
      </div>

      <AnnouncementRow
        data={data}
        handleDelete={handleDelete}
        showModal={showModal}
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

      <div>
        <Modal
          title="Basic Modal"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          className="text-white"
          centered
        >
          <div className="w-full bg-[#212130] rounded-3xl">
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold">Update Feed</h1>
              <div className="my-5 flex flex-col gap-2">
                <p>DESCRIPTION</p>
                <textarea
                  rows={4}
                  className="py-2 px-3 bg-transparent rounded-md border-2 outline-none"
                  value={editDesc.value}
                  placeholder="Input new feed..."
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </section>
  );
};

export default Announcements;
