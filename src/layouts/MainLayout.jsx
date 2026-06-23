import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import NetworkStatus from "../components/Network";

const MainLayout = () => {

  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);

    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 50);

    return () => clearTimeout(timer);
  }, [location]);

  return (
    <>
      <NetworkStatus />

      {/* PAGE CONTENT */}
      <Outlet />
    </>
  );
};

export default MainLayout;