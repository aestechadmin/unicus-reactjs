import React, { useRef } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { motion } from "framer-motion";

export default function Process() {
  const theme = useTheme();
  const sectionRef = useRef(null);

  // Process steps data - Horizontal layout
  const processSteps = [
    {
      number: "01",
      title: "Site Assessment",
      description: "A walkthrough to understand scope footfall and risk"
    },
    {
      number: "02",
      title: "Customized Plan",
      description: "Manpower, shifts and SOPs tailored to your facility"
    },
    {
      number: "03",
      title: "Team Onboarded",
      description: "Trained staff deployed with an onsite work manager"
    }
  ];

  // Right side bullet points - Plain design
  const bulletPoints = [
    {
      title: "Reliable & Compliant",
      description: "Background-verified staff with statutory compliance"
    },
    {
      title: "Flexible Scheduling",
      description: "Day, night and 24x7 shift coverage as required"
    },
    {
      title: "Proactive Reporting",
      description: "Daily checklists and monthly performance reviews"
    },
    {
      title: "Long-Term Partnership",
      description: "Built for multi-year operations, not one-off jobs"
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <Box
      ref={sectionRef}
      sx={{
        position: "relative",
        minHeight: { xs: "auto", md: "100vh" },
        backgroundImage: "url(/img/clientbg.jpg)",
        backgroundSize: "cover",
        py: { xs: 6, md: 8, lg: 10 },
        px: { xs: 3, md: 6, lg: 10 },
        display: "flex",
        alignItems: { xs: "flex-start", md: "flex-end" },
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
          width: "100%",
        }}
      >
        {/* Title - How We Work */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={titleVariants}
        >
          <Typography
            sx={{
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3.5rem", lg: "4rem" },
              fontWeight: 700,
              color: "#FFF",
              mb: { xs: 3, md: 6 },
              textAlign: { xs: "center", md: "left" },
              letterSpacing: "-0.02em",
              position: { xs: "relative", md: "absolute" },
              bottom: { md: 200 },
              width: "100%",
            }}
          >
            How We Work
          </Typography>
        </motion.div>

        {/* Main Content - Flex Layout */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            gap: { xs: 4, lg: 6 },
            alignItems: { xs: "stretch", lg: "flex-start" },
            mt: { xs: 4, md: 0 },
          }}
        >
          {/* Left Side - Process Steps Horizontal */}
          <Box
            sx={{
              flex: { xs: "1 1 auto", lg: "0 0 55%" },
              width: { xs: "100%", lg: "55%" },
              position: { xs: "relative", md: "absolute" },
              bottom: { md: 0 },
            }}
          >
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
                  margin: { xs: "-6px", md: "-12px" },
                }}
              >
                {processSteps.map((step, index) => (
                  <Box
                    key={index}
                    sx={{
                      flex: "0 0 auto",
                      width: {
                        xs: "100%",
                        sm: "50%",
                        lg: "33.333%",
                      },
                      padding: { xs: "6px", md: "12px" },
                    }}
                  >
                    <motion.div
                      variants={itemVariants}
                      style={{ height: "100%" }}
                    >
                      <Box
                        sx={{
                          backgroundColor: "rgba(255, 255, 255, 0.1)",
                          backdropFilter: "blur(10px)",
                          borderRadius: "16px",
                          padding: { xs: "16px 20px", md: "24px" },
                          height: "100%",
                          minHeight: { xs: "140px", md: "180px" },
                          border: "1px solid rgba(255, 255, 255, 0.12)",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            backgroundColor: "rgba(255, 255, 255, 0.2)",
                            transform: { md: "translateY(-4px)" },
                            borderColor: theme.palette.secondary.main,
                          },
                        }}
                      >
                        {/* Step Number */}
                        <Typography
                          sx={{
                            fontSize: { xs: "1.8rem", md: "3rem" },
                            fontWeight: 800,
                            color: '#FFF',
                            lineHeight: 1,
                            mb: 1,
                            fontFamily: "monospace",
                            textAlign: "left",
                            opacity: 0.9,
                          }}
                        >
                          {step.number}
                        </Typography>

                        {/* Step Title */}
                        <Typography
                          sx={{
                            fontSize: { xs: "0.95rem", md: "1.5rem" },
                            fontWeight: 700,
                            color: "#FFF",
                            mb: 0.5,
                            textAlign: "left",
                          }}
                        >
                          {step.title}
                        </Typography>

                        {/* Step Description */}
                        <Typography
                          sx={{
                            fontSize: { xs: "0.75rem", md: "1.2rem" },
                            color: "rgba(255, 255, 255, 0.7)",
                            lineHeight: 1.5,
                            flex: 1,
                            textAlign: "left",
                          }}
                        >
                          {step.description}
                        </Typography>
                      </Box>
                    </motion.div>
                  </Box>
                ))}
              </Box>
            </motion.div>
          </Box>

          {/* Right Side - Bullet Points */}
          <Box
            sx={{
              flex: { xs: "1 1 auto", lg: "0 0 40%" },
              width: { xs: "100%", lg: "40%" },
              pt: { xs: 0, lg: 2 },
              position: { xs: "relative", md: "absolute" },
              bottom: { md: 0 },
              right: { md: 0 },
              mt: { xs: 2, md: 0 },
            }}
          >
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={containerVariants}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: { xs: 1.5, md: 2.5 },
                }}
              >
                {bulletPoints.map((point, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    style={{ width: "100%" }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: { xs: 1.5, md: 2 },
                        padding: { xs: "10px 12px", md: "16px 20px" },
                        borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          paddingLeft: { xs: "16px", md: "24px" },
                          borderBottomColor: theme.palette.secondary.main,
                        },
                      }}
                    >
                      {/* Bullet Dot */}
                      <Box
                        sx={{
                          minWidth: { xs: "6px", md: "8px" },
                          width: { xs: "6px", md: "8px" },
                          height: { xs: "6px", md: "8px" },
                          mt: { xs: "6px", md: "8px" },
                          borderRadius: "50%",
                          backgroundColor: '#FFF',
                          flexShrink: 0,
                        }}
                      />

                      {/* Content */}
                      <Box>
                        <Typography
                          sx={{
                            fontSize: { xs: "0.85rem", sm: "0.95rem", md: "1.5rem" },
                            fontWeight: 600,
                            color: "#FFF",
                            mb: 0.25,
                            textAlign: 'left',
                          }}
                        >
                          {point.title}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: { xs: "0.7rem", sm: "0.8rem", md: "1.2rem" },
                            color: "rgba(255, 255, 255, 0.6)",
                            lineHeight: 1.5,
                            textAlign: 'left',
                          }}
                        >
                          {point.description}
                        </Typography>
                      </Box>
                    </Box>
                  </motion.div>
                ))}
              </Box>
            </motion.div>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}