'use client';

import { Box, Typography, TextField, MenuItem, Button, useTheme, useMediaQuery, Link, Stack, IconButton, AppBar, Toolbar } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue } from 'framer-motion';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import XIcon from '@mui/icons-material/X';
import {
  Menu as MenuIcon,
  X as CloseIcon,
  ArrowUpRight,
  Phone,
  Mail,
  MapPin,
} from 'lucide-react';
import emailjs from "@emailjs/browser";

export default function Home() {
  const [activeSection, setActiveSection] = useState(0);
  const [activeSlide, setActiveSlide] = useState({});
  const lockRef = useRef(false);
  const scrollRef = useRef(0);
  const scrollHandled = useRef(false);
  const THRESHOLD = 80;
  const COOLDOWN = 600;

  // Scroll progress for global parallax
  const { scrollYProgress } = useScroll();
  const globalOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);
  const globalScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.98, 0.95]);

  // All sections data with their slides
  const sections = [
    {
      id: 'hero',
      name: 'Hero',
      slides: [{ type: 'hero', title1: 'Clean spaces.', title2: 'Sharper watch.', image: '/img/hero.png' }]
    },
    {
      id: 'intro',
      name: 'Introduction',
      slides: [
        { type: 'vision', title: 'Our Vision', description: 'To be the most trusted partner in sanitation and security delivering healthier, safer environments.', bullets: ['Innovative, tailored solutions', 'Rigorous staff training', 'Client relationships built on trust', 'Sustainable practices'] },
        { type: 'overview', title: 'Company Overview', description: 'UNICUS specializes in high-quality sanitation and security manpower.', bullets: ['Excellence - Highest standards', 'Healthcare Focus', 'Client-Centricity', 'Integrity'] }
      ]
    },
    {
      id: 'why-unicus',
      name: 'Why Unicus',
      slides: [
        { type: 'title', title: 'Why Unicus Facilities' },
        { type: 'image-text', image: '/img/array2.png', description: 'Deep specialization in hospital and medical college sanitation and security' },
        { type: 'image-text', image: '/img/Img1.png', description: 'Medical-grade cleaning equipment and technologies' },
        { type: 'image-text', image: '/img/Img3.png', description: 'One agency for all facility needs' },
        { type: 'text', title: 'UNICUS Security Services Pvt Ltd is a dedicated manpower agency' },
        { type: 'two-images', image1: '/img/Img4.png', image2: '/img/Img3.png', button: 'Request a site assessment', title: 'Uncompromising focus on quality and reliability' },
        { type: 'bullets', image1: '/img/Img4.png', image2: '/img/Img3.png', bullets: ['Regular skill workshops', 'Dedicated Work Manager', 'Full spectrum services', 'Scheduled availability'] }
      ]
    },
    {
      id: 'sectors',
      name: 'Sectors',
      slides: [
        { type: 'title', title: 'Sectors We Serve' },
        { type: 'service', name: 'Corporate Multispeciality Hospitals', description: 'Healthcare-grade facilities management', image: '/img/Img5.png' },
        { type: 'service', name: 'Residential Apartments & Villas', description: 'Comprehensive facility maintenance', image: '/img/Img5.png' },
        { type: 'service', name: 'Commercial Buildings', description: 'Professional services for office spaces', image: '/img/Img5.png' },
        { type: 'service', name: 'Educational Institutions', description: 'Specialized support for schools', image: '/img/Img5.png' },
        { type: 'service', name: 'Industrial Units', description: 'Robust facility management', image: '/img/Img5.png' },
        { type: 'service', name: 'Corporate Offices', description: 'Dedicated services for workspaces', image: '/img/Img5.png' }
      ],
      listItems: ['Corporate Multispeciality Hospitals', 'Residential Apartments & Villas', 'Commercial Buildings', 'Educational Institutions', 'Industrial Units', 'Corporate Offices']
    },
    {
      id: 'core-values',
      name: 'Core Values',
      slides: [
        { type: 'grid', items: [{ title: 'Reliable & Compliant', desc: 'Timely, regulation-adherent service' }, { title: 'Flexible Scheduling', desc: 'Customized workflows' }, { title: 'Proactive Reporting', desc: 'In-depth updates' }, { title: 'Long-Term Partnerships', desc: 'Focused on excellence' }] },
        { type: 'stats', stats: [{ value: '2022', label: 'Founded' }, { value: '4', label: 'Years' }, { value: '400+', label: 'Clients' }, { value: '4Cr+', label: 'Annual Turnover' }, { value: '2', label: 'States Covered' }] }
      ]
    },
    {
      id: 'process',
      name: 'Process',
      slides: [
        { type: 'title', title: 'Specialized Services' },
        { type: 'service', name: 'Housekeeping', description: 'Professional cleaning for all facility areas', image: '/img/Img5.png' },
        { type: 'service', name: 'Security & Watch & Ward', description: 'Trained security personnel', image: '/img/Img5.png' },
        { type: 'service', name: 'Pest Control', description: 'Health-regulation compliant services', image: '/img/Img5.png' },
        { type: 'service', name: 'Lift & Generator O&M', description: 'Preventive maintenance', image: '/img/Img5.png' },
        { type: 'service', name: 'Electrical Maintenance', description: 'Professional electrical upkeep', image: '/img/Img5.png' },
        { type: 'service', name: 'Civil Work Maintenance', description: 'Structural repairs', image: '/img/Img5.png' },
        { type: 'service', name: 'Plumbing & Water Supply', description: 'Complete water system management', image: '/img/Img5.png' },
        { type: 'service', name: 'Gardening & Landscaping', description: 'Green space maintenance', image: '/img/Img5.png' }
      ],
      listItems: ['Housekeeping', 'Security & Watch & Ward', 'Pest Control', 'Lift & Generator O&M', 'Electrical Maintenance', 'Civil Work Maintenance', 'Plumbing & Water Supply', 'Gardening & Landscaping']
    },
    {
      id: 'clients',
      name: 'Clients',
      slides: [{ type: 'cards', title: 'Commitment to Clients', cards: [{ title: 'Reliable & Compliant', desc: 'Timely, regulation-adherent service' }, { title: 'Flexible Scheduling', desc: 'Customized workflows' }, { title: 'Proactive Reporting', desc: 'In-depth updates' }, { title: 'Long-Term Partnerships', desc: 'Focused on excellence' }] }]
    },
    {
      id: 'growth',
      name: 'Growth',
      slides: [
        { type: 'title', title: 'With partners like this,\nthere\'s nowhere to go but the best' },
        { type: 'partner', name: 'KIMS', description: 'Healthcare-grade facilities management', image: '/img/Img6.png' },
        { type: 'partner', name: 'TNR Constructions', description: 'Residential community solutions', image: '/img/Img9.png' },
        { type: 'partner', name: 'JIVI Towers', description: 'Commercial facility services', image: '/img/Img9.png' },
        { type: 'partner', name: 'Tranquil', description: 'Educational institution support', image: '/img/Img2.png' },
        { type: 'partner', name: 'Skilltyro', description: 'Industrial operations management', image: '/img/Img7.png' },
        { type: 'partner', name: 'DocTutorials', description: 'Corporate workspace solutions', image: '/img/Img11.png' }
      ],
      listItems: ['KIMS', 'TNR Constructions', 'JIVI Towers', 'Tranquil', 'Skilltyro', 'DocTutorials']
    },
    {
      id: 'quote',
      name: 'Quote',
      slides: [{ type: 'form' }]
    },
    {
      id: 'faq',
      name: 'FAQ',
      slides: [{ type: 'faq', questions: [
        { q: 'What facilities does UNICUS offer?', a: 'UNICUS provides trusted sanitation and security solutions tailored for healthcare, education, and commercial institutions.' },
        { q: 'What healthcare solutions does UNICUS provide?', a: 'UNICUS offers hospital housekeeping, infection-control cleaning, biomedical waste handling, and healthcare security services.' },
        { q: 'What education solutions does UNICUS offer?', a: 'UNICUS provides campus housekeeping, hostel maintenance, classroom sanitation, and security staffing.' },
        { q: 'What commercial solutions does UNICUS provide?', a: 'UNICUS supports offices, malls, and commercial buildings with housekeeping, security, and facility operations.' }
      ] }]
    },
    {
      id: 'footer',
      name: 'Footer',
      slides: [{ type: 'footer' }]
    }
  ];

  // Initialize active slide for each section (start from 0)
  useEffect(() => {
    const initial = {};
    sections.forEach((section, idx) => {
      initial[idx] = 0;
    });
    setActiveSlide(initial);
  }, []);

  // Handle scroll for pinned animation with smooth reveal
  useEffect(() => {
    const handleWheel = (e) => {
      if (lockRef.current) return;
      if (scrollHandled.current) {
        scrollRef.current = 0;
        return;
      }
      
      scrollRef.current += e.deltaY;
      const down = scrollRef.current > THRESHOLD;
      const up = scrollRef.current < -THRESHOLD;
      
      if (!down && !up) {
        if (Math.abs(scrollRef.current) > THRESHOLD * 0.5) {
          scrollRef.current = 0;
        }
        return;
      }
      
      scrollRef.current = 0;
      scrollHandled.current = true;
      lockRef.current = true;
      
      const currentSection = sections[activeSection];
      const currentSlideIndex = activeSlide[activeSection] || 0;
      const maxSlide = currentSection.slides.length - 1;
      
      if (down && currentSlideIndex < maxSlide) {
        setActiveSlide(prev => ({ ...prev, [activeSection]: currentSlideIndex + 1 }));
      } else if (up && currentSlideIndex > 0) {
        setActiveSlide(prev => ({ ...prev, [activeSection]: currentSlideIndex - 1 }));
      } else if (down && currentSlideIndex === maxSlide && activeSection < sections.length - 1) {
        setActiveSection(prev => prev + 1);
      } else if (up && currentSlideIndex === 0 && activeSection > 0) {
        const prevSection = sections[activeSection - 1];
        setActiveSection(prev => prev - 1);
        setActiveSlide(prev => ({ ...prev, [activeSection - 1]: prevSection.slides.length - 1 }));
      }
      
      setTimeout(() => {
        lockRef.current = false;
        scrollHandled.current = false;
      }, COOLDOWN);
    };
    
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [activeSection, activeSlide, sections]);

  const currentSection = sections[activeSection];
  const currentSlideIndex = activeSlide[activeSection] || 0;
  const currentSlide = currentSection?.slides[currentSlideIndex];

  const scrollToSection = (index) => {
    setActiveSection(index);
    setActiveSlide(prev => ({ ...prev, [index]: 0 }));
  };

  return (
    <Box sx={{ width: '100%', height: '100vh', overflow: 'hidden', position: 'relative', backgroundColor: '#0a0a0a' }}>
      <Header setActiveSection={scrollToSection} activeSection={activeSection} sections={sections} />
      
      {/* Global Scroll Progress Bar */}
      <GlobalProgressBar scrollYProgress={scrollYProgress} />
      
      {/* Pinned Scroll Container */}
      <Box sx={{ height: '100vh', overflow: 'hidden', position: 'relative' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection + '_' + currentSlideIndex}
            // initial={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
            // animate={{ opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } }}
            // exit={{ opacity: 0, scale: 0.98, filter: "blur(10px)", transition: { duration: 0.3 } }}
            style={{ height: '100%', width: '100%' }}
          >
            <SlideRenderer 
              slide={currentSlide} 
              sectionId={currentSection?.id} 
              sectionData={currentSection}
              activeSlideIndex={currentSlideIndex}
              setActiveSlide={(index) => setActiveSlide(prev => ({ ...prev, [activeSection]: index }))}
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Progress Indicator with reveal animation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          style={{ position: 'fixed', bottom: 20, left: 20, zIndex: 1000 }}
        >
          <Box sx={{ backgroundColor: 'rgba(0,0,0,0.6)', color: 'white', padding: '6px 12px', borderRadius: 20, fontSize: 12, fontFamily: 'monospace', backdropFilter: 'blur(8px)' }}>
            {String(activeSection + 1).padStart(2, '0')} / {String(sections.length).padStart(2, '0')} • Slide {currentSlideIndex + 1}/{currentSection?.slides.length}
          </Box>
        </motion.div>
        
        {/* Section Progress Dots with scroll reveal */}
        <Box sx={{ position: 'fixed', right: 20, top: '50%', transform: 'translateY(-50%)', display: { xs: 'none', md: 'flex' }, flexDirection: 'column', gap: 1, zIndex: 1000 }}>
          {sections.map((_, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: idx * 0.05, duration: 0.3 }}
            >
              <Box
                onClick={() => scrollToSection(idx)}
                sx={{
                  width: activeSection === idx ? 10 : 6,
                  height: activeSection === idx ? 10 : 6,
                  borderRadius: '50%',
                  bgcolor: activeSection === idx ? '#fff' : 'rgba(255,255,255,0.3)',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.6)', transform: 'scale(1.2)' }
                }}
              />
            </motion.div>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

// ================= GLOBAL PROGRESS BAR =================
function GlobalProgressBar({ scrollYProgress }) {
  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        background: 'linear-gradient(90deg, #ff6b6b, #ff8e53, #ff6b6b)',
        transformOrigin: '0%',
        scaleX: scrollYProgress,
        zIndex: 2000,
      }}
    />
  );
}

