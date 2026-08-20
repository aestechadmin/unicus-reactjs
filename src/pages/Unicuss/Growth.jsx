import React, { useEffect, useRef, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import { animate, motion, useInView } from "framer-motion";
import { fadeUp, stagger, viewport, titleSx, FONT } from "./motion";

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
        height: { xs: "auto", md: "90vh" },
        minHeight: { xs: "80svh", md: 580 },
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
        maxWidth="xl"
        sx={{
          px: { xs: 2, sm: 3, md: 8 },
          position: "relative",
          zIndex: 1,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          pt: { xs: 8, md: 12 },
          pb: { xs: 4, md: 18 },
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
            display: "grid",
            gridTemplateColumns: { xs: "1fr 1fr", sm: "repeat(3, 1fr)", md: "repeat(5, 1fr)" },
            gap: { xs: 1.5, md: 3 },
          }}
        >
          {data.stats.map((stat) => (
            <Box
              key={stat.label}
              component={motion.div}
              variants={fadeUp}
              sx={{ textAlign: "left" }}
            >
              <Typography
                sx={{
                  fontFamily: FONT,
                  color: "#fff",
                  fontWeight: 500,
                  fontSize: { xs: 22, sm: 28, md: 40 },
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
                  mt: 0.6,
                  fontSize: { xs: 12, md: 14 },
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
