import React, { useRef } from "react";
import { Box, Typography, Container } from "@mui/material";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { websiteData } from "../Unicus";

const AnimatedMainTitle = ({ title }) => {
  const titleRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: titleRef, offset: ["start end", "end start"] });
  const titleScale = useTransform(scrollYProgress, [0, 0.5, 0.8], [0.3, 1, 1.1]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7], [0, 1, 1]);
  const titleY = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -50]);
  const letterSpacing = useTransform(scrollYProgress, [0, 0.5, 1], ["0.2em", "0em", "-0.02em"]);
  const words = title.split(" ");

  return (
    <motion.div ref={titleRef} style={{ scale: titleScale, opacity: titleOpacity, y: titleY, letterSpacing, textAlign: "center", width: "100%" }}>
      <Typography variant="h1" sx={{ fontWeight: 900, fontSize: { xs: "2rem", sm: "3rem", md: "8rem", lg: "12rem" }, color: "#000", lineHeight: 1.8, width: "100%", textAlign: "center" }}>
        {words.map((word, wordIndex) => (
          <motion.span key={wordIndex} style={{ display: "inline-block", marginRight: "0.5rem" }}>
            {word.split("").map((char, charIndex) => (
              <motion.span key={charIndex} style={{ display: "inline-block", whiteSpace: "pre" }} animate={{ scale: [0.5, 7, 1] }} transition={{ duration: 0.8, delay: wordIndex * 0.2 + charIndex * 0.03, ease: [0.25, 0.46, 0.45, 0.94] }}>
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
            {wordIndex < words.length - 1 && "\u00A0"}
          </motion.span>
        ))}
      </Typography>
    </motion.div>
  );
};

const ScrollImageReveal = ({ slide }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const clipPath = useTransform(scrollYProgress, [0, 0.5, 1], ["inset(0% 50% 0% 50%)", "inset(0% 0% 0% 0%)", "inset(0% 50% 0% 50%)"]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 1, 1.2]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const textX = useTransform(scrollYProgress, [0, 0.4, 1], [30, 0, -30]);

  return (
    <Box 
      ref={containerRef} 
      sx={{ 
        width: "100%", 
        minHeight: "100vh", // Ensure full viewport height
        height: "100vh", // Fixed height
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center", 
        overflow: "hidden",
        my: 2,
        px: { xs: 2, md: 8 },
        backgroundColor: "#F5F4DE",
      }}
    >
      <Box sx={{ flex: 0.5, display: { xs: "none", md: "block" } }} />
      <Box sx={{ flex: 2.5, display: "flex", justifyContent: "center", mx: 2 }}>
        <motion.div style={{ clipPath, position: "relative", borderRadius: "24px", overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.3)", aspectRatio: "3/4", width: "100%", zIndex: 1, }}>
          <motion.div style={{ scale: imageScale, opacity: imageOpacity, width: "100%", height: "100%" }}>
            <Box component="img" src={slide.image} alt={slide.alt} sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            <Box sx={{ position: "absolute", top: 20, right: 20, bgcolor: "rgba(0,0,0,0.7)", color: "#fff", width: 50, height: 50, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", fontWeight: "bold", backdropFilter: "blur(10px)" }}>
              {String(slide.id).padStart(2, "0")}
            </Box>
          </motion.div>
        </motion.div>
      </Box>
      <Box sx={{ flex: 1, display: { xs: "none", md: "block" } }}>
    <motion.div style={{ opacity: textOpacity, x: textX }}>
      <Box sx={{ pl: 3 }}>
        <AnimatedText text={slide.description} delay={0.3} />
      </Box>
    </motion.div>
      </Box>
    </Box>
  );
};

// First, create a helper component for text animation
const AnimatedText = ({ text, delay = 0 }) => {
  const characters = text.split('');
  
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
      style={{ overflow: 'hidden' }}
    >
      <Typography 
        sx={{ 
          color: "#666", 
          lineHeight: 1.6, 
          textAlign: "left", 
          fontSize: { xs: "0.9rem", md: "2rem" }, 
          fontWeight: 500 
        }}
      >
        {characters.map((char, index) => (
          <motion.span
            key={index}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: { 
                  duration: 0.5,
                  delay: delay + (index * 0.03),
                  ease: "easeOut"
                }
              }
            }}
            style={{ display: 'inline-block' }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </Typography>
    </motion.div>
  );
};


// In Experience.jsx - Update DescriptionOnlySlide
const DescriptionOnlySlide = ({ slide }) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const textOpacity = useTransform(scrollYProgress, [0, 0.3, 0.5, 1], [0.5, 0.5, 1, 1]);
  const textScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 1.02]);

  useGSAP(() => {
    const chars = textRef.current?.querySelectorAll(".desc-char");
    if (chars) {
      gsap.fromTo(chars, 
        { opacity: 0.5, y: 20, rotateX: -20 }, 
        { opacity: 1, y: 0, rotateX: 0, duration: 0.8, stagger: 0.03, ease: "power3.out", 
          scrollTrigger: { trigger: containerRef.current, start: "top 80%", end: "top 40%", scrub: 1 } 
        }
      );
    }
  }, []);

  return (
    <Box 
      ref={containerRef} 
      sx={{ 
        width: "100%", 
        // minHeight: "100vh", // CHANGE FROM 60vh TO 100vh
        height: "40vh", // Add fixed height
        position: "relative", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center", 
        px: { xs: 2, md: 8 }, 
        overflow: "hidden", 
        backgroundColor: "#F5F4DE",
      }}
    >
      <motion.div 
        style={{ 
          opacity: textOpacity, 
          scale: textScale, 
          position: "relative", 
          zIndex: 2, 
          width: "100%", 
          maxWidth: 1300, 
          textAlign: "center" 
        }}
      >
        <Typography 
          ref={textRef} 
          variant="h3" 
          sx={{ 
            fontSize: { xs: "1.5rem", sm: "2.5rem", md: "3.5rem", lg: "7.5rem" }, 
            fontWeight: 900, 
            lineHeight: 1.4, 
            color: "#1a1a1a", 
            letterSpacing: "-0.02em", 
            textAlign: "center",
          }}
        >
          {slide.description.split("").map((char, idx) => (
            <span 
              key={idx} 
              className="desc-char" 
              style={{ 
                display: "inline-block", 
                whiteSpace: "pre", 
                opacity: 0.5, 
                transform: "translateY(20px)" 
              }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </Typography>
      </motion.div>
    </Box>
  );
};

const SequentialScrollReveal = ({ slides }) => {
  return slides.map((slide) => {
    if (slide.type === "image") return <ScrollImageReveal key={slide.id} slide={slide} />;
    if (slide.type === "description") return <DescriptionOnlySlide key={slide.id} slide={slide} />;
    return null;
  });
};

// In Experience.jsx - Remove the mb and '&::after' from the main Box
export default function Experience({ expSectionRef, endTitleRef, endButtonRef }) {
  const sectionLabelRef = useRef(null);
  const tagLineRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(sectionLabelRef.current, 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, 
        scrollTrigger: { trigger: expSectionRef.current, start: "top 80%", end: "top 50%", scrub: 0.5 } 
      }
    );
    
    gsap.fromTo(tagLineRef.current, 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, 
        scrollTrigger: { trigger: expSectionRef.current, start: "top 80%", end: "top 50%", scrub: 0.5 } 
      }
    );

    const chars = endTitleRef.current?.querySelectorAll(".animated-char");
    if (chars) {
      chars.forEach((char, i) => {
        gsap.to(char, 
          { opacity: 1, y: 0, duration: 0.5, delay: i * 0.02, 
            scrollTrigger: { trigger: expSectionRef.current, start: "bottom 80%", end: "bottom 30%", scrub: 0.5 } 
          }
        );
      });
    }

    gsap.fromTo(endButtonRef.current, 
      { opacity: 0, y: 30, scale: 0.9 }, 
      { opacity: 1, y: 0, scale: 1, duration: 0.8, 
        scrollTrigger: { trigger: expSectionRef.current, start: "bottom 70%", end: "bottom 40%", scrub: 0.5 } 
      }
    );
  }, []);

  return (
    <Box 
      ref={expSectionRef} 
      component="section" 
      sx={{ 
        backgroundColor: "#F5F4DE", 
        position: "relative",
        // Remove padding bottom and top to let slides control their own height
      }}
    >
      <Container maxWidth="xl" sx={{ p: 0 }}> {/* Remove padding */}
        <Box sx={{ textAlign: "center", mb: 8, overflow: "hidden", width: "100%", pt: 2 }}>
          <AnimatedMainTitle title={websiteData.titleData.mainTitle} />
        </Box>
        <SequentialScrollReveal slides={websiteData.experienceSlides} />
      </Container>
    </Box>
  );
}