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
        gap: { xs: 0.5, md: 1 },
        color: "#111",
        background: "#fff",
        cursor: "pointer",
        px: compact ? { xs: 1, sm: 1.5, md: 2 } : { xs: 1.5, md: 2.2 },
        py: compact ? { xs: 0.8, md: 1.1 } : { xs: 1, md: 1.2 },
        borderRadius: 2,
      }}
    >
      <Typography
        sx={{
          fontFamily: FONT,
          fontSize: { xs: 10, sm: 12, md: 14 },
          letterSpacing: { xs: 0.5, md: 1 },
          color: "#111",
        }}
      >
        Get Quote
      </Typography>
      <NorthEastIcon sx={{ fontSize: { xs: 14, sm: 16, md: 14 }, color: "#111" }} />
    </Box>
  );
}
