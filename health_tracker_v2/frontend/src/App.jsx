import React from "react";
import Auth from "./components/Auth.jsx";
import Home from "./components/Home.jsx";
import Tracker from "./components/Tracker.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/home" element={<Home />} />
        <Route path="/Tracker" element={<Tracker />} />
      </Routes>
    </BrowserRouter>
  );
}
