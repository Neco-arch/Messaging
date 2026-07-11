import { StrictMode } from "react";
import React , { createContext , useState} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.css";


createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/signup"  />
        <Route path="/app" />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
