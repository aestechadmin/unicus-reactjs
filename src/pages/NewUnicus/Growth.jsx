import React from "react";
import { Box, Typography, Button, useTheme } from "@mui/material";
import { websiteData } from "../NewUnicus";
import { scrollToQuote } from "../NewUnicus"; 

export default function Growth() {
  const theme = useTheme();
  const data = websiteData?.growth;

  const partners =
    data?.slides?.filter((slide) => slide.type === "partner") || [];

  if (!data || !partners.length) {
    return null;
  }

  return (
    <Box
      sx={{
        backgroundColor: "#E6F1FE",
        py: { xs: 6, md: 10 },
        px: { xs: 2, sm: 3, md: 5, lg: 8 },
      }}
    >
      {/* Title */}
      <Typography
        sx={{
          fontSize: {
            xs: "2.3rem",
            sm: "3rem",
            md: "4rem",
            lg: "5rem",
          },
          fontWeight: 600,
          color: "#000",
          textAlign: 'left',
          mb: { xs: 4, md: 6 },
        }}
      >
        Our Clients
      </Typography>

      {/* Cards */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
        }}
      >
        {partners.map((partner) => (
          <Box
            key={partner.name}
            sx={{
              flex: {
                xs: "1 1 100%",
                sm: "1 1 calc(50% - 12px)",
                lg: "1 1 calc(33.333% - 16px)",
              },
              minWidth: 0,
            }}
          >
            <Box
              sx={{
                position: "relative",
                width: "100%",
                aspectRatio: "4 / 2",
                overflow: "hidden",
                borderRadius: "22px",
                boxShadow: "0 10px 30px rgba(0,0,0,.15)",
                cursor: "pointer",
                transition: ".3s",
                "&:hover": {
                  transform: "translateY(-6px)",
                },
                "&:hover img": {
                  transform: "scale(1.06)",
                },
              }}
            >
              {/* Image */}
              <Box
                component="img"
                src={partner.image}
                alt={partner.name}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: ".4s",
                  display: "block",
                }}
              />

              {/* Overlay */}
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(0,0,0,.85), rgba(0,0,0,.2), transparent)",
                }}
              />

              {/* Content */}
              <Box
                sx={{
                  position: "absolute",
                  left: 24,
                  right: 24,
                  bottom: 24,
                }}
              >
                <Typography
                  sx={{
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: {
                      xs: "1.2rem",
                      md: "1.9rem",
                    },
                    mb: 1,
                    textAlign: 'left'
                  }}
                >
                  {partner.name}
                </Typography>

            
              </Box>
            </Box>
          </Box>
        ))}
      </Box>

      {/* Button */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: { xs: 6, md: 8 },
        }}
      >
        <Button
          variant="contained"
          onClick={scrollToQuote}
          sx={{
            px: { xs: 4, md: 6 },
            py: 1.5,
            borderRadius: "10px",
            textTransform: "none",
            fontWeight: 700,
            fontSize: {
              xs: "1rem",
              md: "1.7rem",
            },
            backgroundColor: theme.palette.secondary.main,
            "&:hover": {
              backgroundColor: theme.palette.secondary.dark,
            },
          }}
        >
          Request A Site Assessment
        </Button>
      </Box>
    </Box>
  );
}