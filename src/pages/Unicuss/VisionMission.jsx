import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { fadeLeft, fadeUp, pagePx, scaleIn, stagger, viewport, titleSx, cardBodySx } from "./motion";

export default function VisionMission({ data }) {
  return (
    <Box
      sx={{
        position: "relative",
        height: { xs: "auto", sm: "auto", md: "95vh", lg: "95vh", xl: "95vh" },
        minHeight: { xs: "100svh", sm: "100svh", md: 680, lg: 720, xl: 720 },
        color: "#fff",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#000",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${data.image})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: { xs: "240% auto", sm: "200% auto", md: "170% auto", lg: "160% auto", xl: "160% auto" },
          backgroundPosition: { xs: "18% 50%", sm: "14% 45%", md: "10% 35%", lg: "8% 30%", xl: "8% 30%" },
        }}
      />

      <Container
        maxWidth={false} disableGutters
        sx={{
          px: pagePx,
          position: "relative",
          zIndex: 1,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          pt: { xs: 8, sm: 9, md: 10, lg: 12, xl: 12 },
          pb: { xs: 4, sm: 4.25, md: 4.5, lg: 5, xl: 5 },
        }}
      >
        <motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={fadeLeft}>
          <Typography sx={{ ...titleSx, fontWeight: 600, color: "#fff", textAlign: "left" }}>
            {data.title}
          </Typography>
        </motion.div>

        <Box>
          <motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={fadeUp}>
            <Typography sx={{ color: "#fff", fontWeight: 600, fontSize: { xs: 18, sm: 22, md: 26, lg: 30, xl: 30 }, textAlign: "left" }}>
              {data.visionTitle}
            </Typography>
            {data.visionText && (
              <Typography
                sx={{
                  color: "rgba(255,255,255,0.78)",
                  mt: 1.2,
                  mb: { xs: 2.5, sm: 4, md: 6, lg: 8, xl: 8 },
                  fontWeight: 400,
                  fontSize: { xs: 14, sm: 14, md: 15, lg: 16, xl: 16 },
                  lineHeight: 1.7,
                  textAlign: "left",
                  maxWidth: 1300,
                }}
              >
                {data.visionText}
              </Typography>
            )}
            <Typography
              sx={{
                color: "#fff",
                fontWeight: 600,
                fontSize: { xs: 18, sm: 22, md: 26, lg: 30, xl: 30 },
                textAlign: "left",
                mb: { xs: 2.5, sm: 3, md: 3.5, lg: 4, xl: 4 },
              }}
            >
              {data.missionTitle}
            </Typography>
          </motion.div>

          <Box
            component={motion.div}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={stagger}
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr 1fr", sm: "1fr 1fr", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)", xl: "repeat(4, 1fr)" },
              gap: { xs: 1.5, sm: 1.6, md: 1.8, lg: 2, xl: 2 },
              mb: { xs: 2, sm: 3, md: 5, lg: 8, xl: 8 },
            }}
          >
            {data.highlights.map((item) => (
              <Box
                key={item.text}
                component={motion.div}
                variants={scaleIn}
                sx={{
                  bgcolor: "rgba(255, 255, 255, 0.7)",
                  borderRadius: "16px",
                  p: { xs: 2, sm: 2.1, md: 2.25, lg: 2.4, xl: 2.4 },
                  minHeight: { xs: 90, sm: 92, md: 96, lg: 100, xl: 100 },
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ ...cardBodySx, color: "#111", textAlign: "left" }}>
                  {item.text}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
