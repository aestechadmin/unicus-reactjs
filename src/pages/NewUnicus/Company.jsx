import React from 'react';
import { Box, Typography, Stack } from '@mui/material';

const companyData = {
  title: "Company Overview & Core Values",
  stats: [
    { value: "2022", label: "Founded" },
    { value: "4", label: "Years of Experience" },
    { value: "400+", label: "In Private Sector" },
    { value: "4Cr+", label: "Annual Turnover" },
    { value: "2", label: "States Covered Andhra Pradesh & Telangana" }
  ],
  values: [
    {
      title: "Excellence",
      description: "Highest standards in every service rendered."
    },
    {
      title: "Healthcare Focus",
      description: "Specialized knowledge of hospital and medical college requirements."
    },
    {
      title: "Client-Centricity",
      description: "Onsite Work Managers for seamless service delivery"
    },
    {
      title: "Integrity",
      description: "Accountability and transparency across all operations."
    }
  ]
};

const Company = () => {
  return (
    <Box sx={{ position: "relative", overflow: "hidden" }}>
      <Box
        sx={{
          position: "relative",
          minHeight: "100vh",
          backgroundImage: "url(/img/cvalue.png)",
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
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            px: { xs: 3, md: 8, lg: 12 },
            py: { xs: 6, md: 8 },
          }}
        >
          {/* Title */}
          <Typography
            variant="h3"
            sx={{
              color: "white",
              fontWeight: 700,
              textAlign: 'left',
              fontSize: { xs: "2rem", md: "3rem", lg: "4rem" },
              mb: 8,
            }}
          >
            {companyData.title}
          </Typography>

          {/* Stats - Center */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Stack
              direction={{ xs: "column", sm: "row" }}
              flexWrap="wrap"
              justifyContent="center"
              alignItems="center"
              spacing={{ xs: 4, md: 6 }}
            >
              {companyData.stats.map((stat, index) => (
                <Box
                  key={index}
                  sx={{
                    minWidth: { xs: "100%", sm: 170, md: 190 },
                    textAlign: "center",
                  }}
                >
                  <Typography
                    sx={{
                      color: "white",
                      fontSize: { xs: "2.5rem", md: "4rem" },
                      fontWeight: 700,
                      fontFamily: "monospace",
                    }}
                  >
                    {stat.value}
                  </Typography>

                  <Typography
                    sx={{
                      color: "white",
                      opacity: 0.8,
                      mt: 1,
                      fontSize: { xs: "1rem", md: "1.5rem" },
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
                mt: "auto",
                display: "flex",
                flexWrap: "wrap",
                // rowGap: 3,
                columnGap: 1,
            }}
            >
            {companyData.values.map((value, index) => (
                <Box
                key={index}
                sx={{
                    width: {
                    xs: "100%",
                    md: "calc(50% - 24px)",
                    },
                }}
                >
                <Box
                    sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 1,
                    py:0.7
                    }}
                >
                    <Box
                    sx={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        bgcolor: "white",
                        mt: "10px",
                        flexShrink: 0,
                    }}
                    />

                    <Typography
                    sx={{
                        color: "white",
                        fontSize: { xs: "1rem", md: "1.4rem" },
                        lineHeight: 1.8,
                    }}
                    >
                    <Box
                        component="span"
                        sx={{
                        fontWeight: 700,
                        fontSize: { xs: "1rem", md: "1.5rem" },
                        }}
                    >
                        {value.title}
                    </Box>{" "}
                    - {value.description}
                    </Typography>
                </Box>
                </Box>
            ))}
            </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Company;