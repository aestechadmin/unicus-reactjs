'use client';

import { Box, Typography } from '@mui/material';
import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Sectors({ setAllowNext, setAllowPrev }) {
  const data = [
    { type: 'title', name: 'Sectors We Serve' },

    {
      type: 'service',
      name: 'Corporate Multispeciality Hospitals',
      image: '/img/Img5.png',
      description: 'Healthcare-grade facilities management',
    },
    {
      type: 'service',
      name: 'Residential Apartments & Villas',
      image: '/img/Img5.png',
      description: 'Comprehensive facility maintenance for residential communities',
    },
    {
      type: 'service',
      name: 'Commercial Buildings',
      image: '/img/Img5.png',
      description: 'Professional services for office and commercial spaces',
    },
    {
      type: 'service',
      name: 'Educational Institutions',
      image: '/img/Img5.png',
      description: 'Specialized support for schools, colleges, and universities',
    },
    {
      type: 'service',
      name: 'Industrial Units',
      image: '/img/Img5.png',
      description: 'Robust facility management for manufacturing and industrial operations',
    },
    {
      type: 'service',
      name: 'Corporate Offices',
      image: '/img/Img5.png',
      description: 'Dedicated services for corporate workspaces',
    },
  ];

  const [active, setActive] = useState(0);
  const max = data.length - 1;

  const lock = useRef(false);
  const wheelSum = useRef(0);
  const sectionRef = useRef(null);

  const THRESHOLD = 80;

  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();

      if (lock.current) return;

      wheelSum.current += e.deltaY;

      const down = wheelSum.current > THRESHOLD;
      const up = wheelSum.current < -THRESHOLD;

      if (!down && !up) return;

      wheelSum.current = 0;
      lock.current = true;

      const atFirst = active === 0;
      const atLast = active === max;

      if (down && !atLast) {
        setActive((p) => Math.min(p + 1, max));
      } 
      else if (up && !atFirst) {
        setActive((p) => Math.max(p - 1, 0));
      } 
      else {
        if (down && atLast) setAllowNext?.(true);
        if (up && atFirst) setAllowPrev?.(true);
      }

      setTimeout(() => {
        lock.current = false;
      }, 600);
    };

    const el = sectionRef.current;
    el?.addEventListener('wheel', handleWheel, { passive: false });

    return () => el?.removeEventListener('wheel', handleWheel);
  }, [active]);

  const services = data.filter((d) => d.type === 'service');
  const current = data[active];

  return (
    <Box
      ref={sectionRef}
      sx={{
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        background: '#ECECEC',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >

      {/* ================= TITLE ================= */}
      {current.type === 'title' && (
        <motion.div
          key="title"
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Typography sx={{ fontSize: { xs: 32, md: 70 }, fontWeight: 900 }}>
            {current.name}
          </Typography>
        </motion.div>
      )}

      {/* ================= SERVICE ================= */}
      {current.type === 'service' && (
        <Box
          sx={{
            width: '100%',
            maxWidth: 1400,
            display: 'flex',
            gap: 4,
            px: 3,
            alignItems: 'center',
          }}
        >

          {/* LEFT LIST */}
          <Box sx={{ flex: 0.5, display: 'flex', flexDirection: 'column', gap: 1 }}>
            {services.map((item, i) => {
              const isActive = active === i + 1;

              return (
                <motion.div
                  key={i}
                  animate={{
                    opacity: isActive ? 1 : 0.3,
                    x: isActive ? 10 : 0,
                    scale: isActive ? 1.05 : 1,
                  }}
                  transition={{ duration: 0.4 }}
                >
                  <Typography
                    sx={{
                      fontSize: 18,
                      fontWeight: isActive ? 900 : 400,
                      color: isActive ? '#000' : '#666',
                    }}
                  >
                    {item.name}
                  </Typography>
                </motion.div>
              );
            })}
          </Box>

          {/* IMAGE */}
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <AnimatePresence mode="wait">
              <motion.img
                key={current.image}
                src={current.image}
                initial={{ opacity: 0, scale: 1.1, rotate: -2 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.7 }}
                style={{
                  width: '100%',
                  maxHeight: '70vh',
                  objectFit: 'cover',
                  borderRadius: 18,
                }}
              />
            </AnimatePresence>
          </Box>

          {/* DESCRIPTION */}
          <Box sx={{ flex: 0.5 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={current.description}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.5 }}
              >
                <Typography sx={{ fontSize: 18, lineHeight: 1.8 }}>
                  {current.description}
                </Typography>
              </motion.div>
            </AnimatePresence>
          </Box>

        </Box>
      )}
    </Box>
  );
}