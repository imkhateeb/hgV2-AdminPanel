import { IoIosArrowDown } from 'react-icons/io';

export default function Navbar() {

  return (
    <>
      <div className="flex justify-between py-2 px-5 bg-bgSecondary w-full rounded-lg items-center">
        <div className='max-sm:hidden'>
          <input type="text" className="py-2 px-3 rounded-md  outline-none bg-slate-600" placeholder="Search..." />
        </div>
        <div />
        <div className="flex gap-3 items-center">
          <div className="h-12 w-12 rounded-full bg-slate-200"></div>
          <div className="flex flex-col gap-1">
            <p className="text-pink-600 text-xs font-semibold">Admin name</p>
            <p className="text-slate-400 text-xs">Admin</p>
          </div>
          <IoIosArrowDown fontSize={16} className='text-pink-600' />
        </div>
      </div>
      <div className='sm:hidden w-full'>
        <input type='text' className='w-full py-2 px-3 rounded-md outline-none bg-slate-600' placeholder='Search...' />

      </div>
    </>
  )
}
