import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Container, Typography, useMediaQuery } from "@mui/material";
import { motion } from "framer-motion";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import { FONT, blueBtn, fadeUp, pagePx, titleSx, viewport, scrollToId } from "./motion";

const GAP = 20;
const AUTO_MS = 3200;

export default function Partners({ data }) {
  const isXl = useMediaQuery("(min-width:1536px)");
  const isLg = useMediaQuery("(min-width:1200px)");
  const isMd = useMediaQuery("(min-width:900px)");
  const isSm = useMediaQuery("(min-width:600px)");
  const visible = isXl ? 4 : isLg ? 3 : isMd ? 3 : isSm ? 2 : 1;
  const items = data.items || [];
  const maxPage = Math.max(0, items.length - visible);

  const sectionRef = useRef(null);
  const wrapRef = useRef(null);
  const [trackWidth, setTrackWidth] = useState(0);
  const [page, setPage] = useState(0);
  const [inView, setInView] = useState(false);
  const draggingRef = useRef(false);
  const dragStartXRef = useRef(0);

  const cardWidth = trackWidth ? (trackWidth - GAP * (visible - 1)) / visible : 0;
  const step = cardWidth + GAP;

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const update = () => setTrackWidth(el.offsetWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPage(0);
          setInView(true);
        } else {
          setInView(false);
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || maxPage <= 0) return;
    const id = window.setInterval(() => {
      setPage((prev) => (prev >= maxPage ? 0 : prev + 1));
    }, AUTO_MS);
    return () => window.clearInterval(id);
  }, [inView, maxPage]);

  useEffect(() => {
    setPage(0);
  }, [visible]);

  const onPointerDown = (e) => {
    draggingRef.current = true;
    dragStartXRef.current = e.clientX;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerUp = (e) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    const dx = e.clientX - dragStartXRef.current;
    if (dx < -40) setPage((prev) => Math.min(maxPage, prev + 1));
    else if (dx > 40) setPage((prev) => Math.max(0, prev - 1));
  };

  return (
    <Box
      ref={sectionRef}
      sx={{
        bgcolor: "#fff",
        height: { xs: "auto", sm: "auto", md: "90vh", lg: "90vh", xl: "90vh" },
        minHeight: { xs: "80svh", sm: "80svh", md: 540, lg: 580, xl: 580 },
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <Container
        maxWidth={false}
        disableGutters
        sx={{
          px: pagePx,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          py: { xs: 7, sm: 7.25, md: 7.5, lg: 8, xl: 8 },
        }}
      >
        <motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={fadeUp}>
          <Typography sx={{ ...titleSx, fontWeight: 600, color: "#111", textAlign: "left" }}>
            {data.title}
          </Typography>
        </motion.div>

        <Box>
          <Box
            ref={wrapRef}
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            onMouseEnter={() => setInView(false)}
            onMouseLeave={() => {
              const el = sectionRef.current;
              if (!el) return;
              const rect = el.getBoundingClientRect();
              const visibleNow = rect.top < window.innerHeight * 0.65 && rect.bottom > window.innerHeight * 0.35;
              if (visibleNow) setInView(true);
            }}
            sx={{
              overflow: "hidden",
              width: "100%",
              cursor: "grab",
              userSelect: "none",
              touchAction: "pan-y",
              "&:active": { cursor: "grabbing" },
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: `${GAP}px`,
                width: "max-content",
                transform: `translate3d(${-page * step}px, 0, 0)`,
                transition: draggingRef.current ? "none" : "transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
              {items.map((item) => (
                <Box
                  key={item.name}
                  sx={{
                    flex: `0 0 ${cardWidth || 280}px`,
                    width: cardWidth || 280,
                    borderRadius: "16px",
                    overflow: "hidden",
                    position: "relative",
                    height: { xs: 200, sm: 240, md: 280, lg: 320, xl: 320 },
                    pointerEvents: "none",
                  }}
                >
                  <Box
                    component="img"
                    src={item.image}
                    alt={item.name}
                    draggable={false}
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
                        fontFamily: FONT,
                        color: "#fff",
                        fontWeight: 600,
                        fontSize: { xs: 16, sm: 17, md: 18, lg: 20, xl: 20 },
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

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: { xs: 0.8, sm: 1, md: 1.1, lg: 1.2, xl: 1.2 },
              mt: { xs: 2, sm: 2.5, md: 3, lg: 3.5, xl: 3.5 },
            }}
          >
            {Array.from({ length: maxPage + 1 }).map((_, index) => (
              <Box
                key={index}
                component="button"
                type="button"
                aria-label={`Partner slide ${index + 1}`}
                onClick={() => setPage(index)}
                sx={{
                  width: page === index ? { xs: 18, sm: 20, md: 22, lg: 24, xl: 24 } : { xs: 7, sm: 8, md: 8, lg: 9, xl: 9 },
                  height: { xs: 7, sm: 8, md: 8, lg: 9, xl: 9 },
                  p: 0,
                  border: 0,
                  borderRadius: 99,
                  cursor: "pointer",
                  bgcolor: page === index ? "#111" : "rgba(0,0,0,0.22)",
                  transition: "width 0.3s ease, background-color 0.3s ease",
                }}
              />
            ))}
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center", mt: { xs: 3, sm: 4, md: 5, lg: 6, xl: 6 } }}>
            <Button onClick={() => scrollToId("contact")} endIcon={<NorthEastIcon />} sx={blueBtn}>
              {data.cta}
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
