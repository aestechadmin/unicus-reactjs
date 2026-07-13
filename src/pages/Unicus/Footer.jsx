import React, { useEffect, useRef } from 'react';
import { Box, Typography, Stack, IconButton, Link as MuiLink } from '@mui/material';
import { motion } from 'framer-motion';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import XIcon from '@mui/icons-material/X';

const progressiveRevealVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: (custom) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { delay: custom * 0.06, duration: 0.5, ease: "easeOut" }
  })
};

const Footer = () => {
  const sectionRef = useRef(null);
  const [hasRevealed, setHasRevealed] = React.useState(false);

  // Navigation function
  const handleNavClick = (sectionId) => (e) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const quickLinks = [
    { label: 'Home', href: 'hero' },
    { label: 'About', href: 'about-us' },
    { label: 'Services', href: 'sectors-section' },
    { label: 'Clients', href: 'growth-section' },
    { label: 'Contact', href: 'quote-section' },
  ];
  
  const companyLinks = [
    { label: 'Vision', href: 'about-us' },
    { label: 'Why Unicus', href: 'experience' },
    { label: 'Process', href: 'process-section' },
    { label: 'FAQ', href: 'faq-section' },
    { label: 'Get Quote', href: 'quote-section' },
  ];

  const socials = [
    { icon: <InstagramIcon />, link: 'https://instagram.com' },
    { icon: <YouTubeIcon />, link: 'https://youtube.com' },
    { icon: <LinkedInIcon />, link: 'https://linkedin.com' },
    { icon: <XIcon />, link: 'https://x.com' }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <Box ref={sectionRef} sx={{ width: '100%' }}>
      <Box sx={{ 
        backgroundColor: '#0A0A1A', 
        color: '#fff', 
        px: { xs: 3, md: 8 }, 
        py: { xs: 4, md: 8 }, 
        minHeight: { xs: 'auto', md: '60vh' },
        display: 'flex', 
        alignItems: 'center' 
      }}>
        <Box sx={{ width: '100%', maxWidth: 1400, mx: 'auto' }}>
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1.2fr 1fr 1fr' }, 
            gap: { xs: 4, sm: 3, md: 10 } 
          }}>
            
            {/* Logo and Description */}
            <Box>
              <motion.div custom={0} initial="hidden" animate={hasRevealed ? "visible" : "hidden"} variants={progressiveRevealVariants}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Box 
                    component="img" 
                    src="/img/Brands.png" 
                    sx={{ 
                      width: { xs: 40, md: 65 }, 
                      height: { xs: 40, md: 65 }, 
                      objectFit: 'contain' 
                    }} 
                  />
                  <Typography sx={{ 
                    fontSize: { xs: 28, md: 60 }, 
                    fontWeight: 700, 
                    lineHeight: 1, 
                    background: 'linear-gradient(135deg, #fff 0%, #6C63FF 100%)', 
                    WebkitBackgroundClip: 'text', 
                    WebkitTextFillColor: 'transparent' 
                  }}>
                    Unicus
                  </Typography>
                </Box>
              </motion.div>
              
              <motion.div custom={1} initial="hidden" animate={hasRevealed ? "visible" : "hidden"} variants={progressiveRevealVariants}>
                <Typography sx={{ 
                  fontSize: { xs: 13, md: 15 }, 
                  opacity: 0.7, 
                  lineHeight: 1.8, 
                  maxWidth: 350,
                  color: 'rgba(255,255,255,0.8)'
                }}>
                  Reliable facility management and manpower solutions for healthcare, commercial, residential and corporate sectors.
                </Typography>
              </motion.div>
              
              <motion.div custom={2} initial="hidden" animate={hasRevealed ? "visible" : "hidden"} variants={progressiveRevealVariants}>
                <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
                  {socials.map((s, i) => (
                    <motion.div key={i} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                      <IconButton 
                        component="a"
                        href={s.link}
                        target="_blank"
                        sx={{ 
                          border: '1px solid rgba(255,255,255,0.2)', 
                          color: '#fff', 
                          width: { xs: 36, md: 46 }, 
                          height: { xs: 36, md: 46 },
                          transition: 'all 0.3s',
                          '&:hover': { 
                            backgroundColor: '#6C63FF', 
                            borderColor: '#6C63FF',
                            transform: 'translateY(-3px)',
                            boxShadow: '0 8px 25px rgba(108,99,255,0.3)'
                          } 
                        }}
                      >
                        {s.icon}
                      </IconButton>
                    </motion.div>
                  ))}
                </Stack>
              </motion.div>
            </Box>
            
            {/* Quick Links */}
            <Box>
              <motion.div custom={3} initial="hidden" animate={hasRevealed ? "visible" : "hidden"} variants={progressiveRevealVariants}>
                <Typography sx={{ 
                  fontWeight: 700, 
                  mb: 2, 
                  fontSize: { xs: 16, md: 18 }, 
                  position: 'relative', 
                  display: 'inline-block',
                  color: '#fff',
                  '&::after': { 
                    content: '""', 
                    position: 'absolute', 
                    bottom: -5, 
                    left: 0, 
                    width: 30, 
                    height: 3, 
                    backgroundColor: '#6C63FF', 
                    borderRadius: 2 
                  } 
                }}>
                  Quick Links
                </Typography>
              </motion.div>
              <Stack spacing={1.5} sx={{ mt: 2 }}>
                {quickLinks.map((item, i) => (
                  <motion.div key={i} custom={i + 4} initial="hidden" animate={hasRevealed ? "visible" : "hidden"} variants={progressiveRevealVariants}>
                    <MuiLink 
                      component="button"
                      onClick={handleNavClick(item.href)}
                      underline="none" 
                      sx={{ 
                        color: 'rgba(255,255,255,0.7)', 
                        fontSize: { xs: 13, md: 14 }, 
                        cursor: 'pointer', 
                        width: 'fit-content', 
                        display: 'inline-block',
                        transition: 'all 0.3s',
                        background: 'none',
                        border: 'none',
                        padding: 0,
                        fontFamily: 'inherit',
                        '&:hover': { 
                          opacity: 1, 
                          transform: 'translateX(8px)', 
                          color: '#6C63FF' 
                        } 
                      }}
                    >
                      {item.label}
                    </MuiLink>
                  </motion.div>
                ))}
              </Stack>
            </Box>
            
            {/* Company Links */}
            <Box>
              <motion.div custom={10} initial="hidden" animate={hasRevealed ? "visible" : "hidden"} variants={progressiveRevealVariants}>
                <Typography sx={{ 
                  fontWeight: 700, 
                  mb: 2, 
                  fontSize: { xs: 16, md: 18 }, 
                  position: 'relative', 
                  display: 'inline-block',
                  color: '#fff',
                  '&::after': { 
                    content: '""', 
                    position: 'absolute', 
                    bottom: -5, 
                    left: 0, 
                    width: 30, 
                    height: 3, 
                    backgroundColor: '#6C63FF', 
                    borderRadius: 2 
                  } 
                }}>
                  Company
                </Typography>
              </motion.div>
              <Stack spacing={1.5} sx={{ mt: 2 }}>
                {companyLinks.map((item, i) => (
                  <motion.div key={i} custom={i + 11} initial="hidden" animate={hasRevealed ? "visible" : "hidden"} variants={progressiveRevealVariants}>
                    <MuiLink 
                      component="button"
                      onClick={handleNavClick(item.href)}
                      underline="none" 
                      sx={{ 
                        color: 'rgba(255,255,255,0.7)', 
                        fontSize: { xs: 13, md: 14 }, 
                        cursor: 'pointer', 
                        width: 'fit-content',
                        display: 'inline-block',
                        transition: 'all 0.3s',
                        background: 'none',
                        border: 'none',
                        padding: 0,
                        fontFamily: 'inherit',
                        '&:hover': { 
                          opacity: 1, 
                          transform: 'translateX(8px)', 
                          color: '#6C63FF' 
                        } 
                      }}
                    >
                      {item.label}
                    </MuiLink>
                  </motion.div>
                ))}
              </Stack>
            </Box>
          </Box>
          
          {/* Copyright */}
          <motion.div custom={16} initial="hidden" animate={hasRevealed ? "visible" : "hidden"} variants={progressiveRevealVariants}>
            <Box sx={{ 
              textAlign: 'center', 
              mt: { xs: 4, md: 6 }, 
              pt: { xs: 3, md: 4 }, 
              borderTop: '1px solid rgba(255,255,255,0.08)' 
            }}>
              <Typography sx={{ 
                fontSize: { xs: 11, md: 13 }, 
                opacity: 0.5,
                color: 'rgba(255,255,255,0.6)'
              }}>
                © {new Date().getFullYear()} Unicus Facilities. All rights reserved.
              </Typography>
            </Box>
          </motion.div>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;