import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Box, Typography, Stack, useTheme, useMediaQuery } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import MapPin from '@mui/icons-material/LocationOnOutlined';
import Mail from '@mui/icons-material/MailOutlineOutlined';
import Phone from '@mui/icons-material/CallOutlined';

function Header({ onSectionClick, activeSection, sections }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [open]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 1000);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = sections
    .map((section, idx) => ({ label: section.name, index: idx }))
    .filter(s => s.index !== 0 && s.index !== sections.length - 1);

  const contactItems = [
    {
      icon: <MapPin sx={{ fontSize: { xs: 16, md: 20 } }} />,
      title: 'Office',
      value: '3rd Floor, Habsiguda Main Road, Hyderabad, Telangana'
    },
    {
      icon: <Mail sx={{ fontSize: { xs: 16, md: 20 } }} />,
      title: 'Email',
      value: 'hello@unicusfacilities.in'
    },
    {
      icon: <Phone sx={{ fontSize: { xs: 16, md: 20 } }} />,
      title: 'Call Us',
      value: '+91 9550322111'
    },
  ];

  return (
    <>
      {/* ── AppBar ── */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          top: { xs: 0, md: 0 },
          background: scrolled ? "rgba(8, 18, 35, 0.04)" : "transparent",
          backdropFilter: scrolled ? "blur(18px)" : 'none',
          boxShadow: 'none',
          py: 1.5,
          zIndex: scrolled ? 1200 : 1201,
        }}
      >
        <Toolbar sx={{
          justifyContent: 'space-between',
          px: { xs: 1.5, sm: 2, md: 4 },
          minHeight: { xs: 56, md: 64 },
        }}>

          {/* Menu button */}
          <IconButton
            onClick={() => setOpen(!open)}
            sx={{
              color: '#fff',
              width: { xs: 44, sm: 50, md: 60 },
              height: { xs: 44, sm: 50, md: 60 },
              borderRadius: '50%',
              border: '1px solid rgba(255,255,255,0.18)',
              background: 'rgba(255,255,255,0.05)',
              backdropFilter: 'blur(14px)',
              transition: 'all 0.3s',
              '&:hover': {
                transform: 'scale(1.05)',
                background: 'rgba(255,255,255,0.15)',
              },
            }}
          >
            {open
              ? <CloseIcon sx={{ fontSize: { xs: 18, md: 24 } }} />
              : <MenuIcon sx={{ fontSize: { xs: 18, md: 24 } }} />
            }
          </IconButton>

          {/* Logo */}
          <Box
            onClick={() => { onSectionClick(0); setOpen(false); }}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: { xs: 0.5, md: 1 },
              cursor: 'pointer',
            }}
          >
            <Box
              component="img"
              src="/img/Brands.png"
              sx={{
                width: { xs: 28, sm: 35, md: 60 },
                transition: 'transform 0.3s',
                '&:hover': { transform: 'scale(1.05)' },
              }}
            />
            <Typography sx={{
              fontSize: { xs: 18, sm: 22, md: 44 },
              color: '#fff',
              fontWeight: 700,
              background: '#FFF',
              lineHeight: 1.4,
              WebkitBackgroundClip: 'text',
            }}>
              Unicus
            </Typography>
          </Box>

          {/* Get Quote */}
          <Box
            onClick={() => { onSectionClick(7); setOpen(false); }}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: { xs: 0.5, md: 1 },
              color: 'black',
              background: 'white',
              cursor: 'pointer',
              px: { xs: 1, sm: 1.5, md: 2 },
              py: { xs: 0.8, md: 1.1 },
              borderRadius: 2,
              transition: 'all 0.3s',
              '&:hover': {
                // background: 'rgba(255,255,255,0.1)',
                transform: 'translateX(5px)',
              },
            }}
          >
            <Typography sx={{
              fontWeight: 500,
              fontSize: { xs: 10, sm: 12, md: 14 },
              letterSpacing: { xs: 0.5, md: 1 },
            }}>
              Get Quote
            </Typography>
            <NorthEastIcon sx={{ fontSize: { xs: 14, sm: 18, md: 14 } }} />
          </Box>
        </Toolbar>
      </AppBar>

      {/* ── Fullscreen Menu Overlay ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: 'circle(0% at 0% 0%)', opacity: 0 }}
            animate={{
              clipPath: 'circle(160% at 0% 0%)',
              opacity: 1,
              transition: { duration: 1, ease: [0.76, 0, 0.24, 1] }
            }}
            exit={{
              clipPath: 'circle(0% at 0% 0%)',
              opacity: 0,
              transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] }
            }}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: theme.palette.secondary.main,
              zIndex: 2000,
              overflowY: 'auto',
              overflowX: 'hidden',
              color: '#fff',
            }}
          >
            {/* Menu Header */}
            <motion.div
              initial={{ y: -80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -80, opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: isMobile ? '12px 16px' : isTablet ? '16px 24px' : '20px 30px',
                position: 'sticky',
                top: 0,
                zIndex: 10,
                background: 'inherit',
              }}
            >
              {/* Close */}
              <IconButton
                onClick={() => setOpen(false)}
                sx={{
                  color: '#fff',
                  width: { xs: 40, md: 50 },
                  height: { xs: 40, md: 50 },
                  borderRadius: '50%',
                  border: '1px solid rgba(255,255,255,0.18)',
                  background: 'rgba(255,255,255,0.05)',
                  '&:hover': { transform: 'scale(1.05)', background: 'rgba(255,255,255,0.15)' },
                }}
              >
                <CloseIcon sx={{ fontSize: { xs: 18, md: 24 } }} />
              </IconButton>

              {/* Logo */}
              <Box
                onClick={() => { onSectionClick(0); setOpen(false); }}
                sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, md: 1 }, cursor: 'pointer' }}
              >
                <Box component="img" src="/img/Brands.png" sx={{ width: { xs: 28, sm: 35, md: 60 } }} />
                <Typography sx={{ fontSize: { xs: 18, sm: 20, md: 40 }, fontWeight: 700 }}>Unicus</Typography>
              </Box>

              {/* Get Quote */}
              <Box
                onClick={() => { onSectionClick(7); setOpen(false); }}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: { xs: 0.5, md: 1 },
                  color: 'black',
                  background: 'white',
                  cursor: 'pointer',
                  px: { xs: 1, sm: 1.5, md: 2 },
                  py: { xs: 0.8, md: 1.1 },
                  borderRadius: 2,
                  transition: 'all 0.3s',
                  '&:hover': {
                    // background: 'rgba(255,255,255,0.1)',
                    transform: 'translateX(5px)',
                  },
                }}
              >
                <Typography sx={{ fontSize: { xs: 10, sm: 12, md: 14 }, fontWeight: 500 }}>Get Quote</Typography>
                <NorthEastIcon sx={{ fontSize: { xs: 14, sm: 18, md: 14 } }} />
              </Box>
            </motion.div>

            {/* Menu Content */}
            <Box sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              px: { xs: 2, sm: 4, md: 10 },
              py: { xs: 2, md: 0 },
              minHeight: { xs: 'auto', md: 'calc(100vh - 100px)' },
              gap: { xs: 4, md: 0 },
            }}>

              {/* ── Nav Links (mobile: first, desktop: right) ── */}
              <Box sx={{
                flex: 1.4,
                display: 'flex',
                justifyContent: { xs: 'flex-start', md: 'center' },
                alignItems: { xs: 'flex-start', md: 'center' },
                order: { xs: 1, md: 2 },
                py: { xs: 0, md: 0 },
              }}>
                <Stack spacing={{ xs: 0.5, sm: 1, md: 2 }}>
                  {menuItems.map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 120 }}
                      animate={{ opacity: 1, y: 0, transition: { delay: index * 0.08, duration: 0.7 } }}
                      exit={{ opacity: 0, y: 80 }}
                    >
                      <Typography
                        onClick={() => { onSectionClick(item.index); setOpen(false); }}
                        sx={{
                          fontSize: { xs: 26, sm: 36, md: 55, lg: 60 },
                          fontWeight: activeSection === item.index ? 900 : 500,
                          lineHeight: { xs: 1.2, md: 1 },
                          cursor: 'pointer',
                          position: 'relative',
                          width: 'fit-content',
                          transition: 'all 0.5s cubic-bezier(0.2, 0.9, 0.4, 1.1)',
                          color: activeSection === item.index ? '#fff' : 'rgba(255,255,255,0.6)',
                          pl: { xs: '30px', md: '50px' },

                          '&::before': {
                            content: `"0${index + 1}"`,
                            position: 'absolute',
                            left: { xs: 0, md: 0 },
                            top: '50%',
                            transform: 'translateY(-50%)',
                            fontSize: { xs: 11, md: 18 },
                            opacity: 0.5,
                            transition: '0.4s',
                          },
                          '&::after': {
                            content: '""',
                            position: 'absolute',
                            left: { xs: '30px', md: '50px' },
                            bottom: { xs: -2, md: -8 },
                            width: activeSection === item.index ? '100%' : 0,
                            height: { xs: 2, md: 5 },
                            borderRadius: 10,
                            backgroundColor: '#fff',
                            transition: '0.5s',
                          },
                          '&:hover': {
                            transform: { xs: 'translateX(8px)', md: 'translateX(20px)' },
                            letterSpacing: { xs: 1, md: 4 },
                            color: '#fff',
                          },
                          '&:hover::after': { width: '100%' },
                          '&:hover::before': { opacity: 1 },
                        }}
                      >
                        {item.label}
                      </Typography>
                    </motion.div>
                  ))}
                </Stack>
              </Box>

              {/* ── Contact Cards (mobile: second, desktop: left) ── */}
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1, transition: { duration: 0.8, delay: 0.2 } }}
                exit={{ x: -100, opacity: 0 }}
                style={{
                  flex: 1,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  order: 2,
                  paddingTop: isMobile ? '8px' : 0,
                  paddingBottom: isMobile ? '24px' : 0,
                }}
              >
                <Stack
                  spacing={{ xs: 2, md: 4 }}
                  width="100%"
                  maxWidth={{ xs: '100%', md: 420 }}
                >
                  {contactItems.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ y: 80, opacity: 0 }}
                      animate={{ y: 0, opacity: 1, transition: { delay: 0.3 + index * 0.15, duration: 0.7 } }}
                    >
                      <Box sx={{
                        p: { xs: 2, sm: 2.5, md: 4 },
                        borderRadius: { xs: 3, md: 5 },
                        border: '1px solid rgba(255,255,255,0.1)',
                        background: 'rgba(255,255,255,0.03)',
                        backdropFilter: 'blur(12px)',
                        transition: 'all 0.3s',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          borderColor: 'rgba(255,255,255,0.3)',
                          background: 'rgba(255,255,255,0.08)',
                        },
                      }}>
                        <Stack direction="row" spacing={1.5} alignItems="center">
                          {item.icon}
                          <Typography sx={{
                            fontWeight: 700,
                            fontSize: { xs: 14, sm: 16, md: 18 },
                          }}>
                            {item.title}
                          </Typography>
                        </Stack>
                        <Typography sx={{
                          mt: { xs: 1, md: 2 },
                          fontSize: { xs: 12, sm: 13, md: 18 },
                          opacity: 0.75,
                          lineHeight: 1.5,
                        }}>
                          {item.value}
                        </Typography>
                      </Box>
                    </motion.div>
                  ))}
                </Stack>
              </motion.div>

            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Header;