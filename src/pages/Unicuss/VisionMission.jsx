import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { fadeLeft, fadeUp, scaleIn, stagger, viewport, titleSx, cardBodySx } from "./motion";

export default function VisionMission({ data }) {
  return (
    <Box
      sx={{
        position: "relative",
        height: { xs: "auto", md: "95vh" },
        minHeight: { xs: "100svh", md: 720 },
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
          backgroundSize: { xs: "240% auto", md: "160% auto" },
          backgroundPosition: { xs: "18% 50%", md: "8% 30%" },
        }}
      />

      <Container
        maxWidth="xl"
        sx={{
          px: { xs: 2, sm: 3, md: 8 },
          position: "relative",
          zIndex: 1,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          pt: { xs: 8, md: 12 },
          pb: { xs: 4, md: 5 },
        }}
      >
        <motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={fadeLeft}>
          <Typography sx={{ ...titleSx, fontWeight: 600, color: "#fff", textAlign: "left" }}>
            {data.title}
          </Typography>
        </motion.div>

        <Box>
          <motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={fadeUp}>
            <Typography sx={{ color: "#fff", fontWeight: 600, fontSize: { xs: 18, md: 24 }, textAlign: "left" }}>
              {data.visionTitle}
            </Typography>
            {data.visionText && (
              <Typography
                sx={{
                  color: "rgba(255,255,255,0.78)",
                  mt: 1.2,
                  mb: { xs: 2.5, md: 8 },
                  fontWeight: 400,
                  fontSize: { xs: 14, md: 16 },
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
                fontSize: { xs: 18, md: 24 },
                textAlign: "left",
                mb: { xs: 2.5, md: 4 },
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
              gridTemplateColumns: { xs: "1fr 1fr", md: "repeat(4, 1fr)" },
              gap: { xs: 1.5, md: 2 },
              mb: { xs: 2, md: 8 },
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
                  p: { xs: 2, md: 2.4 },
                  minHeight: { xs: 90, md: 100 },
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
