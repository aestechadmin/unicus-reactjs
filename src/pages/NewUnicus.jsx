// Unicus.jsx - Complete with all sections
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import Observer from "gsap/Observer";

import Hero from "./NewUnicus/Hero";
import Experience from "./NewUnicus/Experience";
import Growth from "./NewUnicus/Growth";
import Quote from "./NewUnicus/Quote";
import Footer from "./NewUnicus/Footer";
import Header from "./NewUnicus/Header";
import Sectors from "./NewUnicus/Sectors";
import Clients from "./NewUnicus/Clients";
import Process from "./NewUnicus/Process";
import Vision from "./NewUnicus/Vision";
import Company from "./NewUnicus/Company";

gsap.registerPlugin(ScrollTrigger, Observer);

const sectionIds = [
   "hero",
  "vision",
  "company",
  // "experience",
  "clients-section",
  "process-section",
  "sectors-section",
  "growth-section",
  "quote-section",
];

// Website Data
export const websiteData = {
    hero: {
    backgroundImage: "/img/sectorbg.jpg", // Changed from video to image
    title: "Clean Spaces.",
    subtitle: "Sharper Watch.",
  },
  titleData: {
    mainTitle: "Why Unicus Facilities",
  },
  experienceSlides: [
    {
      id: 1,
      type: "image",
      image: "/img/experience1.png",
      alt: "Deep specialization",
      description: "Deep specialization in hospital and medical college sanitation and security 4 a rare differentiator in the manpower sector",
    },
    {
      id: 2,
      type: "image",
      image: "/img/experience2.png",
      alt: "Smart facility management",
      description: "Medical-grade cleaning equipment and technologies meeting strict healthcare specifications",
    },
    {
      id: 3,
      type: "image",
      image: "/img/experience3.png",
      alt: "Sustainable solutions",
      description: "Medical-grade cleaning equipment and technologies meeting strict healthcare specifications Contact Us",
    }
  ],
  growth: {
    id: 'growth',
    name: 'Growth',
    slides: [
      { type: 'partner', name: 'KIMS', description: 'No more scattered DMs or endless apps. Chat, plan, and manage every project in one clean space.', image: '/img/Img6.png' },
      { type: 'partner', name: 'TNR Constructions', description: 'No more scattered DMs or endless apps. Chat, plan, and manage every project in one clean space.', image: '/img/Img9.png' },
      { type: 'partner', name: 'JIVI Towers', description: 'No more scattered DMs or endless apps. Chat, plan, and manage every project in one clean space.', image: '/img/Img8.png' },
      { type: 'partner', name: 'Tranquil', description: 'No more scattered DMs or endless apps. Chat, plan, and manage every project in one clean space.', image: '/img/Img9.png' },
      { type: 'partner', name: 'Skilltyro', description: 'No more scattered DMs or endless apps. Chat, plan, and manage every project in one clean space.', image: '/img/Img7.png' },
      { type: 'partner', name: 'DocTutorials', description: 'No more scattered DMs or endless apps. Chat, plan, and manage every project in one clean space.', image: '/img/Img11.png' }
    ],
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
       { type: 'service', name: 'Housekeeping', description: 'No more scattered DMs or endless apps. Chat, plan, and manage every project in one clean space.', image: '/img/Img5.png' },
        { type: 'service', name: 'Security & Watch & Ward', description: 'No more scattered DMs or endless apps. Chat, plan, and manage every project in one clean space.', image: '/img/Img5.png' },
        { type: 'service', name: 'Pest Control', description: 'No more scattered DMs or endless apps. Chat, plan, and manage every project in one clean space.', image: '/img/Img5.png' },
        { type: 'service', name: 'Lift & Generator O&M', description: 'No more scattered DMs or endless apps. Chat, plan, and manage every project in one clean space.', image: '/img/Img5.png' },
        { type: 'service', name: 'Electrical Maintenance', description: 'No more scattered DMs or endless apps. Chat, plan, and manage every project in one clean space.', image: '/img/Img5.png' },
        { type: 'service', name: 'Civil Work Maintenance', description: 'No more scattered DMs or endless apps. Chat, plan, and manage every project in one clean space.', image: '/img/Img5.png' },
        { type: 'service', name: 'Plumbing & Water Supply', description: 'No more scattered DMs or endless apps. Chat, plan, and manage every project in one clean space.', image: '/img/Img5.png' },
        { type: 'service', name: 'Gardening & Landscaping', description: 'No more scattered DMs or endless apps. Chat, plan, and manage every project in one clean space.', image: '/img/Img5.png' }
      ],
  },
   process:{
      id: 'process',
      name: 'Process',
      slides: [
        { type: 'title', title: 'Specialized Services' },
        { type: 'service', name: 'Corporate Multispeciality Hospitals', description: 'No more scattered DMs or endless apps. Chat, plan, and manage every project in one clean space.', image: '/img/Img5.png' },
        { type: 'service', name: 'Residential Apartments & Villas', description: 'No more scattered DMs or endless apps. Chat, plan, and manage every project in one clean space.', image: '/img/Img5.png' },
        { type: 'service', name: 'Commercial Buildings', description: 'No more scattered DMs or endless apps. Chat, plan, and manage every project in one clean space.', image: '/img/Img5.png' },
        { type: 'service', name: 'Educational Institutions', description: 'No more scattered DMs or endless apps. Chat, plan, and manage every project in one clean space.', image: '/img/Img5.png' },
        { type: 'service', name: 'Industrial Units', description: 'No more scattered DMs or endless apps. Chat, plan, and manage every project in one clean space.', image: '/img/Img5.png' },
        { type: 'service', name: 'Corporate Offices', description: 'No more scattered DMs or endless apps. Chat, plan, and manage every project in one clean space.', image: '/img/Img5.png' }
      ],
    },
    clients: {  // <-- ADD THIS SECTION
      title: "Commitment to Clients",
      cards: [
        { 
          title: "Reliable & Compliant", 
          desc: "Timely, regulation-adherent service with strict quality controls",
          delay: 0
        },
        { 
          title: "Flexible Scheduling", 
          desc: "Customized workflows that adapt to your unique business needs",
          delay: 0.1
        },
        { 
          title: "Proactive Reporting", 
          desc: "In-depth updates and real-time analytics for full transparency",
          delay: 0.2
        },
        { 
          title: "Long-Term Partnerships", 
          desc: "Focused on excellence with continuous improvement initiatives",
          delay: 0.3
        }
      ]
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

// In Unicus.jsx - Add this after your imports
export const scrollToQuote = () => {
  // First try to use the Lenis instance if available
  const lenisInstance = window.__lenis;
  const quoteSection = document.getElementById("quote-section");
  
  if (!quoteSection) {
    // Retry after a short delay if element not found
    setTimeout(() => {
      const retryQuote = document.getElementById("quote-section");
      if (retryQuote) {
        if (lenisInstance) {
          lenisInstance.scrollTo(retryQuote, { offset: -90, duration: 1.8 });
        } else {
          const offset = -90;
          const targetTop = retryQuote.getBoundingClientRect().top + window.scrollY + offset;
          window.scrollTo({ top: targetTop, behavior: "smooth" });
        }
      }
    }, 100);
    return;
  }

  if (lenisInstance) {
    lenisInstance.scrollTo(quoteSection, { offset: -90, duration: 1.8 });
  } else {
    const offset = -90;
    const targetTop = quoteSection.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top: targetTop, behavior: "smooth" });
  }
};

