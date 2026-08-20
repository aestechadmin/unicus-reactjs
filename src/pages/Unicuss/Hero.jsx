import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import { fadeUp, FONT, scrollToId } from "./motion";

export default function Hero({ data }) {
  return (
    <Box
      sx={{
        position: "relative",
        height: { xs: "100svh", md: "100vh" },
        minHeight: { xs: 560, md: 700 },
        bgcolor: "#3B82F6",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          flex: 1,
          overflow: "hidden",
          borderBottomLeftRadius: { xs: 40, sm: 56, md: 250 },
          borderBottomRightRadius: { xs: 40, sm: 56, md: 250 },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${data.backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: { xs: "center 30%", md: "center 20%" },
          }}
        />
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.72) 100%)",
          }}
        />
        <Box
          sx={{
            position: "relative",
            zIndex: 2,
            height: "100%",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            px: { xs: 2, sm: 4 },
            pb: { xs: 4, sm: 8, md: 10 },
            textAlign: "center",
          }}
        >
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <Typography
              component="h1"
              sx={{
                fontFamily: FONT,
                color: "#fff",
                fontWeight: 500,
                maxWidth: { xs: 360, sm: 700, md: 1200 },
                mx: "auto",
                lineHeight: 1.12,
                letterSpacing: "-0.03em",
                fontSize: { xs: 26, sm: 50, md: 70, lg: 80 },
              }}
            >
              {data.title}
            </Typography>
          </motion.div>
        </Box>
      </Box>

      <Box
        sx={{
          flexShrink: 0,
          height: { xs: 72, md: 150 },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "#3B82F6",
        }}
      >
        <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
          <Button
            onClick={() => scrollToId(data.targetId)}
            endIcon={<NorthEastIcon sx={{ fontSize: { xs: 14, sm: 16, md: 16 } }} />}
            sx={{
              fontFamily: FONT,
              bgcolor: "#fff",
              color: "#111",
              borderRadius: 2,
              px: { xs: 2.2, md: 2.8 },
              py: { xs: 0.8, md: 1 },
              fontWeight: 700,
              textTransform: "none",
              fontSize: { xs: 15, md: 18 },
              "&:hover": { bgcolor: "#F3F4F6" },
            }}
          >
            {data.cta}
          </Button>
        </motion.div>
      </Box>
    </Box>
  );
}
