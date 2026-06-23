'use client';

import { Box } from '@mui/material';

// Import sections
import HeroSection from './NewHome/HeroSection';
import IntroductionSection from './NewHome/IntroductionSection';
import AboutSection from './NewHome/AboutSection';
import GrowthSection from './NewHome/GrowthSection';
import CoreValuesSection from './NewHome/CoreValuesSection';
import Facilities from './NewHome/Facilities';
import Sectors from './NewHome/Sectors';
import Clients from './NewHome/Clients';
import Process from './NewHome/Process';
import FAQ from './NewHome/FAQ';
import Footer from "../components/Footer";
import Assessment from './NewHome/Assessment';
import Quote from './NewHome/Quote';

export default function NewHome() {
  return (
    <Box
      sx={{
        height: '100vh',
        overflowY: 'scroll',
        scrollSnapType: 'y mandatory',
        scrollBehavior: 'smooth',
      }}
    >
      {/* HERO */}
      <Box id="home" sx={{ scrollSnapAlign: 'start' }}>
        <HeroSection />
      </Box>

      {/* INTRO */}
      <Box id="intro" sx={{ scrollSnapAlign: 'start' }}>
        <IntroductionSection />
      </Box>

      {/* ABOUT */}
      <Box sx={{ scrollSnapAlign: 'start' }}>
        <AboutSection />
      </Box>

      {/* GROWTH */}
      <Box id="growth" sx={{ scrollSnapAlign: 'start' }}>
        <GrowthSection />
      </Box>

      <Box sx={{ scrollSnapAlign: 'start' }}>
        <Facilities />
      </Box>

      <Box id="about" sx={{ scrollSnapAlign: 'start' }}>
        <Sectors />
      </Box>

      <Box id="client" sx={{ scrollSnapAlign: 'start' }}>
        <Clients />
      </Box>

      {/* CORE VALUES */}
      <Box sx={{ scrollSnapAlign: 'start' }}>
        <CoreValuesSection />
      </Box>

      <Box id="process" sx={{ scrollSnapAlign: 'start' }}>
        <Process />
      </Box>

      <Box sx={{ scrollSnapAlign: 'start' }}>
        <Assessment />
      </Box>
      
      <Box id="faq" sx={{ scrollSnapAlign: 'start' }}>
        <FAQ />
      </Box>

      <Box id="quote" sx={{ scrollSnapAlign: 'start' }}>
        <Quote />
      </Box>

      <Box id="contact" sx={{ scrollSnapAlign: 'start' }}>
         <Footer />
      </Box>
    </Box>
  );
}