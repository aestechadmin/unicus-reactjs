// src/utils/ScrollToTop.js

import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    // browser back scroll restore off
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // every route change top ku poganum
    window.scrollTo(0, 0);

    // extra safe for back button
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 50);
  }, [pathname, navigationType]);

  return null;
};

export default ScrollToTop;