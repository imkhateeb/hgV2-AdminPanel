import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./container/Home";
import Auth from "./container/Auth";
import NotFound from "./components/404notfound/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
      
        <Route path="/*" element={<Home />} />
        <Route path="/account/*" element={<Auth />} />
        <Route path="/notfound" element={<NotFound/>} /> // This is temporary route for testing
   
      </Routes>
    </BrowserRouter>
  );
}
