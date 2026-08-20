import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { fadeUp, scaleIn, stagger, viewport, titleSx, bodySx } from "./motion";

export default function Manpower({ data }) {
  return (
    <Box
      sx={{
        position: "relative",
        height: { xs: "auto", md: "100vh" },
        minHeight: { xs: "100svh", md: 720 },
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
            gridTemplateColumns: { xs: "1fr 1fr", md: "repeat(4, 1fr)" },
            gap: { xs: 1.2, md: 2 },
            mb: { xs: 2, md: 4 },
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
                p: { xs: 1.2, md: 2.4 },
                minHeight: { xs: 88, md: 120 },
                display: "flex",
                flexDirection: "column",
                backdropFilter: "blur(34px)",
                WebkitBackdropFilter: "blur(34px)",
              }}
            >
              <Typography sx={{ color: "#000", fontWeight: 600, fontSize: { xs: 14, md: 16 }, mb: 1, textAlign: "left" }}>
                {item.title}
              </Typography>
              <Typography
                sx={{
                  color: "#000",
                  fontSize: { xs: 12, md: 13 },
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
