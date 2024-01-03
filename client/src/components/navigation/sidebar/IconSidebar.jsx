import { adminSidebarItems } from "../../../constants/navigation/adminSidebarItems";

import { TbLayoutSidebarLeftExpandFilled, TbLayoutSidebarRightExpandFilled } from "react-icons/tb";

import dashboard from '../../../assets/sidebar/dashboard.png';
import announcements from '../../../assets/sidebar/announcement.png';
import feeds from '../../../assets/sidebar/feeds.png';
import wings from '../../../assets/sidebar/wings.png';
import assignment from '../../../assets/sidebar/assignment.png';

import dashboardw from '../../../assets/sidebar/dashboardw.png';
import announcementsw from '../../../assets/sidebar/announcementw.png';
import feedsw from '../../../assets/sidebar/feedsw.png';
import wingsw from '../../../assets/sidebar/wingsw.png';
import assignmentw from '../../../assets/sidebar/assignmentw.png';
import { NavLink } from "react-router-dom";
import { useState } from "react";

const isActiveStyle = 'py-3 text-base font-semibold bg-pink-600 rounded-lg text-white';
const isNotActiveStyle = 'py-3 text-base text-slate-400 font-semibold hover:bg-pink-600 hover:text-white rounded-lg animate-fade-in transition-all duration-100 ease-linear';


export default function IconSidebar({ setExpand }) {
  const [hovered, setHovered] = useState("");

  const isHovered = (title) => {
    return hovered === title
  }

  return (
    <div className="px-4 bg-bgSecondary rounded-lg h-[97vh] sticky top-2">
      <div
        className="bg-bgSecondary flex justify-center mt-1 mb-8 p-1 rounded-md cursor-pointer text-pink-600 lg:hidden max-ss:hidden hover:text-pink-500 transition-all duration-200 ease-linear"
        onClick={() => setExpand(true)}
      >
        <TbLayoutSidebarLeftExpandFilled
          fontSize={40}
        />
      </div>

      <div className="flex flex-col gap-2">
        {adminSidebarItems?.map(({ title, url, icon }) => {
          let iconSrc;
          let whiteIconSrc;
          switch (icon) {
            case 'dashboard':
              iconSrc = dashboard;
              whiteIconSrc = dashboardw;
              break;
            case 'announcements':
              iconSrc = announcements;
              whiteIconSrc = announcementsw;
              break;
            case 'feeds':
              iconSrc = feeds;
              whiteIconSrc = feedsw;
              break;
            case 'wings':
              iconSrc = wings;
              whiteIconSrc = wingsw;
              break;
            case 'assignment':
              iconSrc = assignment;
              whiteIconSrc = assignmentw;
              break;
            default:
              iconSrc = null;
              whiteIconSrc = null;
          }

          return (
            <NavLink
              key={title}
              to={url}
              className={({ isActive }) => isActive ? isActiveStyle : isNotActiveStyle}
              onMouseEnter={() => setHovered(title)}
              onMouseLeave={() => setHovered("")}
            >
              {({ isActive }) => (
                <div className="flex justify-center items-center">
                  <img
                    src={(isActive || isHovered(title)) ? whiteIconSrc : iconSrc}
                    alt={`icon-${title}`}
                    className="w-6 h-6"
                  />
                </div>
              )}
            </NavLink>
          )
        })}
      </div>
    </div>
  )
}
