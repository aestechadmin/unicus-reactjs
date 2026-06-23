'use client';

import { Box, Typography } from '@mui/material';
import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function GrowthSection({ setAllowNext, setAllowPrev }) {
  const data = [
    { type: 'title', name: 'Specialized Services' },

    {
      type: 'service',
      name: 'Housekeeping',
      image: '/img/Img5.png',
      description: 'Professional cleaning and sanitation for all facility areas.',
    },
    {
      type: 'service',
      name: 'Security & Watch & Ward',
      image: '/img/Img5.png',
      description: 'Trained security personnel for visitor management and facility protection.',
    },
    {
      type: 'service',
      name: 'Pest Control',
      image: '/img/Img5.png',
      description: 'Health-regulation compliant pest management services.',
    },
    {
      type: 'service',
      name: 'Lift & Generator O&M',
      image: '/img/Img5.png',
      description: 'Preventive maintenance of elevators and backup power systems.',
    },
    {
      type: 'service',
      name: 'Electrical Maintenance',
      image: '/img/Img5.png',
      description: 'Professional electrical system upkeep and safety compliance.',
    },
    {
      type: 'service',
      name: 'Civil Work Maintenance',
      image: '/img/Img5.png',
      description: 'Structural repairs and facility infrastructure maintenance.',
    },
    {
      type: 'service',
      name: 'Plumbing & Water Supply',
      image: '/img/Img5.png',
      description: 'Complete water system management and plumbing services.',
    },
    {
      type: 'service',
      name: 'Gardening & Landscaping',
      image: '/img/Img5.png',
      description: 'Green space maintenance for healing environments.',
    },
  ];

  const [active, setActive] = useState(0);
  const max = data.length - 1;

  const lock = useRef(false);
  const wheelSum = useRef(0);
  const sectionRef = useRef(null);

  const THRESHOLD = 80;
  const COOLDOWN = 600;

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
        // EXIT LOGIC
        if (down && atLast) setAllowNext?.(true);
        if (up && atFirst) setAllowPrev?.(true);
      }

      setTimeout(() => {
        lock.current = false;
      }, COOLDOWN);
    };

    const el = sectionRef.current;
    el?.addEventListener('wheel', handleWheel, { passive: false });

    return () => el?.removeEventListener('wheel', handleWheel);
  }, [active]);

  const services = data.filter(d => d.type === 'service');
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
                    opacity: isActive ? 1 : 0.5,
                    x: isActive ? 10 : 0,
                    scale: isActive ? 1.05 : 1,
                  }}
                  transition={{ duration: 0.4 }}
                >
                  <Typography
                    sx={{
                      fontSize: 18,
                      fontWeight: isActive ? 900 : 400,
                      color: isActive ? '#000' : '#000',
                      lineHeight: 1.8
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