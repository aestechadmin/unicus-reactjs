import React from "react";
import { Box, Container, Link, Typography } from "@mui/material";
import { FONT, scrollToId } from "./motion";

const linkSx = {
  fontFamily: FONT,
  color: "rgba(255,255,255,0.72)",
  fontSize: 14,
  fontWeight: 400,
  textAlign: "center",
  display: "block",
  "&:hover": { color: "#fff" },
};

export default function Footer({ data }) {
  return (
    <Box sx={{ bgcolor: "#000", color: "#fff" }}>
      <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, md: 8 } }}>
        <Box sx={{ borderTop: "1px solid rgba(255,255,255,0.12)", py: { xs: 3, md: 3 } }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: { xs: "center", md: "center" },
              justifyContent: "space-between",
              gap: { xs: 3, md: 6 },
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignItems: { xs: "center", md: "center" },
                gap: { xs: 3, md: 6 },
                flex: 1,
                width: { xs: "100%", md: "auto" },
              }}
            >
              <Typography
                onClick={() => scrollToId("hero")}
                sx={{
                  fontFamily: FONT,
                  fontWeight: 800,
                  fontSize: { xs: 32, md: 40 },
                  letterSpacing: "-0.04em",
                  cursor: "pointer",
                  lineHeight: 1,
                  flexShrink: 0,
                  textAlign: { xs: "center", md: "left" },
                  width: { xs: "100%", md: "auto" },
                }}
              >
                {data.brand}
              </Typography>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr 1fr", md: "repeat(4, auto)" },
                  gap: { xs: 2, md: 24 },
                  flex: { xs: "unset", md: 1 },
                  width: { xs: "100%", md: "auto" },
                  justifyContent: "center",
                  justifyItems: "center",
                }}
              >
                {data.linkCols.map((col, colIndex) => (
                  <Box
                    key={colIndex}
                    sx={{ display: "flex", flexDirection: "column", gap: 1.4, alignItems: "center" }}
                  >
                    {col.map((link) => (
                      <Link
                        key={`${colIndex}-${link.label}`}
                        component="button"
                        underline="none"
                        onClick={() => scrollToId(link.href)}
                        sx={linkSx}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </Box>
                ))}
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1.4,
                ml: { md: "auto" },
                alignItems: { xs: "flex-start", md: "flex-end" },
                textAlign: { xs: "left", md: "right" },
                flexShrink: 0,
              }}
            >
              {data.legal.map((item) => (
                <Typography key={item} sx={{ ...linkSx, cursor: "default", textAlign: { xs: "left", md: "right" } }}>
                  {item}
                </Typography>
              ))}
              <Typography
                sx={{
                  fontFamily: FONT,
                  color: "rgba(255,255,255,0.45)",
                  fontSize: 13,
                  mt: 1,
                  textAlign: { xs: "left", md: "right" },
                }}
              >
                {data.copyright}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
