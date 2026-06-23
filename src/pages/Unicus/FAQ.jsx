import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { websiteData } from '../Unicus';

const progressiveRevealVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: (custom) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { delay: custom * 0.08, duration: 0.5, ease: "easeOut" }
  })
};

const FAQ = () => {
  const sectionRef = useRef(null);
  const [hasRevealed, setHasRevealed] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  
  const slide = websiteData.faq || {
    questions: [
      { q: "What facility management services do you offer?", a: "We offer comprehensive facility management including cleaning services, security, maintenance, housekeeping, pest control, and specialized manpower solutions." },
      { q: "How quickly can you provide services?", a: "We provide rapid deployment within 24-48 hours based on your requirements." },
      { q: "Are your services compliant with industry regulations?", a: "Yes, all our services strictly adhere to industry regulations and safety standards." },
      { q: "Do you provide customized facility solutions?", a: "Absolutely! We work closely with you to develop tailored solutions." },
      { q: "How do you ensure quality service?", a: "We have rigorous quality control processes and regular inspections." },
    ]
  };

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
    <Box ref={sectionRef} sx={{ minHeight: '100vh', width: '100%', overflow: 'visible' }}>
      <Box sx={{ minHeight: '100%', backgroundColor: '#F5F4DE', px: { xs: 2, sm: 3, md: 6 }, py: { xs: 4, md: 12 } }}>
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          animate={hasRevealed ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.6 }}
        >
          <Typography sx={{ fontSize: { xs: 28, md: 70 }, fontWeight: 700, mb: { xs: 3, md: 8 }, lineHeight: 1.6, textAlign: 'center', background: 'linear-gradient(135deg, #1a1a2e 0%, #2d2d5e 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Frequently Asked Questions
          </Typography>
        </motion.div>
        
        <Box sx={{ width: '100%', maxWidth: 1200, mx: 'auto', display: 'flex', flexDirection: 'column', gap: 2 }}>
          {slide.questions?.map((item, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              animate={hasRevealed ? "visible" : "hidden"}
              variants={progressiveRevealVariants}
            >
              <Box sx={{ backgroundColor: '#fff', borderRadius: 3, overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', transition: 'all 0.3s', '&:hover': { boxShadow: '0 8px 30px rgba(0,0,0,0.12)' } }}>
                <Box 
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)} 
                  sx={{ 
                    px: { xs: 2, md: 4 }, 
                    py: { xs: 2, md: 3 }, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between', 
                    gap: 2, 
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    '&:hover': { backgroundColor: '#f8f8f8' }
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 2, md: 4 } }}>
                    <Typography sx={{ fontSize: { xs: 16, md: 28 }, fontWeight: 800, color: '#999', minWidth: 30 }}>{String(index + 1).padStart(2, '0')}</Typography>
                    <Typography sx={{ fontSize: { xs: 14, md: 24 }, fontWeight: 600, color: '#1a1a2e' }}>{item.q}</Typography>
                  </Box>
                  <motion.div
                    animate={{ rotate: activeFaq === index ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Typography sx={{ fontSize: { xs: 20, md: 34 }, fontWeight: 300, color: '#666' }}>+</Typography>
                  </motion.div>
                </Box>
                
                <AnimatePresence>
                  {activeFaq === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <Box sx={{ px: { xs: 2, md: 4 }, pb: { xs: 2, md: 4 }, ml: { xs: 4, md: 9 } }}>
                        <Typography sx={{ fontSize: { xs: 13, md: 18 }, lineHeight: 1.6, color: '#666' }}>{item.a}</Typography>
                      </Box>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Box>
            </motion.div>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default FAQ;