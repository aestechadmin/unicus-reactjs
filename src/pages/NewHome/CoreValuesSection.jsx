'use client';

import { Box, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CoreValuesSection({ setAllowNext, setAllowPrev }) {
  const sectionRef = useRef(null);

  const lock = useRef(false);
  const wheelSum = useRef(0);

  // 🔥 IMPORTANT: prevents instant parent jump
  const exitLock = useRef(false);
  const exitIntent = useRef(false);

  const THRESHOLD = 140;
  const COOLDOWN = 800;

  const data = [
    {
      title: 'Reliable & Compliant',
      desc: 'Timely, regulation-adherent service for healthcare institutions',
    },
    {
      title: 'Flexible Scheduling',
      desc: 'Customized workflows respecting hospital operations',
    },
    {
      title: 'Proactive Reporting',
      desc: 'In-depth updates and dedicated client support',
    },
    {
      title: 'Long-Term Partnerships',
      desc: 'Focused on safety, hygiene, and operational excellence',
    },
  ];

  const stats = [
    { value: '2022', label: 'Founded' },
    { value: '4', label: 'Years' },
    { value: '400+', label: 'Clients' },
    { value: '4Cr+', label: 'Annual Turnover' },
    { value: '2', label: 'States Covered' },
  ];

  const [step, setStep] = useState(0);
  const maxStep = 1; // 0 = grid, 1 = stats

  // reset exit state when step changes
  useEffect(() => {
    exitLock.current = false;
    exitIntent.current = false;
  }, [step]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const handleWheel = (e) => {
      e.preventDefault();
      e.stopPropagation(); // 🔥 CRITICAL FIX

      if (lock.current) return;

      wheelSum.current += e.deltaY;

      const down = wheelSum.current > THRESHOLD;
      const up = wheelSum.current < -THRESHOLD;

      if (!down && !up) return;

      wheelSum.current = 0;
      lock.current = true;

      const atFirst = step === 0;
      const atLast = step === maxStep;

      // ================= DOWN SCROLL =================
      if (down) {
        if (!atLast) {
          setStep(1);
        } else {
          // first intent
          if (!exitIntent.current) {
            exitIntent.current = true;
          } else if (!exitLock.current) {
            exitLock.current = true;

            setAllowNext?.(true);
          }
        }
      }

      // ================= UP SCROLL =================
      if (up) {
        if (!atFirst) {
          setStep(0);
        } else {
          if (!exitIntent.current) {
            exitIntent.current = true;
          } else if (!exitLock.current) {
            exitLock.current = true;

            setAllowPrev?.(true);
          }
        }
      }

      setTimeout(() => {
        lock.current = false;
      }, COOLDOWN);
    };

    el.addEventListener('wheel', handleWheel, { passive: false });

    return () => el.removeEventListener('wheel', handleWheel);
  }, [step, setAllowNext, setAllowPrev]);

  return (
    <Box
      ref={sectionRef}
      sx={{
        height: '100vh',
        overflow: 'hidden',
        position: 'relative',
        background: '#ECECEC',
      }}
    >

      {/* ================= STEP 1: GRID ================= */}
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="grid"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.5 }}
            style={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 6,
                maxWidth: 1000,
                px: 4,
              }}
            >
              {data.map((item, i) => (
                <Box key={i}>
                  <Typography sx={{ fontSize: 26, fontWeight: 800 }}>
                    {item.title}
                  </Typography>
                  <Typography sx={{ mt: 1, color: '#666' }}>
                    {item.desc}
                  </Typography>
                </Box>
              ))}
            </Box>
          </motion.div>
        )}

        {/* ================= STEP 2: STATS ================= */}
        {step === 1 && (
          <motion.div
            key="stats"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            style={{ width: '100%', height: '100%' }}
          >
            <Box sx={{ position: 'absolute', inset: 0 }}>
              <Box
                component="img"
                src="/img/array4.png"
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />

              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(0,0,0,0.35)',
                  color: '#fff',
                }}
              >
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                      xs: '1fr 1fr',
                      md: 'repeat(5, 1fr)',
                    },
                    gap: 4,
                    textAlign: 'center',
                    maxWidth: 1300,
                  }}
                >
                  {stats.map((s, i) => (
                    <Box key={i}>
                      <Typography sx={{ fontSize: 50, fontWeight: 600 }}>
                        {s.value}
                      </Typography>
                      <Typography sx={{ fontSize: 18 }}>
                        {s.label}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
}