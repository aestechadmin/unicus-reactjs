import React from "react";
import { Box, Container, Link, Typography } from "@mui/material";
import { FONT, pagePx, scrollToId } from "./motion";

const linkSx = {
  fontFamily: FONT,
  color: "rgba(255,255,255,0.72)",
  fontSize: { xs: 12, sm: 13, md: 14, lg: 14, xl: 14 },
  fontWeight: 400,
  textAlign: "center",
  display: "block",
  "&:hover": { color: "#fff" },
};
const ICONS = "/img/unicuss/icons";
const LOGO = `${ICONS}/unicus.png`;

export default function Footer({ data }) {
  return (
    <Box sx={{ bgcolor: "#000", color: "#fff" }}>
      <Container maxWidth={false} disableGutters sx={{ px: pagePx }}>
        <Box sx={{ borderTop: "1px solid rgba(255,255,255,0.12)", py: { xs: 3, sm: 3, md: 3, lg: 3, xl: 3 } }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "column", md: "row", lg: "row", xl: "row" },
              alignItems: { xs: "center", sm: "center", md: "center", lg: "center", xl: "center" },
              justifyContent: "space-between",
              gap: { xs: 3, sm: 4, md: 5, lg: 6, xl: 6 },
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "column", md: "row", lg: "row", xl: "row" },
                alignItems: { xs: "center", sm: "center", md: "center", lg: "center", xl: "center" },
                gap: { xs: 3, sm: 4, md: 5, lg: 6, xl: 6 },
                flex: 1,
                width: { xs: "100%", sm: "100%", md: "auto", lg: "auto", xl: "auto" },
              }}
            >
                       <Box
            onClick={() => scrollToId("hero")}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: { xs: 0.5, sm: 0.65, md: 0.85, lg: 1, xl: 1 },
              cursor: 'pointer',
            }}
          >
            <Box
              component="img"
              src={LOGO}
              alt="Unicus"
              sx={{
                height: { xs: 22, sm: 28, md: 36, lg: 44, xl: 44 },
                width: "auto",
                display: "block",
                mixBlendMode: "screen",
              }}
            />
          </Box>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr 1fr", sm: "1fr 1fr", md: "repeat(4, auto)", lg: "repeat(4, auto)", xl: "repeat(4, auto)" },
                  gap: { xs: 2, sm: 3, md: 8, lg: 24, xl: 24 },
                  flex: { xs: "unset", sm: "unset", md: 1, lg: 1, xl: 1 },
                  width: { xs: "100%", sm: "100%", md: "auto", lg: "auto", xl: "auto" },
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
                ml: { xs: 0, sm: 0, md: "auto", lg: "auto", xl: "auto" },
                alignItems: { xs: "flex-start", sm: "flex-start", md: "flex-end", lg: "flex-end", xl: "flex-end" },
                textAlign: { xs: "left", sm: "left", md: "right", lg: "right", xl: "right" },
                flexShrink: 0,
              }}
            >
              {data.legal.map((item) => (
                <Typography key={item} sx={{ ...linkSx, cursor: "default", textAlign: { xs: "left", sm: "left", md: "right", lg: "right", xl: "right" } }}>
                  {item}
                </Typography>
              ))}
            </Box>
          </Box>

          <Typography
            sx={{
              fontFamily: FONT,
              color: "rgba(255,255,255,0.45)",
              fontSize: { xs: 12, sm: 12, md: 13, lg: 13, xl: 13 },
              mt: { xs: 3, sm: 3, md: 3, lg: 3, xl: 3 },
              pt: { xs: 2.5, sm: 2.5, md: 2.5, lg: 2.5, xl: 2.5 },
              borderTop: "1px solid rgba(255,255,255,0.12)",
              textAlign: "center",
            }}
          >
            {data.copyright}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
