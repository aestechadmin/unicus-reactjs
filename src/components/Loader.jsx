// src/components/Loader.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Loader = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("hasVisited");

    if (hasVisited) {
      setIsVisible(false);
      if (onComplete) onComplete();
      return;
    }

    const timer = setTimeout(() => {
      setIsVisible(false);
      sessionStorage.setItem("hasVisited", "true");
      if (onComplete) onComplete();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#027EFF",
        zIndex: 99999,
        overflow: "hidden",
      }}
    >
      <motion.div
        initial={{
          scale: 0,
          opacity: 0,
          rotate: -50,
          y: 0,
        }}
        animate={{
          scale: 1,
          opacity: 1,
          rotate: 0,
          // No x movement on mobile, only on desktop
          x: isMobile ? 0 : ["0%", "-20%"],
          y: ["0%", "-500%"],
        }}
        transition={{
          scale: {
            duration: 1,
            ease: [0.34, 1.56, 0.64, 1],
          },
          rotate: {
            duration: 1,
            ease: [0.34, 1.56, 0.64, 1],
          },
          opacity: {
            duration: 0.5,
          },
          x: {
            duration: 1.5,
            ease: "easeInOut",
            delay: 1,
          },
          y: {
            duration: 1.5,
            ease: "easeInOut",
            delay: 1,
          },
        }}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: isMobile ? "8px" : "10px",
          width: "100%",
          maxWidth: isMobile ? "220px" : "300px",
          padding: isMobile ? "0 10px" : "0 20px",
        }}
      >
        <motion.img
          src="/img/Brands.png"
          alt="Logo"
          style={{
            width: isMobile ? "50px" : "80px",
            height: isMobile ? "50px" : "80px",
            objectFit: "contain",
            flexShrink: 0,
          }}
          animate={{
            scale: [1, 1.1, 1],
            filter: [
              "drop-shadow(0 0 0px rgba(255,255,255,0))",
              "drop-shadow(0 0 30px rgba(255,255,255,0.3))",
              "drop-shadow(0 0 0px rgba(255,255,255,0))",
            ],
          }}
          transition={{
            scale: {
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            },
            filter: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        />
        
        <motion.span
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          style={{
            fontSize: isMobile ? "22px" : "clamp(28px, 5vw, 45px)",
            fontWeight: 700,
            color: "#fff",
            display: "inline-block",
            whiteSpace: "nowrap",
          }}
        >
          Unicus
        </motion.span>
      </motion.div>
    </motion.div>
  );
};

export default Loader;