// Technology.jsx - Updated with title animation and stats inside image
import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Lenis from '@studio-freight/lenis';

const Technology = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  
  // Data from your websiteData object (passed as props or imported)
  const technologyData = {
    backgroundImage: {
      desktop: "https://cdn.sanity.io/images/h5mp19kq/production/fe892333d4c9a9934032f2ee33da32ac0f61211f-3200x1800.jpg?w=2000&fm=webp&q=90",
      mobile: "https://cdn.sanity.io/images/h5mp19kq/production/bb2f1438061f5e799944e0ba4659720790d63bf2-1125x2250.jpg?rect=0,0,914,2250&w=750&fm=webp&q=90",
    },
    title: "Commitment to Clients",
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
  };

  const { items, stats, title, backgroundImage } = technologyData;

  const { scrollYProgress } = useScroll({
  target: containerRef,
  offset: ["start start", "end start"]
});

const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);
  
  // Title animation based on scroll
  const { scrollYProgress: titleScrollProgress } = useScroll({
    target: titleRef,
    offset: ["start end", "end start"]
  });
  
  const titleScale = useTransform(titleScrollProgress, [0, 0.5, 1], [0.5, 1, 1.5]);
  const titleOpacity = useTransform(titleScrollProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 0]);
  
  // Item width for grid layout (no horizontal scroll)
  const ITEM_WIDTH = 380;
  const GAP = 30;
  
  return (
    <div className="technology-wrapper"  ref={containerRef} >
        <motion.div
  className="bg-layer"
  style={{ scale: bgScale }}
/>
<div className="content-layer">
      {/* Title Section with Animation */}
      <section className="tech-title-section" ref={titleRef}>
        <div className="title-container">
          <motion.h1 
            className="tech-title"
            style={{ 
              scale: titleScale,
              opacity: titleOpacity
            }}
          >
            {title}
          </motion.h1>
        </div>
      </section>
      
      {/* Items Grid Section - Normal animation */}
      <section className="items-section">
        <div className="items-grid">
          {items.map((item, idx) => (
            <motion.div
              key={idx}
              className="grid-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <div className="card-icon">
                <span className="card-number">{String(idx + 1).padStart(2, '0')}</span>
              </div>
              <h3 className="card-title">{item.title}</h3>
              <p className="card-description">{item.desc}</p>
              <div className="card-glow" />
            </motion.div>
          ))}
        </div>
      </section>
      
      {/* Stats Section with Background Image */}
      <section className="stats-section">
        <div className="stats-background">
          <div className="stats-overlay">
            <div className="stats-grid">
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  className="stat-item"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <span className="stat-value">{stat.value}</span>
                  <span className="stat-label">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      </div>
      
      <style jsx="true">{`

      @media (max-width: 768px) {
        .technology-wrapper {
            background-image: url(${backgroundImage.mobile});
        }
        }
.technology-wrapper {
  position: relative;
  overflow: hidden;
}

/* ONLY THIS SECTION BACKGROUND */
.bg-layer {
  position: absolute;
  min-height: 100vh;
  inset: 0;
  background-image: url(${backgroundImage.desktop});
  background-size: cover;
  background-position: center;
  z-index: 0;
  will-change: transform;
}

/* content above bg */
.content-layer {
  position: relative;
  z-index: 2;
}
        
        /* Title Section */
        .tech-title-section {
          min-height: 50vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 2;
          padding: 0 20px;
        }
        
        .title-container {
          text-align: center;
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .tech-title {
          font-size: clamp(3rem, 10vw, 8rem);
          font-weight: 800;
          color: #FFF;
          margin: 0;
          letter-spacing: -0.02em;
          line-height: 1.1;
          transform-origin: center;
        }
        
        /* Items Section - Grid Layout */
        .items-section {
          padding: 30px 20px;
          position: relative;
          z-index: 2;
        }
        
        .items-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 30px;
          max-width: 1400px;
          margin: 0 auto;
        }
        
        /* Grid Cards */
        .grid-card {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          border-radius: 24px;
          border: 1px solid rgba(0,0,0,0.1);
          padding: 40px 32px;
          position: relative;
          transition: all 0.3s ease;
          overflow: hidden;
          cursor: pointer;
        }
        
        .grid-card:hover {
          transform: translateY(-8px);
          border-color: rgba(0, 0, 0, 0.2);
          background: rgba(255, 255, 255, 1);
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }
        
        .card-glow {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #000000, #333333, #000000);
          transform: scaleX(0);
          transition: transform 0.3s ease;
        }
        
        .grid-card:hover .card-glow {
          transform: scaleX(1);
        }
        
        .card-icon {
          margin-bottom: 32px;
        }
        
        .card-number {
          font-size: 3rem;
          font-weight: 700;
          color: #000000;
          opacity: 0.8;
        }
        
        .card-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: #000000;
          margin-bottom: 16px;
          line-height: 1.3;
        }
        
        .card-description {
          font-size: 1rem;
          color: rgba(0,0,0,0.6);
          line-height: 1.6;
        }
        
        /* Stats Section with Background Image */
        .stats-section {
          position: relative;
          margin: 80px 20px;
          border-radius: 24px;
          overflow: hidden;
          z-index: 2;
        }
        
        .stats-background {
          position: relative;
        //   background-image: url(${backgroundImage.desktop});
        //   background-size: cover;
        //   background-position: center;
          border-radius: 24px;
          overflow: hidden;
        }
        
        @media (max-width: 768px) {
          .stats-background {
            background-image: url(${backgroundImage.mobile});
          }
        }
        
        .stats-overlay {
        //   background: rgba(0, 0, 0, 0.6);
          padding: 80px 40px;
          border-radius: 24px;
        }
        
        .stats-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 48px;
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .stat-item {
          text-align: center;
          min-width: 140px;
          padding: 20px;
        }
        
        .stat-value {
          display: block;
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 8px;
        }
        
        .stat-label {
          font-size: 0.875rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: rgba(255,255,255,0.7);
          font-weight: 500;
        }
        
        /* Responsive */
        @media (max-width: 1024px) {
          .items-grid {
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 24px;
          }
        }
        
        @media (max-width: 768px) {
          .tech-title-section {
            min-height: 70vh;
          }
          
          .items-section {
            padding: 60px 16px;
          }
          
          .items-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          
          .grid-card {
            padding: 32px 24px;
          }
          
          .card-title {
            font-size: 1.25rem;
          }
          
          .stats-section {
            margin: 60px 16px;
          }
          
          .stats-overlay {
            padding: 60px 20px;
          }
          
          .stats-grid {
            gap: 32px;
          }
          
          .stat-item {
            min-width: 120px;
            padding: 15px;
          }
          
          .stat-value {
            font-size: 1.75rem;
          }
        }
        
        @media (max-width: 480px) {
          .stats-overlay {
            padding: 40px 16px;
          }
          
          .stats-grid {
            gap: 24px;
          }
          
          .stat-item {
            min-width: 100px;
            padding: 10px;
          }
        }
        
        /* Reduced motion preference */
        @media (prefers-reduced-motion: reduce) {
          .grid-card {
            transform: none !important;
          }
          
          .tech-title {
            transform: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Technology;