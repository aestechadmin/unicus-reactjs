import React, { useRef } from "react";
import { Box, Typography, Container, Button, useTheme } from "@mui/material";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { websiteData } from "../Unicus";
import NorthEastIcon from "@mui/icons-material/NorthEast";

const AnimatedMainTitle = ({ title }) => {
  const titleRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: titleRef, offset: ["start end", "end start"] });
  const titleScale = useTransform(scrollYProgress, [0, 0.5, 0.8], [0.3, 1, 1.1]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7], [0, 1, 1]);
  const titleY = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -50]);
  const words = title.split(" ");

  return (
    <motion.div ref={titleRef} style={{ scale: titleScale, opacity: titleOpacity, y: titleY, textAlign: "center", width: "100%" }}>
      <Typography variant="h1" sx={{
        fontWeight: 700,
        fontSize: { xs: "2rem", sm: "3rem", md: "6rem", lg: "10rem" },
        color: "#000",
        lineHeight: 1.4,
        textAlign: "center",
        px: { xs: 2, md: 0 },
      }}>
        {words.map((word, wordIndex) => (
          <motion.span key={wordIndex} style={{ display: "inline-block", marginRight: "0.3rem" }}>
            {word.split("").map((char, charIndex) => (
              <motion.span
                key={charIndex}
                style={{ display: "inline-block", whiteSpace: "pre" }}
                animate={{ scale: [0.5, 7, 1] }}
                transition={{ duration: 0.8, delay: wordIndex * 0.2 + charIndex * 0.03, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
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

const AnimatedText = ({ text, delay = 0 }) => {
  const characters = text.split('');
  return (
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.3 }} style={{ overflow: 'hidden' }}>
      <Typography sx={{ color: "#3c3c3c", lineHeight: 1.6, textAlign: {xs: "center", md: "left"}, fontSize: { xs: "1.5rem", sm: "1rem", md: "1.5rem", lg: "2rem" }, fontWeight: 500 }}>
        {characters.map((char, index) => (
          <motion.span
            key={index}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: delay + (index * 0.03), ease: "easeOut" } }
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

const ScrollImageReveal = ({ slide }) => {
  const theme = useTheme();
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
        minHeight: { xs: "auto", md: "100vh" },
        height: { xs: "auto", md: "100vh" },
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        my: { xs: 0, md: 2 },
        px: { xs: 3, md: 8 },
        py: { xs: 6, md: 0 },
        backgroundColor: "#E6F1FE",
        gap: { xs: 4, md: 0 },
      }}
    >
      {/* Image */}
      <Box sx={{ flex: { xs: "none", md: 2.5 }, width: { xs: "100%", md: "auto" }, display: "flex", justifyContent: "center" }}>
        <motion.div style={{
          clipPath,
          position: "relative",
          borderRadius: "24px",
          overflow: "hidden",
          boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
          // aspectRatio: "3/4",
          width: "100%",
          maxWidth: { xs: "280px", sm: "320px", md: "100%" },
        }}>
          <motion.div style={{ scale: 0.8, opacity: imageOpacity, width: "100%", height: "100%" }}>
            <Box
              component="img"
              src={slide.image}
              alt={slide.alt}
              sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
            <Box sx={{
              position: "absolute", top: 12, right: 12,
              bgcolor: "rgba(0,0,0,0.7)", color: "#fff",
              width: { xs: 36, md: 50 }, height: { xs: 36, md: 50 },
              borderRadius: "50%", display: "flex", alignItems: "center",
              justifyContent: "center", fontSize: { xs: "0.9rem", md: "1.2rem" },
              fontWeight: "bold", backdropFilter: "blur(10px)"
            }}>
              {String(slide.id).padStart(2, "0")}
            </Box>
          </motion.div>
        </motion.div>
      </Box>

      {/* Text — shows below image on mobile */}
      <Box sx={{ flex: { xs: "none", md: 1 }, width: { xs: "100%", md: "auto" }, pl: { xs: 0, md: 3 } }}>
        <motion.div style={{ opacity: textOpacity, x: textX }}>
          <AnimatedText text={slide.description} delay={0.3} />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            sx={{ display: "flex", justifyContent: { xs: "center", md: "left" } }}
          >
            <Button
              onClick={() => document.getElementById("quote-section")?.scrollIntoView({ behavior: "smooth", block: "start" })}
              endIcon={<NorthEastIcon fontSize="small" />}
              sx={{
                mt: 4,
                px: 2,
                py: 1,
                color: "#FFF",
                fontSize: "1.5rem",
                fontWeight: 700,
                textTransform: "none",
                background: theme.palette.secondary.main,
                boxShadow: "none",
                "& .MuiButton-endIcon": {
                  ml: 0,
                  mr: 0,
                },
                "&:hover": {
                  background: theme.palette.primary.main,
                },
              }}
            >
              Contact Us
            </Button>
          </motion.div>
        </motion.div>
      </Box>
    </Box>
  );
};

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
        minHeight: { xs: "30vh", md: "40vh" },
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: { xs: 3, md: 8 },
        py: { xs: 4, md: 0 },
        overflow: "hidden",
        backgroundColor: "#E6F1FE",
      }}
    >
      <motion.div style={{ opacity: textOpacity, scale: textScale, position: "relative", zIndex: 2, width: "100%", maxWidth: 1300, textAlign: "center" }}>
        <Typography
          ref={textRef}
          variant="h3"
          sx={{
            fontSize: { xs: "2rem", sm: "1.8rem", md: "3rem", lg: "6rem" },
            fontWeight: 700,
            lineHeight: 1.4,
            color: "#1a1a1a",
            letterSpacing: "-0.02em",
            textAlign: "center",
          }}
        >
          {slide.description.split("").map((char, idx) => (
            <span key={idx} className="desc-char" style={{ display: "inline-block", whiteSpace: "pre", opacity: 0.5, transform: "translateY(20px)" }}>
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

export default function Experience({ expSectionRef, endTitleRef, endButtonRef }) {
  return (
    <Box ref={expSectionRef} component="section" sx={{ backgroundColor: "#E6F1FE", position: "relative" }}>
      <Container maxWidth="xl" sx={{ p: 0 }}>
        <Box sx={{ textAlign: "center", mb: { xs: 4, md: 8 }, overflow: "hidden", width: "100%", pt: { xs: 6, md: 8 } }}>
          <AnimatedMainTitle title={websiteData.titleData.mainTitle} />
        </Box>
        <SequentialScrollReveal slides={websiteData.experienceSlides} />
      </Container>
    </Box>
  );
}