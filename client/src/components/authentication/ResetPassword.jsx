import React, { useId, useState } from "react";
import hgLogoSvg from "../../assets/images/hgofficallogo.svg";
import ellipseSvg from "../../assets/images/ellipsesvg.svg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const VITE_APP_BACKEND_URI = import.meta.env.VITE_APP_BACKEND_URI;

function ResetPassword() {
  const id = useId();


  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [matchPassword, setMatchPassword] = useState(true);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }



  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
        setMatchPassword(false);
        setError("Password does not match");
        return;
    }



  };

  return (
    <div className="flex w-full min-h-screen bg-black max-sm:flex-col max-sm:items-center ">
      <div className="left-container w-1/2  flex items-center justify-center ">
        <img src={hgLogoSvg} alt="hglogo" width="375px" />
      </div>
      <div className="right-container w-1/2 max-sm:w-[80%] flex  flex-col relative justify-center space-y-32  mx-20">
        <div className="upper-image  justify-start  ml-10">
          <img src={ellipseSvg} alt="" srcSet="" width={"225px"} />
        </div>

        <div className="input-form w-full flex justify-center items-center absolute  ">
          <div
            className="h-[24rem] max-sm:h-[28rem] w-1/2 max-lg:w-[70%] max-md:w-[85%]  max-sm:w-[75%] max-xs:w-full text-white border-white border-2 rounded-xl mb-24"
            style={{ backdropFilter: "blur(6px)" }}
          >
            <h1 className="text-3xl text-center font-bold  my-6">
              Set a New Password
            </h1>

            <form className="w-full" onSubmit={handleSubmit}>
              <div className="flex flex-col  justify-center mt-2 items-center  ">
                <label htmlFor={id + 1} className="w-4/5  font-medium text-sm">
                  Password
                </label>
                <input
                  id={id + 1}
                  className="w-4/5 h-10 rounded-lg border-2 border-white mt-1 bg-transparent  pl-2 "
                  type="password"
                  name='password'
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex flex-col  justify-center mt-2 items-center  ">
                <label htmlFor={id + 1} className="w-4/5 font-medium text-sm">
                  Confirm Password
                </label>
                <input
                  id={id + 2}
                  className="w-4/5 h-10 rounded-lg border-2 border-white mt-1 bg-transparent  pl-2 "
                  type="password"
                  name='confirmPassword'
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex justify-center mt-4 ">
                <button
                  className="w-4/5 h-10 rounded-lg border-2 border-white mt-1   pl-2 "
                  style={{
                    background:
                      "linear-gradient(91.94deg, #EE2B7A 3.09%, #FF014E 139.14%",
                  }}
                >
                  Save and Continue
                </button>
              </div>
            </form>
            <div className="error-message">
              <p className="text-pink-600 text-center text-sm font-medium">
                {error}
              </p>
            </div>
          </div>
        </div>

        <div className="lower-image  flex justify-end mr-10">
          <img src={ellipseSvg} width={"225px"} />
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
