// AboutUs.jsx
import React, { useEffect, useRef } from 'react';
import { Box, Typography, Stack, Grid, Paper, alpha, useTheme } from '@mui/material';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Vision Section Data
const visionData = {
  title: "Our Vision",
  subtitle: "To be the most trusted partner in sanitation and security, delivering healthier, safer environments, especially in critical healthcare and educational institutions.",
  bulletPoints: [
    "Innovative, tailored solutions for hospitals, medical colleges, and institutions",
    "Rigorous staff training aligned with healthcare compliance standards",
    "Client relationships built on trust, transparency, and excellence",
    "Sustainable practices that advance public health and wellbeing"
  ]
};

// Core Values Section Data
const coreValuesData = {
  title: "Company Overview & Core Values",
  stats: [
    { value: "2022", label: "Founded" },
    { value: "4", label: "Years of Experience" },
    { value: "400+", label: "In Private Sector" },
    { value: "4Cr+", label: "Annual Turnover" },
    { value: "2", label: "States Covered Andhra Pradesh & Telangana" }
  ],
  values: [
    {
      title: "Excellence",
      description: "Highest standards in every service rendered."
    },
    {
      title: "Healthcare Focus",
      description: "Specialized knowledge of hospital and medical college requirements."
    },
    {
      title: "Client-Centricity",
      description: "Onsite Work Managers for seamless service delivery"
    },
    {
      title: "Integrity",
      description: "Accountability and transparency across all operations."
    }
  ]
};

