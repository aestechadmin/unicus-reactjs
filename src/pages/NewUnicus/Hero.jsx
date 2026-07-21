// Hero.jsx
import React, { useEffect, useRef } from "react";
import { Box, Typography, useTheme, Container } from "@mui/material";
import { motion } from "framer-motion";
import { websiteData } from "../NewUnicus";

const SplitLetters = ({ text }) => {
  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.2,
      },
    },
  };

  const letterVariant = {
    hidden: { y: 100, opacity: 0, rotateX: -90 },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 1.2,
        ease: [0.34, 1.56, 0.64, 1],
      },
    },
  };

  return (
    <motion.span
      variants={container}
      initial="hidden"
      animate="visible"
      style={{ display: "inline-block", perspective: 600 }}
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          className="letter"
          variants={letterVariant}
          style={{
            display: "inline-block",
            lineHeight: 1.2,
            whiteSpace: "pre",
            transformStyle: "preserve-3d",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
};

export default function Hero({ heroContainerRef }) {
  const theme = useTheme();
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (titleRef.current) {
        titleRef.current.style.opacity = '1';
        titleRef.current.style.transform = 'translateY(0)';
      }
      if (subtitleRef.current) {
        subtitleRef.current.style.opacity = '1';
        subtitleRef.current.style.transform = 'translateY(0)';
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    // MAIN BOX - Full height with secondary color
    <Box
      ref={heroContainerRef}
      sx={{
        position: "relative",
        width: "100%",
        height: "100vh",
        minHeight: "600px",
        backgroundColor: theme.palette.secondary.main,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* IMAGE BOX - 80% height with curved bottom */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "80%",
          zIndex: 1,
          overflow: "hidden",
          borderRadius: { 
            xs: '0px 0px 120px 120px',
            sm: '0px 0px 180px 180px',
            md: '0px 0px 250px 250px'
          },
        }}
      >
        {/* Background Image - 100% inside the box */}
        <Box
          sx={{
            width: "100%",
            height: "100%",
            backgroundImage: `url(${websiteData.hero.backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />

        {/* Dark Overlay on Image */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            zIndex: 2,
          }}
        />

        {/* Content Overlay on Image - Title and Subtitle at BOTTOM */}
        <Container
          maxWidth="lg"
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 3,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            color: "#fff",
            px: { xs: 3, sm: 4, md: 6 },
            pb: { xs: 4, sm: 5, md: 6 },
          }}
        >
          {/* Title - Clean Spaces */}
          <Typography
            ref={titleRef}
            variant="h1"
            sx={{
              fontWeight: 700,
              lineHeight: 1.1,
              mb: { xs: 1, sm: 1.5, md: 2 },
              fontSize: { 
                xs: "2rem", 
                sm: "3rem", 
                md: "4.5rem", 
                lg: "6rem" 
              },
              letterSpacing: "0.02em",
              textShadow: "0 4px 30px rgba(0,0,0,0.5)",
              opacity: 0,
              transform: "translateY(40px)",
              transition: "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
              maxWidth: "100%",
            }}
          >
            <SplitLetters text={websiteData.hero.title} />
          </Typography>

          {/* Subtitle - Smarter Facility Management */}
          <Typography
            ref={subtitleRef}
            variant="h1"
            sx={{
              fontWeight: 700,
              lineHeight: 1.1,
              mb: { xs: 1, sm: 1.5, md: 2 },
              fontSize: { 
                xs: "2rem", 
                sm: "3rem", 
                md: "4.5rem", 
                lg: "6rem" 
              },
              letterSpacing: "0.02em",
              textShadow: "0 4px 30px rgba(0,0,0,0.5)",
              opacity: 0,
              transform: "translateY(40px)",
              transition: "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
              maxWidth: "100%",
            }}
          >
            {websiteData.hero.subtitle}
          </Typography>
        </Container>
      </Box>

      {/* BOTTOM 20% - Description centered */}
      <Box
        sx={{
          width: "100%",
          height: "20%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: theme.palette.secondary.main,
          px: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <Typography
          sx={{
            fontSize: { 
              xs: "0.8rem", 
              sm: "1rem", 
              md: "1.5rem", 
              lg: "2rem" 
            },
            fontWeight: 500,
            letterSpacing: { xs: "0.05em", sm: "0.08em", md: "0.1em" },
            color: "#fff",
            textAlign: "center",
            opacity: 0.9,
            px: { xs: 2, sm: 3, md: 4 },
          }}
        >
          Trained manpower for all spaces
        </Typography>
      </Box>
    </Box>
  );
}