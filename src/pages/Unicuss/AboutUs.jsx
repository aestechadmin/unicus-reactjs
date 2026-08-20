import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { bodySx, cardTitleSx, fadeUp, scaleIn, stagger, subSx, titleSx, viewport } from "./motion";

export default function AboutUs({ data }) {
  return (
    <Box
      sx={{
        position: "relative",
        height: { xs: "auto", md: "100vh" },
        minHeight: { xs: "100svh", md: 720 },
        color: "#fff",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${data.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(360deg, #000000 0%, rgba(0, 0, 0, 0.3) 100%)",
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
          pb: { xs: 4, md: 12 },
        }}
      >
        <motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={fadeUp}>
          <Typography sx={{ ...titleSx, fontWeight: 600, color: "#fff", textAlign: "left" }}>
            {data.title}
          </Typography>
        </motion.div>

        <Box>
          <motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={fadeUp}>
            <Typography sx={{ ...subSx, color: "#fff", mb: 1.2, textAlign: "left" }}>
              {data.heading}
            </Typography>
            <Typography
              sx={{
                ...bodySx,
                color: "rgba(255,255,255,0.88)",
                maxWidth: { xs: 360, sm: 560, md: 1300 },
                mb: { xs: 2.5, md: 4 },
                textAlign: "left",
                textShadow: "0 1px 12px rgba(0,0,0,0.45)",
              }}
            >
              {data.description}
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
              gridTemplateColumns: { xs: "1fr 1fr", md: "repeat(5, 1fr)" },
              gap: { xs: 1.2, md: 2 },
            }}
          >
            {data.values.map((item, index) => (
              <Box
                key={item.title}
                component={motion.div}
                variants={scaleIn}
                sx={{
                  bgcolor: "rgba(255, 255, 255, 0.5)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: "16px",
                  p: { xs: 1.4, md: 2.2 },
                  minHeight: { xs: 64, md: 110 },
                  display: "flex",
                  alignItems: "center",
                  gridColumn: { xs: index === 4 ? "1 / -1" : "auto", md: "auto" },
                }}
              >
                <Typography sx={{ ...cardTitleSx, color: "#fff", textAlign: "left" }}>
                  {item.title}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
