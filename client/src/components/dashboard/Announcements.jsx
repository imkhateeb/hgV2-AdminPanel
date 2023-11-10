import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Dropdown, Select } from "antd";

const Announcements = () => {
  const items = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          1st menu item
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          2nd menu item
        </a>
      ),
    },
    {
      key: "3",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.luohanacademy.com"
        >
          3rd menu item
        </a>
      ),
    },
  ];
   const [sortValue,setSortValue] = useState('lucy')
  const handleChange = (value) => {
   setSortValue(value)
   console.log(value)
  };

  return (
    <section className="bg-bgSecondary h-96 rounded-3xl">
      <div className="w-full h-16 flex justify-between items-center px-9">
        <h1 className="text-white text-3xl font-semibold">Announcements</h1>
        <div className="bg-pink-600 flex px-4 items-center h-[2.1rem] gap-3 rounded-lg cursor-pointer">
          <AiOutlinePlus />
          <h1>Add New</h1>
        </div>
      </div>
      <div className="flex h-16 px-9  items-center justify-between">
        <Button
          className="w-48 bg-white flex justify-start items-center"
          icon={<SearchOutlined />}
        >
          Search here
        </Button>
        <div className="flex items-center">
          <Dropdown
            menu={{ items }}
            className="bg-white "
            placement="bottomLeft"
            arrow
            trigger={["click"]}
          >
            <Button>bottomLeft</Button>
          </Dropdown>
        </div>
        <div className="flex items-center border-2">
          <Select
            value={sortValue}
            style={{ width: 300 }}
            onChange={handleChange} 
            options={[
              { value: "jack", label: "Jack" },
              { value: "lucy", label: "Lucy" },
              { value: "Yiminghe", label: "yiminghe" },
            ]}
          />
        </div>
      </div>
    </section>
  );
};

export default Announcements;
