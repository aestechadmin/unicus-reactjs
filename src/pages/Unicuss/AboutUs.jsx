import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { bodySx, cardTitleSx, fadeUp, pagePx, scaleIn, stagger, subSx, titleSx, viewport } from "./motion";

export default function AboutUs({ data }) {
  return (
    <Box
      sx={{
        position: "relative",
        height: { xs: "auto", sm: "auto", md: "92vh", lg: "92vh", xl: "90vh" },
        minHeight: { xs: "78svh", sm: "80svh", md: 640, lg: 680, xl: 700 },
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
        maxWidth={false} disableGutters
        sx={{
          px: pagePx,
          position: "relative",
          zIndex: 1,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          pt: { xs: 8, sm: 9, md: 9, lg: 10, xl: 10 },
          pb: { xs: 10, sm: 12, md: 16, lg: 20, xl: 22 },
        }}
      >
        <motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={fadeUp}>
          <Typography sx={{ ...titleSx, fontWeight: 600, color: "#fff", textAlign: "left" }}>
            {data.title}
          </Typography>
        </motion.div>

        <Box sx={{ mt: "auto" }}>
          <motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={fadeUp}>
            <Typography sx={{ ...subSx, color: "#fff", mb: 1.2, textAlign: "left" }}>
              {data.heading}
            </Typography>
            <Typography
              sx={{
                ...bodySx,
                color: "rgba(255,255,255,0.88)",
                maxWidth: { xs: 360, sm: 560, md: 900, lg: 1300, xl: 1300 },
                mb: { xs: 2, sm: 2.25, md: 2.5, lg: 3, xl: 3 },
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
              gridTemplateColumns: { xs: "1fr 1fr", sm: "1fr 1fr", md: "repeat(3, 1fr)", lg: "repeat(5, 1fr)", xl: "repeat(5, 1fr)" },
              gap: { xs: 1.2, sm: 1.4, md: 1.8, lg: 2, xl: 2 },
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
                  p: { xs: 2, sm: 2.2, md: 2.6, lg: 3, xl: 3.2 },
                  minHeight: { xs: 92, sm: 108, md: 128, lg: 148, xl: 156 },
                  display: "flex",
                  alignItems: "center",
                  gridColumn: {
                    xs: index === 4 ? "1 / -1" : "auto",
                    sm: index === 4 ? "1 / -1" : "auto",
                    md: "auto",
                    lg: "auto",
                    xl: "auto",
                  },
                }}
              >
                <Typography sx={{ ...cardTitleSx, color: "#fff", textAlign: "left", fontSize: { xs: 15, sm: 16, md: 17, lg: 18, xl: 18 } }}>
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
