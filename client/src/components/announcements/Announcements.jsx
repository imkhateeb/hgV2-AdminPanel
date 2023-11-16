import React, { useEffect, useState } from "react";

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
import AnnouncementHeader from "./AnnouncementHeader";
const Announcements = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.announcements);
  const [query,setQuery] = useState([])
  const [search,setSearch] = useState('')
  const handleQuery = (value) => {
    setQuery(value)
  };
  const handleSearch = (value) => {
    setSearch(value)
  };
  useEffect(() => {
    dispatch(fetchAnnouncements(query));
  }, [query]);
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

      <AnnouncementHeader handleQuery={handleQuery} handleSearch={handleSearch}/>

      <AnnouncementRow
        data={data}
        handleDelete={handleDelete}
        showModal={showModal}
        search={search}
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
