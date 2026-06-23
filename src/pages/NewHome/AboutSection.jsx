'use client';

import { Box, Typography, useTheme } from '@mui/material';
import { useRef, useState, useEffect } from 'react';

export default function AboutSection() {
  const theme = useTheme();

  const sectionRefs = useRef([]);
  const [active, setActive] = useState(0);

  const data = [
    { type: 't1', title: 'Why Unicus Facilities' },

    {
      type: 't2',
      image: '/img/array2.png',
      description:
        'Deep specialization in hospital and medical college sanitation and security 4 a rare differentiator in the manpower sector',
      nextImage: '/img/array3.png',
    },

    {
      type: 't3',
      image: '/img/Img1.png',
      description:
        'Medical-grade cleaning equipment and technologies meeting strict healthcare specifications',
      prevImage: '/img/array2.png',
      nextImage: '/img/Img8.png',
    },

    {
      type: 't3',
      image: '/img/Img8.png',
      description:
        'Medical-grade cleaning equipment and technologies meeting strict healthcare specifications',
      prevImage: '/img/Img1.png',
      nextImage: '/img/Img3.png',
    },

    {
      type: 't4',
      image: '/img/Img3.png',
      description:
        'One agency for all facility needs 4 security, sanitation, waste management, food services, and landscaping.',
      prevImage: '/img/Img8.png',
    },
  ];

  const scrollToIndex = (index) => {
    if (index < 0 || index >= data.length) return;

    sectionRefs.current[index]?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(Number(entry.target.dataset.index));
          }
        });
      },
      { threshold: 0.6 }
    );

    sectionRefs.current.forEach((el) => el && observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const sectionStyle = {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    px: { xs: 2, md: 6 },
    py: { xs: 6, md: 10 },
  };

  const col = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  };

 const col2 = {
    flex: 0.7,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  };

  const col3 = {
    flex: 0.3,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  };

  const imgMain = {
    width: '100%',
    borderRadius: 3,
  };

  const imgSmall = {
    width: { xs: 55, md: 90 },
    borderRadius: 2,
    cursor: 'pointer',
    transition: '0.3s',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  };

  const contactStyle = {
    fontSize: { xs: 15, md: 18 },
    fontWeight: 800,
    textDecoration: 'underline',
    cursor: 'pointer',
    mt: 2,
    transition: '0.3s',
    width: 'fit-content',
    '&:hover': {
      color: '#1976d2',
      transform: 'translateX(5px)',
    },
  };

  return (
    <Box sx={{ background: theme.palette?.tertiary?.main || '#000' }}>
      {data.map((item, index) => (
        <Box
          key={index}
          ref={(el) => (sectionRefs.current[index] = el)}
          data-index={index}
          sx={{
            ...sectionStyle,
            opacity: active === index ? 1 : 0.5,
            transition: '0.4s',
          }}
        >

          {/* ================= T1 ================= */}
          {item.type === 't1' && (
            <Typography
              sx={{
                fontSize: { xs: 36, md: 80 },
                fontWeight: 900,
                textAlign: 'center',
              }}
            >
              {item.title}
            </Typography>
          )}

          {/* ================= T2 ================= */}
          {item.type === 't2' && (
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                gap: 4,
                flexDirection: { xs: 'column', md: 'row' },
              }}
            >

              {/* WEB LEFT EMPTY */}
              <Box sx={{ ...col3, display: { xs: 'none', md: 'flex' } }} />

              {/* IMAGE */}
              <Box sx={col}>
                <Box component="img" src={item.image} sx={imgMain} />
              </Box>

              {/* CONTENT */}
              <Box sx={col2}>
                <Box
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    textAlign: { xs: 'center', md: 'left' },
                    alignItems: { xs: 'center', md: 'flex-start' },
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { xs: 16, md: 20 },
                      lineHeight: 1.8, textAlign: 'left'
                    }}
                  >
                    {item.description}
                  </Typography>

                  <Typography
                    onClick={() => scrollToIndex(index + 1)}
                    sx={contactStyle}
                  >
                    Contact Us
                  </Typography>

                  <Box sx={{ mt: 5 }}>
                    {item.nextImage && (
                      <Box
                        component="img"
                        src={item.nextImage}
                        onClick={() => scrollToIndex(index + 1)}
                        sx={imgSmall}
                      />
                    )}
                  </Box>
                </Box>
              </Box>
            </Box>
          )}

          {/* ================= T3 ================= */}
          {item.type === 't3' && (
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                gap: 4,
                flexDirection: { xs: 'column', md: 'row' },
              }}
            >

              {/* MOBILE IMAGE FIRST */}
              <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                <Box component="img" src={item.image} sx={imgMain} />
              </Box>

              {/* WEB LEFT */}
              <Box
                sx={{
                  flex: 0.5, flexDirection: 'column',
                  display: { xs: 'none', md: 'flex' },
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'top' }}>
                  {item.prevImage && (
                    <Box
                      component="img"
                      src={item.prevImage}
                      onClick={() => scrollToIndex(index - 1)}
                      sx={imgSmall}
                    />
                  )}
                </Box>
              </Box>

              {/* WEB CENTER */}
              <Box sx={{ ...col, display: { xs: 'none', md: 'flex' } }}>
                <Box component="img" src={item.image} sx={imgMain} />
              </Box>

              {/* CONTENT */}
              <Box sx={col2}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    height: '100%',
                    textAlign: { xs: 'center', md: 'left' },
                    alignItems: { xs: 'center', md: 'flex-start' },
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { xs: 16, md: 20 },
                      lineHeight: 1.8, textAlign: 'left'
                    }}
                  >
                    {item.description}
                  </Typography>

                  <Typography
                    onClick={() => scrollToIndex(index + 1)}
                    sx={contactStyle}
                  >
                    Contact Us
                  </Typography>

                  <Box
                    sx={{
                      mt: 8,
                      width: '100%',
                      display: 'flex',
                      justifyContent: {
                        xs: 'center',
                        md: 'flex-start',
                      },
                    }}
                  >
                    {item.nextImage && (
                      <Box
                        component="img"
                        src={item.nextImage}
                        onClick={() => scrollToIndex(index + 1)}
                        sx={imgSmall}
                      />
                    )}
                  </Box>
                </Box>
              </Box>
            </Box>
          )}

          {/* ================= T4 ================= */}
          {item.type === 't4' && (
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                gap: 4,
                flexDirection: { xs: 'column', md: 'row' },
              }}
            >

              {/* MOBILE IMAGE */}
              <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                <Box component="img" src={item.image} sx={imgMain} />
              </Box>

              {/* WEB LEFT */}
              <Box
                sx={{
                  flex: 0.5, flexDirection: 'column',
                  alignItems: 'center',
                  display: { xs: 'none', md: 'flex' },
                }}
              >
                {item.prevImage && (
                  <Box
                    component="img"
                    src={item.prevImage}
                    onClick={() => scrollToIndex(index - 1)}
                    sx={imgSmall}
                  />
                )}
              </Box>

              {/* WEB CENTER */}
              <Box sx={{ ...col, display: { xs: 'none', md: 'flex' } }}>
                <Box component="img" src={item.image} sx={imgMain} />
              </Box>

              {/* CONTENT */}
              <Box sx={col2}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    textAlign: { xs: 'center', md: 'left' },
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { xs: 16, md: 20 },
                      lineHeight: 1.8, textAlign: 'left'
                    }}
                  >
                    {item.description}
                  </Typography>
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
}