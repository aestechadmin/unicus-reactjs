import React from "react";
import { Box, Typography, Button, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import { websiteData } from "../Unicus";

export default function Growth() {
  const theme = useTheme();
  const data = websiteData?.growth;
  const partners = data?.slides?.filter((slide) => slide.type === "partner") || [];

  if (!data || !partners.length) {
    return null;
  }

  // Animation variants for cards
  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        delay: index * 0.12,
        ease: [0.25, 0.1, 0.25, 1]
      }
    })
  };

  // Title animation
  const titleVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  // Button animation
  const buttonVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.8,
        ease: [0.25, 0.1, 0.25, 1]
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    tap: {
      scale: 0.95
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#E6F1FE",
        py: { xs: 6, md: 10, lg: 12 },
        px: { xs: 3, md: 6, lg: 10 },
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Section Title with Animation */}
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
            textAlign: "left",
            color: "#000",
            mb: { xs: 4, md: 6 },
            letterSpacing: "-0.02em",
          }}
        >
          Our Clients
        </Typography>
      </motion.div>

      {/* Cards Container - 3 columns using flexbox */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          margin: { xs: "-10px", md: "-15px" },
          maxWidth: "1400px",
          mx: "auto",
        }}
      >
        {partners.map((partner, index) => (
          <Box
            key={partner.name}
            sx={{
              width: {
                xs: "100%",
                sm: "50%",
                md: "33.333%",
              },
              padding: { xs: "10px", md: "15px" },
              display: "flex",
            }}
          >
            <motion.div
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardVariants}
              style={{
                width: "100%",
                display: "flex",
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "4/3",
                  borderRadius: "20px",
                  overflow: "hidden",
                  cursor: "pointer",
                  boxShadow: "0 12px 35px rgba(0,0,0,0.15)",
                  transition: "all 0.35s ease",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 22px 50px rgba(0,0,0,0.25)",
                  },
                  "&:hover .card-image": {
                    transform: "scale(1.08)",
                  },
                  "&:hover .card-overlay": {
                    opacity: 1,
                  },
                }}
              >
                {/* Image */}
                <Box
                  component="img"
                  src={partner.image}
                  alt={partner.name}
                  className="card-image"
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.5s ease",
                    display: "block",
                  }}
                />

                {/* Gradient Overlay */}
                <Box
                  className="card-overlay"
                  sx={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.85) 5%, rgba(0,0,0,0.25) 55%, rgba(0,0,0,0) 100%)",
                    transition: "opacity 0.3s ease",
                    opacity: 0.8,
                  }}
                />

                {/* Content */}
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    p: { xs: 2.5, md: 3.5 },
                  }}
                >
                  <Typography
                    sx={{
                      color: "#fff",
                      fontWeight: 700,
                      fontSize: {
                        xs: "1.2rem",
                        sm: "1.3rem",
                        md: "1.5rem",
                        lg: "1.6rem",
                      },
                      mb: 1,
                      textAlign: "left",
                      textShadow: "0 2px 10px rgba(0,0,0,0.3)",
                    }}
                  >
                    {partner.name}
                  </Typography>

                  <Typography
                    sx={{
                      color: "rgba(255,255,255,0.9)",
                      fontSize: {
                        xs: "0.85rem",
                        sm: "0.9rem",
                        md: "0.95rem",
                        lg: "1rem",
                      },
                      lineHeight: 1.6,
                      textAlign: "left",
                      textShadow: "0 1px 5px rgba(0,0,0,0.2)",
                    }}
                  >
                    {partner.description}
                  </Typography>
                </Box>
              </Box>
            </motion.div>
          </Box>
        ))}
      </Box>

      {/* Button Centered at Bottom with Animation */}
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
          onClick={() => document.getElementById("quote-section")?.scrollIntoView({ behavior: "smooth", block: "start" })}
        >
          <Button
            variant="contained"
            size="large"
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
              "&:hover": {
                transform: "translateY(-3px)",
                boxShadow: "0 12px 35px rgba(0,0,0,0.25)",
                backgroundColor: theme.palette.secondary.dark,
              },
            }}
          >
            Request A Site Assessment
          </Button>
        </motion.div>
      </Box>
    </Box>
  );
}