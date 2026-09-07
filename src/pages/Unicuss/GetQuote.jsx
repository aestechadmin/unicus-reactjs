import React from "react";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import { FONT, scrollToId } from "./motion";

export default function GetQuote({ onClick, compact = false }) {
  const handle = () => {
    if (onClick) onClick();
    else scrollToId("contact");
  };

  return (
    <Box
      component={motion.div}
      whileHover={{ x: 4 }}
      whileTap={{ scale: 0.97 }}
      onClick={handle}
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: { xs: 0.5, sm: 0.65, md: 0.85, lg: 1, xl: 1 },
        color: "#111",
        background: "#fff",
        cursor: "pointer",
        px: compact
          ? { xs: 1, sm: 1.25, md: 1.75, lg: 2, xl: 2 }
          : { xs: 1.5, sm: 1.7, md: 2, lg: 2.2, xl: 2.2 },
        py: compact
          ? { xs: 0.8, sm: 0.9, md: 1, lg: 1.1, xl: 1.1 }
          : { xs: 1, sm: 1.05, md: 1.15, lg: 1.2, xl: 1.2 },
        borderRadius: 2,
      }}
    >
      <Typography
        sx={{
          fontFamily: FONT,
          fontSize: { xs: 10, sm: 12, md: 13, lg: 14, xl: 14 },
          letterSpacing: { xs: 0.5, sm: 0.65, md: 0.85, lg: 1, xl: 1 },
          color: "#111",
        }}
      >
        Get Quote
      </Typography>
      <NorthEastIcon sx={{ fontSize: { xs: 14, sm: 15, md: 16, lg: 14, xl: 14 }, color: "#111" }} />
    </Box>
  );
}
