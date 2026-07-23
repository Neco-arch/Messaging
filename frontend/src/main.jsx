import { StrictMode } from "react";
import React , { createContext , useState} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import Signup from "./signup";
import App_page from "./mainpage";
import Loginpage from "./login";


createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup/>} />
        <Route path="/" element={<App_page/>}/>
        <Route path="/login" element={<Loginpage/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
