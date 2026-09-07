import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { fadeUp, pagePx, scaleIn, stagger, viewport, titleSx } from "./motion";

const STAR = "/img/unicuss/icons/star.png";

export default function WhyChoose({ data }) {
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
          backgroundImage: `url(${data.image})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: { xs: "240% auto", sm: "200% auto", md: "140% auto", lg: "120% auto", xl: "120% auto" },
          backgroundPosition: { xs: "18% 50%", sm: "16% 50%", md: "10% 50%", lg: "8% 50%", xl: "8% 50%" },
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
            gap: { xs: 1.2, sm: 1.5, md: 1.8, lg: 2.2, xl: 2.2 },
            mt: "auto",
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
                p: { xs: 1.5, sm: 1.8, md: 2.2, lg: 2.6, xl: 2.6 },
                minHeight: { xs: 150, sm: 160, md: 175, lg: 190, xl: 190 },
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
                  width: { xs: 28, sm: 30, md: 32, lg: 34, xl: 34 },
                  height: { xs: 28, sm: 30, md: 32, lg: 34, xl: 34 },
                  objectFit: "contain",
                  mb: 2,
                }}
              />
              <Typography sx={{ color: "#111", fontWeight: 600, fontSize: { xs: 16, sm: 16, md: 17, lg: 18, xl: 18 }, textAlign: "left" }}>
                {item.title}
              </Typography>
              <Typography
                sx={{
                  color: "#374151",
                  fontSize: { xs: 12, sm: 12, md: 13, lg: 14, xl: 14 },
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
