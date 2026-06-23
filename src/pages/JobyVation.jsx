import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { TextPlugin } from 'gsap/TextPlugin';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, TextPlugin);

// --- Styles Component ---
const Styles = () => (
  <style>{`
    :root {
      --color-white: #f5f4df;
      --color-black: #0e1620;
      --color-blue: #007ae5;
      --color-dark-blue: #1c3f99;
      --color-orange: #eb6110;
      --color-grey: #c7c6b6;
      --base-padding: 4rem;
      --gutter-width: 1.6rem;
      --font-display: 'Inter', system-ui, sans-serif;
      --font-text: 'Inter', system-ui, sans-serif;
      --grid-columns: 16;
      --grid-columns-mobile: 6;
    }
    @media (max-width: 768px) {
      :root {
        --base-padding: 1.6rem;
        --gutter-width-mobile: 0.8rem;
      }
    }
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: var(--font-text);
      background-color: var(--color-white);
      overflow-x: hidden;
    }
    .joby-wrapper {
      max-width: 100vw;
      overflow-x: hidden;
    }
    .title-page {
      font-family: var(--font-display);
      font-weight: 550;
      letter-spacing: -0.03em;
      font-size: clamp(3.2rem, 8vw, 8rem);
      line-height: 1;
    }
    .heading1 {
      font-family: var(--font-display);
      font-weight: 550;
      letter-spacing: -0.03em;
      font-size: clamp(3.2rem, 6vw, 6.4rem);
      line-height: 1;
    }
    .heading3 {
      font-family: var(--font-display);
      font-weight: 500;
      letter-spacing: -0.03em;
      font-size: clamp(2.4rem, 5vw, 4.8rem);
      line-height: 1.1;
    }
    .heading4 {
      font-family: var(--font-display);
      font-weight: 550;
      letter-spacing: -0.03em;
      font-size: clamp(2rem, 4vw, 4.8rem);
      line-height: 1.2;
    }
    .subheading3 {
      font-family: var(--font-display);
      font-weight: 500;
      font-size: 1.6rem;
      line-height: 1.4;
    }
    .body1 {
      font-family: var(--font-text);
      font-size: 1.6rem;
      line-height: 1.4;
    }
    .caption-small {
      font-family: var(--font-text);
      font-size: 1.2rem;
      letter-spacing: -0.02em;
      text-transform: uppercase;
    }
    .grid-container {
      display: grid;
      grid-template-columns: repeat(var(--grid-columns), 1fr);
      gap: 0 var(--gutter-width);
      padding: 0 var(--base-padding);
      width: 100%;
      margin: 0 auto;
    }
    @media (max-width: 768px) {
      .grid-container {
        grid-template-columns: repeat(var(--grid-columns-mobile), 1fr);
        gap: 0 var(--gutter-width-mobile);
      }
    }
    .button {
      cursor: pointer;
      border-radius: 12rem;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
    }
    .button-filled-transparent {
      background: transparent;
      color: var(--color-white);
      border: 1px solid var(--color-white);
    }
    .button-outlined {
      background: transparent;
      border: 1px solid var(--color-black);
    }
    .button-inner {
      padding: 1.2rem 2.4rem;
      transition: transform 0.35s ease;
      z-index: 2;
    }
    .button:hover .button-inner {
      transform: translateY(-100%);
    }
    .progress-bar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: rgba(255,255,255,0.2);
      z-index: 1000;
    }
    .progress-bar-fill {
      height: 100%;
      width: 0%;
      background: var(--color-orange);
    }
    .fade-in {
      opacity: 0;
      transform: translateY(30px);
    }
    .slide-in-left {
      opacity: 0;
      transform: translateX(-50px);
    }
    .slide-in-right {
      opacity: 0;
      transform: translateX(50px);
    }
    .scale-in {
      opacity: 0;
      transform: scale(0.9);
    }
    .rotate-in {
      opacity: 0;
      transform: rotate(-10deg) scale(0.9);
    }
    .blur-in {
      opacity: 0;
      filter: blur(10px);
    }
    .word {
      display: inline-block;
      opacity: 0;
      transform: translateY(30px);
    }
    .char {
      display: inline-block;
      opacity: 0;
      transform: translateY(30px);
    }
    .hover-grow {
      transition: transform 0.3s ease;
    }
    .hover-grow:hover {
      transform: scale(1.05);
    }
    .hover-lift {
      transition: transform 0.3s ease;
    }
    .hover-lift:hover {
      transform: translateY(-5px);
    }
    .parallax-bg {
      will-change: transform;
    }
    .sticky-pin {
      position: sticky;
      top: 0;
      height: 100vh;
      overflow: hidden;
    }
  `}</style>
);