const AboutUs = () => {
  const theme = useTheme();
  const sectionRef = useRef(null);
  const visionRef = useRef(null);
  const visionTextRef = useRef(null);
  const visionBulletsRef = useRef(null);
  const coreValuesRef = useRef(null);
  const statsRef = useRef(null);
  const valuesRef = useRef(null);
  const visionTitleRef = useRef(null);

  // Animation setup
  useEffect(() => {
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        // Vision Section Animations
        if (visionRef.current) {
          gsap.fromTo(
            visionRef.current,
            { opacity: 0, y: 60 },
            {
              opacity: 1,
              y: 0,
              duration: 1.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: visionRef.current,
                start: "top 75%",
                end: "top 40%",
                toggleActions: "play none none reverse",
              }
            }
          );
        }

        // Vision Title - Split text animation
        const visionTitle = visionTitleRef.current;
        if (visionTitle) {
          const text = visionTitle.textContent || '';
          const chars = text.split('');
          visionTitle.innerHTML = '';
          chars.forEach((char, i) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.display = 'inline-block';
            span.style.opacity = '0';
            span.style.transform = 'translateY(40px) rotateX(20deg)';
            span.style.transition = `all 0.8s cubic-bezier(0.2, 0.9, 0.4, 1.1) ${i * 0.05}s`;
            visionTitle.appendChild(span);
          });

          gsap.to(visionTitle.querySelectorAll('span'), {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            stagger: 0.05,
            ease: "power3.out",
            scrollTrigger: {
              trigger: visionTitle,
              start: "top 80%",
              toggleActions: "play none none reverse",
            }
          });
        }

        // Vision Subtitle
        if (visionTextRef.current) {
          gsap.fromTo(
            visionTextRef.current,
            { opacity: 1, y: 0 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              delay: 0.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: visionTextRef.current,
                start: "top 80%",
                toggleActions: "play none none reverse",
              }
            }
          );
        }

        // Vision Bullets
        const bulletElements = visionBulletsRef.current?.querySelectorAll('.vision-bullet');
        if (bulletElements && bulletElements.length > 0) {
          gsap.fromTo(
            bulletElements,
            { opacity: 0, x: -30 },
            {
              opacity: 1,
              x: 0,
              duration: 0.8,
              stagger: 0.15,
              delay: 0.3,
              ease: "power3.out",
              scrollTrigger: {
                trigger: visionBulletsRef.current,
                start: "top 80%",
                toggleActions: "play none none reverse",
              }
            }
          );
        }

        // Core Values Section
        if (coreValuesRef.current) {
          gsap.fromTo(
            coreValuesRef.current,
            { opacity: 1, y: 0 },
            {
              opacity: 1,
              y: 0,
              duration: 1.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: coreValuesRef.current,
                start: "top 75%",
                toggleActions: "play none none reverse",
              }
            }
          );
        }

        // Stats Animation (Counter)
        const statNumbers = statsRef.current?.querySelectorAll('.stat-number');
        statNumbers?.forEach((stat) => {
          const targetText = stat.getAttribute('data-target') || '0';
          const target = parseInt(targetText.replace(/[^0-9]/g, '')) || 0;
          
          if (targetText.includes('Cr') || targetText.includes('+')) {
            return;
          }
          
          gsap.fromTo(stat,
            { innerText: 0 },
            {
              innerText: target,
              duration: 2,
              ease: "power2.out",
              scrollTrigger: {
                trigger: stat,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
              snap: { innerText: 1 },
            }
          );
        });

        // Values Cards Animation
        const valueCards = valuesRef.current?.querySelectorAll('.value-card');
        if (valueCards && valueCards.length > 0) {
          gsap.fromTo(
            valueCards,
            { opacity: 0, y: 40, scale: 0.95 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              stagger: 0.15,
              delay: 0.3,
              ease: "power3.out",
              scrollTrigger: {
                trigger: valuesRef.current,
                start: "top 80%",
                toggleActions: "play none none reverse",
              }
            }
          );
        }

        ScrollTrigger.refresh();

      }, sectionRef);

      return () => ctx.revert();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Box ref={sectionRef} sx={{ position: 'relative', overflow: 'hidden' }}>

      {/* ============ SECTION 1: VISION ============ */}
      <Box
        ref={visionRef}
        sx={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          backgroundImage: 'url(/img/visonbg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          backgroundColor: '#1a1a1a', // Fallback color while image loads
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 0,
          }
        }}
      >
        <Box
        sx={{
            position: 'relative',
            zIndex: 1,
            width: '100%',
            px: { xs: 4, md: 8, lg: 12 },
            py: { xs: 6, md: 10 },
        }}
        >
        <Grid
            container
            sx={{
            minHeight: "80vh",
            }}
        >
            {/* Left Column */}
            <Grid item xs={12} md={7}>
            <Stack
                sx={{
                height: "100%",
                justifyContent: "space-between",
                }}
            >
                {/* Top Left Title */}
                <Typography
                ref={visionTitleRef}
                className="vision-title"
                variant="h2"
                sx={{
                    color: "white",
                    fontWeight: 700,
                    fontSize: { xs: "2.5rem", md: "4rem", lg: "5rem" },
                    lineHeight: 1.1,
                    textShadow: "0 2px 20px rgba(0,0,0,0.3)",
                    textAlign: 'left'
                }}
                >
                Our Vision
                </Typography>

                {/* Bottom Left Subtitle */}
                <Typography
                ref={visionTextRef}
                variant="h5"
                sx={{
                    color: "white",
                    fontSize: { xs: "1.1rem", md: "1.5rem", lg: "1.8rem" },
                    fontWeight: 400,
                    lineHeight: 1.6,
                    maxWidth: "600px",
                    textShadow: "0 1px 10px rgba(0,0,0,0.2)",
                    textAlign: 'left',
                    mr: 2,
                    mb: { md: 4 },
                }}
                >
                {visionData.subtitle}
                </Typography>
            </Stack>
            </Grid>

            {/* Bottom Right Bullet Points */}
            <Grid item xs={12} md={5}>
            <Stack
                ref={visionBulletsRef}
                spacing={2.5}
                sx={{
                height: "100%",
                justifyContent: "flex-end",
                maxWidth: "700px",
                ml: { md: "auto" },
                }}
            >
                {visionData.bulletPoints.map((point, index) => (
                <Box
                    key={index}
                    className="vision-bullet"
                    sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 2,
                    opacity: 0,
                    transform: "translateX(-30px)",
                    }}
                >
                    <Box
                    sx={{
                        minWidth: 12,
                        height: 12,
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, #4CAF50, #2196F3)",
                        mt: 1.2,
                        boxShadow: "0 0 15px rgba(76,175,80,0.4)",
                        flexShrink: 0,
                    }}
                    />

                    <Typography
                    sx={{
                        color: "white",
                        fontSize: { xs: "0.95rem", md: "1.8rem" },
                        lineHeight: 1.5,
                        textAlign: 'left',
                        textShadow: "0 1px 8px rgba(0,0,0,0.15)",
                    }}
                    >
                    {point}
                    </Typography>
                </Box>
                ))}
            </Stack>
            </Grid>
        </Grid>
        </Box>
      </Box>

      {/* ============ SECTION 2: CORE VALUES ============ */}
        <Box
        ref={coreValuesRef}
        sx={{
            position: "relative",
            minHeight: "100vh",
            display: "flex",
            alignItems: "flex-start", // <-- change from center
            backgroundImage: "url(/img/cvalue.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
            backgroundColor: "#1a1a1a",
            "&::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.6)",
            zIndex: 0,
            },
        }}
        >
        <Box
            sx={{
            position: "relative",
            zIndex: 1,
            width: "100%",
            px: { xs: 4, md: 8, lg: 12 },
            pt: { xs: 8, md: 10 },   // Top spacing
            pb: { xs: 6, md: 10 },
            }}
        >
            {/* Title - Top Left */}
            <Typography
            variant="h3"
            sx={{
                color: "white",
                fontWeight: 700,
                fontSize: { xs: "2rem", md: "3rem", lg: "5rem" },
                textAlign: "left",
                mb: 18,
                mt: { xs: 0, md: 4 }, // Adjust top margin for spacing
                textShadow: "0 2px 20px rgba(0,0,0,0.3)",
            }}
            >
            {coreValuesData.title}
            </Typography>

            {/* Stats */}
            <Stack
            ref={statsRef}
            direction={{xs: "column", md: "row"}}
            flexWrap="wrap"
            justifyContent="center"
            spacing={6}
            sx={{ mb: 15 }}
            >
            {coreValuesData.stats.map((stat, index) => (
                <Box
                key={index}
                sx={{
                    textAlign: "center",
                    minWidth: 200,
                }}
                >
                <Typography
                    className="stat-number"
                    data-target={stat.value}
                    sx={{
                    color: "#4CAF50",
                    fontSize: { xs: "3rem", md: "4rem" },
                    fontWeight: 700,
                    fontFamily: "monospace",
                    }}
                >
                    {stat.value}
                </Typography>

                <Typography
                    sx={{
                    color: "rgba(255,255,255,0.8)",
                    fontSize: { xs: "1.3rem", md: "1.5rem" },
                    mt: 1,
                    }}
                >
                    {stat.label}
                </Typography>
                </Box>
            ))}
            </Stack>

            {/* Values */}
          <Box
            ref={valuesRef}
            sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 3,
                maxWidth: "1200px",
                mx: "auto",
            }}
            >
            {coreValuesData.values.map((value, index) => (
                <Box
                key={index}
                sx={{
                    width: {
                    xs: "100%",
                    md: "calc(50% - 12px)",
                    },
                }}
                >
                <Paper
                    className="value-card"
                    sx={{
                    p: 3,
                    borderRadius: "16px",
                    background: alpha(theme.palette.common.white, 0.08),
                    backdropFilter: "blur(10px)",
                    border: `1px solid ${alpha(theme.palette.common.white, 0.12)}`,
                    opacity: 0,
                    transform: "translateY(40px)",
                    }}
                >
                    <Box
                    sx={{
                        display: "flex",
                        gap: 2,
                        alignItems: "flex-start",
                        flexDirection: { xs: "column", sm: "row" },
                    }}
                    >
                    <Box
                        sx={{
                        width: { xs: "100%", sm: "30%" },
                        }}
                    >
                        <Typography
                        sx={{
                            color: "#4CAF50",
                            fontSize: "1.8rem",
                            fontWeight: 700,
                        }}
                        >
                        {value.title}
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                        width: { xs: "100%", sm: "70%" },
                        }}
                    >
                        <Typography
                        sx={{
                            color: "rgba(255,255,255,0.85)",
                            fontSize: "1.5rem",
                            lineHeight: 1.6, textAlign: 'left'
                        }}
                        >
                        {value.description}
                        </Typography>
                    </Box>
                    </Box>
                </Paper>
                </Box>
            ))}
            </Box>
        </Box>
        </Box>
    </Box>
  );
};

export default AboutUs;