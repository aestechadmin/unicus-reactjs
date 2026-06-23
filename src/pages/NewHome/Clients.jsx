'use client';

import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';

export default function Clients() {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const cardData = [
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

  return (
    <Box
      sx={{
        minHeight: '100vh',
        px: { xs: 2, md: 6 },
        py: { xs: 6, md: 10 },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ECECEC',
      }}
    >

      {/* ================= MOBILE ================= */}
      {isMobile ? (
        <Box sx={{ width: '100%' }}>

          {/* TOP IMAGE */}
          {/* <Box
            component="img"
            src="/img/Img5.png"
            sx={{
              width: '100%',
              height: 260,
              objectFit: 'cover',
              borderRadius: 3,
              mb: 4,
            }}
          /> */}

          {/* TITLE */}
          <Typography
            sx={{
              fontSize: 30,
              fontWeight: 900,
              mb: 4,
              textAlign: 'center',
            }}
          >
            Commitment to Clients
          </Typography>

          {/* CONTENT */}
          <Box
            sx={{
              display: 'grid',
              gap: 3,
            }}
          >
            {cardData.map((item, index) => (
              <Box key={index}>
                <Typography
                  sx={{
                    fontSize: 20,
                    fontWeight: 800,
                    mb: 1,
                    textAlign: 'center',
                  }}
                >
                  {item.title}
                </Typography>

                <Typography
                  sx={{
                    fontSize: 15,
                    lineHeight: 1.7,
                    color: '#666',
                    textAlign: 'center',
                  }}
                >
                  {item.desc}
                </Typography>
              </Box>
            ))}
          </Box>

        </Box>
      ) : (
        /* ================= DESKTOP ================= */
        <Box sx={{ width: '100%', maxWidth: 1400 }}>

          {/* ================= ROW 1 ================= */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr 2fr 0fr',
              gap: 3,
              mb: 6,
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >

            {/* LEFT EMPTY */}
            {/* <Box /> */}

            {/* CENTER IMAGE */}
            {/* <Box>
              <Box
                component="img"
                src="/img/Img5.png"
                sx={{
                  width: '100%',
                  height: 220,
                  objectFit: 'cover',
                  objectPosition: 'bottom',
                  borderRadius: 3,
                }}
              />
            </Box> */}


          </Box>

          {/* ================= ROW 2 ================= */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr 2fr 1fr',
              gap: 4,
            }}
          >

            {/* LEFT EMPTY */}
            <Box />

            {/* CENTER + RIGHT CONTENT */}
            <Box sx={{ gridColumn: '2 / span 2' }}>

              {/* TITLE */}
              <Typography
                sx={{
                  fontSize: 55,
                  fontWeight: 600,
                  mb: 15,
                  lineHeight: 1.1, textAlign: 'left'
                }}
              >
                Commitment to Clients
              </Typography>

              {/* CONTENT GRID */}
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 5,
                }}
              >
                {cardData.map((item, index) => (
                  <Box key={index}>
                    <Typography
                      sx={{
                        fontSize: 24,
                        fontWeight: 800,
                        mb: 1.5, textAlign: 'left'
                      }}
                    >
                      {item.title}
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: 17,
                        lineHeight: 1.8,
                        color: '#666',
                         textAlign: 'left'
                      }}
                    >
                      {item.desc}
                    </Typography>
                  </Box>
                ))}
              </Box>

            </Box>

          </Box>

        </Box>
      )}

    </Box>
  );
}