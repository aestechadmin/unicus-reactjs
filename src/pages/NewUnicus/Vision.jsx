import React from 'react';
import { Box, Typography, Stack } from '@mui/material';

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

const Vision = () => {
  return (
    <Box sx={{ position: "relative", overflow: "hidden" }}>
      <Box
        sx={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          alignItems: "flex-end",
          backgroundImage: "url(/img/visonbg.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "#1a1a1a",
          "&::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.6)",
            zIndex: 0,
          },
        }}
      >
        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            width: "100%",
            px: { xs: 3, md: 6, lg: 10 },
            py: { xs: 4, md: 6, lg: 8 },
          }}
        >
          <Box
            sx={{
              minHeight: "100vh",
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "space-between",
              gap: 6,
            }}
          >
            {/* LEFT */}
            <Box
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Title */}
              <Typography
                variant="h6"
                sx={{
                  color: "white",
                  fontWeight: 600,
                  fontSize: {
                    xs: "2.5rem",
                    md: "3.5rem",
                    lg: "4.5rem",
                  },
                  lineHeight: 1.1,
                  textAlign: 'left',
                  textShadow: "0 2px 20px rgba(0,0,0,0.3)",
                }}
              >
                {visionData.title}
              </Typography>

              <Box sx={{ flexGrow: 1 }} />

              {/* Subtitle */}
              <Typography
                variant="h6"
                sx={{
                  color: "white",
                  fontSize: {
                    xs: "1rem",
                    md: "1.2rem",
                    lg: "2.2rem",
                  },
                  fontWeight: 600,
                  lineHeight: 1.6,
                  mb: 6,
                  maxWidth: 800,
                  textAlign: 'left',
                  textShadow: "0 1px 10px rgba(0,0,0,0.2)",
                }}
              >
                {visionData.subtitle}
              </Typography>
            </Box>

            {/* RIGHT */}
            <Box
              sx={{
                flex: 1,
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-end",
              }}
            >
              <Stack
                spacing={2}
                sx={{
                  maxWidth: 700,
                  mb: { xs: 0, md: 1 }, // Adjust this to align the last bullet with the subtitle
                }}
              >
                {visionData.bulletPoints.map((point, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 2,
                    }}
                  >
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        bgcolor: "white",
                        mt: 1.2,
                        flexShrink: 0,
                        opacity: 0.8,
                      }}
                    />

                    <Typography
                      sx={{
                        color: "white",
                        fontSize: {
                          xs: "0.9rem",
                          md: "1rem",
                          lg: "1.7rem",
                        },
                        lineHeight: 1.5,
                        opacity: 0.9,
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
        </Box>
      </Box>
    </Box>
  );
};

export default Vision;