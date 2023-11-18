import { Route, Routes } from "react-router-dom";
import { Signup, Login } from "../components";


export default function Auth() {

    return (
       
        <div className="w-full h-screen bg-black max-md:w-100">
            <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            </Routes>
        </div>
      
    );

}
