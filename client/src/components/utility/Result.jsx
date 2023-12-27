import React from 'react';
import { Button, Result } from 'antd';
const ResultFB = () => (
  <Result
    className='bg-white w-2/3 m-auto rounded-lg'
    status="success"
    title="Successfully Added Announcement"
    subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
    extra={[
      <Button className='bg-pink-600 text-white' key="console">
        Go Back
      </Button>,
      <Button key="buy">Add Again</Button>,
    ]}
  />
);
export default ResultFB;