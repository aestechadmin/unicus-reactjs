// Unicus.jsx - Complete with all sections
import React, { useRef, useEffect, useState } from "react";
import { Box } from "@mui/material";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";
import Observer from "gsap/Observer";

import Hero from "./Unicus/Hero";
import Experience from "./Unicus/Experience";
import ComingSoon from "./Unicus/ComingSoon";
import Growth from "./Unicus/Growth";
import Technology from "./Unicus/Technology";
import Quote from "./Unicus/Quote";
import FAQ from "./Unicus/FAQ";
import Footer from "./Unicus/Footer";
import Header from "./Unicus/Header";
import Sectors from "./Unicus/Sectors";
import Clients from "./Unicus/Clients";
import Process from "./Unicus/Process";

gsap.registerPlugin(ScrollTrigger, Observer);

// Website Data
export const websiteData = {
  hero: {
    video: "/img/initialVideo.mp4",
    title: "Clean Spaces",
    subtitle: "Smarter Facility Management",
  },
  titleData: {
    mainTitle: "Why Unicus Facilities",
  },
  experienceSlides: [
    {
      id: 1,
      type: "image",
      image: "/img/array2.png",
      alt: "Deep specialization",
      description: "Deep specialization in hospital and medical college sanitation and security",
    },
    {
      id: 2,
      type: "image",
      image: "/img/Img1.png",
      alt: "Smart facility management",
      description: "Leverage cutting-edge technology to optimize your facility operations.",
    },
    {
      id: 3,
      type: "image",
      image: "/img/Img3.png",
      alt: "Sustainable solutions",
      description: "Eco-friendly practices that protect our planet.",
    },
    {
      id: 4,
      type: "description",
      description: "UNICUS Security Services Pvt Ltd is a dedicated manpower agency",
    },
  ],
  comingSoon: {
    feature: {
      mainImage: "/img/Img4.png",
      appIcon: "/img/Img3.png",
      description: "Uncompromising focus on quality and reliability",
      features: [
        "Real-time service tracking",
        "Instant booking and scheduling",
        "Digital reporting and analytics",
        "24/7 customer support"
      ],
    },
    description: {
      id: 5,
      type: "coming-soon-desc",
      description: "Seamless door to door travel, all from a few taps on our app.",
    },
  },
  growth: {
    id: 'growth',
    name: 'Growth',
    slides: [
      { type: 'title', title: 'With partners like this,\nthere\'s nowhere to go but the best' },
      { type: 'partner', name: 'KIMS', description: 'Healthcare-grade facilities management', image: '/img/Img6.png' },
      { type: 'partner', name: 'TNR Constructions', description: 'Residential community solutions', image: '/img/Img9.png' },
      { type: 'partner', name: 'JIVI Towers', description: 'Commercial facility services', image: '/img/Img8.png' },
      { type: 'partner', name: 'Tranquil', description: 'Educational institution support', image: '/img/Img9.png' },
      { type: 'partner', name: 'Skilltyro', description: 'Industrial operations management', image: '/img/Img7.png' },
      { type: 'partner', name: 'DocTutorials', description: 'Corporate workspace solutions', image: '/img/Img11.png' }
    ],
    listItems: ['KIMS', 'TNR Constructions', 'JIVI Towers', 'Tranquil', 'Skilltyro', 'DocTutorials']
  },
  technology: {
    backgroundImage: {
      desktop: "https://cdn.sanity.io/images/h5mp19kq/production/fe892333d4c9a9934032f2ee33da32ac0f61211f-3200x1800.jpg?w=2000&fm=webp&q=90",
      mobile: "https://cdn.sanity.io/images/h5mp19kq/production/bb2f1438061f5e799944e0ba4659720790d63bf2-1125x2250.jpg?rect=0,0,914,2250&w=750&fm=webp&q=90",
    },
    title: "Technology & Innovation",
    items: [
      { title: "Reliable & Compliant", desc: "Timely, regulation-adherent service" },
      { title: "Flexible Scheduling", desc: "Customized workflows" },
      { title: "Proactive Reporting", desc: "In-depth updates" },
      { title: "Long-Term Partnerships", desc: "Focused on excellence" }
    ],
    stats: [
      { value: "2022", label: "Founded" },
      { value: "4", label: "Years" },
      { value: "400+", label: "Clients" },
      { value: "4Cr+", label: "Annual Turnover" },
      { value: "2", label: "States Covered" }
    ],
  },
  sectors: {
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
   process:{
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
  faq: {
    questions: [
      { q: "What facility management services do you offer?", a: "We offer comprehensive facility management including cleaning services, security, maintenance, housekeeping, pest control, and specialized manpower solutions for healthcare, commercial, residential, and corporate sectors." },
      { q: "How quickly can you provide services?", a: "We provide rapid deployment within 24-48 hours based on your requirements. Our team ensures quick onboarding and seamless service delivery." },
      { q: "Are your services compliant with industry regulations?", a: "Yes, all our services strictly adhere to industry regulations and safety standards. We maintain proper certifications and compliance documentation." },
      { q: "Do you provide customized facility solutions?", a: "Absolutely! We understand each client has unique needs. We work closely with you to develop tailored solutions that align with your specific requirements." },
      { q: "How do you ensure quality service?", a: "We have rigorous quality control processes, regular inspections, client feedback systems, and continuous training programs for our staff to maintain high service standards." },
    ]
  }
};

export default function Unicus() {
  const [activeSection, setActiveSection] = useState(0);
  const heroContainerRef = useRef(null);
  const expSectionRef = useRef(null);
  const endTitleRef = useRef(null);
  const endButtonRef = useRef(null);
  
  const sections = [
    { id: 'hero', name: 'Home', ref: heroContainerRef },
    { id: 'experience', name: 'Why Unicus', ref: expSectionRef },
    { id: 'growth', name: 'Partners' },
    { id: 'sectors', name: 'Sectors' },
    { id: 'process', name: 'Process' },
    { id: 'quote', name: 'Quote' },
    { id: 'faq', name: 'FAQ' },
    { id: 'footer', name: 'Footer' },
  ];

  useGSAP(() => {
    const lenis = new Lenis({
      duration: 4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -8 * t)),
      smoothWheel: true,
      smoothTouch: false,
      touchMultiplier: 0.3,
      wheelMultiplier: 0.5,
      normalizeWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      ScrollTrigger.update();
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Smooth scroll to section when activeSection changes
    const scrollToSection = () => {
      const sectionIds = [
        'hero',           // index 0 - Home
        'experience',     // index 1 - Why Unicus
        'growth-section', // index 2 - Partners
        'sectors-section',// index 3 - Sectors
        'process-section',// index 5 - Process
        'quote-section',  // index 6 - Quote
        'faq-section',    // index 7 - FAQ
        'footer-section'  // index 8 - Footer
      ];
      const element = document.getElementById(sectionIds[activeSection]);
      if (element) {
        lenis.scrollTo(element, { offset: 0, duration: 1.5 });
      }
    };
    
    scrollToSection();
    
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      lenis.destroy();
    };
  }, [activeSection]);

  return (
    <Box sx={{ overflowX: "hidden" }}>
      <Header 
        setActiveSection={setActiveSection} 
        activeSection={activeSection} 
        sections={sections}
      />
      
      <div id="hero">
        <Hero heroContainerRef={heroContainerRef} />
      </div>
      
      <div id="experience">
        <Experience 
          expSectionRef={expSectionRef} 
          endTitleRef={endTitleRef} 
          endButtonRef={endButtonRef}
        />
      </div>
      
      <div id="coming-soon-section">
        <ComingSoon />
      </div>
      
      <div id="growth-section">
        <Growth />
      </div>
      
      <div id="technology-section">
        <Technology />
      </div>

      <div id="sectors-section">
        <Sectors />
      </div>

      <div id="clients-section">
        <Clients />
      </div>

      <div id="process-section">
        <Process />
      </div>

      <div id="faq-section">
        <FAQ />
      </div>
      
      <div id="quote-section">
        <Quote />
      </div>
      
      <div id="footer-section">
        <Footer />
      </div>
      
      <style>
        {`
          html { scroll-behavior: smooth; }
          body { margin: 0; padding: 0; overflow-x: hidden; }
          ::-webkit-scrollbar { display: none; }
          * { -ms-overflow-style: none; scrollbar-width: none; }
          .letter { display: inline-block; line-height: 1.2; white-space: pre; transform-style: preserve-3d; }
          .animated-char { display: inline-block; white-space: pre; transition: all 0.5s cubic-bezier(0.2, 0.9, 0.4, 1.1); }
          .coming-soon-char { display: inline-block; white-space: pre; transform-style: preserve-3d; }
          .desc-char { display: inline-block; white-space: pre; transition: all 0.6s cubic-bezier(0.2, 0.9, 0.4, 1.1); }
          .desc-char-coming { display: inline-block; white-space: pre; transition: all 0.5s cubic-bezier(0.2, 0.9, 0.4, 1.1); }
          .coming-desc-char { display: inline-block; white-space: pre; transition: all 0.6s cubic-bezier(0.2, 0.9, 0.4, 1.1); }
          .gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end { display: none !important; }
        `}
      </style>
    </Box>
  );
}