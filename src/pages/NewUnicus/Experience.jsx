// Experience.jsx
import React, { useRef } from 'react';
import { Box, Typography, Container, Button, useTheme } from "@mui/material";
import { websiteData } from "../Unicus";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import { scrollToQuote } from "../NewUnicus"; 

const Experience = ({ expSectionRef }) => {
  const theme = useTheme();
  const slides = websiteData.experienceSlides;
  const slideRefs = useRef([]);

  return (
    <Box ref={expSectionRef} component="section" sx={{ backgroundColor: "#E6F1FE" }}>
      {/* MAIN TITLE - TOP CENTER with full viewport height */}
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          textAlign: "center",
          pt: { xs: 12, md: 16 },
          px: { xs: 2, md: 4 },
          position: "relative",
          flexShrink: 0,
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontWeight: 700,
            fontSize: { xs: "2.5rem", sm: "4rem", md: "5rem", lg: "12rem" },
            color: "#000",
            lineHeight: 1.2,
          }}
        >
          {websiteData.titleData.mainTitle}
        </Typography>

        {/* Small Image Preview at Bottom - First slide image */}
        <Box
          sx={{
            position: "absolute",
            bottom: 40,
            left: "50%",
            transform: "translateX(-50%)",
            width: "100%",
            maxWidth: "100px",
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
            cursor: "pointer",
            transition: "all 0.3s ease",
            "&:hover": { transform: "translateX(-50%) scale(1.05)" },
          }}
           onClick={() =>
              slideRefs.current[0]?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              })
            }
        >
          <Box
            component="img"
            src={slides[0].image}
            alt={slides[0].alt}
            sx={{
              width: "100%",
              display: "block",
            }}
          />
        </Box>
      </Box>

      {/* ALL SLIDES - Each slide takes full viewport height */}
      {slides.map((slide, index) => (
        <Box
          key={index}
          ref={(el) => (slideRefs.current[index] = el)}
          sx={{
            width: "100%",
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            backgroundColor:  "#E6F1FE",
            px: { xs: 3, md: 6 },
            py: { xs: 6, md: 0 },
          }}
        >
          <Container maxWidth="xl">
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", lg: "row" },
                gap: { xs: 6, lg: 6 },
                alignItems: "stretch",
                minHeight: { lg: "80vh" },
              }}
            >
              {/* LEFT - 20% */}
              <Box
                sx={{
                  width: { xs: "100%", lg: "20%" },
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  minHeight: { lg: "70vh" },
                }}
              >
                {/* Previous Image */}
                {index > 0 ? (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: { xs: "flex-start", lg: "flex-end" },
                    }}
                  >
                    <Box
                      onClick={() =>
                        slideRefs.current[index - 1]?.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        })
                      }
                      sx={{
                        width: "100%",
                        maxWidth: 150,
                        borderRadius: 3,
                        overflow: "hidden",
                        cursor: "pointer",
                        transition: ".3s",
                        "&:hover": {
                          transform: "scale(1.05)",
                        },
                      }}
                    >
                      <Box
                        component="img"
                        src={slides[index - 1].image}
                        alt="Previous"
                        sx={{
                          width: "100%",
                          display: "block",
                        }}
                      />
                    </Box>
                  </Box>
                ) : (
                  <Box />
                )}

                {/* Description */}
                <Typography
                  sx={{
                    color: "#3c3c3c",
                    fontSize: { xs: "1rem", md: "1.5rem" },
                    lineHeight: 1.8,
                    textAlign: "left",
                  }}
                >
                  {slide.description}
                </Typography>
              </Box>

              {/* CENTER - 50% */}
              <Box
                sx={{
                  width: { xs: "100%", lg: "50%" },
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    borderRadius: 4,
                    overflow: "hidden",
                    boxShadow: "0 20px 50px rgba(0,0,0,.15)",
                  }}
                >
                  <Box
                    component="img"
                    src={slide.image}
                    alt={slide.alt}
                    sx={{
                      width: "100%",
                      height: { xs: 350, lg: "90vh" },
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </Box>
              </Box>

              {/* RIGHT - 30% */}
              <Box
                sx={{
                  width: { xs: "100%", lg: "30%" },
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  minHeight: { lg: "70vh" },
                  alignItems: "flex-start",
                }}
              >
                {/* Description + Button */}
                <Box
                  sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "flex-start",
                  }}
                >
                  <Typography
                    sx={{
                      color: "#3c3c3c",
                      fontSize: { xs: "1rem", md: "1.7rem" },
                      lineHeight: 1.8,
                      textAlign: "left",
                    }}
                  >
                    {slide.description}
                  </Typography>

                  <Button
                    onClick={scrollToQuote}
                    endIcon={<NorthEastIcon />}
                    sx={{
                      mt: 4,
                      px: 3,
                      py: 1.3,
                      color: "#fff",
                      fontWeight: 700,
                      fontSize: {xs: '1rem', md: '1.5rem'},
                      textTransform: "none",
                      background: theme.palette.secondary.main,
                      borderRadius: 2,
                      "&:hover": {
                        background: theme.palette.primary.main,
                      },
                    }}
                  >
                    Contact Us
                  </Button>
                </Box>

                {/* Next Image */}
                {index < slides.length - 1 ? (
                  <Box
                    onClick={() =>
                      slideRefs.current[index + 1]?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      })
                    }
                    sx={{
                      width: "100%",
                      maxWidth: 150,
                      borderRadius: 3,
                      overflow: "hidden",
                      cursor: "pointer",
                      transition: ".3s",
                      "&:hover": {
                        transform: "scale(1.05)",
                      },
                    }}
                  >
                    <Box
                      component="img"
                      src={slides[index + 1].image}
                      alt="Next"
                      sx={{
                        width: "100%",
                        display: "block",
                      }}
                    />
                  </Box>
                ) : (
                  <Box />
                )}
              </Box>
            </Box>
          </Container>
        </Box>
      ))}
    </Box>
  );
};

export default Experience;