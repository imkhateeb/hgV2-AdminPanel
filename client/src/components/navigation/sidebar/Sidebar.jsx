import { adminSidebarItems } from "../../../constants/navigation/adminSidebarItems";
import { NavLink } from "react-router-dom";

import hgLogo from '../../../assets/images/hglogo.png';

const isActiveStyle = 'pr-8 py-2 text-base font-semibold bg-pink-600 rounded-lg text-white';
const isNotActiveStyle = 'pr-8 py-2 text-base text-slate-400 font-semibold hover:bg-pink-600 hover:text-white rounded-lg animate-fade-in transition-all duration-100 ease-linear';

export default function Sidebar() {


  return (
    <div className="py-5 px-4 bg-bgSecondary rounded-lg h-full">
      <div className="flex justify-center mt-5 mb-10">
        <img 
          src={hgLogo}
          alt="hglogo"
          className="w-[116px] h-[92px]"
        />
      </div>

      <div className="flex flex-col gap-2">
        {adminSidebarItems?.map(({ title, url, icon: Icon }) => {
          return (
            <NavLink
              key={title}
              to={url}
              className={({ isActive }) => isActive ? isActiveStyle : isNotActiveStyle}
            >
              <div className="flex gap-3 items-center px-4">
                <Icon />
                <h1 className="text-lg">{title}</h1>
              </div>
            </NavLink>
          )
        })}
      </div>
    </div>
  )
}