export default function NewUnicus() {
  const [activeSection, setActiveSection] = useState(0);
  const heroContainerRef = useRef(null);
  const expSectionRef = useRef(null);
  const endTitleRef = useRef(null);
  const endButtonRef = useRef(null);
  const lenisRef = useRef(null);
  const rafRef = useRef(null);

  const sections = [
  { id: "hero", name: "Home" },
  { id: "vision", name: "Vision" },
  { id: "company", name: "Company Overview" },
  // { id: "experience", name: "Why UNICUS Facilities?" },
  { id: "clients-section", name: "How We Work" },
  { id: "process-section", name: "Sector" },
  { id: "sectors-section", name: "Service" },
  { id: "growth-section", name: "Clients" },
  { id: 'faq-section', name: 'FAQ' },
];

  const scrollToSection = useCallback((index) => {
    const targetId = sectionIds[index];
    if (!targetId) return;

    const element = document.getElementById(targetId);
    if (!element) return;

    const offset = -90;

    if (lenisRef.current) {
      lenisRef.current.scrollTo(element, { offset, duration: 1.8 });
      return;
    }

    const targetTop = element.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top: targetTop, behavior: "smooth" });
  }, []);

  const handleSectionClick = useCallback((index) => {
    setActiveSection(index);
    scrollToSection(index);
  }, [scrollToSection]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const lenis = new Lenis({
      duration: 2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: true,
      touchMultiplier: 0.3,
      wheelMultiplier: 0.28,
      normalizeWheel: true,
    });

    window.__lenis = lenis;
    lenisRef.current = lenis;
    lenis.on("scroll", () => {
      ScrollTrigger.update();
    });

    const scroller = document.scrollingElement || document.documentElement;

    ScrollTrigger.scrollerProxy(scroller, {
      scrollTop(value) {
        if (arguments.length) {
          lenis.scrollTo(value, { immediate: true });
          return;
        }
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
      },
      pinType: scroller.style.transform ? "transform" : "fixed",
    });

    const raf = (time) => {
      lenis.raf(time);
      ScrollTrigger.update();
      rafRef.current = requestAnimationFrame(raf);
    };
    rafRef.current = requestAnimationFrame(raf);

    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1500);

    return () => {
      clearTimeout(refreshTimeout);
      lenis.off("scroll", ScrollTrigger.update);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      ScrollTrigger.getAll().forEach((st) => st.kill());
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    scrollToSection(activeSection);
  }, [activeSection, scrollToSection]);

  return (
    <Box sx={{ overflowX: "hidden", background: '#E6F1FE' }}>
      <Header 
        onSectionClick={handleSectionClick}
        activeSection={activeSection} 
        sections={sections}
      />
      
      <div id="hero">
        <Hero heroContainerRef={heroContainerRef} />
      </div>

      <div id="vision">
        <Vision />
      </div>

      <div id="company">
        <Company />
      </div>
      
      {/* <div id="experience">
        <Experience 
          expSectionRef={expSectionRef} 
          endTitleRef={endTitleRef} 
          endButtonRef={endButtonRef}
        />
      </div> */}

      <div id="clients-section">
        <Clients clientsData={websiteData.clients}/>
      </div>

      <div id="process-section">
        <Process />
      </div>

      <div id="sectors-section">
        <Sectors />
      </div>


            
      <div id="growth-section">
        <Growth />
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