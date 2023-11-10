import { Route, Routes } from 'react-router-dom';
import { Sidebar, Navbar, Dashboard, Downbar } from '../components';

export default function Home() {
  return (
    <>

      <div className="flex gap-3 w-full min-h-screen bg-bgTertiary text-white p-3 max-md:p-2">
        <div className='max-md:hidden'>
          <Sidebar />
        </div>
        <div className='flex flex-col gap-3 w-full'>
          <Navbar />
          <Routes>
            <Route path='/*' element={<Dashboard />} />
          </Routes>
        </div>
      </div>
      <div className='flex fixed bottom-2 px-2 w-full md:hidden'>
        <Downbar />
      </div>
    </>
  )
}
