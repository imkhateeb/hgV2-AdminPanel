import { Route, Routes } from 'react-router-dom';
import {Sidebar, Navbar, Dashboard} from '../components';

export default function Home() {
  return (
    <div className="flex gap-3 w-full min-h-screen bg-slate-800 text-white p-5">
      <Sidebar />
      <div className='flex flex-col gap-3'>
        <Navbar />
        <Routes>
          <Route path='/*' element={<Dashboard />} />
        </Routes>
      </div>
    </div>
  )
}