// --- Progress Bar Component ---
const ProgressBar = () => {
  const progressRef = useRef(null);

  useEffect(() => {
    gsap.to(progressRef.current, {
      width: '100%',
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5
      }
    });
  }, []);

  return (
    <div className="progress-bar">
      <div ref={progressRef} className="progress-bar-fill" />
    </div>
  );
};

// --- Animated Text Word by Word ---
const AnimatedText = ({ children, className = "" }) => {
  const textRef = useRef(null);
  
  useEffect(() => {
    const words = textRef.current?.querySelectorAll('.word');
    if (words) {
      gsap.fromTo(words,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.05,
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 85%',
            end: 'top 60%',
            scrub: 0.5
          }
        }
      );
    }
  }, []);

  const words = children.split(' ');
  
  return (
    <div ref={textRef} className={className}>
      {words.map((word, i) => (
        <span key={i} className="word" style={{ display: 'inline-block', marginRight: '0.25rem' }}>
          {word}
        </span>
      ))}
    </div>
  );
};

// --- Animated Character by Character ---
const AnimatedCharText = ({ children, className = "" }) => {
  const textRef = useRef(null);
  
  useEffect(() => {
    const chars = textRef.current?.querySelectorAll('.char');
    if (chars) {
      gsap.fromTo(chars,
        { y: 30, opacity: 0, rotateX: -90 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.4,
          stagger: 0.02,
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 85%',
            end: 'top 60%',
            scrub: 0.5
          }
        }
      );
    }
  }, []);

  const chars = children.split('');
  
  return (
    <div ref={textRef} className={className}>
      {chars.map((char, i) => (
        <span key={i} className="char" style={{ display: 'inline-block' }}>
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </div>
  );
};

// --- Typewriter Text Component ---
const TypewriterText = ({ texts, delay = 0 }) => {
  const textRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 2 });
    
    texts.forEach((text, i) => {
      tl.to(textRef.current, {
        duration: 1,
        text: text,
        ease: 'none',
        delay: i === 0 ? delay : 0
      });
      tl.to(textRef.current, {
        duration: 0.5,
        opacity: 0,
        delay: 2
      });
      tl.to(textRef.current, {
        duration: 0.1,
        opacity: 1
      });
    });
    
    return () => tl.kill();
  }, [texts, delay]);
  
  return <span ref={textRef} className="typewriter-text">{texts[0]}</span>;
};

// --- Pinned Scroll Video Component with GSAP ---
const PinnedScrollVideo = () => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const overlayRef = useRef(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const videos = [
    { id: 0, src: "https://pub-c3f399360b0b4437b233f8cc0505582a.r2.dev/videos/compressed-home-intro-desktop-r3.mp4", title: "Skip traffic.\nTime to fly.", subtitle: "The future of aviation is coming soon." },
    { id: 1, src: "https://pub-c3f399360b0b4437b233f8cc0505582a.r2.dev/videos/compressed-home-intro-desktop-r3.mp4", title: "Zero Emissions", subtitle: "Fly green with our all-electric aircraft." },
    { id: 2, src: "https://pub-c3f399360b0b4437b233f8cc0505582a.r2.dev/videos/compressed-home-intro-desktop-r3.mp4", title: "Silent Flight", subtitle: "Experience the quietest ride in the sky." }
  ];

  useEffect(() => {
    const sections = gsap.utils.toArray('.video-section');
    
    sections.forEach((section, i) => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        pin: true,
        pinSpacing: false,
        onEnter: () => {
          setCurrentVideoIndex(i);
          // Video transition animation
          gsap.fromTo(videoRef.current,
            { scale: 1.1, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.8, ease: 'power2.out' }
          );
          // Title animation
          gsap.fromTo(titleRef.current,
            { y: 50, opacity: 0, rotationX: -45 },
            { y: 0, opacity: 1, rotationX: 0, duration: 0.6, delay: 0.2, ease: 'back.out(1.2)' }
          );
          // Subtitle animation
          gsap.fromTo(subtitleRef.current,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, delay: 0.4, ease: 'power2.out' }
          );
          // Overlay pulse
          gsap.fromTo(overlayRef.current,
            { opacity: 0 },
            { opacity: 0.4, duration: 0.5, repeat: 1, yoyo: true }
          );
        },
        onEnterBack: () => setCurrentVideoIndex(i)
      });
    });

    // Parallax effect on video
    gsap.to(videoRef.current, {
      scale: 1.05,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  }, [currentVideoIndex]);

  const currentVideo = videos[currentVideoIndex];

  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      {videos.map((video, idx) => (
        <div 
          key={video.id} 
          className="video-section"
          style={{ 
            height: '100vh', 
            position: 'relative',
            display: currentVideoIndex === idx ? 'block' : 'none'
          }}
        >
          <video
            ref={currentVideoIndex === idx ? videoRef : null}
            src={video.src}
            muted
            playsInline
            autoPlay
            loop
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover',
              pointerEvents: 'none'
            }}
          />
          <div 
            ref={overlayRef}
            style={{ 
              position: 'absolute', 
              inset: 0, 
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.6))',
              opacity: 0.4
            }} 
          />
          <div 
            style={{ 
              position: 'absolute', 
              bottom: '15%', 
              left: 0, 
              right: 0, 
              textAlign: 'center', 
              color: 'var(--color-white)',
              zIndex: 10
            }}
          >
            <h1 ref={titleRef} className="title-page" style={{ whiteSpace: 'pre-line' }}>
              {video.title}
            </h1>
            <p ref={subtitleRef} className="subheading3" style={{ marginTop: '2rem', opacity: 0.8 }}>
              {video.subtitle}
            </p>
          </div>
        </div>
      ))}
      <div style={{ height: `${(videos.length - 1) * 100}vh` }} />
    </div>
  );
};

