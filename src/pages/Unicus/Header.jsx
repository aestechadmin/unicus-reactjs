import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Box, Typography, Stack, useTheme } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import MapPin from '@mui/icons-material/LocationOnOutlined';
import Mail from '@mui/icons-material/MailOutlineOutlined';
import Phone from '@mui/icons-material/CallOutlined';

function Header({ setActiveSection, activeSection, sections }) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [open]);
  
  const menuItems = sections
  .map((section, idx) => ({ label: section.name, index: idx }))
  .filter(s => s.index !== 0 && s.index !== sections.length - 1);

    
const [scrolled, setScrolled] = useState(false);

useEffect(() => {
  const handleScroll = () => {
    setScrolled(window.scrollY > 1000);
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);


  
  return (
    <>
      <AppBar position="fixed" elevation={0} sx={{ top: 20, background: 'transparent', boxShadow: 'none', zIndex: 1200 }}>
        <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 4 } }}>
          {/* Menu Button */}
          <IconButton 
            onClick={() => setOpen(!open)} 
            sx={{ 
              color: '#fff', 
              width: { xs: 50, md: 60 }, 
              height: { xs: 50, md: 60 }, 
              borderRadius: '50%', 
              border: '1px solid rgba(255,255,255,0.18)', 
              background: 'rgba(255,255,255,0.05)', 
              backdropFilter: 'blur(14px)',
              transition: 'all 0.3s',
              '&:hover': {
                transform: 'scale(1.05)',
                background: 'rgba(255,255,255,0.15)'
              }
            }}
          >
            {open ? <CloseIcon sx={{ fontSize: { xs: 20, md: 24 } }} /> : <MenuIcon sx={{ fontSize: { xs: 20, md: 24 } }} />}
          </IconButton>
          
          {/* Logo */}
          <Box onClick={() => { setActiveSection(0); setOpen(false); }} sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }}>
            <Box component="img" src="/img/Brands.png" sx={{ width: { xs: 35, md: 60 }, transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' } }} />
            <Typography sx={{ 
              fontSize: { xs: 22, md: 44 }, 
              color: '#fff', 
              fontWeight: 700,
              background: scrolled ? 'none' : '#FFF',
              lineHeight: 1.4,
              WebkitBackgroundClip: 'text',
                // color: scrolled ? '#000' : '#fff',
                // background: 'none',
                // WebkitBackgroundClip: 'unset',
                // WebkitTextFillColor: 'unset',
            }}>
              Unicus
            </Typography>
          </Box>
          
          {/* Get Quote Button */}
          <Box 
            onClick={() => { setActiveSection(6); setOpen(false); }} 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1, 
              color: '#fff', 
              cursor: 'pointer',
              px: { xs: 1.5, md: 2 },
              py: { xs: 1, md: 1.5 },
              borderRadius: 50,
              // border: '1px solid rgba(255,255,255,0.3)',
              transition: 'all 0.3s',
              '&:hover': {
                background: 'rgba(255,255,255,0.1)',
                transform: 'translateX(5px)'
              }
            }}
          >
            <Typography sx={{ fontWeight: 700, fontSize: { xs: 12, md: 30 } }}>GET QUOTE</Typography>
            <NorthEastIcon sx={{ fontSize: { xs: 20, md: 28 } }} />
          </Box>
        </Toolbar>
      </AppBar>
      
      {/* Fullscreen Menu Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div 
            initial={{ clipPath: 'circle(0% at 0% 0%)', opacity: 0 }} 
            animate={{ clipPath: 'circle(160% at 0% 0%)', opacity: 1, transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } }} 
            exit={{ clipPath: 'circle(0% at 0% 0%)', opacity: 0, transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } }} 
            style={{ 
              position: 'fixed', 
              inset: 0, 
              backgroundColor: theme.palette.secondary.main, 
              zIndex: 2000, 
              overflow: 'hidden', 
              color: '#fff' 
            }}
          >
            {/* Menu Header */}
            <motion.div 
              initial={{ y: -80, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              exit={{ y: -80, opacity: 0 }} 
              transition={{ duration: 0.5 }} 
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 30px' }}
            >
              <IconButton 
                onClick={() => setOpen(false)} 
                sx={{ 
                  color: '#fff', 
                  width: 50, 
                  height: 50, 
                  borderRadius: '50%', 
                  border: '1px solid rgba(255,255,255,0.18)', 
                  background: 'rgba(255,255,255,0.05)',
                  '&:hover': { transform: 'scale(1.05)', background: 'rgba(255,255,255,0.15)' }
                }}
              >
                <CloseIcon sx={{ fontSize: 24 }} />
              </IconButton>
              
              <Box onClick={() => { setActiveSection(0); setOpen(false); }} sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }}>
                <Box component="img" src="/img/Brands.png" sx={{ width: { xs: 35, md: 60 } }} />
                <Typography sx={{ fontSize: { xs: 20, md: 40 }, fontWeight: 700 }}>Unicus</Typography>
              </Box>
              
              <Box onClick={() => { setActiveSection(6); setOpen(false); }} sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }}>
                <Typography sx={{ fontSize: { xs: 12, md: 30 }, fontWeight: 700 }}>GET QUOTE</Typography>
                <NorthEastIcon sx={{ fontSize: 24 }} />
              </Box>
            </motion.div>
            
            {/* Menu Content */}
            <Box sx={{ height: 'calc(100vh - 100px)', display: 'flex', flexDirection: { xs: 'column', md: 'row' }, px: { xs: 3, md: 10 }, overflow: 'auto' }}>
              
              {/* Left Side - Contact Info */}
              <motion.div 
                initial={{ x: -100, opacity: 0 }} 
                animate={{ x: 0, opacity: 1, transition: { duration: 0.8, delay: 0.2 } }} 
                exit={{ x: -100, opacity: 0 }} 
                style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', py: { xs: 4, md: 0 } }}
              >
                <Stack spacing={4} width="100%" maxWidth={420}>
                  {[
                    { icon: <MapPin sx={{ fontSize: 20 }} />, title: 'Office', value: '3rd Floor, Habsiguda Main Road, Hyderabad, Telangana' },
                    { icon: <Mail sx={{ fontSize: 20 }} />, title: 'Email', value: 'hello@unicusfacilities.in' },
                    { icon: <Phone sx={{ fontSize: 20 }} />, title: 'Call Us', value: '+91 9550322111' },
                  ].map((item, index) => (
                    <motion.div 
                      key={index} 
                      initial={{ y: 80, opacity: 0 }} 
                      animate={{ y: 0, opacity: 1, transition: { delay: 0.3 + index * 0.2, duration: 0.7 } }}
                    >
                      <Box sx={{ 
                        p: { xs: 3, md: 4 }, 
                        borderRadius: 5, 
                        border: '1px solid rgba(255,255,255,0.1)', 
                        background: 'rgba(255,255,255,0.03)', 
                        backdropFilter: 'blur(12px)',
                        transition: 'all 0.3s',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          borderColor: 'rgba(255,255,255,0.3)',
                          background: 'rgba(255,255,255,0.08)'
                        }
                      }}>
                        <Stack direction="row" spacing={1.5} alignItems="center">
                          {item.icon}
                          <Typography sx={{ fontWeight: 700, fontSize: 18 }}>{item.title}</Typography>
                        </Stack>
                        <Typography sx={{ mt: 2, fontSize: { xs: 14, md: 18 }, opacity: 0.75 }}>{item.value}</Typography>
                      </Box>
                    </motion.div>
                  ))}
                </Stack>
              </motion.div>
              
              {/* Right Side - Navigation Links */}
              <Box sx={{ flex: 1.4, display: 'flex', justifyContent: 'center', alignItems: 'center', py: { xs: 4, md: 0 } }}>
                <Stack spacing={2}>
                  {menuItems.map((item, index) => (
                    <motion.div 
                      key={item.label} 
                      initial={{ opacity: 0, y: 120 }} 
                      animate={{ opacity: 1, y: 0, transition: { delay: index * 0.1, duration: 0.8 } }} 
                      exit={{ opacity: 0, y: 80 }}
                    >
                      <Typography 
                        onClick={() => { setActiveSection(item.index); setOpen(false); }} 
                        sx={{
                          fontSize: { xs: 32, md: 70 },
                          fontWeight: activeSection === item.index ? 900 : 500,
                          lineHeight: 1,
                          cursor: 'pointer',
                          position: 'relative',
                          width: 'fit-content',
                          transition: 'all 0.5s cubic-bezier(0.2, 0.9, 0.4, 1.1)',
                          color: activeSection === item.index ? '#fff' : 'rgba(255,255,255,0.6)',
                          '&::before': {
                            content: `"0${index + 1}"`,
                            position: 'absolute',
                            left: { xs: -50, md: -70 },
                            top: '50%',
                            transform: 'translateY(-50%)',
                            fontSize: { xs: 14, md: 18 },
                            opacity: 0,
                            transition: '0.4s'
                          },
                          '&::after': {
                            content: '""',
                            position: 'absolute',
                            left: 0,
                            bottom: -8,
                            width: activeSection === item.index ? '100%' : 0,
                            height: { xs: 3, md: 5 },
                            borderRadius: 10,
                            backgroundColor: '#fff',
                            transition: '0.5s'
                          },
                          '&:hover': {
                            transform: { xs: 'translateX(15px)', md: 'translateX(30px)' },
                            letterSpacing: { xs: 2, md: 4 },
                            opacity: 0.75,
                            color: '#fff'
                          },
                          '&:hover::after': {
                            width: '100%'
                          },
                          '&:hover::before': {
                            opacity: 1,
                            left: { xs: -35, md: -50 }
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
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Header;