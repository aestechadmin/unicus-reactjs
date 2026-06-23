'use client';

import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useTheme } from '@mui/material/styles';

export default function HeroSection() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        background: theme.palette.secondary.main,
        overflow: 'hidden',
      }}
    >
      {/* IMAGE CONTAINER (90vh ONLY) */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '90vh',
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          style={{ width: '100%', height: '100%' }}
        >
          <Box
            component="img"
            src="/img/hero.png"
            alt="Hero"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              borderRadius: '0 0 25% 25%',
            }}
          />
        </motion.div>

        {/* TEXT INSIDE IMAGE */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          sx={{
            position: 'absolute',
            bottom: 30,
            left: { xs: 20, md: 60 },
            right: 20,
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: '1.8rem', md: '7rem' },
              fontWeight: 600,
              color: '#fff',
              lineHeight: 1.2,
            }}
          >
            Clean spaces.
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: '1.8rem', md: '7rem' },
              fontWeight: 600,
              color: '#fff',
              lineHeight: 1.2,
            }}
          >
            Sharper watch.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}