'use client';

import { Box, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FullScrollSection() {
  const data = [
    {
      image: '/img/intro1.png',
      title: 'Our Vision',
      description:
        'To be the most trusted partner in sanitation and security delivering healthier, safer environments, especially in critical healthcare and educational institutions.',
      bullets: [
        'Innovative, tailored solutions for hospitals, medical colleges, and institutions',
        'Rigorous staff training aligned with healthcare compliance standards',
        'Client relationships built on trust, transparency, and excellence',
        'Sustainable practices that advance public health and wellbeing',
      ],
    },
    {
      image: '/img/intro2.png',
      title: 'Company Overview & Core Values',
      description:
        'UNICUS specializes in high-quality sanitation and security manpower, serving hospitals, medical colleges, and healthcare facilities with disciplined, trained teams.',
      bullets: [
        'Excellence - Highest standards in every service rendered.',
        'Healthcare Focus - Specialized knowledge of hospital and medical college requirements.',
        'Client-Centricity - Onsite Work Managers for seamless service delivery',
        'Integrity - Accountability and transparency across all operations.',
      ],
    },
  ];

  const [index, setIndex] = useState(0);

  // 🚀 AUTO SLIDE EVERY 5 SECONDS
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % data.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [data.length]);

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
      }}
    >

      {/* ================= IMAGE ================= */}
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          style={{ position: 'absolute', width: '100%', height: '100%' }}
        >
          <Box
            component="img"
            src={data[index].image}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* ================= LEFT BOTTOM ================= */}
      <Box
        sx={{
          position: 'absolute',
          bottom: { xs: 240, md: 80 },
          left: { xs: 20, md: 50 },
          width: { xs: '90%', md: '40%' },
          color: '#fff',
          
        }}
      >
        <Typography sx={{ fontSize: { xs: 22, md: 40 }, fontWeight: 800, mb: 2, textAlign: 'left', lineHeight: 1.4 }}>
          {data[index].title}
        </Typography>

        <Typography sx={{ fontSize: { xs: 14, md: 18 }, lineHeight: 1.6, textAlign: 'left' }}>
          {data[index].description}
        </Typography>
      </Box>

      {/* ================= RIGHT BOTTOM ================= */}
      <Box
        sx={{
          position: 'absolute',
          bottom: { xs: 40, md: 80 },
          right: { xs: 20, md: 50 },
          width: { xs: '90%', md: '40%' },
          color: '#fff',
        }}
      >
        {data[index].bullets.map((item, i) => (
          <Typography key={i} sx={{ fontSize: { xs: 13, md: 18 }, mb: 1, textAlign: 'left', lineHeight: 1.4 }}>
            • {item}
          </Typography>
        ))}
      </Box>

      {/* ================= DOTS ================= */}
      <Box
        sx={{
          position: 'absolute',
          bottom: { xs: 10, md: 25 },
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 1.2,
        }}
      >
        {data.map((_, i) => (
          <Box
            key={i}
            onClick={() => setIndex(i)}
            sx={{
              width: i === index ? 12 : 8,
              height: i === index ? 12 : 8,
              borderRadius: '50%',
              bgcolor: i === index ? '#fff' : 'rgba(255,255,255,0.5)',
              cursor: 'pointer',
              transition: '0.3s',
            }}
          />
        ))}
      </Box>

    </Box>
  );
}