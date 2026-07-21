import React, { useRef } from "react";
import { Box, Typography, useTheme, Button } from "@mui/material";
import { motion } from "framer-motion";
import { scrollToQuote } from "../NewUnicus"; 
import { ArrowForward } from "@mui/icons-material";

export default function Process() {
  const theme = useTheme();
  const sectionRef = useRef(null);

  // Process steps data
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

  // Core Values data
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

  return (
    <Box
      ref={sectionRef}
      sx={{
        position: "relative",
        minHeight: "100vh",
        width: "100%",
        backgroundImage: "url(/img/clientbg.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "top",
        backgroundRepeat: "no-repeat",
        py: { xs: 4, sm: 5, md: 6, lg: 8 },
        px: { xs: 2, sm: 3, md: 6, lg: 10 },
        display: "flex",
        alignItems: "center",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, rgba(0, 0, 0, 0.6) 0%, #000000 100%)",
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
              fontSize: { 
                xs: "2rem", 
                sm: "2.5rem", 
                md: "3.5rem", 
                lg: "4.5rem" 
              },
              fontWeight: 700,
              color: "#FFF",
              mb: { xs: 3, sm: 4, md: 5, lg: 6 },
              textAlign: "left",
              letterSpacing: "-0.02em",
              textShadow: "0 2px 20px rgba(0,0,0,0.3)",
            }}
          >
            How We Work
          </Typography>
        </motion.div>

        {/* Row 1: Process Steps - 3 in a row with arrows */}
        <Box
          sx={{
            mb: { xs: 4, sm: 5, md: 6, lg: 8 },
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
                justifyContent: "center",
                alignItems: "center",
                margin: { xs: "-6px", sm: "-8px", md: "-12px" },
              }}
            >
              {processSteps.map((step, index) => (
                <React.Fragment key={index}>
                  <Box
                    sx={{
                      flex: "0 0 auto",
                      width: {
                        xs: "100%",
                        sm: "45%",
                        lg: "28%",
                      },
                      maxWidth: {
                        xs: "100%",
                        sm: "45%",
                        lg: "28%",
                      },
                      padding: { xs: "6px", sm: "8px", md: "12px" },
                      display: "flex",
                      justifyContent: "left",
                    }}
                  >
                    <motion.div
                      variants={itemVariants}
                      style={{ 
                        height: "100%", 
                        width: "100%",
                        maxWidth: "400px",
                      }}
                    >
                      <Box
                        sx={{
                          backgroundColor: "rgba(255, 255, 255, 0.1)",
                          backdropFilter: "blur(10px)",
                          borderRadius: { xs: "12px", sm: "14px", md: "16px" },
                          padding: { xs: "16px 18px", sm: "18px 22px", md: "24px 28px" },
                          height: "100%",
                          minHeight: { xs: "130px", sm: "150px", md: "180px" },
                          border: "1px solid rgba(255, 255, 255, 0.12)",
                          display: "flex",
                          flexDirection: "column",
                          // alignItems: "flex-start",
                          transition: "all 0.3s ease",
                          textAlign: "left",
                          "&:hover": {
                            backgroundColor: "rgba(255, 255, 255, 0.2)",
                            transform: { md: "translateY(-4px)" },
                            borderColor: theme.palette.secondary.main,
                            boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
                          },
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: { xs: "2rem", sm: "2rem", md: "4rem" },
                            fontWeight: 600,
                            color: '#FFF',
                            lineHeight: 1,
                            my: { xs: 0.5, md: 1 },
                            opacity: 0.9,
                            textAlign: 'center'
                          }}
                        >
                          {step.number}
                        </Typography>

                        <Typography
                          sx={{
                            fontSize: { 
                              xs: "0.85rem", 
                              sm: "1rem", 
                              md: "1.3rem", 
                              lg: "1.5rem" 
                            },
                            fontWeight: 700,
                            color: "#FFF",
                            mb: 0.7,
                          }}
                        >
                          {step.title}
                        </Typography>

                        <Typography
                          sx={{
                            fontSize: { 
                              xs: "0.7rem", 
                              sm: "0.8rem", 
                              md: "1rem", 
                              lg: "1.2rem" 
                            },
                            color: "rgba(255, 255, 255, 0.7)",
                            lineHeight: 1.5,
                            flex: 1,
                          }}
                        >
                          {step.description}
                        </Typography>
                      </Box>
                    </motion.div>
                  </Box>

                  {/* Arrow between steps - show on all screen sizes */}
                  {/* Arrow between steps */}
                  {index < processSteps.length - 1 && (
                    <Box
                      sx={{
                        display: { xs: "none", sm: "flex" },
                        justifyContent: "center",
                        alignItems: "center",
                        padding: { xs: "6px", sm: "8px", md: "12px" },
                        flex: "0 0 auto",
                        width: { sm: "10%", lg: "8%" },
                        maxWidth: { sm: "10%", lg: "8%" },
                      }}
                    >
                      <motion.div
                        variants={itemVariants}
                        style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                      >
                        <Box
                          sx={{
                            width: { xs: 30, sm: 40, md: 60 },
                            height: { xs: 20, sm: 25, md: 35 },
                            position: "relative",
                          }}
                        >
                          <svg
                            viewBox="0 0 60 30"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{
                              width: "100%",
                              height: "100%",
                              transform: { xs: "rotate(90deg)", sm: "rotate(0deg)" },
                            }}
                          >
                            <line
                              x1="0"
                              y1="15"
                              x2="55"
                              y2="15"
                              stroke="rgba(255,255,255,0.5)"
                              strokeWidth="3"
                              strokeLinecap="round"
                            />
                            <polygon
                              points="55,15 45,8 45,22"
                              fill="rgba(255,255,255,0.5)"
                            />
                          </svg>
                        </Box>
                      </motion.div>
                    </Box>
                  )}

                  {/* Mobile arrow */}
                  {index < processSteps.length - 1 && (
                    <Box
                      sx={{
                        display: { xs: "flex", sm: "none" },
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                        padding: "4px 0",
                      }}
                    >
                      <motion.div
                        variants={itemVariants}
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <Box
                          sx={{
                            width: { xs: 20, sm: 30 },
                            height: { xs: 30, sm: 40 },
                            position: "relative",
                          }}
                        >
                          <svg
                            viewBox="0 0 30 60"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{
                              width: "100%",
                              height: "100%",
                            }}
                          >
                            <line
                              x1="15"
                              y1="0"
                              x2="15"
                              y2="55"
                              stroke="rgba(255,255,255,0.4)"
                              strokeWidth="3"
                              strokeLinecap="round"
                            />
                            <polygon
                              points="15,55 8,45 22,45"
                              fill="rgba(255,255,255,0.4)"
                            />
                          </svg>
                        </Box>
                      </motion.div>
                    </Box>
                  )}
                </React.Fragment>
              ))}
            </Box>
          </motion.div>
        </Box>

        {/* Row 2: Core Values - 4 in a row */}
        <Box
          sx={{
            mb: { xs: 4, sm: 5, md: 6, lg: 8 },
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
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, 1fr)",
                  md: "repeat(4, 1fr)",
                },
                gap: { xs: 2, sm: 2.5, md: 3 },
                width: "100%",
              }}
            >
              {bulletPoints.map((point, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  style={{ 
                    width: "100%", 
                    height: "100%",
                    display: "flex",
                  }}
                >
                  <Box
                    sx={{
                      // backgroundColor: "rgba(255, 255, 255, 0.08)",
                      // backdropFilter: "blur(10px)",
                      borderRadius: { xs: "12px", md: "16px" },
                      padding: { xs: "16px 18px", sm: "18px 22px", md: "20px 26px" },
                      // border: "1px solid rgba(255, 255, 255, 0.1)",
                      height: "100%",
                      width: "100%",
                      transition: "all 0.3s ease",
                      // "&:hover": {
                      //   backgroundColor: "rgba(255, 255, 255, 0.15)",
                      //   transform: { md: "translateY(-4px)" },
                      //   borderColor: theme.palette.secondary.main,
                      //   boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
                      // },
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: { xs: 1.5, md: 2 },
                        mb: { xs: 1, md: 1.5 },
                      }}
                    >
                      {/* <Box
                        sx={{
                          width: { xs: "10px", md: "12px" },
                          height: { xs: "10px", md: "12px" },
                          borderRadius: "50%",
                          backgroundColor: '#FFF',
                          flexShrink: 0,
                          opacity: 0.9,
                        }}
                      /> */}
                      <Typography
                        sx={{
                          fontSize: { 
                            xs: "0.9rem", 
                            sm: "1rem", 
                            md: "1.1rem", 
                            lg: "2.1rem" 
                          },
                          fontWeight: 600,
                          color: "#FFF",
                        }}
                      >
                        {point.title}
                      </Typography>
                    </Box>

                    <Typography
                      sx={{
                        fontSize: { 
                          xs: "0.75rem", 
                          sm: "0.85rem", 
                          md: "0.9rem", 
                          lg: "1.4rem" 
                        },
                        fontWeight: 400,
                        color: "rgba(255, 255, 255, 0.8)",
                        lineHeight: 1.6,
                        // pl: { xs: "32px", md: "38px" },
                        textAlign: 'left'
                      }}
                    >
                      {point.description}
                    </Typography>
                  </Box>
                </motion.div>
              ))}
            </Box>
          </motion.div>
        </Box>

        {/* Row 3: Get Quote Button */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
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
                  xs: "10px 24px", 
                  sm: "12px 32px", 
                  md: "14px 40px",
                  lg: "16px 48px" 
                },
                borderRadius: { xs: "8px", md: "10px" },
                fontSize: { 
                  xs: "0.8rem", 
                  sm: "0.9rem", 
                  md: "1.4rem",
                  lg: "1.6rem" 
                },
                fontWeight: 600,
                textTransform: "none",
                boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                transition: "all 0.3s ease",
                gap: 1,
                "&:hover": {
                  transform: "translateY(-3px)",
                  boxShadow: "0 12px 35px rgba(0,0,0,0.25)",
                  backgroundColor: '#f5f5f5',
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