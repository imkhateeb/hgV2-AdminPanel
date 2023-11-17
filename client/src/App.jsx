import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./container/Home";
import Auth from "./container/Auth";
import store from "./redux/store";


store.dispatch({ type: "VALIDATE_TOKEN" });

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
