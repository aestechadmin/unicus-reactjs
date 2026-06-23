'use client';

import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import { useRef, useState, useEffect } from 'react';

export default function Facilities() {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const sectionRefs = useRef([]);
  const [active, setActive] = useState(0);

  const scrollToIndex = (i) => {
    sectionRefs.current[i]?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(Number(entry.target.dataset.index));
          }
        });
      },
      { threshold: 0.6 }
    );

    sectionRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const sectionStyle = {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    px: { xs: 2, md: 6 },
    py: { xs: 6, md: 10 },
    background: '#ECECEC'
  };

  const imgMain = {
    width: '100%',
    borderRadius: 3,
    objectFit: 'cover',
  };

  const titleStyle = {
    textAlign: 'center',
    fontWeight: 800,
    fontSize: { xs: 26, md: 42 },
  };

  return (
    <Box>

      {/* ================= T1 ================= */}
      <Box ref={(el) => (sectionRefs.current[0] = el)} sx={sectionStyle}>

        {/* MOBILE */}
        {isMobile && (
          <Box sx={{ textAlign: 'center' }}>
            <Box component="img" src="/img/Img3.png" sx={imgMain} />

            <Typography sx={{ fontSize: 18, mt: 2, lineHeight: 1.4, textAlign: 'left' }}>
              UNICUS Security Services Pvt Ltd is a dedicated manpower agency providing trained personnel for sanitation, security, and facility management
            </Typography>

            <Typography sx={{ mt: 2, color: '#FFF', fontSize: 16, background: '#000', padding: 2 }}>
              Request a site assessment
            </Typography>
          </Box>
        )}

        {/* DESKTOP */}
        {isDesktop && (
          <Box sx={{ maxWidth: 1000, width: '100%' }}>
            <Box
              component="img"
              src="/img/Img3.png"
              sx={{ width: '100%', height: 300, objectFit: 'cover',objectPosition: 'bottom', borderRadius: 3 }}
            />

            <Typography sx={{ ...titleStyle, mt: 3, lineHeight: 1.4, textAlign: 'left' }}>
              UNICUS Security Services Pvt Ltd is a dedicated manpower agency
              providing trained personnel for sanitation, security, and facility management
            </Typography>

            <Typography sx={{ mt: 2, maxWidth: 300, fontSize: 14, textAlign: 'center', color: '#FFF', background: '#000', borderRadius: 8, padding: 1.5 }}>
              Request a site assessment
            </Typography>
          </Box>
        )}

      </Box>

      {/* ================= T2 ================= */}
      <Box ref={(el) => (sectionRefs.current[1] = el)} sx={sectionStyle}>

        {/* MOBILE */}
        {isMobile && (
          <Box sx={{ textAlign: 'center' }}>
            <Typography sx={{ fontSize: 20, fontWeight: 800, mb: 2, textAlign: 'left' }}>
                UNICUS Security Services Pvt Ltd is a dedicated manpower agency providing
                trained personnel for sanitation, security, and facility management 4 with an
                uncompromising focus on quality and reliability. 
            </Typography>

            <Typography sx={{ mt: 2, maxWidth: 300, fontSize: 14, textAlign: 'center', color: '#FFF', background: '#000', borderRadius: 8, padding: 1.5 }}>
              Request a site assessment
            </Typography>

            <Box component="img" src="/img/Img4.png" sx={imgMain} />
            <Box component="img" src="/img/Img3.png" sx={{ ...imgMain, mt: 2 }} />
          </Box>
        )}

        {/* ================= T2 DESKTOP ================= */}
        {isDesktop && (
        <Box sx={{ width: '100%' }}>

            {/* ================= ROW 1 ================= */}
            <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: '1fr 2fr 0fr',
                alignItems: 'center',
                mb: 4,
            }}
            >
            {/* LEFT EMPTY */}
            <Box />

            {/* CENTER TITLE */}
            <Box sx={{ textAlign: 'center',  }}>
                <Typography
                sx={{
                    fontSize: { md: 40 },
                    fontWeight: 800,
                    lineHeight: 1.4, textAlign: 'left', maxWidth: 1200
                }}
                >
                UNICUS Security Services Pvt Ltd is a dedicated manpower agency providing
                trained personnel for sanitation, 
                </Typography>

                <Typography
                sx={{
                    fontSize: { md: 40 },
                    color: '#777',
                    mt: 1, textAlign: 'left', lineHeight: 1.4
                }}
                >
                security, and facility management 4 with an
                uncompromising focus on quality and reliability. 
                </Typography>
                <Typography sx={{ mt: 2, maxWidth: 300, fontSize: 14, textAlign: 'center', color: '#FFF', background: '#000', borderRadius: 8, padding: 1.5 }}>
                Request a site assessment
                </Typography>
            </Box>

            {/* RIGHT TITLE (optional mirror / highlight) */}
       
            </Box>

            {/* ================= ROW 2 ================= */}
            <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: '2fr 2fr 1fr',
                gap: 3,
                alignItems: 'center',
            }}
            >

            {/* LEFT + CENTER MERGED IMAGE */}
            <Box sx={{ gridColumn: '1 / span 2' }}>
                <Box
                component="img"
                src="/img/img4.png"
                sx={{
                    width: '100%',
                    height: 350,
                    objectFit: 'cover',
                    objectPosition: 'top',
                    borderRadius: 3,
                }}
                />
            </Box>

            {/* RIGHT IMAGE */}
            <Box>
                <Box
                component="img"
                src="/img/Img3.png"
                sx={{
                    width: '100%',
                    height: 350,
                    objectFit: 'cover',
                    objectPosition: 'top',
                    borderRadius: 3,
                }}
                />
            </Box>

            </Box>

        </Box>
        )}

      </Box>

      {/* ================= T3 ================= */}
      <Box ref={(el) => (sectionRefs.current[2] = el)} sx={sectionStyle}>

        {/* MOBILE */}
        {isMobile && (
          <Box sx={{ textAlign: 'center' }}>
            <Box component="img" src="/img/Img3.png" sx={imgMain} />
            <Box component="img" src="/img/Img4.png" sx={{ ...imgMain, mt: 2 }} />

            <Typography sx={{ mt: 2, fontSize: 15, color: '#555' }}>
              • Regular skill workshops<br />
              • Dedicated Work Manager<br />
              • Full spectrum services<br />
              • Scheduled availability
            </Typography>
          </Box>
        )}

        {/* DESKTOP */}
        {isDesktop && (
          <Box sx={{ display: 'flex', width: '100%', gap: 4 }}>

            <Box sx={{ flex: 2 }}>
              <Box
                component="img"
                src="/img/Img4.png"
                sx={{ ...imgMain, height: 700 }}
              />
            </Box>

            <Box sx={{ flex: 1 }}>
              <Box
                component="img"
                src="/img/Img3.png"
                sx={{ ...imgMain, height: 400 }}
              />

              <Typography sx={{ mt: 2, fontSize: 20, lineHeight: 1.4, color: '#555', textAlign: 'left' }}>
                • Regular skill workshops to keep our team motivated and up-to-date<br />
                • Dedicated Work Manager assigned to each client site<br />
                • Full spectrum: Housekeeping, Security, Pest Control, Waste Management & more<br />
                • Scheduled availability at client premises throughout the project
              </Typography>
              


            </Box>

          </Box>
        )}

      </Box>

    </Box>
  );
}