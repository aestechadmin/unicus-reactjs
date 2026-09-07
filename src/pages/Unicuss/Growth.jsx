import React, { useEffect, useRef, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import { animate, motion, useInView } from "framer-motion";
import { fadeUp, stagger, viewport, titleSx, FONT, pagePx } from "./motion";

function parseStat(value) {
  const match = String(value).match(/^(.*?)(\d+)(.*)$/);
  if (!match) return { prefix: value, number: null, suffix: "" };
  return { prefix: match[1], number: Number(match[2]), suffix: match[3] };
}

function CountUp({ value }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });
  const parsed = parseStat(value);
  const [display, setDisplay] = useState(
    parsed.number == null ? value : `${parsed.prefix}0${parsed.suffix}`
  );

  useEffect(() => {
    if (!isInView) return;
    if (parsed.number == null) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, parsed.number, {
      duration: 1.7,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => {
        setDisplay(`${parsed.prefix}${Math.round(latest)}${parsed.suffix}`);
      },
    });
    return () => controls.stop();
  }, [isInView, parsed.number, parsed.prefix, parsed.suffix, value]);

  return <span ref={ref}>{display}</span>;
}

export default function Growth({ data }) {
  return (
    <Box
      sx={{
        position: "relative",
        height: { xs: "auto", sm: "auto", md: "92vh", lg: "92vh", xl: "90vh" },
        minHeight: { xs: "78svh", sm: "80svh", md: 640, lg: 680, xl: 700 },
        color: "#fff",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${data.backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(360deg, #000000 0%, rgba(0, 0, 0, 0.3) 100%)",
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
          pt: { xs: 8, sm: 9, md: 9, lg: 10, xl: 10 },
          pb: { xs: 10, sm: 12, md: 16, lg: 20, xl: 22 },
        }}
      >
        <motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={fadeUp}>
          <Typography
            sx={{
              ...titleSx,
              fontFamily: FONT,
              fontWeight: 600,
              color: "#fff",
              textAlign: "left",
            }}
          >
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
            mt: "auto",
            display: "grid",
            gridTemplateColumns: { xs: "1fr 1fr", sm: "repeat(3, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(5, 1fr)", xl: "repeat(5, 1fr)" },
            gap: { xs: 1.5, sm: 2, md: 2.5, lg: 3, xl: 3 },
          }}
        >
          {data.stats.map((stat) => (
            <Box
              key={stat.label}
              component={motion.div}
              variants={fadeUp}
              sx={{ textAlign: "left", minHeight: { xs: 72, sm: 84, md: 100, lg: 120, xl: 128 } }}
            >
              <Typography
                sx={{
                  fontFamily: FONT,
                  color: "#fff",
                  fontWeight: 500,
                  fontSize: { xs: 28, sm: 34, md: 42, lg: 52, xl: 56 },
                  letterSpacing: "-0.03em",
                  lineHeight: 1.15,
                }}
              >
                <CountUp value={stat.value} />
              </Typography>
              <Typography
                sx={{
                  fontFamily: FONT,
                  color: "rgba(255,255,255,0.72)",
                  mt: 0.8,
                  fontSize: { xs: 13, sm: 14, md: 15, lg: 16, xl: 16 },
                  fontWeight: 400,
                }}
              >
                {stat.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
