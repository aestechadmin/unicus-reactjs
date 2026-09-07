import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { fadeUp, pagePx, scaleIn, stagger, viewport, titleSx, bodySx } from "./motion";

export default function Manpower({ data }) {
  return (
    <Box
      sx={{
        position: "relative",
        height: { xs: "auto", sm: "auto", md: "100vh", lg: "100vh", xl: "100vh" },
        minHeight: { xs: "100svh", sm: "100svh", md: 680, lg: 720, xl: 720 },
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
          backgroundImage: `url(${data.backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center 40%",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.2) 100%)",
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
          pt: { xs: 8, sm: 9, md: 10, lg: 12, xl: 12 },
          pb: { xs: 10, sm: 12, md: 14, lg: 16, xl: 18 },
        }}
      >
        <motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={fadeUp}>
          <Typography sx={{ ...titleSx, fontWeight: 600, color: "#fff", textAlign: "left" }}>
            {data.title}
          </Typography>
          <Typography
            sx={{
              ...bodySx,
              color: "rgba(255,255,255,0.7)",
              maxWidth: 900,
              mt: 1.2,
              textAlign: "left",
            }}
          >
            {data.subtitle}
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
            gap: { xs: 1.2, sm: 1.4, md: 1.8, lg: 2, xl: 2 },
            mt: "auto",
          }}
        >
          {data.items.map((item) => (
            <Box
              key={item.title}
              component={motion.div}
              variants={scaleIn}
              whileHover={{ y: -6, scale: 1.03 }}
              sx={{
                bgcolor: "rgba(255, 255, 255, 0.5)",
                borderRadius: "16px",
                p: { xs: 1.2, sm: 1.5, md: 2, lg: 2.4, xl: 2.4 },
                minHeight: { xs: 88, sm: 96, md: 108, lg: 120, xl: 120 },
                display: "flex",
                flexDirection: "column",
                backdropFilter: "blur(34px)",
                WebkitBackdropFilter: "blur(34px)",
              }}
            >
              <Typography sx={{ color: "#000", fontWeight: 600, fontSize: { xs: 14, sm: 14, md: 15, lg: 16, xl: 16 }, mb: 1, textAlign: "left" }}>
                {item.title}
              </Typography>
              <Typography
                sx={{
                  color: "#000",
                  fontSize: { xs: 12, sm: 12, md: 13, lg: 13, xl: 13 },
                  fontWeight: 400,
                  lineHeight: 1.55,
                  textAlign: "left",
                  mt: "auto",
                  pt: 1.2,
                }}
              >
                {item.text}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
