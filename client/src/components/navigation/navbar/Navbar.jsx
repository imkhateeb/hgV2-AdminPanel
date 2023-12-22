import { Input } from "antd";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useNavigate } from "react-router-dom";
import searchLogo from '../../../assets/pngimages/search.png';
import { useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [showUser, setShowUser] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/account/login");
  };

  return (
    <>
      <div className="flex justify-between py-2 px-5 bg-bgSecondary w-full rounded-lg items-center">
        <div className="max-sm:hidden">
          <h1 className="text-lg font-semibold">Hello, Admin</h1>
        </div>
        <div />
        <div className="flex gap-2 items-center relative">
          <div className="flex bg-white rounded-md px-2 items-center">
            <img
              src={searchLogo}
              alt="search-logo"
              className="h-[18px] w-[18px]"
            />
            <Input placeholder="Search here" className="" bordered={false} />
          </div>

          {isAuthenticated ? (
            <>
              <div
                className="h-8 w-8 rounded-full bg-black cursor-pointer"
                onClick={() => setShowUser(!showUser)}
              >
                {/* Set the profile picture */}
              </div>

              {showUser && (
                <div className="absolute bg-bgTertiary rounded-md right-0 top-8">
                  <button
                    type="button"
                    className="py-1 px-3 text-gray-400 font-bold"
                    onClick={handleLogout}
                  >Logout</button>
                </div>
              )}
            </>
          ) : (
            <div className="h-8 w-8 rounded-full bg-black cursor-pointer">
              {/* Set the hg picture */}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
