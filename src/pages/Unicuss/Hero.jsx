import React, { useEffect, useState } from "react";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import { motion } from "framer-motion";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import { fadeUp, FONT, scrollToId } from "./motion";

export default function Hero({ data }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!data?.backgroundImage) {
      setLoaded(true);
      return;
    }

    const img = new Image();
    img.src = data.backgroundImage;
    if (img.complete && img.naturalWidth > 0) {
      setLoaded(true);
      return;
    }

    const done = () => setLoaded(true);
    img.onload = done;
    img.onerror = done;
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [data?.backgroundImage]);

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
          bgcolor: "#1E3A8A",
        }}
      >
        <Box
          component="img"
          src={data.backgroundImage}
          alt=""
          fetchPriority="high"
          decoding="async"
          onLoad={() => setLoaded(true)}
          sx={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: { xs: "center 30%", md: "center 20%" },
            opacity: loaded ? 1 : 0,
            transition: "opacity 0.45s ease",
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

        {!loaded && (
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              zIndex: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "#1E3A8A",
            }}
          >
            <CircularProgress size={42} thickness={4} sx={{ color: "#fff" }} />
          </Box>
        )}

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
                fontWeight: 600,
                maxWidth: { xs: 360, sm: 700, md: 1200 },
                mx: "auto",
                lineHeight: 1.12,
                letterSpacing: "-0.03em",
                fontSize: { xs: 26, sm: 50, md: 70, lg: 90 },
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
              // fontFamily: FONT,
              bgcolor: "#fff",
              color: "#111",
              borderRadius: 2,
              px: { xs: 2.2, md: 2.8 },
              py: { xs: 0.8, md: 1 },
              fontWeight: 600,
              textTransform: "none",
              fontSize: { xs: 15, md: 16 },
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