// ================= SLIDE RENDERER WITH PROGRESSIVE REVEAL =================
function SlideRenderer({ slide, sectionId, sectionData, activeSlideIndex, setActiveSlide }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [activeFaq, setActiveFaq] = useState(null);
  const [formData, setFormData] = useState({ fullName: '', organization: '', designation: '', email: '', phone: '', sector: '', service: '', city: '', message: '' });
  const [errors, setErrors] = useState({});
  const sectionRef = useRef(null);
  const [hasRevealed, setHasRevealed] = useState(false);
  
  // Progressive reveal on scroll within section
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasRevealed(true);
        }
      },
      { threshold: 0.2 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => observer.disconnect();
  }, []);
  
  const sectors = ['Healthcare', 'Education', 'Commercial', 'Industrial', 'Residential', 'Corporate'];
  const servicesList = ['Housekeeping', 'Security', 'Pest Control', 'Waste Management', 'Landscaping'];
  
  const handleChange = (e) => { setFormData({ ...formData, [e.target.name]: e.target.value }); setErrors({ ...errors, [e.target.name]: '' }); };
  const validate = () => { let temp = {}; if (!formData.fullName) temp.fullName = 'Required'; if (!formData.organization) temp.organization = 'Required'; if (!formData.designation) temp.designation = 'Required'; if (!formData.email) temp.email = 'Required'; if (!formData.phone) temp.phone = 'Required'; if (!formData.sector) temp.sector = 'Required'; if (!formData.service) temp.service = 'Required'; if (!formData.city) temp.city = 'Required'; if (!formData.message) temp.message = 'Required'; setErrors(temp); return Object.keys(temp).length === 0; };
  // const handleSubmit = (e) => { e.preventDefault(); if (validate()) { alert('Submitted Successfully'); setFormData({ fullName: '', organization: '', designation: '', email: '', phone: '', sector: '', service: '', city: '', message: '' }); } };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const result = await emailjs.send(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        {
          fullName: formData.fullName,
          organization: formData.organization,
          designation: formData.designation,
          email: formData.email,
          phone: formData.phone,
          sector: formData.sector,
          service: formData.service,
          city: formData.city,
          message: formData.message,
        },
        "YOUR_PUBLIC_KEY"
      );

      console.log("SUCCESS!", result);

      alert("Mail Sent Successfully");

      setFormData({
        fullName: "",
        organization: "",
        designation: "",
        email: "",
        phone: "",
        sector: "",
        service: "",
        city: "",
        message: "",
      });
    } catch (err) {
      console.error("Mail Error:", err);
      alert("Failed to send mail");
    }
  };

  const inputStyle = { '& .MuiOutlinedInput-root': { borderRadius: 0, color: '#fff', background: 'transparent', fontSize: { xs: 14, md: 16 }, '& fieldset': { borderColor: 'rgba(255,255,255,0.3)' }, '&:hover fieldset': { borderColor: '#fff' }, '&.Mui-focused fieldset': { borderColor: '#fff' } }, '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)', fontSize: { xs: 14, md: 16 } }, '& .MuiInputLabel-root.Mui-focused': { color: '#fff' } };
  
  // Enhanced progressive reveal variants
  const progressiveRevealVariants = {
    hidden: { opacity: 0, y: 50, filter: "blur(12px)" },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { 
        duration: 0.6, 
        delay: custom * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    })
  };
  
  const imageRevealVariants = {
    hidden: { opacity: 0, scale: 0.85, clipPath: "inset(10% 20% 10% 20%)" },
    visible: (custom) => ({
      opacity: 1,
      scale: 1,
      clipPath: "inset(0% 0% 0% 0%)",
      transition: { 
        duration: 0.7, 
        delay: custom * 0.1,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    })
  };

  const textRevealVariants = {
    hidden: { opacity: 0, x: -30, filter: "blur(8px)" },
    visible: (custom) => ({
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: { duration: 0.5, delay: custom * 0.1 }
    })
  };

  // Hero Section with progressive reveal
  if (sectionId === 'hero') {
    return (
      <Box ref={sectionRef} sx={{ height: '100%', width: '100%' }}>
        <Box sx={{ position: 'relative', width: '100%', height: '100%', background: theme.palette.secondary.main, overflow: 'hidden' }}>
          <Box sx={{ position: 'relative', width: '100%', height: '90%' }}>
            <motion.div
              initial={{ opacity: 0, scale: 1.2, filter: "blur(20px)" }}
              animate={hasRevealed ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
              transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{ width: '100%', height: '100%' }}
            >
              <Box component="img" src={slide.image} sx={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: { xs: '0 0 15% 15%', md: '0 0 25% 25%' } }} />
            </motion.div>
            <Box sx={{ position: 'absolute', bottom: { xs: 30, md: 30 }, left: { xs: 150, md: 500 } }}>
              <motion.div
                initial={{ opacity: 0, x: -80, filter: "blur(10px)" }}
                animate={hasRevealed ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
                transition={{ delay: 0.3, duration: 0.8, type: "spring", stiffness: 100 }}
              >
                <Typography sx={{ fontSize: { xs: '1.8rem', md: '7rem' }, textAlign: 'center', fontWeight: 600, color: '#fff', lineHeight: 1.2 }}>{slide.title1}</Typography>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 80, filter: "blur(10px)" }}
                animate={hasRevealed ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
                transition={{ delay: 0.5, duration: 0.8, type: "spring", stiffness: 100 }}
              >
                <Typography sx={{ fontSize: { xs: '1.8rem', md: '7rem' }, textAlign: 'center', fontWeight: 600, color: '#fff', lineHeight: 1.2 }}>{slide.title2}</Typography>
              </motion.div>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }
  
  // Introduction Section - Simple bottom fixed version
  if (sectionId === 'intro') {
    return (
      <Box ref={sectionRef} sx={{ height: '100%', width: '100%', position: 'relative', overflow: 'hidden', background: '#000' }}>
        {/* Background Image */}
        <motion.div
          initial={{ clipPath: "inset(0% 100% 0% 0%)" }}
          animate={hasRevealed ? { clipPath: "inset(0% 0% 0% 0%)" } : {}}
          transition={{ duration: 1.2, ease: [0.77, 0, 0.18, 1] }}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        >
          <Box component="img" src={slide.type === 'vision' ? '/img/intro1.png' : '/img/intro2.png'} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </motion.div>
        
        {/* Bottom Gradient */}
        <Box
          sx={{ 
            position: 'absolute', 
            bottom: 0, 
            left: 0, 
            right: 0, 
            height: '60%',
            background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0) 100%)',
            zIndex: 2
          }}
        />
        
        {/* Content Container */}
        <Box
          sx={{ 
            position: 'absolute', 
            bottom: { xs: 30, md: 60 },
            left: 0,
            right: 0,
            zIndex: 3,
            px: { xs: 3, md: 8 }
          }}
        >
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' }, 
            justifyContent: 'space-between',
            gap: { xs: 3, md: 6 }
          }}>
            
            {/* Left Side */}
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={hasRevealed ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
              style={{ flex: 1 }}
            >
              <Typography sx={{ fontSize: { xs: 28, md: 48 }, lineHeight: 1.4, fontWeight: 800, color: '#fff', mb: 2 }}>
                {slide.title}
              </Typography>
              <Typography sx={{ fontSize: { xs: 14, md: 18 }, color: 'rgba(255,255,255,0.85)', lineHeight: 1.6 }}>
                {slide.description}
              </Typography>
            </motion.div>
            
            {/* Right Side */}
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={hasRevealed ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.6, duration: 0.6 }}
              style={{ flex: 0.8 }}
            >
              {slide.bullets?.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ x: 50, opacity: 0 }}
                  animate={hasRevealed ? { x: 0, opacity: 1 } : {}}
                  transition={{ delay: 0.8 + i * 0.1 }}
                >
                  <Typography sx={{ fontSize: { xs: 14, md: 18 }, textAlign: 'left', pl:10, color: '#fff', mb: 1.5 }}>
                    • {item}
                  </Typography>
                </motion.div>
              ))}
            </motion.div>
          </Box>
        </Box>
      </Box>
    );
  }
  
  // WHY UNICUS SECTION - New 3D Parallax + Floating Elements Animation
  if (sectionId === 'why-unicus') {
    const isTitle = slide.type === 'title';
    const isImageText = slide.type === 'image-text';
    const isText = slide.type === 'text';
    const isTwoImages = slide.type === 'two-images';
    const isBullets = slide.type === 'bullets';
    
    // For title slide - Neon glow + scale bounce
    if (isTitle) {
      return (
        <Box ref={sectionRef} sx={{ height: '100%', width: '100%' }}>
          <Box sx={{ background: '#F5F4DE', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
            {/* Animated background circles */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={hasRevealed ? { scale: 1, opacity: 0.1 } : {}}
              transition={{ duration: 1, delay: 0.2 }}
              style={{
                position: 'absolute',
                width: '60%',
                height: '60%',
                borderRadius: '50%',
                background: 'radial-gradient(circle, #ff6b6b, transparent)',
                filter: 'blur(60px)'
              }}
            />
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              animate={hasRevealed ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.3, type: "spring", stiffness: 150, damping: 12 }}
            >
              <Typography sx={{ 
                fontSize: { xs: 28, md: 80 }, 
                fontWeight: 900, 
                textAlign: 'center', 
                color: '#000',
                position: 'relative',
                zIndex: 2,
                background: 'linear-gradient(135deg, #000 0%, #333 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                lineHeight: 1.8
              }}>
                {slide.title}
              </Typography>
            </motion.div>
          </Box>
        </Box>
      );
    }
    
    // For image-text slides - 3D Parallax + Hover Effects
    if (isImageText) {
      return (
        <Box ref={sectionRef} sx={{ height: '100%', width: '100%', perspective: '1200px', overflow: 'auto' }}>
          <Box sx={{ background: '#F5F4DE', minHeight: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', py: { xs: 4, md: 6 } }}>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, alignItems: 'center', px: { xs: 2, md: 6 }, width: '100%', maxWidth: 1400, mx: 'auto' }}>
              
              {/* Left small image - Floating animation */}
              <Box sx={{ flex: 0.5, display: 'flex', justifyContent: 'end', alignItems: 'flex-start' }}>
                <motion.div
                  initial={{ opacity: 0, x: -100, rotateY: -30 }}
                  animate={hasRevealed ? { opacity: 1, x: 0, rotateY: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 100 }}
                  whileHover={{ scale: 1.05, rotateY: 10, transition: { duration: 0.3 } }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <Box component="img" src={sectionData?.slides[activeSlideIndex - 1]?.image} sx={{ 
                    width: '100%', 
                    maxWidth: { xs: 250, md: 200 }, 
                    borderRadius: 3, 
                    boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                    transition: 'all 0.3s'
                  }} />
                </motion.div>
              </Box>
              
              {/* Center main image - Zoom reveal with 3D tilt */}
              <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.5, rotateY: 45 }}
                  animate={hasRevealed ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
                  transition={{ duration: 0.9, delay: 0.1, type: "spring", stiffness: 120, damping: 10 }}
                  whileHover={{ scale: 1.02, rotateY: 5, transition: { duration: 0.2 } }}
                  style={{ transformStyle: "preserve-3d", width: '100%' }}
                >
                  <Box component="img" src={slide.image} sx={{ 
                    width: '100%', 
                    maxWidth: { xs: 250, md: 700 }, 
                    borderRadius: 3, 
                    boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
                    transition: 'all 0.3s'
                  }} />
                </motion.div>
              </Box>
              
              {/* Right side - Text and next image with stagger */}
              <Box sx={{ flex: 0.5 }}>
                <motion.div
                  initial={{ opacity: 0, x: 100 }}
                  animate={hasRevealed ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.4 }}
                >
                  <Typography sx={{ fontSize: { xs: 14, md: 20 }, mb: 3, color: '#000', textAlign: 'left', lineHeight: 1.8 }}>
                    {slide.description}
                  </Typography>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 50, scale: 0.8 }}
                  animate={hasRevealed ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.6, type: "spring", stiffness: 150 }}
                  whileHover={{ scale: 1.05, rotateZ: 2 }}
                >
                  <Box component="img" src={sectionData?.slides[activeSlideIndex + 1]?.image} sx={{ 
                    width: '100%', 
                    maxWidth: { xs: 250, md: 200 }, 
                    borderRadius: 3, 
                    boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                    transition: 'all 0.3s'
                  }} />
                </motion.div>
              </Box>
            </Box>
            
            {/* Progress dots with bounce */}
            <Box sx={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 1.5, zIndex: 10 }}>
              {sectionData.slides.map((_, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={hasRevealed ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.5 + idx * 0.08, type: "spring", stiffness: 200 }}
                >
                  <Box 
                    onClick={() => setActiveSlide(idx)} 
                    sx={{ 
                      width: activeSlideIndex === idx ? 10 : 6, 
                      height: activeSlideIndex === idx ? 10 : 6, 
                      borderRadius: '50%', 
                      bgcolor: activeSlideIndex === idx ? '#000' : 'rgba(0,0,0,0.3)', 
                      cursor: 'pointer', 
                      transition: 'all 0.3s' 
                    }} 
                  />
                </motion.div>
              ))}
            </Box>
          </Box>
        </Box>
      );
    }
    
    // For text-only slide - Typing + Wave animation
    if (isText) {
      return (
        <Box ref={sectionRef} sx={{ height: '100%', width: '100%' }}>
          <Box sx={{ background: '#F5F4DE', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', px: { xs: 3, md: 10 } }}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={hasRevealed ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
            >
              <Typography sx={{ fontSize: { xs: 16, md: 70 }, lineHeight: 1.4, fontWeight: 600, color: '#000', textAlign: 'center' }}>
                {slide.title.split(' ').map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 50, rotateX: -90 }}
                    animate={hasRevealed ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                    transition={{ duration: 0.5, delay: i * 0.1, type: "spring", stiffness: 200 }}
                    style={{ display: 'inline-block', marginRight: '0.3em' }}
                  >
                    {word}
                  </motion.span>
                ))}
              </Typography>
            </motion.div>
          </Box>
        </Box>
      );
    }
    
    // For two-images slide - Cinematic reveal
    if (isTwoImages) {
      return (
        <Box ref={sectionRef} sx={{ height: '100%', width: '100%', overflow: 'auto' }}>
          <Box sx={{ background: '#F5F4DE', minHeight: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', py: { xs: 4, md: 6 } }}>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, alignItems: 'center', px: { xs: 2, md: 6 }, width: '100%', maxWidth: 1400, mx: 'auto' }}>
              <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <motion.div
                  initial={{ opacity: 0, x: -100, rotateZ: -10 }}
                  animate={hasRevealed ? { opacity: 1, x: 0, rotateZ: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.2, type: "spring", stiffness: 120 }}
                  whileHover={{ scale: 1.03, rotateZ: 2 }}
                >
                  <Box component="img" src={slide.image2} sx={{ width: '100%', height: 200, maxWidth: { xs: 200, md: '100%' }, objectFit: 'cover', objectPosition: 'bottom', borderRadius: 3, mx: 'auto', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }} />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -100, rotateZ: -5 }}
                  animate={hasRevealed ? { opacity: 1, x: 0, rotateZ: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.4, type: "spring", stiffness: 120 }}
                  whileHover={{ scale: 1.03, rotateZ: 2 }}
                >
                  <Box component="img" src={slide.image1} sx={{ width: '100%', maxWidth: { xs: 200, md: 800 }, borderRadius: 3, mx: 'auto', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }} />
                </motion.div>
              </Box>
              <Box sx={{ flex: 1 }}>
                <motion.div
                  initial={{ opacity: 0, x: 100 }}
                  animate={hasRevealed ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <Typography sx={{ fontSize: { xs: 14, md: 50 }, lineHeight: 1.4, fontWeight: 500, color: '#000', mb: 3 }}>
                    {slide.title.split(' ').map((word, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        animate={hasRevealed ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                        style={{ display: 'inline-block', marginRight: '0.2em' }}
                      >
                        {word}
                      </motion.span>
                    ))}
                  </Typography>
                  <motion.button 
                    whileHover={{ scale: 1.08, boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }} 
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 50, scale: 0.8 }}
                    animate={hasRevealed ? { opacity: 1, y: 0, scale: 1 } : {}}
                    transition={{ delay: 0.8, duration: 0.5, type: "spring", stiffness: 200 }}
                    style={{ 
                      background: 'linear-gradient(45deg, #ff6b6b, #ff8e53)', 
                      border: 'none', 
                      padding: '14px 32px', 
                      borderRadius: 40, 
                      color: '#fff', 
                      fontSize: 16, 
                      fontWeight: 600, 
                      cursor: 'pointer',
                      boxShadow: '0 5px 15px rgba(255,107,107,0.3)'
                    }}
                  >
                    {slide.button}
                  </motion.button>
                </motion.div>
              </Box>
            </Box>
            
            {/* Progress dots */}
            <Box sx={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 1.5, zIndex: 10 }}>
              {sectionData.slides.map((_, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={hasRevealed ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.5 + idx * 0.08, type: "spring", stiffness: 200 }}
                >
                  <Box 
                    onClick={() => setActiveSlide(idx)} 
                    sx={{ 
                      width: activeSlideIndex === idx ? 10 : 6, 
                      height: activeSlideIndex === idx ? 10 : 6, 
                      borderRadius: '50%', 
                      bgcolor: activeSlideIndex === idx ? '#000' : 'rgba(0,0,0,0.3)', 
                      cursor: 'pointer', 
                      transition: 'all 0.3s' 
                    }} 
                  />
                </motion.div>
              ))}
            </Box>
          </Box>
        </Box>
      );
    }
    
    // For bullets slide - Staggered list with icons
    if (isBullets) {
      const bulletIcons = ['🎯', '⚡', '🔄', '📅'];
      return (
        <Box ref={sectionRef} sx={{ height: '100%', width: '100%', overflow: 'auto' }}>
          <Box sx={{ background: '#F5F4DE', minHeight: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', py: { xs: 4, md: 6 } }}>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, alignItems: 'center', px: { xs: 2, md: 6 }, width: '100%', maxWidth: 1400, mx: 'auto' }}>
              <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.5, rotateY: -40 }}
                  animate={hasRevealed ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 100 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Box component="img" src={slide.image1} sx={{ width: '100%', height: 'auto', maxHeight: 700, objectFit: 'cover', objectPosition: 'center', maxWidth: { xs: 200, md: '100%' }, borderRadius: 3, mx: 'auto', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }} />
                </motion.div>
              </Box>
              <Box sx={{ flex: 0.7 }}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, rotateY: 40 }}
                  animate={hasRevealed ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.3, type: "spring", stiffness: 100 }}
                >
                  <Box component="img" src={slide.image2} sx={{ width: '100%', maxWidth: { xs: 200, md: 350 }, mb: 4, borderRadius: 3, mx: 'auto', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }} />
                </motion.div>
                <Box component="ul" sx={{ color: '#000', display: 'flex',flexDirection: 'column', alignItems: 'center',fontSize: { xs: 12, md: 18 }, textAlign: 'center', lineHeight: 2.2, listStyle: 'none', p: 0 }}>
                  {slide.bullets?.map((item, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -50 }}
                      animate={hasRevealed ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.5 + idx * 0.12, type: "spring", stiffness: 150 }}
                      whileHover={{ x: 10, transition: { duration: 0.2 } }}
                      style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}
                    >
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={hasRevealed ? { scale: 1 } : {}}
                        transition={{ delay: 0.7 + idx * 0.12, type: "spring", stiffness: 200 }}
                        style={{ fontSize: 24 }}
                      >
                        {bulletIcons[idx % bulletIcons.length]}
                      </motion.span>
                      {item}
                    </motion.li>
                  ))}
                </Box>
              </Box>
            </Box>
            
            {/* Progress dots */}
            <Box sx={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 1.5, zIndex: 10 }}>
              {sectionData.slides.map((_, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={hasRevealed ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.5 + idx * 0.08, type: "spring", stiffness: 200 }}
                >
                  <Box 
                    onClick={() => setActiveSlide(idx)} 
                    sx={{ 
                      width: activeSlideIndex === idx ? 10 : 6, 
                      height: activeSlideIndex === idx ? 10 : 6, 
                      borderRadius: '50%', 
                      bgcolor: activeSlideIndex === idx ? '#000' : 'rgba(0,0,0,0.3)', 
                      cursor: 'pointer', 
                      transition: 'all 0.3s' 
                    }} 
                  />
                </motion.div>
              ))}
            </Box>
          </Box>
        </Box>
      );
    }
    
    return null;
  }
  
  // Sectors, Process, Growth Section - Left slide-in, Center fade, Right wave
  if (sectionId === 'sectors' || sectionId === 'process' || sectionId === 'growth') {
    const isTitle = slide.type === 'title';
    const listItems = sectionData.listItems || [];
    
    const handleListItemClick = (index) => {
      setActiveSlide(index + 1);
    };
    
    return (
      <Box ref={sectionRef} sx={{ height: '100%', width: '100%' }}>
        <Box sx={{ height: '100%', background: '#ECECEC', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'auto' }}>
          
          {/* TITLE SLIDE - Character by character animation */}
          {isTitle && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={hasRevealed ? { opacity: 1 } : {}}
              transition={{ duration: 0.3 }}
            >
              <Typography sx={{ 
                fontSize: { xs: 28, md: 70 }, 
                fontWeight: 900, 
                textAlign: 'center', 
                lineHeight: 1.4,
                letterSpacing: '-0.02em', maxWidth: 1200
              }}>
                {slide.title.split('').map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 50, rotateX: -90 }}
                    animate={hasRevealed ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                    transition={{ 
                      duration: 0.4, 
                      delay: index * 0.03,
                      type: "spring",
                      stiffness: 200,
                      damping: 12
                    }}
                    style={{ display: 'inline-block' }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </Typography>
              
              {/* Background glow effect */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={hasRevealed ? { scale: 1, opacity: 0.15 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: '80%',
                  height: '80%',
                  transform: 'translate(-50%, -50%)',
                  background: 'radial-gradient(circle, #ff6b6b, transparent)',
                  borderRadius: '50%',
                  filter: 'blur(60px)',
                  zIndex: 0
                }}
              />
            </motion.div>
          )}
          
          {/* SERVICE/PARTNER SLIDE */}
          {(slide.type === 'service' || slide.type === 'partner') && (
            <Box sx={{ width: '100%', maxWidth: 1400, display: 'flex', gap: { xs: 2, md: 4 }, px: { xs: 2, md: 3 }, alignItems: 'center', flexDirection: { xs: 'column', md: 'row' }, mx: 'auto' }}>
              
              {/* Left Side - SLIDE FROM LEFT with SKEW (previous animation) */}
              <Box sx={{ flex: 0.5, display: 'flex', flexDirection: 'column', gap: 1 }}>
                {listItems.map((item, i) => {
                  const isActive = activeSlideIndex === i + 1;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -60, skewX: -10 }}
                      animate={hasRevealed ? { opacity: 1, x: 0, skewX: 0 } : {}}
                      transition={{ duration: 0.2, delay: i * 0.07, type: "spring", stiffness: 200 }}
                      whileHover={{ x: 8, transition: { duration: 0.2 } }}
                    >
                      <Box 
                        onClick={() => handleListItemClick(i)}
                        sx={{ cursor: 'pointer' }}
                      >
                        <Typography sx={{ 
                          fontSize: { xs: 14, md: 18 }, 
                          fontWeight: isActive ? 900 : 400, 
                          color: isActive ? '#000' : '#777',
                          lineHeight: 1.6,
                          transition: 'all 0.3s', 
                          textAlign: 'left',
                          position: 'relative',
                          '&::before': isActive ? {
                            content: '""',
                            position: 'absolute',
                            left: -12,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            width: 4,
                            height: 4,
                            borderRadius: '50%',
                            backgroundColor: '#ff6b6b'
                          } : {},
                          '&:hover': { pl: 2, color: '#000' }
                        }}>
                          {item}
                        </Typography>
                      </Box>
                    </motion.div>
                  );
                })}
              </Box>
              
              {/* Center Image - FADE IN / FADE OUT animation */}
              <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={hasRevealed ? { opacity: 1 } : {}}
                  exit={{ opacity: 0 }}
                  transition={{ 
                    duration: 0.4, 
                    delay: 0.2,
                    ease: "easeInOut"
                  }}
                  style={{ width: '100%' }}
                >
                  <img 
                    src={slide.image} 
                    style={{ 
                      width: '100%', 
                      maxHeight: '70vh', 
                      objectFit: 'cover', 
                      borderRadius: 24,
                      boxShadow: '0 25px 50px rgba(0,0,0,0.15)'
                    }} 
                  />
                </motion.div>
              </Box>
              
              {/* Right Side Description - BEACH WAVE animation */}
              <Box sx={{ flex: 0.5 }}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={hasRevealed ? { 
                    opacity: 1, 
                    y: 0,
                    transition: { duration: 0.5, delay: 0.3 }
                  } : {}}
                >
                  <Typography sx={{ 
                    fontSize: { xs: 12, md: 18 }, 
                    textAlign: 'left', 
                    lineHeight: 1.8, 
                    color: '#555',
                    borderLeft: '3px solid #ff6b6b',
                    pl: 2,
                    display: 'inline-block'
                  }}>
                    {slide.description.split(' ').map((word, idx) => (
                      <motion.span
                        key={idx}
                        initial={{ opacity: 0, y: 30, rotateZ: -5 }}
                        animate={hasRevealed ? { opacity: 1, y: 0, rotateZ: 0 } : {}}
                        transition={{ 
                          duration: 0.4, 
                          delay: 0.4 + (idx * 0.08),
                          type: "spring",
                          stiffness: 150,
                          damping: 10
                        }}
                        style={{ display: 'inline-block', marginRight: '0.3em' }}
                      >
                        {word}
                      </motion.span>
                    ))}
                  </Typography>
                </motion.div>
              </Box>
            </Box>
          )}
          
          {/* Progress Dots - Bounce */}
          {!isTitle && (
            <Box sx={{ position: 'absolute', bottom: 30, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: { xs: 1, md: 1.5 }, zIndex: 10 }}>
              {sectionData.slides.map((_, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0, y: 20 }}
                  animate={hasRevealed ? { opacity: 1, scale: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + idx * 0.05, type: "spring", stiffness: 300 }}
                  whileHover={{ scale: 1.3 }}
                >
                  <Box 
                    onClick={() => setActiveSlide(idx)} 
                    sx={{ 
                      width: activeSlideIndex === idx ? { xs: 10, md: 12 } : { xs: 6, md: 8 }, 
                      height: activeSlideIndex === idx ? { xs: 10, md: 12 } : { xs: 6, md: 8 }, 
                      borderRadius: '50%', 
                      bgcolor: activeSlideIndex === idx ? '#ff6b6b' : 'rgba(0,0,0,0.25)', 
                      cursor: 'pointer', 
                      transition: 'all 0.3s',
                      boxShadow: activeSlideIndex === idx ? '0 0 10px rgba(255,107,107,0.5)' : 'none'
                    }} 
                  />
                </motion.div>
              ))}
            </Box>
          )}
        </Box>
      </Box>
    );
  }
  
  // Core Values Section with progressive reveal
  if (sectionId === 'core-values') {
    const isGrid = slide.type === 'grid';
    
    return (
      <Box ref={sectionRef} sx={{ height: '100%', width: '100%' }}>
        <Box sx={{ height: '100%', background: '#ECECEC', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'auto' }}>
          {isGrid && (
            <Box sx={{ width: '100%', display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: { xs: 3, md: 8 }, maxWidth: 1000, px: { xs: 3, md: 4 } }}>
              {slide.items?.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8, rotateX: 90 }}
                  animate={hasRevealed ? { opacity: 1, scale: 1, rotateX: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.12, type: "spring", stiffness: 150 }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <Typography sx={{ fontSize: { xs: 18, md: 26 }, fontWeight: 800, lineHeight: 1.4 }}>{item.title}</Typography>
                  <Typography sx={{ mt: 1, color: '#666', fontSize: { xs: 12, md: 16 } }}>{item.desc}</Typography>
                </motion.div>
              ))}
            </Box>
          )}
          
          {slide.type === 'stats' && (
            <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
              <motion.div
                initial={{ opacity: 0, scale: 1.1 }}
                animate={hasRevealed ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8 }}
                style={{ width: '100%', height: '100%' }}
              >
                <Box component="img" src="/img/array4.png" sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </motion.div>
              <Box sx={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.35)', color: '#fff' }}>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(5, 1fr)' }, gap: { xs: 2, md: 12 }, textAlign: 'center', maxWidth: 1300, px: { xs: 2, md: 4 } }}>
                  {slide.stats?.map((s, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 60 }}
                      animate={hasRevealed ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: i * 0.15, type: "spring", stiffness: 120 }}
                    >
                      <Typography sx={{ fontSize: { xs: 20, md: 50 }, lineHeight: 1.8, fontWeight: 600 }}>{s.value}</Typography>
                      <Typography sx={{ fontSize: { xs: 10, md: 18 }, lineHeight: 1.8 }}>{s.label}</Typography>
                    </motion.div>
                  ))}
                </Box>
              </Box>
            </Box>
          )}
          
          {/* Progress Dots */}
          <Box sx={{ position: 'absolute', bottom: 30, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: { xs: 1, md: 1.5 }, zIndex: 10 }}>
            {[0, 1].map((idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0 }}
                animate={hasRevealed ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.7 + idx * 0.1, type: "spring", stiffness: 200 }}
              >
                <Box 
                  onClick={() => setActiveSlide(idx)} 
                  sx={{ 
                    width: activeSlideIndex === idx ? { xs: 8, md: 10 } : { xs: 4, md: 6 }, 
                    height: activeSlideIndex === idx ? { xs: 8, md: 10 } : { xs: 4, md: 6 }, 
                    borderRadius: '50%', 
                    bgcolor: activeSlideIndex === idx ? '#000' : 'rgba(0,0,0,0.3)', 
                    cursor: 'pointer', 
                    transition: 'all 0.3s' 
                  }} 
                />
              </motion.div>
            ))}
          </Box>
        </Box>
      </Box>
    );
  }
  
  // Clients Section - Staggered card reveal
  if (sectionId === 'clients') {
    return (
      <Box ref={sectionRef} sx={{ height: '100%', width: '100%', overflow: 'auto' }}>
        <Box sx={{ minHeight: '100%', px: { xs: 2, md: 6 }, py: { xs: 4, md: 10 }, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', backgroundColor: '#ECECEC' }}>
          <Box sx={{ width: '100%', maxWidth: 1400 }}>
            <motion.div
              initial={{ opacity: 0, y: -50, filter: "blur(8px)" }}
              animate={hasRevealed ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
            >
              <Typography sx={{ fontSize: { xs: 28, md: 55 }, fontWeight: 600, mb: { xs: 4, md: 15 }, lineHeight: 1.1, textAlign: 'left' }}>{slide.title}</Typography>
            </motion.div>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: { xs: 3, md: 5 } }}>
              {slide.cards?.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 80, scale: 0.95 }}
                  animate={hasRevealed ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.15, type: "spring", stiffness: 150 }}
                  whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                  style={{ backgroundColor: '#fff', padding: '24px', borderRadius: 16, boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}
                >
                  <Typography sx={{ fontSize: { xs: 18, md: 24 }, fontWeight: 800, mb: 1.5, textAlign: 'left' }}>{item.title}</Typography>
                  <Typography sx={{ fontSize: { xs: 13, md: 17 }, lineHeight: 1.8, color: '#666', textAlign: 'left' }}>{item.desc}</Typography>
                </motion.div>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }
  
  // Quote Section with form reveal
  if (sectionId === 'quote') {
    return (
      <Box ref={sectionRef} sx={{ height: '100%', width: '100%', overflow: 'auto' }}>
        <Box sx={{ minHeight: '100%', backgroundColor: 'secondary.main', px: { xs: 2, md: 6 }, py: { xs: 4, md: 10 } }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '0.8fr 1.2fr' }, gap: { xs: 4, md: 10 }, alignItems: 'start', py: { xs: 4, md: 8 } }}>
            <Box>
              <motion.div
                custom={0}
                initial="hidden"
                animate={hasRevealed ? "visible" : "hidden"}
                variants={textRevealVariants}
              >
                <Typography sx={{ color: '#fff', fontSize: { xs: 24, md: 44 }, fontWeight: 600, mb: 2, textAlign: 'left' }}>Get a Quote Now</Typography>
              </motion.div>
              <motion.div
                custom={1}
                initial="hidden"
                animate={hasRevealed ? "visible" : "hidden"}
                variants={textRevealVariants}
              >
                <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: { xs: 14, md: 17 }, lineHeight: 1.6, mb: 5 }}>Get a Quote Immediately Upon Form Submission</Typography>
              </motion.div>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {[
                  { icon: <LocationOnOutlinedIcon sx={{ fontSize: 18 }} />, title: 'Office', value: '3rd Floor, Habsiguda Main Road,<br />Hyderabad, Telangana' },
                  { icon: <MailOutlineOutlinedIcon sx={{ fontSize: 18 }} />, title: 'Email', value: 'hello@unicusfacilities.in' },
                  { icon: <CallOutlinedIcon sx={{ fontSize: 18 }} />, title: 'Call us', value: '+91 9550322111' },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    custom={idx + 2}
                    initial="hidden"
                    animate={hasRevealed ? "visible" : "hidden"}
                    variants={progressiveRevealVariants}
                  >
                    <Box sx={{ display: 'grid', gridTemplateColumns: '40px 100px 1fr', gap: 2, alignItems: 'center' }}>
                      <Box sx={{ width: 40, height: 40, border: '1px solid rgba(255,255,255,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>{item.icon}</Box>
                      <Typography sx={{ color: '#fff', fontSize: { xs: 16, md: 22 }, fontWeight: 700 }}>{item.title}</Typography>
                      <Typography sx={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, fontSize: { xs: 12, md: 16 } }} dangerouslySetInnerHTML={{ __html: item.value }} />
                    </Box>
                  </motion.div>
                ))}
              </Box>
            </Box>
            <motion.div
              custom={5}
              initial="hidden"
              animate={hasRevealed ? "visible" : "hidden"}
              variants={progressiveRevealVariants}
            >
              <Box component="form" onSubmit={handleSubmit} sx={{ display: 'grid', gap: 2 }}>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
                  <TextField label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} error={!!errors.fullName} helperText={errors.fullName} fullWidth sx={inputStyle} />
                  <TextField label="Organization Name" name="organization" value={formData.organization} onChange={handleChange} error={!!errors.organization} helperText={errors.organization} fullWidth sx={inputStyle} />
                </Box>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
                  <TextField label="Designation" name="designation" value={formData.designation} onChange={handleChange} error={!!errors.designation} helperText={errors.designation} fullWidth sx={inputStyle} />
                  <TextField label="Work Email" name="email" value={formData.email} onChange={handleChange} error={!!errors.email} helperText={errors.email} fullWidth sx={inputStyle} />
                </Box>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
                  <TextField label="Phone" name="phone" value={formData.phone} onChange={handleChange} error={!!errors.phone} helperText={errors.phone} fullWidth sx={inputStyle} />
                  <TextField select label="Sector" name="sector" value={formData.sector} onChange={handleChange} error={!!errors.sector} helperText={errors.sector} fullWidth sx={inputStyle}>
                    {sectors.map((item) => (<MenuItem key={item} value={item}>{item}</MenuItem>))}
                  </TextField>
                </Box>
                <TextField select label="Service Needed" name="service" value={formData.service} onChange={handleChange} error={!!errors.service} helperText={errors.service} fullWidth sx={inputStyle}>
                  {servicesList.map((item) => (<MenuItem key={item} value={item}>{item}</MenuItem>))}
                </TextField>
                <TextField label="City" name="city" value={formData.city} onChange={handleChange} error={!!errors.city} helperText={errors.city} fullWidth sx={inputStyle} />
                <TextField multiline rows={4} label="Message" name="message" value={formData.message} onChange={handleChange} error={!!errors.message} helperText={errors.message} fullWidth sx={inputStyle} />
                <Button type="submit" sx={{ mt: 1, width: 'fit-content', backgroundColor: '#fff', color: '#000', px: { xs: 3, md: 5 }, py: { xs: 1.5, md: 1.8 }, fontWeight: 700, fontSize: { xs: 13, md: 15 }, textTransform: 'none', borderRadius: 6 }}>Request a site assessment</Button>
              </Box>
            </motion.div>
          </Box>
        </Box>
      </Box>
    );
  }
  
  // FAQ Section with staggered reveal
  if (sectionId === 'faq') {
    return (
      <Box ref={sectionRef} sx={{ height: '100%', width: '100%', overflow: 'auto' }}>
        <Box sx={{ minHeight: '100%', backgroundColor: '#ECECEC', px: { xs: 2, sm: 3, md: 6 }, py: { xs: 4, md: 12 } }}>
          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            animate={hasRevealed ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.6 }}
          >
            <Typography sx={{ fontSize: { xs: 28, md: 70 }, fontWeight: 600, mb: { xs: 3, md: 8 }, textAlign: 'center' }}>Frequently Asked Questions</Typography>
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
                <Box sx={{ backgroundColor: '#fff', borderRadius: 3, overflow: 'hidden' }}>
                  <Box onClick={() => setActiveFaq(activeFaq === index ? null : index)} sx={{ px: { xs: 2, md: 4 }, py: { xs: 2, md: 3 }, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, cursor: 'pointer', '&:hover': { backgroundColor: '#f5f5f5' } }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 2, md: 4 } }}>
                      <Typography sx={{ fontSize: { xs: 16, md: 28 }, fontWeight: 800, color: '#999', minWidth: 30 }}>{index + 1}</Typography>
                      <Typography sx={{ fontSize: { xs: 14, md: 24 }, fontWeight: 700 }}>{item.q}</Typography>
                    </Box>
                    <Typography sx={{ fontSize: { xs: 20, md: 34 }, fontWeight: 300 }}>{activeFaq === index ? '−' : '+'}</Typography>
                  </Box>
                  <AnimatePresence>
                    {activeFaq === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Box sx={{ px: { xs: 2, md: 4 }, pb: { xs: 2, md: 4 }, ml: { xs: 4, md: 9 } }}>
                          <Typography sx={{ fontSize: { xs: 13, md: 19 }, lineHeight: 1.6, color: '#666' }}>{item.a}</Typography>
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
  }
  
  // Footer Section
  if (sectionId === 'footer') {
    const quickLinks = ['Explore', 'Privacy Policy', 'Terms of Use', 'Services', 'Sectors'];
    const companyLinks = ['About', 'Clients', 'Process', 'FAQ', 'Contact'];
    const socials = [{ icon: <InstagramIcon /> }, { icon: <YouTubeIcon /> }, { icon: <LinkedInIcon /> }, { icon: <XIcon /> }];
    
    return (
      <Box ref={sectionRef} sx={{ height: '100%', width: '100%', overflow: 'auto' }}>
        <Box sx={{ backgroundColor: 'secondary.main', color: '#fff', px: { xs: 3, md: 8 }, py: { xs: 4, md: 8 }, minHeight: '100%', display: 'flex', alignItems: 'center' }}>
          <Box sx={{ width: '100%', maxWidth: 1400, mx: 'auto' }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1.2fr 1fr 1fr' }, gap: { xs: 4, md: 10 } }}>
              <Box>
                <motion.div
                  custom={0}
                  initial="hidden"
                  animate={hasRevealed ? "visible" : "hidden"}
                  variants={progressiveRevealVariants}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Box component="img" src="/img/Brands.png" sx={{ width: { xs: 40, md: 75 }, height: { xs: 40, md: 75 }, objectFit: 'contain' }} />
                    <Typography sx={{ fontSize: { xs: 32, md: 70 }, fontWeight: 600, lineHeight: 1 }}>Unicus</Typography>
                  </Box>
                </motion.div>
                <motion.div
                  custom={1}
                  initial="hidden"
                  animate={hasRevealed ? "visible" : "hidden"}
                  variants={progressiveRevealVariants}
                >
                  <Typography sx={{ fontSize: { xs: 13, md: 15 }, opacity: 0.7, lineHeight: 1.6, maxWidth: 350 }}>Reliable facility management and manpower solutions for healthcare, commercial, residential and corporate sectors.</Typography>
                </motion.div>
                <motion.div
                  custom={2}
                  initial="hidden"
                  animate={hasRevealed ? "visible" : "hidden"}
                  variants={progressiveRevealVariants}
                >
                  <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
                    {socials.map((s, i) => (
                      <IconButton key={i} sx={{ border: '1px solid rgba(255,255,255,0.25)', color: '#fff', width: { xs: 36, md: 46 }, height: { xs: 36, md: 46 }, '&:hover': { backgroundColor: '#fff', color: '#000' } }}>{s.icon}</IconButton>
                    ))}
                  </Stack>
                </motion.div>
              </Box>
              <Box>
                <motion.div
                  custom={3}
                  initial="hidden"
                  animate={hasRevealed ? "visible" : "hidden"}
                  variants={progressiveRevealVariants}
                >
                  <Typography sx={{ fontWeight: 800, mb: 2, fontSize: { xs: 18, md: 20 } }}>Quick Links</Typography>
                </motion.div>
                <Stack spacing={1.5}>
                  {quickLinks.map((item, i) => (
                    <motion.div
                      key={i}
                      custom={i + 4}
                      initial="hidden"
                      animate={hasRevealed ? "visible" : "hidden"}
                      variants={progressiveRevealVariants}
                    >
                      <Link underline="none" sx={{ color: '#fff', fontSize: { xs: 13, md: 15 }, opacity: 0.7, cursor: 'pointer', width: 'fit-content', '&:hover': { opacity: 1, pl: 1 } }}>{item}</Link>
                    </motion.div>
                  ))}
                </Stack>
              </Box>
              <Box>
                <motion.div
                  custom={10}
                  initial="hidden"
                  animate={hasRevealed ? "visible" : "hidden"}
                  variants={progressiveRevealVariants}
                >
                  <Typography sx={{ fontWeight: 800, mb: 2, fontSize: { xs: 18, md: 20 } }}>Company</Typography>
                </motion.div>
                <Stack spacing={1.5}>
                  {companyLinks.map((item, i) => (
                    <motion.div
                      key={i}
                      custom={i + 11}
                      initial="hidden"
                      animate={hasRevealed ? "visible" : "hidden"}
                      variants={progressiveRevealVariants}
                    >
                      <Link underline="none" sx={{ color: '#fff', fontSize: { xs: 13, md: 15 }, opacity: 0.7, cursor: 'pointer', width: 'fit-content', '&:hover': { opacity: 1, pl: 1 } }}>{item}</Link>
                    </motion.div>
                  ))}
                </Stack>
              </Box>
            </Box>
            <motion.div
              custom={16}
              initial="hidden"
              animate={hasRevealed ? "visible" : "hidden"}
              variants={progressiveRevealVariants}
            >
              <Box sx={{ textAlign: 'center', mt: { xs: 4, md: 8 }, pt: { xs: 3, md: 4 }, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <Typography sx={{ fontSize: { xs: 11, md: 14 }, opacity: 0.5 }}>© {new Date().getFullYear()} Unicus Facilities. All rights reserved.</Typography>
              </Box>
            </motion.div>
          </Box>
        </Box>
      </Box>
    );
  }
  
  return null;
}

// ================= HEADER COMPONENT =================
function Header({ setActiveSection, activeSection, sections }) {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : 'auto'; return () => { document.body.style.overflow = 'auto'; }; }, [open]);
  
  const menuItems = sections.map((section, idx) => ({ label: section.name, index: idx })).filter(s => s.index !== 0 && s.index !== 1 && s.index !== sections.length - 1);
  
  return (
    <>
      <AppBar position="fixed" elevation={0} sx={{ top: 20, background: 'transparent', boxShadow: 'none', zIndex: 1200 }}>
        <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 4 } }}>
          <IconButton onClick={() => setOpen(!open)} sx={{ color: '#fff', width: { xs: 50, md: 60 }, height: { xs: 50, md: 60 }, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.18)', background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(14px)' }}>
            {open ? <CloseIcon size={isMobile ? 20 : 24} /> : <MenuIcon size={isMobile ? 20 : 24} />}
          </IconButton>
          <Box onClick={() => setActiveSection(0)} sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }}>
            <Box component="img" src="/img/Brands.png" sx={{ width: { xs: 35, md: 60 } }} />
            <Typography sx={{ fontSize: { xs: 22, md: 44 }, color: '#fff', fontWeight: 600 }}>Unicus</Typography>
          </Box>
          <Box onClick={() => setActiveSection(8)} sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#fff', cursor: 'pointer' }}>
            <Typography sx={{ fontWeight: 700, fontSize: { xs: 12, md: 24 } }}>GET QUOTE</Typography>
            <ArrowUpRight size={isMobile ? 20 : 28} />
          </Box>
        </Toolbar>
      </AppBar>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ clipPath: 'circle(0% at 0% 0%)', opacity: 0 }} animate={{ clipPath: 'circle(160% at 0% 0%)', opacity: 1, transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } }} exit={{ clipPath: 'circle(0% at 0% 0%)', opacity: 0, transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } }} style={{ position: 'fixed', inset: 0, backgroundColor: theme.palette.secondary.main, zIndex: 2000, overflow: 'hidden', color: '#fff' }}>
            <motion.div initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -80, opacity: 0 }} transition={{ duration: 0.5 }} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 30px' }}>
              <IconButton onClick={() => setOpen(false)} sx={{ color: '#fff', width: 50, height: 50, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.18)', background: 'rgba(255,255,255,0.05)' }}><CloseIcon size={24} /></IconButton>
              <Box onClick={() => { setActiveSection(0); setOpen(false); }} sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }}>
                <Box component="img" src="/img/Brands.png" sx={{ width: { xs: 35, md: 60 } }} />
                <Typography sx={{ fontSize: { xs: 20, md: 40 }, fontWeight: 600 }}>Unicus</Typography>
              </Box>
              <Box onClick={() => { setActiveSection(8); setOpen(false); }} sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }}>
                <Typography sx={{ fontSize: { xs: 12, md: 24 }, fontWeight: 700 }}>GET QUOTE</Typography>
                <ArrowUpRight size={24} />
              </Box>
            </motion.div>
            <Box sx={{ height: 'calc(100vh - 100px)', display: 'flex', flexDirection: { xs: 'column', md: 'row' }, px: { xs: 3, md: 10 }, overflow: 'auto' }}>
              <motion.div initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1, transition: { duration: 0.8, delay: 0.2 } }} exit={{ x: -100, opacity: 0 }} style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', py: { xs: 4, md: 0 } }}>
                <Stack spacing={4} width="100%" maxWidth={420}>
                  {[
                    { icon: <MapPin size={20} />, title: 'Office', value: '3rd Floor, Habsiguda Main Road, Hyderabad, Telangana' },
                    { icon: <Mail size={20} />, title: 'Email', value: 'hello@unicusfacilities.in' },
                    { icon: <Phone size={20} />, title: 'Call Us', value: '+91 9550322111' },
                  ].map((item, index) => (
                    <motion.div key={index} initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1, transition: { delay: 0.3 + index * 0.2, duration: 0.7 } }}>
                      <Box sx={{ p: { xs: 3, md: 4 }, borderRadius: 5, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(12px)' }}>
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
              <Box sx={{ flex: 1.4, display: 'flex', justifyContent: 'center', alignItems: 'center', py: { xs: 4, md: 0 } }}>
                <Stack spacing={2}>
                  {menuItems.map((item, index) => (
                    <motion.div key={item.label} initial={{ opacity: 0, y: 120 }} animate={{ opacity: 1, y: 0, transition: { delay: index * 0.1, duration: 0.8 } }} exit={{ opacity: 0, y: 80 }}>
                      <Typography onClick={() => { setActiveSection(item.index); setOpen(false); }} sx={{
                        fontSize: { xs: 32, md: 70 }, fontWeight: activeSection === item.index ? 900 : 500, lineHeight: 1, cursor: 'pointer', position: 'relative', width: 'fit-content', transition: 'all 0.5s ease',
                        color: activeSection === item.index ? '#fff' : 'rgba(255,255,255,0.7)',
                        '&::before': { content: `"0${index + 1}"`, position: 'absolute', left: { xs: -50, md: -70 }, top: '50%', transform: 'translateY(-50%)', fontSize: { xs: 14, md: 18 }, opacity: 0, transition: '0.4s' },
                        '&::after': { content: '""', position: 'absolute', left: 0, bottom: -8, width: activeSection === item.index ? '100%' : 0, height: { xs: 3, md: 5 }, borderRadius: 10, backgroundColor: '#fff', transition: '0.5s' },
                        '&:hover': { transform: { xs: 'translateX(15px)', md: 'translateX(30px)' }, letterSpacing: { xs: 2, md: 4 }, opacity: 0.75, color: '#fff' },
                        '&:hover::after': { width: '100%' }, '&:hover::before': { opacity: 1, left: { xs: -35, md: -50 } },
                      }}>{item.label}</Typography>
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