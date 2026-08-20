// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import Unicus from "./pages/Unicus";
import NewUnicus from "./pages/NewUnicus";
import Unicuss from "./pages/Unicuss";
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
          <Route path="/" element={<Unicuss />} />
          <Route path="/home" element={<NewUnicus />} />
          <Route path="/unicus" element={<Unicus />} />
        </Route>

        {/* ======================= FALLBACK ======================= */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </Router>
    </div>
  );
}

export default App;