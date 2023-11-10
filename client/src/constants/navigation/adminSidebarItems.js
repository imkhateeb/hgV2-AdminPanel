import { LuLayoutDashboard, LuUsers, AiFillSound, CgFeed, HiOutlineDocumentText } from '../icons/icons';

export const adminSidebarItems = [
   {
      title: 'Dashboard',
      url: '/dashboard',
      icon: LuLayoutDashboard,
   },
   {
      title: 'Announcements',
      url: '/announcements',
      icon: AiFillSound,
   },
   {
      title: 'Feeds',
      url: '/feeds',
      icon: CgFeed,
   },
   {
      title: 'Wings',
      url: '/wings',
      icon: LuUsers,
   },
   {
      title: 'Assignment',
      url: '/assignment',
      icon: HiOutlineDocumentText,
   },
]