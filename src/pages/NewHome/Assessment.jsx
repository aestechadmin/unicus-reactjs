'use client';

import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';

export default function ProcessFlow() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const steps = [
    {
      number: '01',
      title: 'Site Assessment',
      desc: `A walkthrough to understand
scope, footfall and risk`,
    },
    {
      number: '02',
      title: 'Customized Plan',
      desc: `Manpower, shifts and SOPs tailored
to your facility`,
    },
    {
      number: '03',
      title: 'Team Onboarded',
      desc: `Trained staff deployed with an onsite
work manager`,
    },
  ];

  const bullets = [
    'Reliable & Compliant - Background-verified staff with statutory compliance',
    'Flexible Scheduling - Day, night and 24x7 shift coverage as required',
    'Proactive Reporting - Daily checklists and monthly performance reviews',
    'Long-Term Partnership - Built for multi-year operations, not one-off jobs',
  ];

  return (
    <Box>

      {/* ================= T2 ================= */}
      {/* <Box
        sx={{
          minHeight: '100vh',
          backgroundColor: '#ECECEC',
          display: 'flex',
          flexDirection: 'column',
        }}
      >

        {!isMobile && (
          <Box
            sx={{
              height: '30vh',
            }}
          />
        )}

        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: isMobile ? 'auto' : '70vh',
          }}
        >
          <Box
            component="img"
            src="/img/array5.png"
            sx={{
              width: '100%',
              height: isMobile ? '100%' : '70vh',
              minHeight: isMobile ? 700 : 'unset',
              objectFit: 'cover',
            }}
          />

          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(to top, rgba(0,0,0,0.75), rgba(0,0,0,0.25))',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              p: { xs: 3, md: 6 },
              flexDirection: { xs: 'column', md: 'row' },
              gap: { xs: 5, md: 8 },
            }}
          >

            <Box
              sx={{
                flex: 1.2,
                width: '100%',
              }}
            >

              <Typography
                sx={{
                  color: '#fff',
                  fontSize: { xs: 34, md: 70 },
                  fontWeight: 600,
                  mb: { xs: 4, md: 8 },
                  lineHeight: 1, textAlign: 'left'
                }}
              >
                How We Work
              </Typography>

              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: {
                    xs: '1fr',
                    sm: '1fr',
                    md: 'repeat(3, 1fr)',
                  },
                  gap: { xs: 4, md: 4 },
                }}
              >
                {steps.map((step, index) => (
                  <Box key={index}>

                    <Typography
                      sx={{
                        color: '#fff',
                        fontSize: { xs: 34, md: 50 },
                        fontWeight: 600,
                        mb: 2,
                      }}
                    >
                      {step.number}
                    </Typography>

                    <Typography
                      sx={{
                        color: '#fff',
                        fontSize: { xs: 18, md: 24 },
                        fontWeight: 600,
                        mb: 2,
                        lineHeight: 1.3,
                      }}
                    >
                      {step.title}
                    </Typography>


                  </Box>
                ))}
              </Box>

            </Box>

            <Box
              sx={{
                flex: 0.8,
                width: '100%',
                maxWidth: 500,
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
              }}
            >
              {bullets.map((item, index) => (
                <Typography
                  key={index}
                  sx={{
                    color: '#fff',
                    fontSize: { xs: 15, md: 18 },
                    lineHeight: 1.8,
                    borderBottom: '1px solid rgba(255,255,255,0.15)',
                    pb: 2, textAlign: 'left'
                  }}
                >
                  • {item}
                </Typography>
              ))}
            </Box>

          </Box>
        </Box>
      </Box> */}

      {/* ================= T3 ================= */}
      <Box
        sx={{
          minHeight: '100vh',
          position: 'relative',
        }}
      >

        {/* IMAGE */}
        <Box
          component="img"
          src="/img/array4.png"
          sx={{
            width: '100%',
            height: '100vh',
            objectFit: 'cover',
          }}
        />

        {/* OVERLAY */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.2))',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            p: { xs: 3, md: 6 },
            flexDirection: { xs: 'column', md: 'row' },
            gap: { xs: 5, md: 8 },
          }}
        >

          {/* LEFT SIDE */}
          <Box
            sx={{
              flex: 1.2,
              width: '100%',
            }}
          >

            <Typography
              sx={{
                color: '#fff',
                fontSize: { xs: 34, md: 70 },
                fontWeight: 600,
                mb: { xs: 4, md: 8 },
                lineHeight: 1, textAlign: 'left'
              }}
            >
              How We Work
            </Typography>

            {/* STEPS */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: '1fr',
                  md: 'repeat(3, 1fr)',
                },
                gap: { xs: 4, md: 4 },
              }}
            >
              {steps.map((step, index) => (
                <Box key={index}>

                  <Typography
                    sx={{
                      color: '#fff',
                      fontSize: { xs: 34, md: 50 },
                      fontWeight: 600,
                      mb: 4,
                    }}
                  >
                    {step.number}
                  </Typography>

                  <Typography
                    sx={{
                      color: '#fff',
                      fontSize: { xs: 18, md: 20 },
                      fontWeight: 600,
                      mb: 2,
                      lineHeight: 1.3,
                    }}
                  >
                    {step.title}
                  </Typography>

                  <Typography
                    sx={{
                      color: '#ddd',
                      fontSize: { xs: 14, md: 14 },
                      lineHeight: 1.8,
                      whiteSpace: 'pre-line',
                      maxWidth: 260,
                    }}
                  >
                    {step.desc}
                  </Typography>

                </Box>
              ))}
            </Box>

          </Box>

          {/* RIGHT BULLETS */}
          <Box
            sx={{
              flex: 0.8,
              width: '100%',
              maxWidth: 500,
              display: 'flex',
              flexDirection: 'column',
              gap: 3,
            }}
          >
            {bullets.map((item, index) => (
              <Typography
                key={index}
                sx={{
                  color: '#fff',
                  fontSize: { xs: 15, md: 18 },
                  lineHeight: 1.8,
                  borderBottom: '1px solid rgba(255,255,255,0.15)',
                  pb: 2, textAlign: 'left'
                }}
              >
                • {item}
              </Typography>
            ))}
          </Box>

        </Box>
      </Box>

    </Box>
  );
}