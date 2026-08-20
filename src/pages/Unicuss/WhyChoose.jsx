import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { fadeUp, scaleIn, stagger, viewport, titleSx } from "./motion";

const STAR = "/img/unicuss/icons/star.png";

export default function WhyChoose({ data }) {
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
          backgroundImage: `url(${data.image})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: { xs: "240% auto", md: "120% auto" },
          backgroundPosition: { xs: "18% 50%", md: "8% 50%" },
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
            gap: { xs: 1.2, md: 2.2 },
            mb: { xs: 2, md: 8 },
          }}
        >
          {data.items.map((item) => (
            <Box
              key={item.title}
              component={motion.div}
              variants={scaleIn}
              whileHover={{ y: -8, scale: 1.03 }}
              sx={{
                bgcolor: "rgba(255, 255, 255, 0.7)",
                borderRadius: "16px",
                p: { xs: 1.5, md: 2.6 },
                minHeight: { xs: 150, md: 190 },
                display: "flex",
                flexDirection: "column",
                backdropFilter: "blur(34px)",
                WebkitBackdropFilter: "blur(34px)",
              }}
            >
              <Box
                component="img"
                src={STAR}
                alt=""
                sx={{
                  width: { xs: 28, md: 34 },
                  height: { xs: 28, md: 34 },
                  objectFit: "contain",
                  mb: 2,
                }}
              />
              <Typography sx={{ color: "#111", fontWeight: 600, fontSize: { xs: 16, md: 18 }, textAlign: "left" }}>
                {item.title}
              </Typography>
              <Typography
                sx={{
                  color: "#374151",
                  fontSize: { xs: 12, md: 14 },
                  fontWeight: 400,
                  lineHeight: 1.6,
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
