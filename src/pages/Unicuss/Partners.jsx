import React, { useEffect, useMemo, useRef, useState } from "react";
import { Box, Button, Container, IconButton, Typography, useMediaQuery } from "@mui/material";
import { motion } from "framer-motion";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import { blueBtn, fadeUp, titleSx, viewport, scrollToId } from "./motion";

const GAP = 20;
const COPIES = 4;
const SPEED = 0.6;

export default function Partners({ data }) {
  const isDesktop = useMediaQuery("(min-width:900px)");
  const visible = isDesktop ? 3 : 1;
  const items = data.items || [];
  const loopItems = useMemo(
    () => (items.length ? Array.from({ length: COPIES }, () => items).flat() : []),
    [items]
  );

  const wrapRef = useRef(null);
  const trackRef = useRef(null);
  const xRef = useRef(0);
  const pausedRef = useRef(false);
  const draggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartOffsetRef = useRef(0);
  const [trackWidth, setTrackWidth] = useState(0);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const update = () => setTrackWidth(el.offsetWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const cardWidth = trackWidth ? (trackWidth - GAP * (visible - 1)) / visible : 0;
  const step = cardWidth + GAP;

  useEffect(() => {
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track || !items.length || !step) return;

    const loopWidth = items.length * step;

    const apply = (next) => {
      if (loopWidth <= 0) return;
      let x = next;
      while (x <= -loopWidth) x += loopWidth;
      while (x > 0) x -= loopWidth;
      xRef.current = x;
      track.style.transform = `translate3d(${x}px, 0, 0)`;
    };

    let raf;
    const tick = () => {
      if (!pausedRef.current && !draggingRef.current) apply(xRef.current - SPEED);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onWheel = (e) => {
      e.preventDefault();
      apply(xRef.current - (e.deltaY + e.deltaX));
    };

    wrap.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      cancelAnimationFrame(raf);
      wrap.removeEventListener("wheel", onWheel);
    };
  }, [items.length, step]);

  const applyX = (next) => {
    const track = trackRef.current;
    const loopWidth = items.length * step;
    if (!track || loopWidth <= 0) return;
    let x = next;
    while (x <= -loopWidth) x += loopWidth;
    while (x > 0) x -= loopWidth;
    xRef.current = x;
    track.style.transform = `translate3d(${x}px, 0, 0)`;
  };

  const next = () => applyX(xRef.current - step);
  const prev = () => applyX(xRef.current + step);

  const onPointerDown = (e) => {
    draggingRef.current = true;
    pausedRef.current = true;
    dragStartXRef.current = e.clientX;
    dragStartOffsetRef.current = xRef.current;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (!draggingRef.current) return;
    applyX(dragStartOffsetRef.current + (e.clientX - dragStartXRef.current));
  };

  const stopDrag = () => {
    draggingRef.current = false;
    pausedRef.current = false;
  };

  const arrowSx = {
    width: { xs: 36, md: 44 },
    height: { xs: 36, md: 44 },
    border: "1px solid #000",
    bgcolor: "#000",
    color: "#fff",
    "&:hover": { bgcolor: "#111" },
  };

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
            <IconButton onClick={prev} sx={arrowSx}>
              <ArrowBackIcon />
            </IconButton>
            <IconButton onClick={next} sx={arrowSx}>
              <ArrowForwardIcon />
            </IconButton>
          </Box>
        </Box>

        <Box>
          <Box
            ref={wrapRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={stopDrag}
            onPointerCancel={stopDrag}
            onMouseEnter={() => { pausedRef.current = true; }}
            onMouseLeave={() => {
              pausedRef.current = false;
              draggingRef.current = false;
            }}
            sx={{
              overflow: "hidden",
              width: "100%",
              cursor: "grab",
              userSelect: "none",
              touchAction: "none",
              "&:active": { cursor: "grabbing" },
            }}
          >
            <Box
              ref={trackRef}
              sx={{
                display: "flex",
                gap: `${GAP}px`,
                width: "max-content",
                willChange: "transform",
              }}
            >
              {loopItems.map((item, index) => (
                <Box
                  key={`${item.name}-${index}`}
                  sx={{
                    flex: `0 0 ${cardWidth || 280}px`,
                    width: cardWidth || 280,
                    borderRadius: "16px",
                    overflow: "hidden",
                    position: "relative",
                    height: { xs: 200, md: 320 },
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
