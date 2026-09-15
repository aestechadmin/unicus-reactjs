import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Box, Typography, Stack } from '@mui/material';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import CloseIcon from '@mui/icons-material/Close';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import MapPin from '@mui/icons-material/LocationOnOutlined';
import Mail from '@mui/icons-material/MailOutlineOutlined';
import Phone from '@mui/icons-material/CallOutlined';

import { pagePx, scrollToId } from "./motion";

const ICONS = "/img/unicuss/icons";
const LOGO = `${ICONS}/unicus.png`;
const MENU = `${ICONS}/menu.png`;
const logoSpring = { type: "spring", stiffness: 420, damping: 34 };

function LogoMark({ onClick, overlay = false }) {
  return (
    <Box
      component={motion.div}
      layoutId="unicus-logo"
      transition={logoSpring}
      onClick={onClick}
      sx={{ display: "flex", alignItems: "center", cursor: "pointer", zIndex: 3 }}
    >
      <Box
        component="img"
        src={LOGO}
        alt="Unicus"
        sx={{
          height: overlay
            ? { xs: 22, sm: 26, md: 34, lg: 40, xl: 44 }
            : { xs: 22, sm: 28, md: 36, lg: 44, xl: 48 },
          width: "auto",
          display: "block",
          mixBlendMode: overlay ? "normal" : "screen",
        }}
      />
    </Box>
  );
}