// --- Pinned Parallax Section with Multiple Animations ---
const PinnedParallaxSection = () => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const textRefs = useRef([]);
  const floatingElementsRef = useRef([]);

  const textBlocks = [
    { id: 1, pretitle: "01 — Our Vision", title: "Imagine a world where every cross-town invitation is a definite 'yes'.", gridColumn: "2/span 6" },
    { id: 2, pretitle: "02 — The Future", title: "Where game day is gridlock-free and every restaurant is local.", gridColumn: "10/span 5" },
    { id: 3, pretitle: "03 — Sustainability", title: "Where our cities are greener, more friendly places to be.", gridColumn: "2/span 6" }
  ];

  useEffect(() => {
    // Main parallax image scale and move
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1
      }
    });
    
    tl.to(imageRef.current, {
      scale: 1.2,
      y: '-10%',
      ease: 'none'
    });

    // Text animations with different effects
    textRefs.current.forEach((text, i) => {
      // Rotate and fade in
      gsap.fromTo(text,
        { opacity: 0, x: i % 2 === 0 ? -80 : 80, rotationY: i % 2 === 0 ? -45 : 45 },
        {
          opacity: 1,
          x: 0,
          rotationY: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: text,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 0.8
          }
        }
      );
      
      // Stagger word animation for title
      const words = text.querySelectorAll('.parallax-word');
      gsap.fromTo(words,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.05,
          scrollTrigger: {
            trigger: text,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 0.5
          }
        }
      );
    });

    // Floating elements animation
    floatingElementsRef.current.forEach((el, i) => {
      gsap.to(el, {
        y: 'random(-20, 20)',
        x: 'random(-15, 15)',
        rotation: 'random(-5, 5)',
        duration: 'random(3, 6)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} style={{ height: '200vh', position: 'relative', overflow: 'hidden' }}>
      {/* Floating decorative elements */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          ref={el => floatingElementsRef.current[i] = el}
          style={{
            position: 'absolute',
            width: `${Math.random() * 100 + 50}px`,
            height: `${Math.random() * 100 + 50}px`,
            borderRadius: '50%',
            background: `rgba(255,255,255,${Math.random() * 0.1})`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            zIndex: 1,
            pointerEvents: 'none'
          }}
        />
      ))}
      
      <div className="sticky-pin">
        <img 
          ref={imageRef}
          src="https://cdn.sanity.io/images/h5mp19kq/production/fe892333d4c9a9934032f2ee33da32ac0f61211f-3200x1800.jpg"
          alt="Background"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(0,122,229,0.4) 0%, rgba(0,0,0,0.6) 100%)' }} />
      </div>

      <div style={{ position: 'relative', zIndex: 2, minHeight: '200vh' }}>
        {textBlocks.map((block, idx) => (
          <div key={block.id} className="grid-container" style={{ padding: '25rem 0' }}>
            <div 
              ref={el => textRefs.current[idx] = el}
              style={{ gridColumn: block.gridColumn, color: 'var(--color-white)' }}
            >
              <span className="caption-small" style={{ opacity: 0.8, display: 'inline-block' }}>
                {block.pretitle.split('').map((char, i) => (
                  <span key={i} style={{ display: 'inline-block', animation: 'none' }}>{char}</span>
                ))}
              </span>
              <h2 className="heading1" style={{ marginTop: '1rem', lineHeight: 1.2 }}>
                {block.title.split(' ').map((word, i) => (
                  <span key={i} className="parallax-word" style={{ display: 'inline-block', marginRight: '0.5rem' }}>
                    {word}
                  </span>
                ))}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Experience Highlights with GSAP Pin and Transitions ---
const ExperienceHighlights = () => {
  const slidesRef = useRef([]);
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    { id: 1, text: "Leave city congestion behind and choose a stress-free commute through the clouds.", img: "https://cdn.sanity.io/images/h5mp19kq/production/a0cc53073d2e2741323b19bcc392b9b3fc5ea888-1444x1700.jpg" },
    { id: 2, text: "Sit back and enjoy. Breathtaking views come standard with every seat.", img: "https://cdn.sanity.io/images/h5mp19kq/production/050c5279f4a679a956a0e3d341f45723e624a5a0-1444x1700.jpg" },
    { id: 3, text: "Enjoy seamless travel with a choreographed rideshare to the vertiport.", img: "https://cdn.sanity.io/images/h5mp19kq/production/7fe8973f1288a16f20520b22e08b67c5f5ac6e2b-1444x1700.jpg" }
  ];

  useEffect(() => {
    // Title animation
    gsap.fromTo(titleRef.current,
      { y: 50, opacity: 0, scale: 0.9 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          end: 'top 40%',
          scrub: 0.5
        }
      }
    );

    slidesRef.current.forEach((slide, i) => {
      const imageEl = slide.querySelector('.slide-image');
      const contentEl = slide.querySelector('.slide-content');
      const numberEl = slide.querySelector('.slide-number');
      
      ScrollTrigger.create({
        trigger: slide,
        start: 'top top',
        end: 'bottom top',
        pin: true,
        pinSpacing: false,
        onEnter: () => {
          setActiveSlide(i);
          
          // Image animation with 3D flip
          gsap.fromTo(imageEl,
            { scale: 0.7, opacity: 0, rotationY: -45 },
            { scale: 1, opacity: 1, rotationY: 0, duration: 0.8, ease: 'back.out(1.2)' }
          );
          
          // Content animation
          gsap.fromTo(contentEl,
            { x: 80, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.6, delay: 0.2, ease: 'power3.out' }
          );
          
          // Number animation
          gsap.fromTo(numberEl,
            { scale: 2, opacity: 0 },
            { scale: 1, opacity: 0.6, duration: 0.5, ease: 'elastic.out(1, 0.5)' }
          );
          
          // Text letter by letter
          const text = contentEl.querySelector('.slide-text');
          if (text) {
            const chars = text.innerText.split('');
            text.innerHTML = '';
            chars.forEach((char, idx) => {
              const span = document.createElement('span');
              span.textContent = char === ' ' ? '\u00A0' : char;
              span.style.display = 'inline-block';
              span.style.opacity = '0';
              span.style.transform = 'translateY(20px)';
              text.appendChild(span);
              
              gsap.to(span, {
                y: 0,
                opacity: 1,
                duration: 0.03,
                delay: idx * 0.02,
                ease: 'power1.out'
              });
            });
          }
        },
        onLeave: () => {
          // Exit animation
          gsap.to(imageEl, { scale: 0.8, opacity: 0, duration: 0.4 });
          gsap.to(contentEl, { x: -50, opacity: 0, duration: 0.4 });
        },
        onEnterBack: () => {
          setActiveSlide(i);
          gsap.fromTo(imageEl,
            { scale: 0.8, opacity: 0, x: -50 },
            { scale: 1, opacity: 1, x: 0, duration: 0.6 }
          );
          gsap.fromTo(contentEl,
            { x: -50, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.6, delay: 0.2 }
          );
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} style={{ backgroundColor: 'var(--color-blue)', position: 'relative' }}>
      <div className="grid-container" style={{ padding: '4rem 0', textAlign: 'center' }}>
        <div style={{ gridColumn: '1/-1' }}>
          <h2 ref={titleRef} className="heading1" style={{ color: 'var(--color-white)', opacity: 0 }}>
            Nowhere to go but Up
          </h2>
        </div>
      </div>
      
      {slides.map((slide, idx) => (
        <div 
          key={slide.id} 
          ref={el => slidesRef.current[idx] = el}
          style={{ height: '100vh', display: 'flex', alignItems: 'center' }}
        >
          <div className="grid-container" style={{ alignItems: 'center' }}>
            <div className="slide-image" style={{ gridColumn: '2/span 6', transformStyle: 'preserve-3d' }}>
              <img src={slide.img} alt="" style={{ width: '100%', borderRadius: '16px', aspectRatio: '4/5', objectFit: 'cover' }} />
            </div>
            <div className="slide-content" style={{ gridColumn: '9/span 6', color: 'var(--color-white)' }}>
              <span className="slide-number caption-small" style={{ opacity: 0.6, display: 'inline-block' }}>0{idx + 1}</span>
              <p className="slide-text subheading3" style={{ marginTop: '1rem', marginBottom: '2rem' }}>{slide.text}</p>
              <a 
                href="/experience" 
                style={{ color: 'var(--color-white)', textDecoration: 'none', display: 'inline-block', borderBottom: '1px solid white' }}
                onMouseEnter={(e) => gsap.to(e.target, { x: 10, duration: 0.3 })}
                onMouseLeave={(e) => gsap.to(e.target, { x: 0, duration: 0.3 })}
              >
                Discover the Experience →
              </a>
            </div>
          </div>
        </div>
      ))}
      <div style={{ height: `${(slides.length - 1) * 100}vh` }} />
      
      {/* Slide indicator dots */}
      <div style={{ position: 'fixed', right: '2rem', top: '50%', transform: 'translateY(-50%)', zIndex: 100 }}>
        {slides.map((_, i) => (
          <div
            key={i}
            onClick={() => {
              gsap.to(window, {
                duration: 1,
                scrollTo: slidesRef.current[i],
                ease: 'power2.inOut'
              });
            }}
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: activeSlide === i ? 'var(--color-orange)' : 'rgba(255,255,255,0.4)',
              margin: '1rem 0',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          />
        ))}
      </div>
    </div>
  );
};

// --- Partners Section with 3D Flip and Hover Animations ---
const PartnersSection = () => {
  const categories = [
    { name: "Car Service", description: "We're partnering with global leaders in ground transportation to seamlessly integrate air mobility.", image: "https://cdn.sanity.io/images/h5mp19kq/production/08c1cc4c2b2f84e81af5a811a077423dbf1a82d5-1500x1892.jpg", logos: ["Uber"] },
    { name: "Airlines", description: "Our partnerships with leading global airlines will integrate our air taxi service.", image: "https://cdn.sanity.io/images/h5mp19kq/production/63e7e05a6a30a30f436156a8cb269a9bf9462a41-1500x1892.jpg", logos: ["Delta", "Virgin Atlantic", "ANA"] },
    { name: "Infrastructure", description: "Together with key infrastructure partners, we're building the physical backbone.", image: "https://cdn.sanity.io/images/h5mp19kq/production/58843994032d8c021e582ce1ce7ce1cd3de3743d-4800x6000.png", logos: ["Skyports", "Signature"] },
    { name: "R&D", description: "We collaborate with pioneers in manufacturing and innovation.", image: "https://cdn.sanity.io/images/h5mp19kq/production/af456faf9640de0bdd711f84e45d958cc636ab8a-1500x1892.jpg", logos: ["Toyota", "NASA"] },
    { name: "Technology", description: "Our aviation technology partnerships power operational excellence.", image: "https://cdn.sanity.io/images/h5mp19kq/production/e139fbac7c088eda6c77b752cea28f4ca66fa420-1500x1892.png", logos: ["Garmin", "CAE"] },
    { name: "Government", description: "We collaborate with forward-thinking government agencies to shape policy.", image: "https://cdn.sanity.io/images/h5mp19kq/production/bb92b433868cdbe3608420f4e69de82d3a952d7d-1120x1412.jpg", logos: [] },
  ];

  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    // Title animation
    gsap.fromTo(titleRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          end: 'top 50%',
          scrub: 0.5
        }
      }
    );

    const sections = gsap.utils.toArray('.partner-section');
    
    sections.forEach((section, i) => {
      const imageEl = section.querySelector('.partner-image');
      const contentEl = section.querySelector('.partner-content');
      const logos = section.querySelectorAll('.partner-logo');
      
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        pin: true,
        pinSpacing: false,
        onEnter: () => {
          setActiveIndex(i);
          
          // 3D Flip animation for image
          gsap.fromTo(imageEl,
            { rotationY: 90, opacity: 0 },
            { rotationY: 0, opacity: 1, duration: 0.8, ease: 'back.out(1.2)' }
          );
          
          // Slide in content
          gsap.fromTo(contentEl,
            { x: 80, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.6, delay: 0.2, ease: 'power3.out' }
          );
          
          // Stagger logo animations
          gsap.fromTo(logos,
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.4, stagger: 0.08, ease: 'back.out(1.2)' }
          );
        },
        onLeave: () => {
          gsap.to(imageEl, { rotationY: -90, opacity: 0, duration: 0.4 });
          gsap.to(contentEl, { x: -80, opacity: 0, duration: 0.4 });
        },
        onEnterBack: () => {
          setActiveIndex(i);
          gsap.fromTo(imageEl,
            { rotationY: -90, opacity: 0 },
            { rotationY: 0, opacity: 1, duration: 0.6 }
          );
          gsap.fromTo(contentEl,
            { x: -80, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.6, delay: 0.2 }
          );
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} style={{ backgroundColor: 'var(--color-white)' }}>
      <div className="grid-container" style={{ padding: '8rem 0', textAlign: 'center' }}>
        <div style={{ gridColumn: '3/span 12' }}>
          <h2 ref={titleRef} className="heading1" style={{ opacity: 0 }}>
            With partners like this,<br />there's nowhere to go but up.
          </h2>
        </div>
      </div>

      {categories.map((category, idx) => (
        <div key={idx} className="partner-section" style={{ height: '100vh', display: 'flex', alignItems: 'center' }}>
          <div className="grid-container" style={{ alignItems: 'center' }}>
            <div className="partner-image" style={{ gridColumn: '3/span 6', position: 'relative', aspectRatio: '4/5', transformStyle: 'preserve-3d' }}>
              <img src={category.image} alt={category.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }} />
            </div>
            <div className="partner-content" style={{ gridColumn: '10/span 6' }}>
              <h3 className="heading3" style={{ marginBottom: '1rem' }}>{category.name}</h3>
              <p className="body1" style={{ marginBottom: '2rem', opacity: 0.7 }}>{category.description}</p>
              {category.logos.length > 0 && (
                <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
                  {category.logos.map((logo, lIdx) => (
                    <span 
                      key={lIdx} 
                      className="partner-logo"
                      style={{ 
                        background: '#f0f0f0', 
                        padding: '0.5rem 1rem', 
                        borderRadius: '40px', 
                        fontSize: '1.4rem',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => gsap.to(e.target, { scale: 1.1, backgroundColor: '#e0e0e0', duration: 0.3 })}
                      onMouseLeave={(e) => gsap.to(e.target, { scale: 1, backgroundColor: '#f0f0f0', duration: 0.3 })}
                    >
                      {logo}
                    </span>
                  ))}
                </div>
              )}
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '3rem' }}>
                {categories.map((_, i) => (
                  <div 
                    key={i} 
                    style={{ 
                      width: '40px', 
                      height: '2px', 
                      background: i === activeIndex ? 'var(--color-blue)' : 'var(--color-grey)',
                      cursor: 'pointer',
                      transition: 'background 0.3s ease'
                    }}
                    onClick={() => {
                      gsap.to(window, {
                        duration: 1,
                        scrollTo: `.partner-section:nth-child(${i + 2})`,
                        ease: 'power2.inOut'
                      });
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
      <div style={{ height: `${(categories.length - 1) * 100}vh` }} />
    </div>
  );
};

// --- Story Section with Timeline Animation ---
const StorySection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const buttonRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'top 30%',
        scrub: 0.8
      }
    });
    
    tl.fromTo(titleRef.current,
      { y: 60, opacity: 0, rotationX: -30 },
      { y: 0, opacity: 1, rotationX: 0, duration: 1 }
    )
    .fromTo(textRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      '-=0.5'
    )
    .fromTo(buttonRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6 },
      '-=0.4'
    );

    // Timeline line animation
    gsap.fromTo(timelineRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        duration: 2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'bottom 30%',
          scrub: 1
        }
      }
    );

    // Button hover animations
    const buttons = buttonRef.current?.querySelectorAll('.story-button');
    buttons?.forEach(btn => {
      btn.addEventListener('mouseenter', () => {
        gsap.to(btn, { scale: 1.05, duration: 0.3, ease: 'back.out(1)' });
      });
      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { scale: 1, duration: 0.3 });
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} style={{ backgroundColor: 'var(--color-dark-blue)', padding: '15rem 0', position: 'relative', overflow: 'hidden' }}>
      <div ref={timelineRef} style={{ position: 'absolute', left: '10%', top: 0, width: '2px', height: '100%', background: 'rgba(255,255,255,0.2)', transformOrigin: 'top' }} />
      
      <div className="grid-container">
        <div style={{ gridColumn: '2/span 12', textAlign: 'center', color: 'var(--color-white)' }}>
          <span className="caption-small" style={{ opacity: 0.7 }}>Our Journey</span>
          <h2 ref={titleRef} className="heading1" style={{ marginTop: '1rem', transformStyle: 'preserve-3d' }}>
            In 2009, a small team of Joby engineers<br />
            set out to build the future of flight.
          </h2>
          <p ref={textRef} className="body1" style={{ marginTop: '2rem', maxWidth: '60rem', margin: '2rem auto 0', opacity: 0 }}>
            Thousands of test flights later, we've turned "what if" into "what's next".
          </p>
          <div ref={buttonRef} style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '3rem', opacity: 0 }}>
            <button className="story-button button button-filled-transparent">
              <span className="button-inner">Discover our Story</span>
            </button>
            <button className="story-button button" style={{ border: '1px solid white', background: 'transparent', color: 'white' }}>
              <span className="button-inner">Work at Joby</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Dream of Flight Section with Parallax and Hover ---
const DreamOfFlightSection = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);
  const particlesRef = useRef([]);

  const contents = [
    { pretitle: "Future Vision — 1", text: "Imagine a world where every cross-town invitation is a definite 'yes'.", icon: "🌟", gridColumn: "2/span 4", color: "#FFD700" },
    { pretitle: "Future Vision — 2", text: "Where game day is gridlock-free and every restaurant is local.", icon: "🏈", gridColumn: "6/span 4", color: "#FF6B6B" },
    { pretitle: "Future Vision — 3", text: "Where our cities are greener, more friendly places to be.", icon: "🌿", gridColumn: "10/span 4", color: "#4ECDC4" }
  ];

  useEffect(() => {
    // Title animation
    gsap.fromTo(titleRef.current,
      { scale: 0.5, opacity: 0, rotationY: 180 },
      {
        scale: 1,
        opacity: 1,
        rotationY: 0,
        duration: 1.2,
        ease: 'back.out(1.5)',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5
        }
      }
    );

    // Card animations with stagger
    cardsRef.current.forEach((card, i) => {
      const iconEl = card.querySelector('.card-icon');
      const textEl = card.querySelector('.card-text');
      
      gsap.fromTo(card,
        { y: 100, opacity: 0, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          delay: i * 0.2,
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            end: 'top 60%',
            scrub: 0.5
          }
        }
      );
      
      // Icon animation
      gsap.fromTo(iconEl,
        { rotate: -180, scale: 0 },
        {
          rotate: 0,
          scale: 1,
          duration: 0.6,
          delay: i * 0.2 + 0.1,
          ease: 'elastic.out(1, 0.5)',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            end: 'top 60%',
            scrub: 0.5
          }
        }
      );
      
      // Text letter by letter
      gsap.fromTo(textEl,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          delay: i * 0.2 + 0.3,
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            end: 'top 60%',
            scrub: 0.5
          }
        }
      );
      
      // Card hover animation
      card.addEventListener('mouseenter', () => {
        gsap.to(card, { y: -10, scale: 1.02, duration: 0.4, ease: 'power2.out' });
        gsap.to(iconEl, { scale: 1.2, rotate: 10, duration: 0.3 });
      });
      card.addEventListener('mouseleave', () => {
        gsap.to(card, { y: 0, scale: 1, duration: 0.4 });
        gsap.to(iconEl, { scale: 1, rotate: 0, duration: 0.3 });
      });
    });

    // Floating particles
    particlesRef.current.forEach((particle, i) => {
      gsap.to(particle, {
        y: 'random(-100, 100)',
        x: 'random(-50, 50)',
        opacity: 'random(0.3, 0.8)',
        duration: 'random(3, 6)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} style={{ backgroundColor: 'var(--color-blue)', position: 'relative', paddingBottom: '10rem', overflow: 'hidden' }}>
      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          ref={el => particlesRef.current[i] = el}
          style={{
            position: 'absolute',
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.5)',
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            zIndex: 1
          }}
        />
      ))}
      
      <div style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', zIndex: 10 }}>
        <div ref={titleRef} style={{ textAlign: 'center', color: 'var(--color-white)', transformStyle: 'preserve-3d' }}>
          <h1 className="title-page">Dream of Flight</h1>
        </div>
      </div>
      
      <div style={{ position: 'relative', zIndex: 20 }}>
        {contents.map((content, idx) => (
          <div 
            key={idx} 
            ref={el => cardsRef.current[idx] = el}
            className="grid-container" 
            style={{ padding: '15rem 0' }}
          >
            <div style={{ 
              gridColumn: content.gridColumn, 
              color: 'var(--color-white)',
              background: `linear-gradient(135deg, ${content.color}20, transparent)`,
              padding: '3rem',
              borderRadius: '24px',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.3s ease'
            }}>
              <div className="card-icon" style={{ display: 'inline-block', fontSize: '3rem', marginBottom: '1rem' }}>
                {content.icon}
              </div>
              <span className="caption-small" style={{ display: 'block', marginTop: '0.5rem' }}>{content.pretitle}</span>
              <p className="card-text heading4" style={{ marginTop: '1rem' }}>{content.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Footer with Scroll Reveal ---
const Footer = () => {
  const footerRef = useRef(null);
  const logoRef = useRef(null);
  const linksRef = useRef([]);
  const newsletterRef = useRef(null);

  const mainLinks = ['Experience', 'Technology', 'Company', 'News', 'Careers'];
  const policyLinks = ['Privacy Policy', 'Terms of Use', 'Impact Reporting'];

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footerRef.current,
        start: 'top 90%',
        end: 'top 60%',
        scrub: 0.8
      }
    });
    
    tl.fromTo(footerRef.current,
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 }
    )
    .fromTo(logoRef.current,
      { scale: 0, rotation: -180, opacity: 0 },
      { scale: 1, rotation: 0, opacity: 1, duration: 0.6, ease: 'back.out(1.5)' },
      '-=0.5'
    )
    .fromTo(linksRef.current,
      { x: -30, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5, stagger: 0.05 },
      '-=0.3'
    )
    .fromTo(newsletterRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5 },
      '-=0.2'
    );

    // Newsletter input animation
    const input = newsletterRef.current?.querySelector('input');
    const button = newsletterRef.current?.querySelector('button');
    
    if (input) {
      input.addEventListener('focus', () => {
        gsap.to(input, { borderBottomColor: 'var(--color-orange)', duration: 0.3 });
      });
      input.addEventListener('blur', () => {
        gsap.to(input, { borderBottomColor: 'white', duration: 0.3 });
      });
    }
    
    if (button) {
      button.addEventListener('mouseenter', () => {
        gsap.to(button, { x: 5, duration: 0.3 });
      });
      button.addEventListener('mouseleave', () => {
        gsap.to(button, { x: 0, duration: 0.3 });
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <footer ref={footerRef} style={{ backgroundColor: 'var(--color-dark-blue)', color: 'var(--color-white)', padding: '8rem var(--base-padding)', opacity: 0 }}>
      <div className="grid-container" style={{ alignItems: 'start', rowGap: '4rem' }}>
        <div ref={logoRef} style={{ gridColumn: '1/span 3' }}>
          <svg width="52" height="32" viewBox="0 0 52 32" fill="none">
            <path d="M17.7997 14.5887C13.8211 3.44434 9.04438 1.14472 6.50189 0.432195C-3.11191 -2.26383 -2.3218 14.3702 15.4219 17.9488C24.2375 42.4358 40.777 31.0535 49.7007 13.1267C54.7923 2.89891 50.7322 -2.6776 43.14 1.27927C36.6653 4.65455 28.0425 14.8766 17.7997 14.5887Z" fill="currentColor" />
          </svg>
        </div>
        
        <div style={{ gridColumn: '5/span 3' }}>
          <ul style={{ listStyle: 'none' }}>
            {mainLinks.map((item, idx) => (
              <li 
                key={idx} 
                ref={el => linksRef.current[idx] = el} 
                style={{ marginBottom: '0.8rem', opacity: 0 }}
              >
                <a 
                  href={`/${item.toLowerCase()}`}
                  onMouseEnter={(e) => gsap.to(e.target, { x: 5, color: 'var(--color-orange)', duration: 0.3 })}
                  onMouseLeave={(e) => gsap.to(e.target, { x: 0, color: 'white', duration: 0.3 })}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
        
        <div style={{ gridColumn: '9/span 3' }}>
          <ul style={{ listStyle: 'none' }}>
            {policyLinks.map((item, idx) => (
              <li 
                key={idx} 
                ref={el => linksRef.current[mainLinks.length + idx] = el} 
                style={{ marginBottom: '0.8rem', opacity: 0 }}
              >
                <a 
                  href={`/${item.toLowerCase().replace(/ /g, '-')}`}
                  onMouseEnter={(e) => gsap.to(e.target, { x: 5, color: 'var(--color-orange)', duration: 0.3 })}
                  onMouseLeave={(e) => gsap.to(e.target, { x: 0, color: 'white', duration: 0.3 })}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
        
        <div ref={newsletterRef} style={{ gridColumn: '13/span 4', opacity: 0 }}>
          <p className="subheading3" style={{ marginBottom: '1rem' }}>Subscribe for updates</p>
          <div style={{ display: 'flex', borderBottom: '1px solid white', marginTop: '1rem' }}>
            <input 
              type="email" 
              placeholder="Email address" 
              style={{ background: 'transparent', border: 'none', color: 'white', padding: '0.5rem 0', flex: 1, outline: 'none', transition: 'borderBottomColor 0.3s ease' }}
            />
            <button style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>→</button>
          </div>
        </div>
      </div>
      
      <div className="grid-container" style={{ marginTop: '6rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.2)' }}>
        <div style={{ gridColumn: '1/-1', textAlign: 'center' }}>
          <span className="caption-small" style={{ opacity: 0.5 }}>© 2026 Joby Aviation. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
};

// --- Main Component ---
const Unicus = () => {
  return (
    <div className="joby-wrapper">
      <Styles />
      <ProgressBar />
      <PinnedScrollVideo />
      <PinnedParallaxSection />
      <ExperienceHighlights />
      <PartnersSection />
      <StorySection />
      <DreamOfFlightSection />
      <Footer />
    </div>
  );
};

export default Unicus;