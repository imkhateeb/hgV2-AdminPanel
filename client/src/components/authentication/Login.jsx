import React, { useState, useId } from "react";
import hgLogoSvg from "../../assets/images/hgofficallogo.svg";
import ellipseSvg from "../../assets/images/ellipsesvg.svg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/slices/authSlice";
import axios from "axios";

const VITE_APP_BACKEND_URI = import.meta.env.VITE_APP_BACKEND_URI;

function Signup() {
  const id = useId();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    try {
      setError("");

      const data = {
        email: email,
        password: password,
      };

      const response = await axios.post(
        `${VITE_APP_BACKEND_URI}/api/users/login`,
        data
      );

      if (response.status === 200) {
        const user = response.data.user;

        dispatch(loginSuccess(user));
        localStorage.setItem("token", JSON.stringify(response.data.token));
        navigate("/");
      } else {
        setError(response.data.message || "Error during registration");
      }
    } catch (error) {
      setError(error.response.data.message || "Error During Login");
    } finally {
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="flex w-full min-h-screen bg-black max-sm:flex-col max-sm:items-center ">
      <div className="left-container w-1/2 flex items-center justify-center">
        <img src={hgLogoSvg} alt="hglogo"  width="375px" className="w-[375px] max-md:w-[225px]" />
      </div>
      <div className="right-container w-1/2 max-sm:w-[80%] flex  flex-col relative justify-center space-y-32  mx-20">
        <div className="upper-image  justify-start  ml-10">
          <img src={ellipseSvg} alt="" srcSet="" width={"225px"}  />
        </div>

        <div className="input-form w-full flex justify-center items-center absolute  ">
          <div
            className="h-[28rem] max-sm:h-[28rem] w-1/2 max-lg:w-[70%] max-md:w-[80%]  max-sm:w-[75%] max-xs:w-full text-white border-white border-2 rounded-xl mb-24"
            style={{ backdropFilter: "blur(6px)" }}
          >
            <h1 className="text-3xl font-bold ml-6 my-6">Login</h1>

            <div className="flex justify-center  ">
              <img
                src="https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png"
                alt=""
                srcSet=""
                width={"50px"}
                className="rounded-full"
              />
            </div>

            <div className="flex justify-center mt-4 ">
              <input
                id={id + 1}
                className="w-4/5 h-10 rounded-lg border-2 border-white mt-1 bg-transparent  pl-2 "
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex justify-center mt-4  ">
              <input
                id={id + 2}
                className="w-4/5 h-10 rounded-lg border-2 border-white mt-1 bg-transparent  pl-2 "
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex justify-center mt-4 ">
              <button
                className="w-4/5 h-10 rounded-lg border-2 border-white mt-1  pl-2 "
                style={{
                  background:
                    "linear-gradient(90.57deg, #D4428D 9.91%, #E26AA7 53.29%, #040F75 91.56%",
                }}
                onClick={handleSubmit}
              >
                Login
              </button>
            </div>
            <div className="footer mt-2">
              <p className="text-white text-center">
                Don't have an account?{" "}
                <Link to="/account/signup" className="text-blue-500">
                  Sign Up
                </Link>
              </p>
            </div>
            <div className="error-message">
              <p className="text-red-600 text-center text-sm">{error}</p>
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

export default Signup;
