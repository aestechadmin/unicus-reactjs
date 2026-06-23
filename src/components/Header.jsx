'use client';

import { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  IconButton,
  Stack,
} from '@mui/material';

import {
  Menu,
  X,
  ArrowUpRight,
  Phone,
  Mail,
  MapPin,
} from 'lucide-react';

import { motion, AnimatePresence } from 'framer-motion';

const MotionBox = motion(Box);
const MotionIcon = motion(IconButton);

export default function Header({ setActiveSection }) {
  const [open, setOpen] = useState(false);

  const scrollToSection = (id, sectionIndex) => {
    setOpen(false);
    
    // Find the section element
    const element = document.getElementById(id);
    if (element) {
      // For smooth scroll to element
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
    
    // If setActiveSection is provided (for pinned scroll), update it
    if (setActiveSection && sectionIndex !== undefined) {
      setTimeout(() => {
        setActiveSection(sectionIndex);
      }, 100);
    }
  };

  const scrollToTop = () => {
    setOpen(false);
    if (setActiveSection) {
      setActiveSection(0);
    }
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const scrollToQuote = () => {
    setOpen(false);
    // Find quote section
    const quoteSection = document.getElementById('quote');
    if (quoteSection) {
      quoteSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
    // If using pinned scroll, set to quote section index (9)
    if (setActiveSection) {
      setTimeout(() => {
        setActiveSection(9); // Quote section index
      }, 100);
    }
  };

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [open]);

  const menuItems = [
    { label: 'Services', id: 'services', sectionIndex: 2 },
    { label: 'Sectors', id: 'sectors', sectionIndex: 5 },
    { label: 'About', id: 'about', sectionIndex: 3 },
    { label: 'Clients', id: 'clients', sectionIndex: 6 },
    { label: 'Process', id: 'process', sectionIndex: 7 },
    { label: 'FAQ', id: 'faq', sectionIndex: 10 },
  ];

  return (
    <>
      {/* ================= HEADER ================= */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          top: 20,
          background: 'transparent',
          boxShadow: 'none',
          zIndex: 1200,
        }}
      >
        <Toolbar
          sx={{
            justifyContent: 'space-between',
            px: { xs: 2, md: 4 },
          }}
        >
          {/* MENU BUTTON */}
          <MotionIcon
            whileHover={{
              scale: 1.12,
              rotate: open ? -90 : 90,
              backgroundColor: 'rgba(255,255,255,0.12)',
              borderColor: 'rgba(255,255,255,0.4)',
            }}
            whileTap={{
              scale: 0.9,
            }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 18,
            }}
            onClick={() => setOpen(!open)}
            sx={{
              color: '#fff',
              width: 60,
              height: 60,
              borderRadius: '50%',
              border: '1px solid rgba(255,255,255,0.18)',
              background: 'rgba(255,255,255,0.05)',
              backdropFilter: 'blur(14px)',
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={open ? 'close' : 'menu'}
                initial={{ rotate: -180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 180, opacity: 0 }}
                transition={{ duration: 0.35 }}
              >
                {open ? <X size={24} /> : <Menu size={24} />}
              </motion.div>
            </AnimatePresence>
          </MotionIcon>

          {/* LOGO - Click to go to top */}
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Box
              onClick={scrollToTop}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                cursor: 'pointer',
              }}
            >
              <Box
                component="img"
                src="/img/Brands.png"
                sx={{
                  width: { xs: 45, md: 60 },
                }}
              />

              <Typography
                sx={{
                  fontSize: { xs: 28, md: 44 },
                  color: '#fff',
                  fontWeight: 600,
                  letterSpacing: 1,
                }}
              >
                Unicus
              </Typography>
            </Box>
          </motion.div>

          {/* CTA - GET QUOTE */}
          <motion.div
            whileHover={{
              x: 8,
            }}
            transition={{ duration: 0.3 }}
          >
            <Box
              onClick={scrollToQuote}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                color: '#fff',
                cursor: 'pointer',
              }}
            >
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: 14, md: 24 },
                }}
              >
                GET QUOTE
              </Typography>

              <ArrowUpRight size={28} />
            </Box>
          </motion.div>
        </Toolbar>
      </AppBar>

      {/* ================= FULL MENU ================= */}
      <AnimatePresence>
        {open && (
          <MotionBox
            initial={{
              clipPath: 'circle(0% at 0% 0%)',
              opacity: 0,
            }}
            animate={{
              clipPath: 'circle(160% at 0% 0%)',
              opacity: 1,
              transition: {
                duration: 1,
                ease: [0.76, 0, 0.24, 1],
              },
            }}
            exit={{
              clipPath: 'circle(0% at 0% 0%)',
              opacity: 0,
              transition: {
                duration: 0.7,
                ease: [0.76, 0, 0.24, 1],
              },
            }}
            sx={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'secondary.main',
              zIndex: 2000,
              overflow: 'hidden',
              color: '#fff',
            }}
          >
            {/* BACKGROUND GLOW */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
              }}
              style={{
                position: 'absolute',
                width: 600,
                height: 600,
                borderRadius: '50%',
                background:
                  'radial-gradient(circle, rgba(255,255,255,0.08), transparent)',
                top: -200,
                left: -200,
                filter: 'blur(60px)',
              }}
            />

            {/* TOP BAR */}
            <MotionBox
              initial={{ y: -80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -80, opacity: 0 }}
              transition={{ duration: 0.5 }}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                px: { xs: 2, md: 4 },
                py: 3,
              }}
            >
              <MotionIcon
                whileHover={{
                  rotate: 90,
                  scale: 1.1,
                }}
                whileTap={{
                  scale: 0.9,
                }}
                onClick={() => setOpen(false)}
                sx={{
                  color: '#fff',
                  width: 60,
                  height: 60,
                  borderRadius: '50%',
                  border: '1px solid rgba(255,255,255,0.18)',
                  background: 'rgba(255,255,255,0.05)',
                  backdropFilter: 'blur(14px)',
                }}
              >
                <X />
              </MotionIcon>

              <Box
                onClick={scrollToTop}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  cursor: 'pointer',
                }}
              >
                <Box
                  component="img"
                  src="/img/Brands.png"
                  sx={{
                    width: { xs: 45, md: 60 },
                  }}
                />

                <Typography
                  sx={{
                    fontSize: { xs: 24, md: 40 },
                    fontWeight: 600,
                  }}
                >
                  Unicus
                </Typography>
              </Box>

              <Box
                onClick={scrollToQuote}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  cursor: 'pointer',
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: 14, md: 24 },
                    fontWeight: 700,
                  }}
                >
                  GET QUOTE
                </Typography>

                <ArrowUpRight size={28} />
              </Box>
            </MotionBox>

            {/* BODY */}
            <Box
              sx={{
                height: 'calc(100vh - 100px)',
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                px: { xs: 3, md: 10 },
              }}
            >
              {/* ================= LEFT INFO ================= */}
              <MotionBox
                initial={{ x: -100, opacity: 0 }}
                animate={{
                  x: 0,
                  opacity: 1,
                  transition: {
                    duration: 0.8,
                    delay: 0.2,
                  },
                }}
                exit={{
                  x: -100,
                  opacity: 0,
                }}
                sx={{
                  flex: 1,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Stack spacing={4} width="100%" maxWidth={420}>
                  {[
                    {
                      icon: <MapPin size={20} />,
                      title: 'Office',
                      value:
                        '3rd Floor, Habsiguda Main Road, Hyderabad, Telangana',
                    },
                    {
                      icon: <Mail size={20} />,
                      title: 'Email',
                      value: 'hello@unicusfacilities.in',
                    },
                    {
                      icon: <Phone size={20} />,
                      title: 'Call Us',
                      value: '+91 9550322111',
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ y: 80, opacity: 0 }}
                      animate={{
                        y: 0,
                        opacity: 1,
                        transition: {
                          delay: 0.3 + index * 0.2,
                          duration: 0.7,
                        },
                      }}
                    >
                      <Box
                        sx={{
                          p: 4,
                          borderRadius: 5,
                          border:
                            '1px solid rgba(255,255,255,0.1)',
                          background:
                            'rgba(255,255,255,0.03)',
                          backdropFilter: 'blur(12px)',
                          transition: '0.5s',

                          '&:hover': {
                            transform: 'translateY(-10px)',
                            background:
                              'rgba(255,255,255,0.07)',
                          },
                        }}
                      >
                        <Stack
                          direction="row"
                          spacing={1.5}
                          alignItems="center"
                        >
                          {item.icon}

                          <Typography
                            sx={{
                              fontWeight: 700,
                              fontSize: 18,
                            }}
                          >
                            {item.title}
                          </Typography>
                        </Stack>

                        <Typography
                          sx={{
                            mt: 2,
                            fontSize: 18,
                            opacity: 0.75,
                            lineHeight: 1.7,
                          }}
                        >
                          {item.value}
                        </Typography>
                      </Box>
                    </motion.div>
                  ))}
                </Stack>
              </MotionBox>

              {/* ================= RIGHT MENU ================= */}
              <Box
                sx={{
                  flex: 1.4,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Stack spacing={2}>
                  {menuItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{
                        opacity: 0,
                        y: 120,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        transition: {
                          delay: index * 0.1,
                          duration: 0.8,
                          ease: [0.22, 1, 0.36, 1],
                        },
                      }}
                      exit={{
                        opacity: 0,
                        y: 80,
                      }}
                    >
                      <Typography
                        onClick={() => scrollToSection(item.id, item.sectionIndex)}
                        sx={{
                          fontSize: {
                            xs: 44,
                            md: 70,
                          },
                          fontWeight: 500,
                          lineHeight: 1,
                          cursor: 'pointer',
                          position: 'relative',
                          width: 'fit-content',
                          transition: 'all 0.5s ease',

                          '&::before': {
                            content: `"0${index + 1}"`,
                            position: 'absolute',
                            left: -70,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            fontSize: 18,
                            opacity: 0,
                            transition: '0.4s',
                          },

                          '&::after': {
                            content: '""',
                            position: 'absolute',
                            left: 0,
                            bottom: -8,
                            width: 0,
                            height: 5,
                            borderRadius: 10,
                            backgroundColor: '#fff',
                            transition: '0.5s',
                          },

                          '&:hover': {
                            transform: 'translateX(30px)',
                            letterSpacing: 4,
                            opacity: 0.75,
                          },

                          '&:hover::after': {
                            width: '100%',
                          },

                          '&:hover::before': {
                            opacity: 1,
                            left: -50,
                          },
                        }}
                      >
                        {item.label}
                      </Typography>
                    </motion.div>
                  ))}
                </Stack>
              </Box>
            </Box>
          </MotionBox>
        )}
      </AnimatePresence>
    </>
  );
}