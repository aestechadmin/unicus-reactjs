import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import NetworkStatus from "../components/Network";
import Loader from "../components/Loader"; 

const MainLayout = () => {

  const location = useLocation();
  const [showLoader, setShowLoader] = useState(true);
  const handleLoaderComplete = () => {
    setShowLoader(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 50);

    return () => clearTimeout(timer);
  }, [location]);

  return (
    <>
      {showLoader && <Loader onComplete={handleLoaderComplete} />}
      <NetworkStatus />

      {/* PAGE CONTENT */}
      <Outlet />
    </>
  );
};

export default MainLayout;