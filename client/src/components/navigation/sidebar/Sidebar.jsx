import { adminSidebarItems } from "../../../constants/navigation/adminSidebarItems";
import { NavLink } from "react-router-dom";

import hglogo from '../../../assets/sidebar/hglogo.png';
import dashboard from '../../../assets/sidebar/dashboard.png';
import announcements from '../../../assets/sidebar/announcement.png';
import feeds from '../../../assets/sidebar/feeds.png';
import wings from '../../../assets/sidebar/wings.png';
import assignment from '../../../assets/sidebar/assignment.png';

const isActiveStyle = 'pr-8 py-2 text-base font-semibold bg-pink-600 rounded-lg text-white';
const isNotActiveStyle = 'pr-8 py-2 text-base text-slate-400 font-semibold hover:bg-pink-600 hover:text-white rounded-lg animate-fade-in transition-all duration-100 ease-linear';

export default function Sidebar() {
  return (
    <div className="py-5 px-4 bg-bgSecondary rounded-lg h-full">
      <div className="flex justify-center mt-5 mb-10">
        <img
          src={hglogo}
          alt="hglogo"
          className="w-[116px] h-[92px]"
        />
      </div>

      <div className="flex flex-col gap-2">
        {adminSidebarItems?.map(({ title, url, icon }) => {
          let iconSrc;
          switch(icon) {
            case 'dashboard':
              iconSrc = dashboard;
              break;
            case 'announcements':
              iconSrc = announcements;
              break;
            case 'feeds':
              iconSrc = feeds;
              break;
            case 'wings':
              iconSrc = wings;
              break;
            case 'assignment':
              iconSrc = assignment;
              break;
            default:
              iconSrc = null;
          }

          return (
            <NavLink key={title} to={url} className={({ isActive }) => isActive ? isActiveStyle : isNotActiveStyle}>
              <div className="flex gap-3 items-center px-4">
                <img
                  src={iconSrc}
                  alt={`icon-${title}`}
                  className="w-6 h-6"
                />
                <h1 className="text-lg">{title}</h1>
              </div>
            </NavLink>
          )
        })}
      </div>
    </div>
  )
}