import { useState } from "react";

import { adminSidebarItems } from "../../../constants/navigation/adminSidebarItems"
import { NavLink } from "react-router-dom";


const isActiveStyle = 'py-2 text-base font-semibold bg-pink-600 rounded-md text-white';
const isNotActiveStyle = 'py-2 text-base text-slate-400 font-bold hover:bg-pink-600 hover:text-white rounded-md animate-fade-in transition-all duration-100 ease-linear';


export default function Downbar() {
  const [isActive, setIsActive] = useState("");

  return (
    <div className="flex justify-between bg-bgSecondary rounded-md items-center w-full">
        {adminSidebarItems?.map(({ title, url, icon: Icon }) => {
          const titleInLower = title.toLowerCase();
          return (
            <NavLink
              key={title}
              to={url}
              onClick={() => {
                setIsActive(titleInLower)
              }}
              className={isActive === titleInLower ? isActiveStyle : isNotActiveStyle}
            >
              <div className="flex flex-col gap-[2px] items-center justify-center px-1">
                <Icon className="text-xl font-bold" />
                <p className="text-xs">{title}</p>
              </div>
            </NavLink>
          )
        })}
    </div>
  )
}
