import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import { motion } from "framer-motion";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import { blueBtn, bodySx, cardBodySx, cardTitleSx, fadeUp, scaleIn, stagger, titleSx, viewport, scrollToId } from "./motion";

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
    <Box sx={{ bgcolor: "rgba(230, 241, 254, 1)", py: { xs: 8, md: 12 } }}>
      <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, md: 8 } }}>
        <motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={fadeUp}>
          <Typography sx={{ ...titleSx, fontWeight: 600, color: "#111", textAlign: "left" }}>
            {data.title}
          </Typography>
          <Typography sx={{ ...bodySx, color: "#4B5563", maxWidth: 1300, mt: 2.5, mb: { xs: 4, md: 6 }, textAlign: "left" }}>
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
            gridTemplateColumns: { xs: "1fr 1fr", sm: "repeat(3, 1fr)", md: "repeat(6, 1fr)" },
            gap: { xs: 1.5, md: 2 },
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
                  p: { xs: 2, md: 2.4 },
                  minHeight: { xs: 150, md: 200 },
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box
                  component="img"
                  src={cardIcons[index]}
                  alt=""
                  sx={{
                    width: { xs: 28, md: 36 },
                    height: { xs: 28, md: 36 },
                    objectFit: "contain",
                    mb: 1.6,
                  }}
                />
                <Typography sx={{ ...cardTitleSx, color: "#111", fontSize: { xs: 14, md: 16 }, textAlign: "left" }}>
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
          sx={{ display: "flex", justifyContent: "center", mt: { xs: 4, md: 8 } }}
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
