import { Route, Routes } from 'react-router-dom';
import {Sidebar, Navbar, Dashboard} from '../components';
import Announcements from '../components/dashboard/Announcements';

export default function Home() {
  return (
    <div className="flex gap-3 w-full min-h-screen bg-bgTertiary text-white p-5">
      <Sidebar />
      <div className='flex flex-col gap-3 w-full'>
        <Navbar />
        <Routes>
          <Route path='/*' element={<Dashboard />} />
          <Route path='/announcement' element={<Announcements />} />
        </Routes>
      </div>
    </div>
  )
}