function Header({ onSectionClick, activeSection, sections }) {
  const [open, setOpen] = useState(false);
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
    if (window.__lenis) {
      if (open) window.__lenis.stop();
      else window.__lenis.start();
    }
    return () => {
      document.body.style.overflow = "auto";
      window.__lenis?.start();
    };
  }, [open]);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setPastHero(entry.boundingClientRect.bottom < 88);
      },
      { threshold: [0, 0.08, 0.2, 0.5, 1] }
    );
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  const goTo = (id) => {
    const index = sections.findIndex((section) => section.id === id);
    setOpen(false);
    window.setTimeout(() => {
      if (index >= 0) onSectionClick(index);
      else scrollToId(id);
    }, 120);
  };

  const menuItems = sections
    .map((section, idx) => ({ label: section.name, index: idx, id: section.id }))
    .filter(s => s.index !== 0 && s.id !== "contact");

  const contactItems = [
    {
      icon: <MapPin sx={{ fontSize: { xs: 16, sm: 17, md: 18, lg: 20, xl: 20 } }} />,
      title: 'Office',
      value: '3rd Floor, Habsiguda Main Road, Hyderabad, Telangana'
    },
    {
      icon: <Mail sx={{ fontSize: { xs: 16, sm: 17, md: 18, lg: 20, xl: 20 } }} />,
      title: 'Email',
      value: 'hello@unicusfacilities.in'
    },
    {
      icon: <Phone sx={{ fontSize: { xs: 16, sm: 17, md: 18, lg: 20, xl: 20 } }} />,
      title: 'Call Us',
      value: '+91 9550322111'
    },
  ];

  return (
    <LayoutGroup>
    <>
      {/* ── AppBar ── */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          top: 0,
          overflow: "visible",
          bgcolor: "transparent",
          background: "linear-gradient(360deg, rgba(255, 255, 255, 0.02) 0%, rgba(255, 255, 255, 0.49) 100%)",
          boxShadow: "none",
          py: 1.5,
          zIndex: 1201,
        }}
      >
        <Box
          aria-hidden
          sx={{
            position: "absolute",
            inset: 0,
            overflow: "hidden",
            pointerEvents: "none",
            zIndex: 0,
            backdropFilter: "blur(20px) saturate(160%)",
            WebkitBackdropFilter: "blur(20px) saturate(160%)",
            WebkitMaskImage: "linear-gradient(180deg, #000 0%, #000 58%, transparent 100%)",
            maskImage: "linear-gradient(180deg, #000 0%, #000 58%, transparent 100%)",
            "&::before": {
              content: '""',
              position: "absolute",
              left: "50%",
              top: 0,
              height: "70%",
              width: "100%",
              transform: "translateX(-50%)",
              background: "linear-gradient(360deg, rgba(255, 255, 255, 0.66) 0%, rgba(255, 255, 255, 0.65) 100%)",
              filter: "blur(50px)",
            },
          }}
        />
        <Toolbar
          disableGutters
          sx={{
          justifyContent: 'space-between',
          px: pagePx,
          minHeight: { xs: 56, sm: 58, md: 62, lg: 64, xl: 64 },
          position: "relative",
          zIndex: 1,
        }}>

          <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1.2, sm: 1.6, md: 2, lg: 2.5, xl: 2.5 } }}>
          {/* Menu button */}
          <IconButton
            onClick={() => setOpen(!open)}
            sx={{
              color: "#fff",
              p: 0,
              borderRadius: 0,
              "&:hover": { background: "transparent", transform: "scale(1.06)" },
            }}
          >
            <Box
              component="img"
              src={MENU}
              alt="Menu"
              sx={{
                width: { xs: 22, sm: 36, md: 56, lg: 80, xl: 80 },
                height: { xs: 14, sm: 22, md: 36, lg: 50, xl: 50 },
                objectFit: "contain",
                mixBlendMode: "screen",
                display: "block",
              }}
            />
          </IconButton>
          {!open && !pastHero && <LogoMark onClick={() => goTo("hero")} />}
          </Box>

          {!open && pastHero && (
            <Box
              sx={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 3,
              }}
            >
              <LogoMark onClick={() => goTo("hero")} />
            </Box>
          )}

          {/* Get Quote */}
          <Box
            onClick={() => goTo("contact")}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: { xs: 0.5, sm: 0.65, md: 0.85, lg: 1, xl: 1 },
              color: 'black',
              background: 'white',
              cursor: 'pointer',
              px: { xs: 1, sm: 1.25, md: 1.75, lg: 2, xl: 2 },
              py: { xs: 0.8, sm: 0.9, md: 1, lg: 1.1, xl: 1.1 },
              borderRadius: 2,
              transition: 'all 0.3s',
              '&:hover': {
                // background: 'rgba(255,255,255,0.1)',
                transform: 'translateX(5px)',
              },
            }}
          >
            <Typography sx={{
              fontWeight: 600,
              fontSize: { xs: 12, sm: 12, md: 13, lg: 14, xl: 14 },
              letterSpacing: { xs: 0.5, sm: 0.65, md: 0.85, lg: 1, xl: 1 },
            }}>
              Get Quote
            </Typography>
            <NorthEastIcon sx={{ fontSize: { xs: 14, sm: 15, md: 16, lg: 14, xl: 14 } }} />
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
              backgroundColor: "#027EFF",
              zIndex: 2000,
              overflowY: 'auto',
              overflowX: 'hidden',
              color: '#fff',
            }}
          >
            {/* Menu Header */}
            <Box
              component={motion.div}
              initial={{ y: -80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -80, opacity: 0 }}
              transition={{ duration: 0.5 }}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                px: pagePx,
                py: { xs: 1.5, sm: 2, md: 2.25, lg: 2.5, xl: 2.5 },
                position: "relative",
                top: 0,
                zIndex: 10,
                bgcolor: "inherit",
              }}
            >
              <IconButton
                onClick={() => setOpen(false)}
                sx={{
                  color: "#fff",
                  p: 0,
                  borderRadius: 0,
                  "&:hover": { background: "transparent", transform: "scale(1.06)" },
                }}
              >
                <CloseIcon sx={{ fontSize: { xs: 18, sm: 24, md: 32, lg: 40, xl: 40 } }} />
              </IconButton>

              <Box
                sx={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  zIndex: 3,
                }}
              >
                <LogoMark overlay onClick={() => goTo("hero")} />
              </Box>

              {/* Get Quote */}
              <Box
                onClick={() => goTo("contact")}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: { xs: 0.5, sm: 0.65, md: 0.85, lg: 1, xl: 1 },
                  color: 'black',
                  background: 'white',
                  cursor: 'pointer',
                  px: { xs: 1, sm: 1.25, md: 1.75, lg: 2, xl: 2 },
                  py: { xs: 0.8, sm: 0.9, md: 1, lg: 1.1, xl: 1.1 },
                  borderRadius: 2,
                  transition: 'all 0.3s',
                  '&:hover': {
                    // background: 'rgba(255,255,255,0.1)',
                    transform: 'translateX(5px)',
                  },
                }}
              >
                <Typography sx={{ fontSize: { xs: 12, sm: 12, md: 13, lg: 14, xl: 14 }, fontWeight: 600 }}>Get Quote</Typography>
                <NorthEastIcon sx={{ fontSize: { xs: 14, sm: 15, md: 16, lg: 14, xl: 14 } }} />
              </Box>
            </Box>

            {/* Menu Content */}
            <Box sx={{
              display: 'flex',
              flexDirection: { xs: "column", sm: "column", md: "row", lg: "row", xl: "row" },
              px: { xs: 2, sm: 4, md: 7, lg: 10, xl: 10 },
              py: { xs: 2, sm: 2, md: 0, lg: 0, xl: 0 },
              minHeight: { xs: "auto", sm: "auto", md: "calc(100vh - 100px)", lg: "calc(100vh - 100px)", xl: "calc(100vh - 100px)" },
              gap: { xs: 4, sm: 4, md: 0, lg: 0, xl: 0 },
            }}>

              {/* ── Nav Links (mobile: first, desktop: right) ── */}
              <Box sx={{
                flex: 1.4,
                display: 'flex',
                justifyContent: { xs: "flex-start", sm: "flex-start", md: "center", lg: "center", xl: "center" },
                alignItems: { xs: "flex-start", sm: "flex-start", md: "center", lg: "center", xl: "center" },
                order: { xs: 1, sm: 1, md: 2, lg: 2, xl: 2 },
                py: { xs: 0, sm: 0, md: 0, lg: 0, xl: 0 },
              }}>
                <Stack spacing={{ xs: 0.5, sm: 1, md: 1.5, lg: 2, xl: 2 }}>
                  {menuItems.map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 120 }}
                      animate={{ opacity: 1, y: 0, transition: { delay: index * 0.08, duration: 0.7 } }}
                      exit={{ opacity: 0, y: 80 }}
                    >
                      <Typography
                        onClick={() => goTo(item.id)}
                        sx={{
                          fontSize: { xs: 26, sm: 36, md: 55, lg: 60, xl: 60 },
                          fontWeight: activeSection === item.index ? 900 : 500,
                          lineHeight: { xs: 1.2, sm: 1.15, md: 1.05, lg: 1, xl: 1 },
                          cursor: 'pointer',
                          position: 'relative',
                          width: 'fit-content',
                          transition: 'all 0.5s cubic-bezier(0.2, 0.9, 0.4, 1.1)',
                          color: activeSection === item.index ? '#fff' : 'rgba(255,255,255,0.6)',
                          pl: { xs: "30px", sm: "36px", md: "44px", lg: "50px", xl: "50px" },

                          '&::before': {
                            content: `"0${index + 1}"`,
                            position: 'absolute',
                            left: { xs: 0, sm: 0, md: 0, lg: 0, xl: 0 },
                            top: '50%',
                            transform: 'translateY(-50%)',
                            fontSize: { xs: 11, sm: 13, md: 16, lg: 18, xl: 18 },
                            opacity: 0.5,
                            transition: '0.4s',
                          },
                          '&::after': {
                            content: '""',
                            position: 'absolute',
                            left: { xs: "30px", sm: "36px", md: "44px", lg: "50px", xl: "50px" },
                            bottom: { xs: -2, sm: -3, md: -6, lg: -8, xl: -8 },
                            width: activeSection === item.index ? '100%' : 0,
                            height: { xs: 2, sm: 3, md: 4, lg: 5, xl: 5 },
                            borderRadius: 10,
                            backgroundColor: '#fff',
                            transition: '0.5s',
                          },
                          '&:hover': {
                            transform: { xs: "translateX(8px)", sm: "translateX(12px)", md: "translateX(16px)", lg: "translateX(20px)", xl: "translateX(20px)" },
                            letterSpacing: { xs: 1, sm: 2, md: 3, lg: 4, xl: 4 },
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
                  paddingTop: 0,
                  paddingBottom: 0,
                }}
              >
                <Stack
                  spacing={{ xs: 2, sm: 2.5, md: 3.5, lg: 4, xl: 4 }}
                  width="100%"
                  maxWidth={{ xs: "100%", sm: "100%", md: 380, lg: 420, xl: 420 }}
                >
                  {contactItems.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ y: 80, opacity: 0 }}
                      animate={{ y: 0, opacity: 1, transition: { delay: 0.3 + index * 0.15, duration: 0.7 } }}
                    >
                      <Box sx={{
                        p: { xs: 2, sm: 2.5, md: 3.25, lg: 4, xl: 4 },
                        borderRadius: { xs: 3, sm: 3.5, md: 4.5, lg: 5, xl: 5 },
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
                            fontSize: { xs: 14, sm: 16, md: 17, lg: 18, xl: 18 },
                          }}>
                            {item.title}
                          </Typography>
                        </Stack>
                        <Typography sx={{
                          mt: { xs: 1, sm: 1.25, md: 1.75, lg: 2, xl: 2 },
                          fontSize: { xs: 12, sm: 13, md: 16, lg: 18, xl: 18 },
                          opacity: 0.75,
                          lineHeight: 1.5,
                          textAlign: 'left',
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
    </LayoutGroup>
  );
}

export default Header;