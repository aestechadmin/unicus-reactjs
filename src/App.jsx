// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
// import NewHome from "./pages/NewHome";
import Home from "./pages/Home";
import Unicus from "./pages/Unicus";
import JobyVation from "./pages/JobyVation";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "./utils/ScrollToTop";


function App() {
  const handleContextMenu = (e) => {
    e.preventDefault(); // disable right-click menu
    // alert("Right-click disabled!");
  };

  return (
    <div onContextMenu={handleContextMenu}>
    <Router>
      <ScrollToTop />
      <Toaster
        position="top-center"
        toastOptions={{ style: { zIndex: 9999, fontSize: 15 } }}
      />
      <Routes>
        {/* ======================= MAIN WEBSITE ======================= */}
        <Route element={<MainLayout />}>
          {/* <Route path="/" element={<NewHome />} /> */}
          <Route path="home" element={<Home />} />
          <Route path="/" element={<Unicus />} />
          <Route path="jovy" element={<JobyVation />} />
        </Route>

        {/* ======================= FALLBACK ======================= */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </Router>
    </div>
  );
}

export default App;