import { Route, Routes } from "react-router-dom";
import { Signup, Login } from "../components";
import FigmaLoginComponent from "../components/authentication/FigmaLoginComponent";
import ResetPassword from "../components/authentication/ResetPassword";
import ForgetPassword from "../components/authentication/ForgetPassword";

export default function Auth() {
  return (
    <div className="w-full h-screen bg-black max-md:w-100">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/figma" element={<FigmaLoginComponent />} />
        <Route path="/reset-password/*" element={<ResetPassword />} />
        <Route path="/forget-password" element={<ForgetPassword/>} />
      </Routes>
    </div>
  );
}
