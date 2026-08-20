import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Container, IconButton, Typography, useMediaQuery } from "@mui/material";
import { motion } from "framer-motion";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import { blueBtn, fadeUp, titleSx, viewport, scrollToId } from "./motion";

const GAP = 20;

export default function Partners({ data }) {
  const [start, setStart] = useState(0);
  const [trackWidth, setTrackWidth] = useState(0);
  const trackRef = useRef(null);
  const isDesktop = useMediaQuery("(min-width:900px)");
  const fullVisible = isDesktop ? 2 : 1;
  const slots = fullVisible + 0.5;
  const items = data.items;
  const maxStart = Math.max(0, items.length - fullVisible);
  const canPrev = start > 0;
  const canNext = start < maxStart;
  const cardWidth = trackWidth ? (trackWidth - GAP * fullVisible) / slots : 0;
  const step = cardWidth + GAP;

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const update = () => setTrackWidth(el.offsetWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    setStart((prev) => Math.min(prev, maxStart));
  }, [maxStart]);

  const next = () => {
    if (canNext) setStart((prev) => prev + 1);
  };
  const prev = () => {
    if (canPrev) setStart((prev) => prev - 1);
  };

  const arrowSx = (active) => ({
    width: { xs: 36, md: 44 },
    height: { xs: 36, md: 44 },
    border: "1px solid",
    borderColor: active ? "#000" : "#E5E7EB",
    bgcolor: active ? "#000" : "#fff",
    color: active ? "#fff" : "#9CA3AF",
    "&:hover": {
      bgcolor: active ? "#111" : "#F9FAFB",
    },
    "&.Mui-disabled": {
      bgcolor: "#fff",
      color: "#D1D5DB",
      borderColor: "#E5E7EB",
    },
  });

  return (
    <Box
      sx={{
        bgcolor: "#fff",
        height: { xs: "auto", md: "90vh" },
        minHeight: { xs: "80svh", md: 580 },
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          px: { xs: 2, sm: 3, md: 8 },
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          py: { xs: 7, md: 8 },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 1.5 }}>
          <motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={fadeUp}>
            <Typography sx={{ ...titleSx, fontWeight: 600, color: "#111", textAlign: "left" }}>
              {data.title}
            </Typography>
          </motion.div>
          <Box sx={{ display: "flex", gap: 1, flexShrink: 0, pt: { xs: 0.5, md: 1 } }}>
            <IconButton onClick={prev} disabled={!canPrev} sx={arrowSx(canPrev)}>
              <ArrowBackIcon />
            </IconButton>
            <IconButton onClick={next} disabled={!canNext} sx={arrowSx(canNext)}>
              <ArrowForwardIcon />
            </IconButton>
          </Box>
        </Box>

        <Box>
          <Box ref={trackRef} sx={{ overflow: "hidden", width: "100%" }}>
            <Box
              component={motion.div}
              animate={{ x: -(start * step) }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              sx={{ display: "flex", gap: `${GAP}px` }}
            >
              {items.map((item) => (
                <Box
                  key={item.name}
                  sx={{
                    flex: `0 0 ${cardWidth}px`,
                    width: cardWidth,
                    borderRadius: "16px",
                    overflow: "hidden",
                    position: "relative",
                    height: { xs: 200, md: 320 },
                  }}
                >
                  <Box
                    component="img"
                    src={item.image}
                    alt={item.name}
                    sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(180deg, transparent 25%, rgba(0,0,0,0.8) 100%)",
                    }}
                  />
                  <Box sx={{ position: "absolute", left: 18, right: 18, bottom: 18 }}>
                    <Typography
                      sx={{
                        fontFamily: "'Inter', sans-serif",
                        color: "#fff",
                        fontWeight: 600,
                        fontSize: { xs: 16, md: 20 },
                        textAlign: "left",
                      }}
                    >
                      {item.name}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center", mt: { xs: 3, md: 8 } }}>
            <Button onClick={() => scrollToId("contact")} endIcon={<NorthEastIcon />} sx={blueBtn}>
              {data.cta}
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
