import React, { useState, useId } from "react";
import hgLogoSvg from "../../assets/images/hgofficallogo.svg";
import ellipseSvg from "../../assets/images/ellipsesvg.svg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/slices/authSlice";
import axios from "axios";

const VITE_APP_BACKEND_URI = import.meta.env.VITE_APP_BACKEND_URI;

function ForgetPassword() {
  const id = useId();
  
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

 
  const handleSubmit = async (e) => {

  }


  

  return (
    <div className="flex w-full min-h-screen bg-black max-sm:flex-col max-sm:items-center ">
      <div className="left-container w-1/2 flex items-center justify-center">
        <img
          src={hgLogoSvg}
          alt="hglogo"
          width="375px"
          className="w-[375px] max-md:w-[225px]"
        />
      </div>
      <div className="right-container w-1/2 max-sm:w-[80%] flex  flex-col relative justify-center space-y-32  mx-20">
        <div className="upper-image  justify-start  ml-10">
          <img src={ellipseSvg} alt="" srcSet="" width={"225px"} />
        </div>

        <div className="input-form w-full flex justify-center items-center absolute  ">
          <div
            className="h-[22rem] max-sm:h-[28rem] w-1/2 max-lg:w-[70%] max-md:w-[80%]  max-sm:w-[75%] max-xs:w-full text-white border-white border-2 rounded-xl mb-24"
            style={{ backdropFilter: "blur(6px)" }}
          >
            <h1 className="text-3xl text-center font-bold  mt-6 mb-3">
              Forget Password?
            </h1>
            <div className="paragraph">
              <p className="text-white text-center text-xs font-medium">
                Please enter the email you use to sign in
              </p>
            </div>

            <form className="w-full" onSubmit={handleSubmit}>
              <div className="flex justify-center mt-4 ">
                <input
                  id={id + 1}
                  className="w-4/5 h-10 rounded-lg border-2 border-white mt-1 bg-transparent  pl-2 "
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="flex justify-center mt-4 ">
                <button
                  className="w-4/5 h-10 rounded-lg border-2 border-white mt-1  pl-2 "
                  style={{
                    background:
                      "linear-gradient(91.94deg, #EE2B7A 3.09%, #FF014E 139.14%",
                  }}
                >
                  Request password reset
                </button>
              </div>
            </form>
            <div className="footer mt-2">
              <p className="text-white text-center">
                Back to{" "}
                <Link to="/account/login" className="text-pink-600 font-bold">
                  Sign in
                </Link>
              </p>
            </div>
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

export default ForgetPassword;
