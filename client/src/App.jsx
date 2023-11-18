import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./container/Home";
import Auth from "./container/Auth";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="/account/*" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  );
}
