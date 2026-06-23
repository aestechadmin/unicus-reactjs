'use client';

import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

export default function FAQ() {
  const [active, setActive] = useState(null);

  const faqData = [
    {
      question: 'What facilities does UNICUS offer?',
      answer:
        'UNICUS provides trusted sanitation and security solutions tailored for healthcare, education, and commercial institutions throughout India.',
    },

    {
      question: 'What healthcare solutions does UNICUS provide?',
      answer:
        'UNICUS offers hospital housekeeping, infection-control cleaning, patient-support sanitation, biomedical waste handling, and healthcare security services.',
    },

    {
      question: 'What education solutions does UNICUS offer?',
      answer:
        'UNICUS provides campus housekeeping, hostel maintenance, classroom sanitation, security staffing, and facility management for schools and colleges.',
    },

    {
      question: 'What commercial solutions does UNICUS provide?',
      answer:
        'UNICUS supports offices, malls, and commercial buildings with housekeeping, security, maintenance, pest control, and facility operations.',
    },

    {
      question: 'What security solutions does UNICUS offer?',
      answer:
        'UNICUS provides trained security personnel, visitor management, watch & ward services, CCTV monitoring, and access-control support.',
    },

    {
      question: 'What sanitation solutions does UNICUS provide?',
      answer:
        'UNICUS offers deep cleaning, daily housekeeping, restroom sanitation, waste management, infection-control cleaning, and hygiene maintenance services.',
    },

    {
      question: 'Where does UNICUS operate?',
      answer:
        'UNICUS operates across multiple sectors in India with strong presence in Andhra Pradesh and Telangana.',
    },
  ];

  const handleToggle = (index) => {
    setActive(active === index ? null : index);
  };

  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: '#ECECEC',
        px: { xs: 2, sm: 3, md: 6 },
        py: { xs: 8, md: 12 },
      }}
    >

      {/* TITLE */}
      <Typography
        sx={{
          fontSize: { xs: 34, md: 70 },
          fontWeight: 600,
          mb: { xs: 5, md: 8 },
          textAlign: 'center',
          lineHeight: 1.1,
        }}
      >
        Frequently Asked Questions
      </Typography>

      {/* FAQ LIST */}
      <Box
        sx={{
          width: '100%',
          maxWidth: 1200,
          mx: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        {faqData.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: false, amount: 0.2 }}
          >

            <Box
              sx={{
                backgroundColor: '#fff',
                borderRadius: 3,
                overflow: 'hidden',
              }}
            >

              {/* QUESTION */}
              <Box
                onClick={() => handleToggle(index)}
                sx={{
                  px: { xs: 2, md: 4 },
                  py: { xs: 2, md: 3 },
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 2,
                  cursor: 'pointer',
                  transition: '0.3s',

                  '&:hover': {
                    backgroundColor: '#f5f5f5',
                  },
                }}
              >

                {/* LEFT */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: { xs: 2, md: 4 },
                  }}
                >
                  {/* NUMBER */}
                  <Typography
                    sx={{
                      fontSize: { xs: 20, md: 28 },
                      fontWeight: 800,
                      color: '#999',
                      minWidth: 30,
                    }}
                  >
                    {index + 1}
                  </Typography>

                  {/* QUESTION TEXT */}
                  <Typography
                    sx={{
                      fontSize: { xs: 16, md: 24 },
                      fontWeight: 700,
                      lineHeight: 1.4,
                    }}
                  >
                    {item.question}
                  </Typography>
                </Box>

                {/* PLUS / MINUS */}
                <Typography
                  sx={{
                    fontSize: { xs: 26, md: 34 },
                    fontWeight: 300,
                    lineHeight: 1,
                  }}
                >
                  {active === index ? '−' : '+'}
                </Typography>
              </Box>

              {/* ANSWER */}
              <AnimatePresence initial={false}>
                {active === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    style={{
                      overflow: 'hidden',
                    }}
                  >
                    <Box
                      sx={{
                        px: { xs: 2, md: 4 },
                        pb: { xs: 3, md: 4 },
                        ml: { xs: 6, md: 9 },
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: { xs: 15, md: 19 },
                          lineHeight: 1.8,
                          color: '#666', textAlign: 'left'
                        }}
                      >
                        {item.answer}
                      </Typography>
                    </Box>
                  </motion.div>
                )}
              </AnimatePresence>

            </Box>

          </motion.div>
        ))}
      </Box>

    </Box>
  );
}