import { useState } from "react";
import { adminSidebarItems } from "../../../constants/navigation/adminSidebarItems";
import { NavLink } from "react-router-dom";

const isActiveStyle = 'py-2 text-base font-semibold bg-pink-600 rounded-lg text-white';
const isNotActiveStyle = 'py-2 text-base text-slate-400 font-bold hover:bg-pink-600 hover:text-white rounded-lg animate-fade-in transition-all duration-100 ease-linear';

export default function Sidebar() {
  const [isActive, setIsActive] = useState("");


  return (
    <div className="p-10 bg-bgSecondary rounded-3xl">
      <div className="my-5">
        <h1>HG</h1>
      </div>

      <div className="flex flex-col gap-2">
        {adminSidebarItems?.map(({ title, url, icon: Icon }) => {
          const titleInLower = title.toLowerCase();
          return (
            <NavLink
              key={title}
              to={url}
              onClick={() => setIsActive(titleInLower)}
              className={isActive === titleInLower ? isActiveStyle : isNotActiveStyle}
            >
              <div className="flex gap-3 items-center px-4">
                <Icon />
                <h1>{title}</h1>
              </div>
            </NavLink>
          )
        })}
      </div>
    </div>
  )
}
