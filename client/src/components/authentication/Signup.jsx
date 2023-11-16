import React, { useEffect, useId, useState } from "react";
import hgLogoSvg from "../../assets/images/hgofficallogo.svg";
import ellipseSvg from "../../assets/images/ellipsesvg.svg";
import { Link } from "react-router-dom";

function Signup() {
  const id = useId();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


//   useEffect(() => {
//     console.log(name, email, password)
//   }, [name, email, password]);


  const handleSubmit = () => {
    console.log("clicked")
  }




  return (
    <div className="flex w-full min-h-screen bg-black max-sm:flex-col max-sm:items-center ">
      <div className="left-container w-1/2 flex items-center justify-center">
        <img src={hgLogoSvg} alt="" srcSet="" width="320px" />
      </div>
      <div className="right-container w-1/2 max-sm:w-[80%] flex  flex-col relative justify-center space-y-32  mx-20">
        <div className="upper-image  justify-start  ml-10">
          <img src={ellipseSvg} alt="" srcSet="" width={"225px"} />
        </div>

        <div className="input-form w-full flex justify-center items-center absolute  ">
          <div
            className=" h-[28rem] max-sm:h-[24rem] w-1/2 max-sm:w-full text-white   border-white border-2 rounded-xl mb-24"
            style={{ backdropFilter: "blur(6px)" }}
          >
            <h1 className="text-3xl font-bold ml-6 my-8">Sign Up</h1>
            <div className="flex justify-center mt-4 ">
              <input
                id={id}
                className="w-4/5 h-10 rounded-lg border-2 border-white mt-1 bg-transparent  pl-2 "
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
            <div className="flex justify-center mt-4 ">
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
                Sign Up
              </button>
            </div>
            <div className="footer mt-2">
              <p className="text-white text-center">
                Already have an account?{" "}
                <Link
                  to="/account/login"
                  className="text-blue-600 font-semibold"
                >
                  Login
                </Link>
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

export default Signup;
