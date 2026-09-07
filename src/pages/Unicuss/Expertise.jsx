import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import { motion } from "framer-motion";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import { blueBtn, bodySx, cardBodySx, cardTitleSx, fadeUp, pagePx, scaleIn, stagger, titleSx, viewport, scrollToId } from "./motion";

const ICON = "/img/unicuss/icons";
const cardIcons = [
  `${ICON}/building.png`,
  `${ICON}/building.png`,
  `${ICON}/building.png`,
  `${ICON}/education.png`,
  `${ICON}/building.png`,
  `${ICON}/building.png`,
];

export default function Expertise({ data }) {
  return (
    <Box sx={{ bgcolor: "rgba(230, 241, 254, 1)", py: { xs: 8, sm: 9, md: 10, lg: 12, xl: 12 } }}>
      <Container maxWidth={false} disableGutters sx={{ px: pagePx }}>
        <motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={fadeUp}>
          <Typography sx={{ ...titleSx, fontWeight: 600, color: "#111", textAlign: "left" }}>
            {data.title}
          </Typography>
          <Typography sx={{ ...bodySx, color: "#4B5563", maxWidth: 1300, mt: 2.5, mb: { xs: 4, sm: 4.5, md: 5, lg: 6, xl: 6 }, textAlign: "left" }}>
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
            gridTemplateColumns: { xs: "1fr 1fr", sm: "repeat(3, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(6, 1fr)", xl: "repeat(6, 1fr)" },
            gap: { xs: 1.5, sm: 1.6, md: 1.8, lg: 2, xl: 2 },
          }}
        >
          {data.items.map((item, index) => (
              <Box
                key={item.title}
                component={motion.div}
                variants={scaleIn}
                whileHover={{ y: -8, scale: 1.03 }}
                sx={{
                  bgcolor: "rgba(255, 255, 255, 0.5)",
                  borderRadius: "16px",
                  p: { xs: 2, sm: 2.1, md: 2.25, lg: 2.4, xl: 2.4 },
                  minHeight: { xs: 150, sm: 165, md: 180, lg: 200, xl: 200 },
                  display: "flex",
                  flexDirection: "column",
                  border: "1px solid #0000001A",
                }}
              >
                <Box
                  component="img"
                  src={cardIcons[index]}
                  alt=""
                  sx={{
                    width: { xs: 28, sm: 30, md: 32, lg: 36, xl: 36 },
                    height: { xs: 28, sm: 30, md: 32, lg: 36, xl: 36 },
                    objectFit: "contain",
                    mb: 1.6,
                  }}
                />
                <Typography sx={{ ...cardTitleSx, color: "#111", fontSize: { xs: 14, sm: 14, md: 15, lg: 16, xl: 16 }, textAlign: "left" }}>
                  {item.title}
                </Typography>
                <Typography sx={{ ...cardBodySx, color: "#6B7280", mt: "auto", pt: 1.2, textAlign: "left" }}>
                  {item.text}
                </Typography>
              </Box>
          ))}
        </Box>

        <Box
          component={motion.div}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
          sx={{ display: "flex", justifyContent: "center", mt: { xs: 4, sm: 5, md: 6, lg: 8, xl: 8 } }}
        >
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Button onClick={() => scrollToId("manpower")} endIcon={<NorthEastIcon />} sx={blueBtn}>
              {data.cta}
            </Button>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
}
