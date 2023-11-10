import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { IoIosArrowDown } from 'react-icons/io';

export default function Navbar() {

  return (
    <>
      <div className="flex justify-between py-2 px-5 bg-bgSecondary w-full rounded-lg items-center">
        <div className='max-sm:hidden'>
          <h1 className='text-lg font-semibold'>Hello, Admin</h1>
        </div>
        <div />
        <div className="flex gap-3 items-center">
          <div className="flex bg-white rounded-md px-2">
            <button>
              {" "}
              <SearchOutlined className="text-black " />
            </button>
            <Input placeholder="Search here" className="" bordered={false} />
          </div>
          <div className='w-[40px] h-[40px] rounded-full bg-black' />
        </div>
      </div>
      <div className='sm:hidden w-full'>
        <input type='text' className='w-full py-2 px-3 rounded-md outline-none bg-slate-600' placeholder='Search...' />

      </div>
    </>
  )
}
