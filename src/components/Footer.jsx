'use client';

import React from 'react';
import {
  Box,
  Typography,
  Link,
  Stack,
  IconButton,
} from '@mui/material';

import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import XIcon from '@mui/icons-material/X';

const Footer = () => {
  const quickLinks = [
    'Explore',
    'Privacy Policy',
    'Terms of Use',
    'Services',
    'Sectors',
  ];

  const companyLinks = [
    'About',
    'Clients',
    'Process',
    'FAQ',
    'Contact',
  ];

  const socials = [
    { icon: <InstagramIcon /> },
    { icon: <YouTubeIcon /> },
    { icon: <LinkedInIcon /> },
    { icon: <XIcon /> },
  ];

  return (
    <Box
      sx={{
        backgroundColor: 'primary.main',
        color: '#fff',
        px: { xs: 3, md: 8 },
        py: { xs: 6, md: 8 },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 1400,
          mx: 'auto',
        }}
      >

        {/* ================= TOP SECTION ================= */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: '1.2fr 1fr 1fr',
            },
            gap: { xs: 6, md: 10 },
          }}
        >

          {/* ================= BRAND ================= */}
          <Box>
            <Box

  sx={{

    display: 'flex',

    alignItems: 'center',

    gap: 2,

    mb: 2,

  }}

>

  {/* IMAGE */}

  <Box

    component="img"

    src="/img/Brands.png"

    alt="Unicus"

    sx={{

      width: { xs: 55, md: 75 },

      height: { xs: 55, md: 75 },

      objectFit: 'contain',

    }}

  />

  {/* TEXT */}

  <Typography

    sx={{

      fontSize: { xs: 42, md: 70 },

      fontWeight: 600,

      lineHeight: 1,

    }}

  >

    Unicus

  </Typography>

</Box>

            <Typography
              sx={{
                fontSize: 15,
                opacity: 0.7,
                lineHeight: 1.8,
                maxWidth: 350,
              }}
            >
              Reliable facility management and manpower solutions
              for healthcare, commercial, residential and corporate
              sectors.
            </Typography>

            {/* SOCIALS */}
            <Stack
              direction="row"
              spacing={2}
              sx={{ mt: 4 }}
            >
              {socials.map((s, i) => (
                <IconButton
                  key={i}
                  sx={{
                    border: '1px solid rgba(255,255,255,0.25)',
                    color: '#fff',
                    width: 46,
                    height: 46,
                    transition: '0.3s',
                    '&:hover': {
                      backgroundColor: '#fff',
                      color: '#000',
                      transform: 'translateY(-4px)',
                    },
                  }}
                >
                  {s.icon}
                </IconButton>
              ))}
            </Stack>
          </Box>

          {/* ================= QUICK LINKS ================= */}
          <Box>
            <Typography
              sx={{
                fontWeight: 800,
                mb: 3,
                fontSize: 20, textAlign: 'left'
              }}
            >
              Quick Links
            </Typography>

            <Stack spacing={2}>
              {quickLinks.map((item, i) => (
                <Link
                  key={i}
                  underline="none"
                  sx={{
                    color: '#fff',
                    fontSize: 15,
                    opacity: 0.7,
                    cursor: 'pointer',
                    width: 'fit-content',
                    transition: '0.3s',
                    '&:hover': {
                      opacity: 1,
                      pl: 1,
                    },
                  }}
                >
                  {item}
                </Link>
              ))}
            </Stack>
          </Box>

          {/* ================= COMPANY ================= */}
          <Box>
            <Typography
              sx={{
                fontWeight: 800,
                mb: 3,
                fontSize: 20, textAlign: 'left'
              }}
            >
              Company
            </Typography>

            <Stack spacing={2}>
              {companyLinks.map((item, i) => (
                <Link
                  key={i}
                  underline="none"
                  sx={{
                    color: '#fff',
                    fontSize: 15,
                    opacity: 0.7,
                    cursor: 'pointer',
                    width: 'fit-content',
                    transition: '0.3s',
                    '&:hover': {
                      opacity: 1,
                      pl: 1,
                    },
                  }}
                >
                  {item}
                </Link>
              ))}
            </Stack>
          </Box>

        </Box>


      </Box>
    </Box>
  );
};

export default Footer;