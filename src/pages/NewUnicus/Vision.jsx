import React from 'react';
import { Box, Typography, Stack, Button } from '@mui/material';
import { motion } from "framer-motion";
import { scrollToQuote } from "../NewUnicus"; 
import { ArrowForward } from "@mui/icons-material";

const visionData = {
  title: "Our Vision",
  subtitle:
    "To be the most trusted partner in sanitation and security, delivering healthier, safer environments, especially in critical healthcare and educational institutions.",
  bulletPoints: [
    "Innovative, tailored solutions for hospitals, medical colleges, and institutions",
    "Rigorous staff training aligned with healthcare compliance standards",
    "Client relationships built on trust, transparency, and excellence",
    "Sustainable practices that advance public health and wellbeing",
  ],
};

const buttonVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
  tap: {
    scale: 0.95,
  },
};

const Vision = () => {
  return (
    <Box 
      sx={{ 
        position: "relative", 
        overflow: "hidden",
        height: "100vh",
        width: "100%",
      }}
    >
      <Box
        sx={{
          position: "relative",
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "flex-end",
          backgroundImage: "url(/img/visonbg.jpg)",
          // Responsive background settings
          backgroundSize: { 
            xs: "cover",     // Cover on mobile
            sm: "cover",     // Cover on tablet
            md: "130%",      // Zoom on desktop
            lg: "130%" 
          },
          backgroundPosition: { 
            xs: "center",    // Center on mobile
            sm: "center", 
            md: "top", 
            lg: "top" 
          },
          backgroundRepeat: "no-repeat",
          backgroundColor: "#1a1a1a",
          "&::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.7)",
            zIndex: 0,
          },
        }}
      >
        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            width: "100%",
            height: "100%",
            px: { xs: 2, sm: 3, md: 6, lg: 10 },
            py: { xs: 2, md: 3, lg: 4 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {/* Title - at the top */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              pt: { xs: 1, md: 2, lg: 4 },
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: "white",
                fontWeight: 600,
                fontSize: {
                  xs: "5rem",
                  sm: "2.2rem",
                  md: "3.5rem",
                  lg: "5rem",
                },
                lineHeight: 1.1,
                textAlign: 'left',
                textShadow: "0 2px 20px rgba(0,0,0,0.3)",
              }}
            >
              {visionData.title}
            </Typography>
          </Box>

          {/* Content - at the bottom */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "space-between",
              gap: { xs: 2, sm: 3, md: 4, lg: 6 },
              alignItems: { xs: "flex-start", md: "flex-end" },
              pt: { 
                xs: "2vh",   // Very less padding on mobile
                sm: "5vh", 
                md: "15vh", 
                lg: "20vh" 
              },
            }}
          >
            {/* LEFT - Subtitle */}
            <Box
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                width: "100%",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "white",
                  fontSize: {
                    xs: "2rem",
                    sm: "0.95rem",
                    md: "1.2rem",
                    lg: "2.5rem",
                  },
                  fontWeight: 600,
                  lineHeight: 1.5,
                  maxWidth: 800,
                  textAlign: 'left',
                  textShadow: "0 1px 10px rgba(0,0,0,0.2)",
                }}
              >
                {visionData.subtitle}
              </Typography>
            </Box>

            {/* RIGHT - Bullet Points */}
            <Box
              sx={{
                flex: 1,
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-end",
                width: "100%",
              }}
            >
              <Stack
                spacing={{ xs: 1, sm: 1.5, md: 2 }}
                sx={{
                  maxWidth: 700,
                  width: "100%",
                }}
              >
                {visionData.bulletPoints.map((point, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: { xs: 1.5, md: 2 },
                    }}
                  >
                    <Box
                      sx={{
                        width: { xs: 5, sm: 6, md: 8 },
                        height: { xs: 5, sm: 6, md: 8 },
                        borderRadius: "50%",
                        bgcolor: "white",
                        mt: 1,
                        flexShrink: 0,
                        opacity: 0.8,
                      }}
                    />

                    <Typography
                      sx={{
                        color: "white",
                        fontSize: {
                          xs: "1.5rem",
                          sm: "0.8rem",
                          md: "1rem",
                          lg: "1.7rem",
                        },
                        lineHeight: 1.4,
                        opacity: 0.9,
                        textAlign: 'left',
                        textShadow: "0 1px 8px rgba(0,0,0,0.15)",
                      }}
                    >
                      {point}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Box>
          </Box>

          {/* Button Section - at the bottom */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              pb: { xs: 1, sm: 1.5, md: 2, lg: 3 },
              pt: { xs: 1, sm: 1.5, md: 2, lg: 3 },
            }}
          >
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Button
                variant="contained"
                size="large"
                onClick={scrollToQuote}
                endIcon={<ArrowForward sx={{ fontSize: { xs: 18, md: 24 } }} />}
                sx={{
                  backgroundColor: 'white',
                  color: "black",
                  padding: { 
                    xs: "8px 20px", 
                    sm: "10px 28px", 
                    md: "14px 40px" 
                  },
                  borderRadius: { xs: "8px", md: "10px" },
                  fontSize: { 
                    xs: "0.8rem", 
                    sm: "0.85rem", 
                    md: "1.8rem" 
                  },
                  fontWeight: 600,
                  textTransform: "none",
                  boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                  transition: "all 0.3s ease",
                  gap: 1,
                  "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: "0 12px 35px rgba(0,0,0,0.25)",
                    "& .MuiButton-endIcon": {
                      transform: "translateX(4px) rotate(-45deg)",
                    },
                  },
                  "& .MuiButton-endIcon": {
                    transition: "transform 0.3s ease",
                  },
                }}
              >
                Get Quote
              </Button>
            </motion.div>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Vision;