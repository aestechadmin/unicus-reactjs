import React from 'react';
import { Box, Typography, Stack, Button } from '@mui/material';
import { motion } from "framer-motion";
import { scrollToQuote } from "../NewUnicus"; 
import { ArrowForward } from "@mui/icons-material";

const companyData = {
  title: "Company Overview & Core Values",
  stats: [
    { value: "2022", label: "Founded" },
    { value: "4", label: "Years of Experience" },
    { value: "400+", label: "In Private Sector" },
    { value: "2", label: "States Covered" }
  ],
  values: [
    {
      title: "Integrity",
      description: "Accountability and transparency across all operations."
    },
    {
      title: "Excellence",
      description: "Highest standards in every service rendered."
    },
    {
      title: "Client-Centricity",
      description: "Onsite Work Managers for seamless service delivery"
    },
  ]
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

const Company = () => {
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
          backgroundImage: "url(/img/cvalue.png)",
          backgroundSize: { 
            xs: "cover",
            sm: "cover",
            md: "cover",
            lg: "cover"
          },
          backgroundPosition: { 
            xs: "center",
            sm: "center",
            md: "center",
            lg: "center"
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
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            px: { xs: 2, sm: 3, md: 6, lg: 10 },
            py: { xs: 2, sm: 3, md: 4, lg: 6 },
          }}
        >
          {/* Title - at the top */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              pt: { xs: 1, sm: 2, md: 3, lg: 4 },
            }}
          >
            <Typography
              variant="h3"
              sx={{
                color: "white",
                fontWeight: 700,
                textAlign: 'left',
                fontSize: { 
                  xs: "1.8rem", 
                  sm: "2.5rem", 
                  md: "3.5rem", 
                  lg: "5.5rem" 
                },
                lineHeight: 1.1,
                textShadow: "0 2px 20px rgba(0,0,0,0.3)",
                maxWidth: "90%",
              }}
            >
              {companyData.title}
            </Typography>
          </Box>

          {/* Stats - Center with flex grow */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              py: { xs: 2, sm: 3, md: 4 },
            }}
          >
            <Stack
              direction={{ xs: "column", sm: "row" }}
              flexWrap="wrap"
              justifyContent="center"
              alignItems="center"
              spacing={{ xs: 2, sm: 3, md: 4 }}
              sx={{
                width: "100%",
                maxWidth: "1400px",
              }}
            >
              {companyData.stats.map((stat, index) => (
                <Box
                  key={index}
                  sx={{
                    flex: { xs: "0 0 100%", sm: "0 0 45%", md: "0 0 22%" },
                    minWidth: { xs: "100%", sm: 180, md: 250 },
                    textAlign: "center",
                    background: 'rgba(255,255,255,0.12)',
                    backdropFilter: "blur(10px)",
                    borderRadius: { xs: 3, md: 4 },
                    padding: { xs: 2, sm: 2.5, md: 3 },
                    border: "1px solid rgba(255,255,255,0.1)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      background: 'rgba(255,255,255,0.2)',
                      transform: "translateY(-5px)",
                      boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
                    },
                  }}
                >
                  <Typography
                    sx={{
                      color: "white",
                      fontSize: { 
                        xs: "2rem", 
                        sm: "2.5rem", 
                        md: "3.5rem", 
                        lg: "4rem" 
                      },
                      fontWeight: 700,
                      fontFamily: "Inter, sans-serif",
                      textAlign: 'left',
                      textShadow: "0 2px 10px rgba(0,0,0,0.2)",
                    }}
                  >
                    {stat.value}
                  </Typography>

                  <Typography
                    sx={{
                      color: "white",
                      opacity: 0.85,
                      mt: 1,
                      fontSize: { 
                        xs: "0.85rem", 
                        sm: "1rem", 
                        md: "1.2rem", 
                        lg: "1.4rem" 
                      },
                      textAlign: 'left',
                      fontWeight: 500,
                    }}
                  >
                    {stat.label}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Box>

          {/* Core Values - Bottom */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
              },
              gap: { xs: 2, sm: 2.5, md: 3 },
              width: "100%",
              pt: { xs: 2, sm: 3, md: 4 },
              pb: { xs: 1, sm: 1.5, md: 2 },
            }}
          >
            {companyData.values.map((value, index) => (
              <Box 
                key={index} 
                sx={{ 
                  py: { xs: 0.5, md: 1 },
                  px: { xs: 1, md: 0 },
                  borderLeft: { xs: "3px solid rgba(255,255,255,0.3)", md: "none" },
                  pl: { xs: 2, md: 0 },
                }}
              >
                <Typography
                  sx={{
                    color: "white",
                    fontWeight: 700,
                    fontSize: { 
                      xs: "1.5rem", 
                      sm: "1.1rem", 
                      md: "1.8rem", 
                      lg: "2.2rem" 
                    },
                    mb: 0.7,
                    textAlign: 'left',
                    textShadow: "0 1px 8px rgba(0,0,0,0.2)",
                  }}
                >
                  {value.title}
                </Typography>

                <Typography
                  sx={{
                    color: "white",
                    opacity: 0.8,
                    fontSize: { 
                      xs: "0.9rem", 
                      sm: "0.85rem", 
                      md: "0.95rem", 
                      lg: "1.3rem" 
                    },
                    lineHeight: 1.6,
                    fontWeight: 400,
                    textShadow: "0 1px 8px rgba(0,0,0,0.2)",
                    textAlign: 'left',
                    maxWidth: 300
                  }}
                >
                  {value.description}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Button Section */}
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
                    md: "1.6rem",
                    lg: "1.8rem" 
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
                Get Quote
              </Button>
            </motion.div>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Company;