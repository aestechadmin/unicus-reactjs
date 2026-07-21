import React, { useRef } from "react";
import { Box, Typography, Button, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import { websiteData } from "../NewUnicus";
import {
  ArrowForward,
  // Process-specific icons
  Assignment,
  Handshake,
  Settings,
  Description,
  People,
  Build,
  Verified,
  EmojiEvents,
  TrendingUp,
  SupportAgent,
  Speed,
  Analytics,
  Lightbulb,
  Star,
  Rocket,
  Shield,
  ThumbUp,
} from "@mui/icons-material";
import { scrollToQuote } from "../NewUnicus"; 

// Icon mapping for process steps
const processIconMap = {
  "Consultation": <Assignment />,
  "Site Assessment": <Description />,
  "Customized Planning": <Settings />,
  "Implementation": <Build />,
  "Quality Assurance": <Verified />,
  "Ongoing Support": <SupportAgent />,
  "Feedback & Improvement": <Analytics />,
  "Client Satisfaction": <EmojiEvents />,
  "Strategy Development": <Lightbulb />,
  "Team Deployment": <People />,
  "Execution": <Rocket />,
  "Monitoring": <Speed />,
  "Partnership": <Handshake />,
  "Excellence": <Star />,
  "Growth": <TrendingUp />,
  "Protection": <Shield />,
  "Success": <ThumbUp />,
  "Innovation": <TrendingUp />,
  "Reliability": <Verified />,
  "Efficiency": <Speed />,
};

// Default icon if no match found
const defaultProcessIcon = <Assignment />;

export default function Process() {
  const theme = useTheme();
  const sectionRef = useRef(null);
  const data = websiteData?.process;
  // Filter for process steps - you might need to adjust this based on your data structure
  const processSteps = data?.slides?.filter((slide) => slide.type === "process") || [];

  // If no process data, use the services data as fallback
  const items = processSteps.length > 0 ? processSteps : data?.slides?.filter((slide) => slide.type === "service") || [];

  if (!data || !items.length) return null;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
    hover: {
      y: -8,
      boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
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

  // Scroll to Quote section
  // const scrollToQuote = () => {
  //   const quoteSection = document.getElementById("quote-section");
  //   if (quoteSection) {
  //     quoteSection.scrollIntoView({ behavior: "smooth" });
  //   }
  // };

  return (
    <Box
      ref={sectionRef}
      sx={{
        position: "relative",
        minHeight: "100vh",
        backgroundImage: "url(/img/visonbg.jpg)",
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
        py: 8,
        px: { xs: 3, md: 6, lg: 10 },
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          // backgroundColor: "rgba(0, 0, 0, 0.7)",
          background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.2) 100%)',
          zIndex: 0,
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          maxWidth: "1400px",
          mx: "auto",
        }}
      >
        {/* Title - Top Left */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={titleVariants}
        >
          <Typography
            sx={{
              fontSize: { xs: "2.5rem", sm: "3rem", md: "3.5rem", lg: "4.5rem" },
              fontWeight: 600,
              color: "#FFF",
              mb: { xs: 4, md: 6 },
              textAlign: 'left'
            }}
          >
            Sector Served
          </Typography>
        </motion.div>

        {/* Cards Grid using Flexbox - 4 items per row */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              margin: { xs: "-8px", sm: "-12px", md: "-16px" },
            }}
          >
            {items.map((item, index) => {
              // Get the appropriate icon based on item name
              const IconComponent = processIconMap[item.name] || defaultProcessIcon;
              
              // Determine if it's a process or service item
              const isProcess = item.type === "process";
              
              return (
                <Box
                  key={index}
                  sx={{
                    flex: "0 0 auto",
                    width: {
                      xs: "100%",        // 1 item per row on mobile
                      sm: "50%",          // 2 items per row on tablets
                      md: "33.333%",      // 3 items per row on medium screens
                    },
                    padding: { xs: "8px", sm: "12px", md: "16px" },
                  }}
                >
                  <motion.div
                    variants={cardVariants}
                    whileHover="hover"
                    style={{ height: "100%" }}
                  >
                    <Box
                      sx={{
                        backgroundColor: "#FFFFFF80",
                        backdropFilter: "blur(34px)",
                        borderRadius: "16px",
                        padding: { xs: 2.5, md: 2.5 },
                        height: "100%",
                        // minHeight: { xs: "200px", md: "220px" },
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                        border: "1px solid rgba(0,0,0,0.04)",
                        transition: "all 0.3s ease",
                        cursor: "pointer",
                        "&:hover": {
                          boxShadow: "0 12px 40px rgba(0,0,0,0.12)",
                          borderColor: theme.palette.secondary.main,
                        },
                      }}
                    >
                      {/* Icon - Top Left */}
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: "12px",
                          backgroundColor: "#ffffff73",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#000",
                          mb: 2,
                          flexShrink: 0,
                          transition: "all 0.3s ease",
                          "&:hover": {
                            backgroundColor: theme.palette.secondary.main,
                            color: "#fff",
                            transform: "scale(1.05)",
                          },
                        }}
                      >
                        {React.cloneElement(IconComponent, {
                          sx: { fontSize: 24 },
                        })}
                      </Box>

                      {/* Step Number for Process Items */}
                      {isProcess && (
                        <Typography
                          sx={{
                            fontSize: "0.75rem",
                            fontWeight: 600,
                            color: theme.palette.secondary.main,
                            mb: 0.5,
                            letterSpacing: "0.05em",
                          }}
                        >
                          Step {index + 1}
                        </Typography>
                      )}

                      {/* Title */}
                      <Typography
                        sx={{
                          fontSize: { xs: "1rem", sm: "1.1rem", md: "2rem" },
                          fontWeight: 700,
                          color: "#000",
                          mb: 1,
                          lineHeight: 1.3,
                        }}
                      >
                        {item.name}
                      </Typography>

                      {/* Description */}
                      <Typography
                        sx={{
                          fontSize: { xs: "0.85rem", sm: "1.5rem" },
                          color: "#181818",
                          textAlign: 'left', fontWeight: 400, opacity: 0.8,
                          lineHeight: 1.5,
                          flex: 1,
                          mt: 2,
                        }}
                      >
                        {item.description}
                      </Typography>

                      {/* Progress indicator for process steps */}
                      {isProcess && (
                        <Box
                          sx={{
                            width: "100%",
                            mt: 2,
                            pt: 2,
                            borderTop: "1px solid rgba(0,0,0,0.08)",
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: "0.7rem",
                              color: "#666",
                              fontWeight: 500,
                            }}
                          >
                            {index + 1} / {items.length}
                          </Typography>
                          <Box
                            sx={{
                              width: "60%",
                              height: "3px",
                              backgroundColor: "#E0E0E0",
                              borderRadius: "2px",
                              overflow: "hidden",
                              alignSelf: "center",
                            }}
                          >
                            <Box
                              sx={{
                                width: `${((index + 1) / items.length) * 100}%`,
                                height: "100%",
                                backgroundColor: theme.palette.secondary.main,
                                borderRadius: "2px",
                                transition: "width 0.5s ease",
                              }}
                            />
                          </Box>
                        </Box>
                      )}
                    </Box>
                  </motion.div>
                </Box>
              );
            })}
          </Box>
        </motion.div>

        {/* Get Quote Button - Bottom Center with Arrow */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: { xs: 6, md: 8, lg: 10 },
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
              endIcon={<ArrowForward sx={{ fontSize: 24 }} />}
              sx={{
                backgroundColor: 'white',
                color: "black",
                padding: { xs: "12px 32px", sm: "14px 40px", md: "14px 48px" },
                borderRadius: "10px",
                fontSize: { xs: "0.95rem", sm: "1rem", md: "1.8rem" },
                fontWeight: 600,
                textTransform: "none",
                boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                transition: "all 0.3s ease",
                gap: 1,
                "&:hover": {
                  transform: "translateY(-3px)",
                  boxShadow: "0 12px 35px rgba(0,0,0,0.25)",
                  // backgroundColor: theme.palette.secondary.dark,
                  "& .MuiButton-endIcon": {
                    transform: "translateX(4px) rotate(-45deg)",
                  },
                },
                "& .MuiButton-endIcon": {
                  transition: "transform 0.3s ease",
                },
              }}
            >
              Request a Site Assessment
            </Button>
          </motion.div>
        </Box>
      </Box>
    </Box>
  );
}