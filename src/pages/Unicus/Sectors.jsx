import React, { useEffect, useRef } from "react";
import { Box, Typography, Button, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import { websiteData } from "../Unicus";
import {
  LocalHospital,
  Home,
  Business,
  School,
  Factory,
  CorporateFare,
  CleaningServices,
  Security,
  PestControl,
  ElectricalServices,
  Plumbing,
  Grass,
  ArrowForward,
} from "@mui/icons-material";

// Icon mapping for services
const iconMap = {
  "Corporate Multispeciality Hospitals": <LocalHospital />,
  "Residential Apartments & Villas": <Home />,
  "Commercial Buildings": <Business />,
  "Educational Institutions": <School />,
  "Industrial Units": <Factory />,
  "Corporate Offices": <CorporateFare />,
  "Housekeeping": <CleaningServices />,
  "Security & Watch & Ward": <Security />,
  "Pest Control": <PestControl />,
  "Electrical Maintenance": <ElectricalServices />,
  "Plumbing & Water Supply": <Plumbing />,
  "Gardening & Landscaping": <Grass />,
};

export default function Sectors() {
  const theme = useTheme();
  const sectionRef = useRef(null);
  const data = websiteData?.sectors;
  const services = data?.slides?.filter((slide) => slide.type === "service") || [];

  if (!data || !services.length) return null;

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
  const scrollToQuote = () => {
    const quoteSection = document.getElementById("quote-section");
    if (quoteSection) {
      quoteSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Box
      ref={sectionRef}
      sx={{
        position: "relative",
        minHeight: "100vh",
        backgroundImage: "url(/img/sectorbg.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        py: 8,
        px: { xs: 3, md: 6, lg: 10 },
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.55)",
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
            // variant="h2"
            sx={{
              fontSize: { xs: "2.5rem", sm: "3rem", md: "3.5rem", lg: "4.5rem" },
              fontWeight: 600,
              color: "#FFF",
              mb: { xs: 4, md: 6 },
              // letterSpacing: "-0.02em",
              textAlign: 'left'
            }}
          >
            Specialized Services
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
            {services.map((service, index) => {
              const IconComponent = iconMap[service.name] || <Business />;
              return (
                <Box
                  key={index}
                  sx={{
                    flex: "0 0 auto",
                    width: {
                      xs: "100%",        // 1 item per row on mobile
                      sm: "50%",          // 2 items per row on tablets
                      md: "33.333%",      // 3 items per row on medium screens
                      lg: "25%",          // 4 items per row on large screens
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
                        padding: { xs: 2.5, md: 3 },
                        height: "100%",
                        minHeight: { xs: "200px", md: "220px" },
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
                          backgroundColor: "#FFF",
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

                      {/* Title */}
                      <Typography
                        sx={{
                          fontSize: { xs: "1rem", sm: "1.1rem", md: "1.5rem" },
                          fontWeight: 700,
                          color: "#000",
                          mb: 1,
                          lineHeight: 1.3,
                        }}
                      >
                        {service.name}
                      </Typography>

                      {/* Description */}
                      <Typography
                        sx={{
                          fontSize: { xs: "0.85rem", sm: "1.2rem" },
                          color: "#181818",
                          lineHeight: 1.5,
                          flex: 1,
                        }}
                      >
                        {service.description}
                      </Typography>
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
              onClick={() => document.getElementById("quote-section")?.scrollIntoView({ behavior: "smooth", block: "start" })}
              endIcon={<ArrowForward sx={{ fontSize: 24 }} />}
              sx={{
                backgroundColor: theme.palette.secondary.main,
                color: "white",
                padding: { xs: "12px 32px", sm: "14px 40px", md: "14px 48px" },
                borderRadius: "50px",
                fontSize: { xs: "0.95rem", sm: "1rem", md: "1.8rem" },
                fontWeight: 600,
                textTransform: "none",
                boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                transition: "all 0.3s ease",
                gap: 1,
                "&:hover": {
                  transform: "translateY(-3px)",
                  boxShadow: "0 12px 35px rgba(0,0,0,0.25)",
                  backgroundColor: theme.palette.secondary.dark,
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
  );
}