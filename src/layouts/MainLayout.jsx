import React, { useContext, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import { LoaderContext } from "../contexts/LoaderContext";
import NetworkStatus from "../components/Network";

const MainLayout = () => {

  const { loading, setLoading } = useContext(LoaderContext);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
     window.scrollTo(0, 0);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);

  }, [location, setLoading]);

  return (
    <>
      <NetworkStatus />
      {/* <Header /> */}

      {/* PAGE CONTENT */}
      <Outlet />

      {/* <Footer /> */}
      {/* <Loader open={loading} /> */}
    </>
  );
};

export default MainLayout;