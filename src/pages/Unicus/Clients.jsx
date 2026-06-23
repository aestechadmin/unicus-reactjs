// Clients.jsx - Advanced animated component with black theme only
import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Clients = ({ clientsData }) => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const floatingElementsRef = useRef([]);
  const cardsRef = useRef([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  
  // Default data if none provided
  const data = clientsData || {
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
  };

  const { title, cards } = data;

  console.log(title, cards);

  // Set data loaded state when data changes
  useEffect(() => {
    if (clientsData) {
      setIsDataLoaded(true);
    }
  }, [clientsData]);

  // Scroll animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const sectionOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.5, 1, 1, 0.8]);
  const titleY = useTransform(scrollYProgress, [0, 0.3], [100, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.3, 0.6], [0, 1, 1]);

  // GSAP animations on mount and when data changes
  useEffect(() => {
    // Only run animations if data is loaded
    if (!isDataLoaded && !clientsData) return;

    const ctx = gsap.context(() => {
      // Animate floating background elements
      floatingElementsRef.current.forEach((el, i) => {
        if (el) {
          gsap.to(el, {
            y: "random(-50, 50)",
            x: "random(-40, 40)",
            rotation: "random(-15, 15)",
            duration: "random(5, 8)",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: i * 0.15
          });
        }
      });

      // Title text reveal animation with 3D effect
      if (titleRef.current) {
        const titleChars = titleRef.current.querySelectorAll('.title-char');
        if (titleChars.length > 0) {
          gsap.fromTo(titleChars,
            { 
              y: 120, 
              opacity: 0,
              rotationX: -120,
              scale: 0.5
            },
            {
              y: 0,
              opacity: 1,
              rotationX: 0,
              scale: 1,
              duration: 0.6,
              stagger: 0.03,
              ease: "back.out(1.4)",
              scrollTrigger: {
                trigger: titleRef.current,
                start: "top 80%",
                toggleActions: "play none none reverse"
              }
            }
          );
        }
      }

      // Cards staggered entrance with magnetic effect on hover
      cardsRef.current.forEach((card, idx) => {
        if (card) {
          // Card entrance animation
          gsap.fromTo(card,
            {
              y: 150,
              opacity: 0,
              rotationY: 30,
              filter: "blur(10px)"
            },
            {
              y: 0,
              opacity: 1,
              rotationY: 0,
              filter: "blur(0px)",
              duration: 0.8,
              delay: idx * 0.15,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse"
              }
            }
          );

          // Magnetic effect on mouse move
          card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            gsap.to(card, {
              rotateX: rotateX,
              rotateY: rotateY,
              duration: 0.5,
              ease: "power2.out",
              overwrite: true
            });
          });
          
          card.addEventListener('mouseleave', () => {
            gsap.to(card, {
              rotateX: 0,
              rotateY: 0,
              duration: 0.5,
              ease: "elastic.out(1, 0.5)"
            });
          });
        }
      });
    });

    return () => {
      ctx.revert();
      // Clean up card event listeners
      cardsRef.current.forEach((card) => {
        if (card) {
          card.removeEventListener('mousemove', () => {});
          card.removeEventListener('mouseleave', () => {});
        }
      });
    };
  }, [isDataLoaded, clientsData]); // Re-run when data changes

  // Force refresh ScrollTrigger when data changes
  useEffect(() => {
    if (isDataLoaded || clientsData) {
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    }
  }, [isDataLoaded, clientsData]);

  // Split title into characters for animation
  const titleChars = title?.split('').map((char, i) => (
    <span key={i} className="title-char" style={{ display: 'inline-block' }}>
      {char === ' ' ? '\u00A0' : char}
    </span>
  )) || [];

  return (
    <div className="clients-wrapper" ref={sectionRef}>
      {/* Animated Background Elements */}
      <div className="bg-elements">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="floating-element"
            ref={el => floatingElementsRef.current[i] = el}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 120 + 30}px`,
              height: `${Math.random() * 120 + 30}px`,
              animationDelay: `${Math.random() * 5}s`,
              background: `radial-gradient(circle, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0) 70%)`
            }}
          />
        ))}
      </div>

      {/* Subtle Grid Pattern */}
      <div className="grid-pattern" />

      <motion.div 
        className="clients-container"
        style={{ opacity: sectionOpacity }}
      >
        {/* Header Section */}
        <div className="clients-header" ref={titleRef}>
          <motion.div 
            className="title-badge"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            OUR PROMISE
          </motion.div>
          
          <motion.h1 
            className="clients-title"
            style={{ y: titleY, opacity: titleOpacity }}
          >
            {titleChars}
          </motion.h1>
          
          <motion.div 
            className="title-underline"
            initial={{ width: 0 }}
            whileInView={{ width: "100px" }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          />
        </div>

        {/* Cards Grid */}
        <div className="cards-grid">
          {cards && cards.map((card, idx) => (
            <div
              key={idx}
              className="client-card"
              ref={el => cardsRef.current[idx] = el}
              style={{
                background: '#FFFFFF',
                transition: 'box-shadow 0.3s ease'
              }}
            >
              {/* Animated Border Gradient */}
              <div className="card-border-animation" />
              
              {/* Card Number with animation */}
              <motion.div 
                className="card-number"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: (card.delay || 0) + 0.3, duration: 0.5 }}
                viewport={{ once: true }}
              >
                {String(idx + 1).padStart(2, '0')}
              </motion.div>
              
              {/* Card Title */}
              <motion.h3 
                className="card-title"
                initial={{ x: -40, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: (card.delay || 0) + 0.2, duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                {card.title}
              </motion.h3>
              
              {/* Card Description */}
              <motion.p 
                className="card-desc"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: (card.delay || 0) + 0.4, duration: 0.6 }}
                viewport={{ once: true }}
              >
                {card.desc}
              </motion.p>
              
              {/* Animated Line */}
              <motion.div 
                className="card-line"
                initial={{ width: 0 }}
                whileInView={{ width: "50px" }}
                transition={{ delay: (card.delay || 0) + 0.5, duration: 0.6 }}
                viewport={{ once: true }}
              />
              
              {/* Hover Effect Elements */}
              <div className="card-hover-effect">
                <div className="hover-shine" />
                <div className="hover-corner corner-tl" />
                <div className="hover-corner corner-tr" />
                <div className="hover-corner corner-bl" />
                <div className="hover-corner corner-br" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Decorative Animation */}
        <motion.div 
          className="bottom-decoration"
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="deco-line-left" />
          <div className="deco-dot-group">
            <div className="deco-dot" />
            <div className="deco-dot delay-1" />
            <div className="deco-dot delay-2" />
          </div>
          <div className="deco-line-right" />
        </motion.div>
      </motion.div>

      <style jsx="true">{`
        .clients-wrapper {
          position: relative;
          min-height: 100vh;
          background: #F5F4DE;
          overflow-x: hidden;
          padding: 100px 20px;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
        
        /* Background Floating Elements */
        .bg-elements {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          overflow: hidden;
          pointer-events: none;
          z-index: 0;
        }
        
        .floating-element {
          position: absolute;
          border-radius: 50%;
          opacity: 0.6;
          pointer-events: none;
          filter: blur(40px);
        }
        
        /* Grid Pattern */
        .grid-pattern {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px);
          background-size: 50px 50px;
          pointer-events: none;
          z-index: 0;
        }
        
        .clients-container {
          position: relative;
          z-index: 1;
          max-width: 1400px;
          margin: 0 auto;
        }
        
        /* Header Styles */
        .clients-header {
          text-align: center;
          margin-bottom: 80px;
        }
        
        .title-badge {
          display: inline-block;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 4px;
          color: #000000;
          background: rgba(0,0,0,0.05);
          padding: 8px 24px;
          border-radius: 50px;
          margin-bottom: 30px;
          text-transform: uppercase;
        }
        
        .clients-title {
          font-size: clamp(2.5rem, 8vw, 5rem);
          font-weight: 800;
          color: #000000;
          margin-bottom: 25px;
          letter-spacing: -0.02em;
          line-height: 1.2;
          perspective: 800px;
        }
        
        .title-underline {
          height: 3px;
          background: #000000;
          margin: 0 auto;
          border-radius: 3px;
        }
        
        /* Cards Grid */
        .cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 35px;
          margin-top: 20px;
        }
        
        .client-card {
          position: relative;
          padding: 50px 35px 45px;
          border-radius: 24px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.3s ease;
          transform-style: preserve-3d;
          box-shadow: 0 5px 20px rgba(0,0,0,0.05);
          border: 1px solid rgba(0,0,0,0.08);
        }
        
        .client-card:hover {
          box-shadow: 0 20px 40px rgba(0,0,0,0.12);
          border-color: rgba(0,0,0,0.15);
        }
        
        /* Card Border Animation */
        .card-border-animation {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 24px;
          padding: 2px;
          background: linear-gradient(135deg, transparent, #000000, transparent);
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
        }
        
        .client-card:hover .card-border-animation {
          opacity: 1;
          animation: borderRotate 3s linear infinite;
        }
        
        @keyframes borderRotate {
          0% { background: linear-gradient(0deg, transparent, #000000, transparent); }
          25% { background: linear-gradient(90deg, transparent, #000000, transparent); }
          50% { background: linear-gradient(180deg, transparent, #000000, transparent); }
          75% { background: linear-gradient(270deg, transparent, #000000, transparent); }
          100% { background: linear-gradient(360deg, transparent, #000000, transparent); }
        }
        
        .card-number {
          position: absolute;
          top: 30px;
          right: 30px;
          font-size: 3rem;
          font-weight: 800;
          color: rgba(0,0,0,0.06);
          font-family: monospace;
          transition: all 0.3s ease;
        }
        
        .client-card:hover .card-number {
          color: rgba(0,0,0,0.12);
          transform: scale(1.1);
        }
        
        .card-title {
          font-size: 1.6rem;
          font-weight: 700;
          color: #000000;
          margin-bottom: 15px;
          line-height: 1.3;
        }
        
        .card-desc {
          font-size: 0.95rem;
          color: rgba(0,0,0,0.6);
          line-height: 1.6;
          margin-bottom: 25px;
        }
        
        .card-line {
          height: 2px;
          background: #000000;
          border-radius: 2px;
        }
        
        /* Hover Effect Elements */
        .card-hover-effect {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          overflow: hidden;
        }
        
        .hover-shine {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(0,0,0,0.03) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        
        .client-card:hover .hover-shine {
          opacity: 1;
          animation: shineRotate 4s linear infinite;
        }
        
        @keyframes shineRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .hover-corner {
          position: absolute;
          width: 20px;
          height: 20px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .client-card:hover .hover-corner {
          opacity: 1;
        }
        
        .corner-tl {
          top: 15px;
          left: 15px;
          border-top: 2px solid #000000;
          border-left: 2px solid #000000;
        }
        
        .corner-tr {
          top: 15px;
          right: 15px;
          border-top: 2px solid #000000;
          border-right: 2px solid #000000;
        }
        
        .corner-bl {
          bottom: 15px;
          left: 15px;
          border-bottom: 2px solid #000000;
          border-left: 2px solid #000000;
        }
        
        .corner-br {
          bottom: 15px;
          right: 15px;
          border-bottom: 2px solid #000000;
          border-right: 2px solid #000000;
        }
        
        /* Bottom Decoration */
        .bottom-decoration {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 15px;
          margin-top: 80px;
        }
        
        .deco-line-left,
        .deco-line-right {
          width: 60px;
          height: 1px;
          background: #000000;
          opacity: 0.3;
        }
        
        .deco-dot-group {
          display: flex;
          gap: 8px;
        }
        
        .deco-dot {
          width: 6px;
          height: 6px;
          background: #000000;
          border-radius: 50%;
          opacity: 0.4;
        }
        
        .deco-dot.delay-1 {
          animation: dotPulse 1.5s infinite 0.3s;
        }
        
        .deco-dot.delay-2 {
          animation: dotPulse 1.5s infinite 0.6s;
        }
        
        @keyframes dotPulse {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.5); }
        }
        
        /* Responsive */
        @media (max-width: 768px) {
          .clients-wrapper {
            padding: 60px 16px;
          }
          
          .clients-header {
            margin-bottom: 50px;
          }
          
          .cards-grid {
            grid-template-columns: 1fr;
            gap: 25px;
          }
          
          .client-card {
            padding: 35px 25px;
          }
          
          .card-title {
            font-size: 1.35rem;
          }
          
          .card-number {
            font-size: 2.5rem;
            top: 20px;
            right: 20px;
          }
          
          .bottom-decoration {
            margin-top: 60px;
          }
          
          .deco-line-left,
          .deco-line-right {
            width: 40px;
          }
        }
        
        @media (max-width: 480px) {
          .client-card {
            padding: 30px 20px;
          }
          
          .card-title {
            font-size: 1.2rem;
          }
          
          .card-desc {
            font-size: 0.85rem;
          }
          
          .card-number {
            font-size: 2rem;
          }
        }
        
        /* Reduced Motion */
        @media (prefers-reduced-motion: reduce) {
          .floating-element,
          .client-card,
          .deco-dot {
            animation: none !important;
            transition: none !important;
            transform: none !important;
          }
          
          .card-border-animation,
          .hover-shine {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default Clients;