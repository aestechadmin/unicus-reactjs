import React, { useRef, useEffect } from "react";
import {
  Box,
  Typography,
  Container,
  useMediaQuery,
  Grid,
  Paper,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

// Complete Website Data - All sections in one array
const websiteData = {
  hero: {
    video: "https://pub-c3f399360b0b4437b233f8cc0505582a.r2.dev/videos/compressed-home-intro-desktop-r3.mp4",
    title: "Clean Spaces",
    subtitle: "Smarter Facility Management",
  },
  titleData: {
    mainTitle: "Why Unicus Facilities",
    sectionLabel: "EXPERIENCE THE FUTURE",
    tagLine: "INNOVATION MEETS EXCELLENCE",
  },
  experienceSlides: [
    {
      id: 1,
      type: "image",
      image: "https://cdn.sanity.io/images/h5mp19kq/production/a0cc53073d2e2741323b19bcc392b9b3fc5ea888-1444x1700.jpg?w=1200&fm=webp&q=90",
      alt: "Professional cleaning services",
      title: "Professional Cleaning",
      description: "Expert cleaning solutions tailored to your facility's unique needs. We deliver spotless results every time.",
      link: "/experience",
    },
    {
      id: 2,
      type: "image",
      image: "https://cdn.sanity.io/images/h5mp19kq/production/050c5279f4a679a956a0e3d341f45723e624a5a0-1444x1700.jpg?w=1200&fm=webp&q=90",
      alt: "Smart facility management",
      title: "Smart Management",
      description: "Leverage cutting-edge technology to optimize your facility operations and reduce costs.",
      link: "/experience",
    },
    {
      id: 3,
      type: "image",
      image: "https://cdn.sanity.io/images/h5mp19kq/production/7fe8973f1288a16f20520b22e08b67c5f5ac6e2b-1444x1700.jpg?w=1200&fm=webp&q=90",
      alt: "Sustainable solutions",
      title: "Sustainable Solutions",
      description: "Eco-friendly practices that protect our planet while maintaining the highest standards of cleanliness.",
      link: "/experience",
    },
    {
      id: 4,
      type: "description",
      description: "Imagine looking forward to your commute. And forgetting what gridlock feels like. When flight is a part of everyday life, anything is possible.",
    },
  ],
  comingSoon: {
    feature: {
      mainImage: "https://cdn.sanity.io/images/h5mp19kq/production/896d4d7e05eb68acd3a49e98a0ff6f9804601e84-2248x1450.jpg?fm=webp&q=90",
      appIcon: "https://cdn.sanity.io/images/h5mp19kq/production/86c8943db1672031c0b73ddbf16932e3aed15a4b-552x552.jpg?fm=webp&q=90",
      title: "Coming Soon",
      description: "Our new mobile app will revolutionize how you manage facility services",
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
  technology: {
    backgroundImage: {
      desktop: "https://cdn.sanity.io/images/h5mp19kq/production/fe892333d4c9a9934032f2ee33da32ac0f61211f-3200x1800.jpg?w=2000&fm=webp&q=90",
      mobile: "https://cdn.sanity.io/images/h5mp19kq/production/bb2f1438061f5e799944e0ba4659720790d63bf2-1125x2250.jpg?rect=0,0,914,2250&w=750&fm=webp&q=90",
    },
    title: "Technology & Innovation",
    subtitle: "Cutting-edge solutions for modern facilities",
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
    buttonText: "Explore More",
    buttonLink: "/technology",
  },
  bottom: {
    title: "Experience the future of facility management. Smart, efficient, and eco-friendly solutions for modern businesses.",
    buttonText: "Get Started Today",
    buttonLink: "/contact",
  },
};

// ========== COMPONENTS ==========

// Split Letters Component
const SplitLetters = ({ text }) => {
  return (
    <>
      {text.split("").map((char, index) => (
        <span
          key={index}
          className="letter"
          style={{ display: "inline-block", lineHeight: 1.2 }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </>
  );
};

// Scroll Animated Title Component
const ScrollAnimatedTitle = ({ text }) => {
  const chars = text.split("");
  const ref = useRef(null);

  useGSAP(() => {
    const elements = ref.current?.querySelectorAll(".animated-char");
    if (elements) {
      gsap.fromTo(
        elements,
        {
          y: 100,
          opacity: 0,
          rotateX: -90,
        },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.02,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 80%",
            end: "top 30%",
            scrub: 0.5,
          },
        }
      );
    }
  }, []);

  return (
    <span ref={ref}>
      {chars.map((char, index) => (
        <span
          key={index}
          className="animated-char"
          style={{
            position: "relative",
            display: "inline-block",
            opacity: 0,
            transform: "translateY(3rem)",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
};

// Animated Main Title Component
const AnimatedMainTitle = ({ title }) => {
  const titleRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: titleRef,
    offset: ["start end", "end start"],
  });

  const titleScale = useTransform(scrollYProgress, [0, 0.5, 0.8], [0.3, 1, 1.1]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7], [0, 1, 1]);
  const titleY = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -50]);
  const letterSpacing = useTransform(scrollYProgress, [0, 0.5, 1], ["0.2em", "0em", "-0.02em"]);

  const words = title.split(" ");

  return (
    <motion.div
      ref={titleRef}
      style={{
        scale: titleScale,
        opacity: titleOpacity,
        y: titleY,
        letterSpacing: letterSpacing,
        textAlign: "center",
        width: "100%",
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontWeight: 900,
          fontSize: { xs: "2rem", sm: "3rem", md: "8rem", lg: "10rem" },
          color: "#000",
          lineHeight: 1.2,
          width: "100%",
          textAlign: "center",
        }}
      >
        {words.map((word, wordIndex) => (
          <motion.span
            key={wordIndex}
            style={{
              display: "inline-block",
              marginRight: "0.5rem",
            }}
          >
            {word.split("").map((char, charIndex) => (
              <motion.span
                key={charIndex}
                style={{
                  display: "inline-block",
                  whiteSpace: "pre",
                }}
                animate={{
                  scale: [0.5, 7, 1],
                }}
                transition={{
                  duration: 0.8,
                  delay: wordIndex * 0.2 + charIndex * 0.03,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.span>
        ))}
      </Typography>
    </motion.div>
  );
};

// Scroll Image Reveal Component
const ScrollImageReveal = ({ slide }) => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const clipPath = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["inset(0% 50% 0% 50%)", "inset(0% 0% 0% 0%)", "inset(0% 50% 0% 50%)"]
  );

  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 1, 1.2]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const imageRotate = useTransform(scrollYProgress, [0, 0.5, 1], [5, 0, -5]);

  const textOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const textX = useTransform(scrollYProgress, [0, 0.4, 1], [30, 0, -30]);
  const textScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);

  return (
    <Box
      ref={containerRef}
      sx={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mb: 5,
        px: { xs: 2, md: 8 },
      }}
    >
      <Box sx={{ flex: 0.5, display: { xs: "none", md: "block" } }} />

      <Box
        sx={{
          flex: 2.5,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <motion.div
          style={{
            clipPath,
            position: "relative",
            borderRadius: "24px",
            overflow: "hidden",
            boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
            aspectRatio: "3/4",
            width: "100%",
            maxWidth: 600,
          }}
        >
          <motion.div
            style={{
              scale: imageScale,
              opacity: imageOpacity,
              rotate: imageRotate,
              width: "100%",
              height: "100%",
            }}
          >
            <Box
              component="img"
              src={slide.image}
              alt={slide.alt}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />

            <Box
              sx={{
                position: "absolute",
                top: 20,
                right: 20,
                bgcolor: "rgba(0,0,0,0.7)",
                color: "#fff",
                width: 50,
                height: 50,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.2rem",
                fontWeight: "bold",
                backdropFilter: "blur(10px)",
              }}
            >
              {String(slide.id).padStart(2, "0")}
            </Box>
          </motion.div>
        </motion.div>
      </Box>

      <Box
        sx={{
          flex: 1,
          display: { xs: "none", md: "block" },
        }}
      >
        <motion.div
          style={{
            opacity: textOpacity,
            x: textX,
            scale: textScale,
          }}
        >
          <Box sx={{ pl: 3 }}>
            <Typography
              sx={{
                color: "#666",
                lineHeight: 1.6,
                textAlign: "left",
                fontSize: { xs: "0.9rem", md: "1.8rem" },
                fontWeight: 500,
              }}
            >
              {slide.description}
            </Typography>
          </Box>
        </motion.div>
      </Box>
    </Box>
  );
};

// Description Only Slide Component
const DescriptionOnlySlide = ({ slide }) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  
  const textOpacity = useTransform(scrollYProgress, [0, 0.3, 0.5, 1], [0.5, 0.5, 1, 1]);
  const textScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 1.02]);
  const textY = useTransform(scrollYProgress, [0, 0.5, 1], [30, 0, -20]);
  
  useGSAP(() => {
    const chars = textRef.current?.querySelectorAll(".desc-char");
    if (chars) {
      gsap.fromTo(
        chars,
        {
          opacity: 0.5,
          y: 20,
          rotateX: -20,
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.03,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "top 40%",
            scrub: 1,
          },
        }
      );
    }
  }, []);

  return (
    <Box
      ref={containerRef}
      sx={{
        width: "100%",
        minHeight: "60vh",
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
          y: textY,
          position: "relative",
          zIndex: 2,
          width: "100%",
          maxWidth: 1200,
          textAlign: "center",
        }}
      >
        <Typography
          ref={textRef}
          variant="h3"
          sx={{
            fontSize: { xs: "1.5rem", sm: "2.5rem", md: "3.5rem", lg: "4rem" },
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
                transform: "translateY(20px)",
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

// Sequential Reveal Wrapper
const SequentialScrollReveal = ({ slides }) => {
  return (
    <Box>
      {slides.map((slide) => {
        if (slide.type === "image") {
          return <ScrollImageReveal key={slide.id} slide={slide} />;
        } else if (slide.type === "description") {
          return <DescriptionOnlySlide key={slide.id} slide={slide} />;
        }
        return null;
      })}
    </Box>
  );
};

// Coming Soon Feature Section Component
const ComingSoonFeatureSection = ({ data }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const featuresRef = useRef(null);
  const descriptionRef = useRef(null);
  const comingTextRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1.1]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7], [0.5, 1, 0.8]);
  const contentX = useTransform(scrollYProgress, [0, 0.5, 1], [50, 0, -30]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7], [0, 1, 1]);
  
  const comingTextOpacity = useTransform(scrollYProgress, [0, 0.3, 0.5, 1], [0.5, 0.5, 1, 1]);
  const comingTextScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 1.02]);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      const titleChars = titleRef.current?.querySelectorAll(".coming-soon-char");
      if (titleChars) {
        gsap.fromTo(
          titleChars,
          {
            y: 50,
            opacity: 0,
            rotateX: -90,
          },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.8,
            stagger: 0.03,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              end: "top 30%",
              scrub: 0.5,
            },
          }
        );
      }

      const descChars = descriptionRef.current?.querySelectorAll(".desc-char-coming");
      if (descChars) {
        gsap.fromTo(
          descChars,
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.02,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%",
              end: "top 30%",
              scrub: 0.5,
            },
          }
        );
      }

      const featureItems = featuresRef.current?.querySelectorAll(".feature-item");
      if (featureItems) {
        gsap.fromTo(
          featureItems,
          {
            x: -30,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.15,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              end: "top 40%",
              scrub: 0.5,
            },
          }
        );
      }

      const comingChars = comingTextRef.current?.querySelectorAll(".coming-desc-char");
      if (comingChars) {
        gsap.fromTo(
          comingChars,
          {
            opacity: 0.5,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.02,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              end: "top 50%",
              scrub: 0.8,
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <Box
      ref={sectionRef}
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        px: { xs: 2, md: 4 },
        backgroundColor: "#F5F4DE",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 4, md: 6 },
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              flex: { xs: "1 1 100%", md: "1 1 50%" },
              position: "relative",
            }}
          >
            <motion.div
              style={{
                scale: imageScale,
                opacity: imageOpacity,
              }}
            >
              <Box
                component="img"
                src={data.feature.mainImage}
                alt="Coming soon preview"
                sx={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "24px",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                  display: "block",
                }}
              />
            </motion.div>
          </Box>

          <Box
            sx={{
              flex: { xs: "1 1 100%", md: "1 1 50%" },
            }}
          >
            <motion.div
              style={{
                x: contentX,
                opacity: contentOpacity,
              }}
            >
              {!isMobile && (
                <Box sx={{ mb: 4, maxWidth: "120px" }}>
                  <Box
                    component="img"
                    src={data.feature.appIcon}
                    alt="App icon"
                    sx={{
                      width: "100%",
                      height: "auto",
                      borderRadius: "16px",
                      boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                    }}
                  />
                </Box>
              )}

              <Box sx={{ display: "inline-block", mb: 3 }}>
                <Typography
                  variant="caption"
                  sx={{
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#667eea",
                    background: "rgba(102, 126, 234, 0.1)",
                    px: 2,
                    py: 0.75,
                    borderRadius: "20px",
                  }}
                >
                  Launching Q1 2025
                </Typography>
              </Box>

              <Typography
                ref={titleRef}
                variant="h2"
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: "2rem", sm: "2.5rem", md: "3.5rem" },
                  mb: 3,
                  color: "#1a1a1a",
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {data.feature.title.split("").map((char, index) => (
                  <span
                    key={index}
                    className="coming-soon-char"
                    style={{
                      display: "inline-block",
                      whiteSpace: "pre",
                      opacity: 0,
                      transform: "translateY(50px)",
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
              </Typography>

              <Typography
                ref={descriptionRef}
                variant="body1"
                sx={{
                  fontSize: { xs: "1rem", md: "1.2rem" },
                  lineHeight: 1.6,
                  color: "#666",
                  mb: 4,
                }}
              >
                {data.feature.description.split("").map((char, index) => (
                  <span
                    key={index}
                    className="desc-char-coming"
                    style={{
                      display: "inline-block",
                      whiteSpace: "pre",
                      opacity: 0,
                      transform: "translateY(30px)",
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
              </Typography>

              <Box ref={featuresRef}>
                {data.feature.features.map((feature, index) => (
                  <Box
                    key={index}
                    className="feature-item"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: 2,
                      opacity: 0,
                      transform: "translateX(-30px)",
                    }}
                  >
                    <Box
                      sx={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        backgroundColor: "#667eea",
                        mr: 2,
                      }}
                    />
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: { xs: "0.9rem", md: "1rem" },
                        color: "#555",
                      }}
                    >
                      {feature}
                    </Typography>
                  </Box>
                ))}
              </Box>

              {isMobile && (
                <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
                  <Box
                    component="img"
                    src={data.feature.appIcon}
                    alt="App icon"
                    sx={{
                      width: "80px",
                      height: "auto",
                      borderRadius: "16px",
                      boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                    }}
                  />
                </Box>
              )}
            </motion.div>
          </Box>
        </Box>

        <motion.div
          style={{
            opacity: comingTextOpacity,
            scale: comingTextScale,
            marginTop: "4rem",
            textAlign: "center",
          }}
        >
          <Typography
            ref={comingTextRef}
            variant="h4"
            sx={{
              fontSize: { xs: "1.2rem", sm: "1.5rem", md: "2rem" },
              fontWeight: 500,
              color: "#666",
              fontStyle: "italic",
            }}
          >
            {data.description.description.split("").map((char, idx) => (
              <span
                key={idx}
                className="coming-desc-char"
                style={{
                  display: "inline-block",
                  whiteSpace: "pre",
                  opacity: 0.5,
                }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </Typography>
        </motion.div>
      </Container>
    </Box>
  );
};

// Technology Section Component with Parallax Scrolling
const TechnologySection = ({ data }) => {

  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const sectionRef = useRef(null);

  // =========================

  // Smooth Scroll (Lenis)

  // =========================

  useEffect(() => {

    const lenis = new Lenis({

      smooth: true,

      lerp: 0.08,

    });

    const raf = (time) => {

      lenis.raf(time);

      requestAnimationFrame(raf);

    };

    requestAnimationFrame(raf);

    return () => lenis.destroy();

  }, []);

  // =========================

  // Scroll Progress

  // =========================

  const { scrollYProgress } = useScroll({

    target: sectionRef,

    offset: ["start start", "end start"],

  });

  // =========================

  // PARALLAX LAYERS

  // =========================

  // Background

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  const imageOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.85]);

  // Overlay fade

  const overlayOpacity = useTransform(

    scrollYProgress,

    [0, 0.5, 1],

    [0.4, 0.6, 0.75]

  );

  // Content motion

  const contentY = useTransform(scrollYProgress, [0, 1], ["40px", "-40px"]);

  const contentOpacity = useTransform(

    scrollYProgress,

    [0, 0.2, 0.8, 1],

    [0.6, 1, 1, 0.9]

  );

  // Grid motion

  const gridY = useTransform(scrollYProgress, [0, 1], ["25px", "-20px"]);

  const gridOpacity = useTransform(scrollYProgress, [0, 0.3, 1], [0.2, 1, 0.9]);

  // Stats motion

  const statsY = useTransform(scrollYProgress, [0, 1], ["20px", "-15px"]);

  const statsOpacity = useTransform(scrollYProgress, [0, 0.4, 1], [0.2, 1, 0.9]);

  return (

    <Box

      ref={sectionRef}

      component="section"

      id="technology"

      sx={{

        position: "relative",

        width: "100%",

        minHeight: "100vh",

        backgroundColor: "#000",

        overflow: "hidden",

      }}

    >

      {/* =========================

          BACKGROUND LAYER

      ========================= */}

      <Box

        sx={{

          position: "absolute",

          top: -100,

          left: 0,

          right: 0,

          bottom: -100,

          zIndex: 0,

        }}

      >

        <motion.div

          style={{

            y: imageY,

            scale: imageScale,

            opacity: imageOpacity,

            width: "100%",

            height: "120%",

            position: "relative",

          }}

        >

          <Box

            component="img"

            src={data.backgroundImage.desktop}

            alt="Technology"

            sx={{

              display: { xs: "none", md: "block" },

              width: "100%",

              height: "100%",

              objectFit: "cover",

            }}

          />

          <Box

            component="img"

            src={data.backgroundImage.mobile}

            alt="Technology"

            sx={{

              display: { xs: "block", md: "none" },

              width: "100%",

              height: "100%",

              objectFit: "cover",

            }}

          />

          {/* Overlay */}

          <motion.div

            style={{

              position: "absolute",

              inset: 0,

              background:

                "linear-gradient(135deg, rgba(0,0,0,0.7), rgba(0,0,0,0.85))",

              opacity: overlayOpacity,

            }}

          />

        </motion.div>

      </Box>

      {/* =========================

          CONTENT LAYER

      ========================= */}

      <Box

        sx={{

          position: "relative",

          zIndex: 1,

          minHeight: "100vh",

          display: "flex",

          alignItems: "center",

          py: 6,

        }}

      >

        <Container maxWidth="xl">

          <motion.div

            style={{

              y: contentY,

              opacity: contentOpacity,

            }}

          >

            {/* =========================

                TITLE

            ========================= */}

            <Box sx={{ textAlign: "center", mb: 6 }}>

              <Typography

                variant="h2"

                sx={{

                  fontSize: {

                    xs: "2rem",

                    sm: "2.5rem",

                    md: "3.5rem",

                    lg: "4rem",

                  },

                  fontWeight: 800,

                  color: "#fff",

                }}

              >

                {data.title}

              </Typography>

              <Typography

                variant="h6"

                sx={{

                  color: "rgba(255,255,255,0.75)",

                  maxWidth: 700,

                  mx: "auto",

                  mt: 2,

                }}

              >

                {data.subtitle}

              </Typography>

            </Box>

            {/* =========================

                GRID

            ========================= */}

            <motion.div style={{ y: gridY, opacity: gridOpacity }}>

              <Grid container spacing={4} sx={{ mb: 8 }}>

                {data.items.map((item, index) => (

                  <Grid key={index} item xs={12} sm={6} md={3}>

                    <Paper

                      sx={{

                        p: 3,

                        background: "rgba(255,255,255,0.08)",

                        backdropFilter: "blur(10px)",

                        borderRadius: 3,

                        border: "1px solid rgba(255,255,255,0.15)",

                        color: "#fff",

                      }}

                    >

                      <Typography fontWeight={700} mb={1}>

                        {item.title}

                      </Typography>

                      <Typography

                        variant="body2"

                        sx={{ color: "rgba(255,255,255,0.7)" }}

                      >

                        {item.desc}

                      </Typography>

                    </Paper>

                  </Grid>

                ))}

              </Grid>

            </motion.div>

            {/* =========================

                STATS

            ========================= */}

            <motion.div style={{ y: statsY, opacity: statsOpacity }}>

              <Grid container spacing={3} justifyContent="center">

                {data.stats.map((stat, index) => (

                  <Grid key={index} item xs={6} md={2}>

                    <Box textAlign="center">

                      <Typography

                        variant="h3"

                        sx={{ color: "#fff", fontWeight: 800 }}

                      >

                        {stat.value}

                      </Typography>

                      <Typography

                        variant="body2"

                        sx={{ color: "rgba(255,255,255,0.6)" }}

                      >

                        {stat.label}

                      </Typography>

                    </Box>

                  </Grid>

                ))}

              </Grid>

            </motion.div>

            {/* =========================

                BUTTON

            ========================= */}

            <Box textAlign="center" mt={6}>

              <Box

                component="a"

                href={data.buttonLink}

                sx={{

                  display: "inline-block",

                  px: 4,

                  py: 1.5,

                  border: "1px solid rgba(255,255,255,0.5)",

                  borderRadius: "999px",

                  color: "#fff",

                  textDecoration: "none",

                  transition: "0.3s",

                  "&:hover": {

                    background: "rgba(255,255,255,0.1)",

                    transform: "scale(1.05)",

                  },

                }}

              >

                {data.buttonText}

              </Box>

            </Box>

          </motion.div>

        </Container>

      </Box>

    </Box>

  );

};

// Bottom Section Component
const BottomSection = ({ data, endTitleRef, endButtonRef }) => {
  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        px: { xs: 3, md: 6 },
        backgroundColor: "#fafafa",
        textAlign: "center",
      }}
    >
      <Container maxWidth="md">
        <Typography
          ref={endTitleRef}
          variant="h3"
          sx={{
            fontWeight: 500,
            lineHeight: 1.3,
            fontSize: { xs: "1.5rem", md: "2rem" },
            mb: 4,
          }}
        >
          <ScrollAnimatedTitle text={data.title} />
        </Typography>

        <Box
          ref={endButtonRef}
          sx={{ opacity: 0, transform: "translateY(30px) scale(0.9)" }}
        >
          <Box
            component="a"
            href={data.buttonLink}
            sx={{
              display: "inline-block",
              backgroundColor: "#000",
              color: "#fff",
              px: 5,
              py: 1.5,
              fontSize: "1rem",
              fontWeight: 600,
              textTransform: "none",
              borderRadius: "40px",
              textDecoration: "none",
              cursor: "pointer",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "#333",
                transform: "scale(1.05)",
              },
            }}
          >
            {data.buttonText}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

// Main Component
export default function Unicus() {
  const videoRef = useRef(null);
  const heroContainerRef = useRef(null);
  const heroContentRef = useRef(null);
  const expSectionRef = useRef(null);
  const sectionLabelRef = useRef(null);
  const tagLineRef = useRef(null);
  const endTitleRef = useRef(null);
  const endButtonRef = useRef(null);

  useGSAP(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
      touchMultiplier: 2,
      wheelMultiplier: 1,
      normalizeWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const cleanupLenis = () => {
      lenis.destroy();
    };

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".letter",
        {
          y: 100,
          opacity: 0,
          rotateX: -90,
        },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1.2,
          stagger: 0.03,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: heroContainerRef.current,
            start: "top 80%",
            end: "top 30%",
            scrub: 0.5,
          },
        }
      );

      gsap.fromTo(
        ".subtitle",
        {
          y: 80,
          opacity: 0,
          scale: 0.9,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          delay: 0.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: heroContainerRef.current,
            start: "top 80%",
            end: "top 40%",
            scrub: 0.5,
          },
        }
      );

      gsap.to(heroContentRef.current, {
        opacity: 0,
        y: -50,
        duration: 1,
        ease: "power2.in",
        scrollTrigger: {
          trigger: heroContainerRef.current,
          start: "top 20%",
          end: "top -20%",
          scrub: 1,
        },
      });

      const video = videoRef.current;
      if (video && video.readyState >= 1) {
        ScrollTrigger.create({
          trigger: heroContainerRef.current,
          start: "top top",
          end: "+=4000",
          scrub: 1.5,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (video.duration && !isNaN(video.duration)) {
              video.currentTime = self.progress * video.duration;
            }
          },
        });
      }

      gsap.fromTo(
        sectionLabelRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: expSectionRef.current,
            start: "top 80%",
            end: "top 50%",
            scrub: 0.5,
          },
        }
      );

      gsap.fromTo(
        tagLineRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: expSectionRef.current,
            start: "top 80%",
            end: "top 50%",
            scrub: 0.5,
          },
        }
      );

      const chars = endTitleRef.current?.querySelectorAll(".animated-char");
      if (chars) {
        chars.forEach((char, i) => {
          gsap.to(char, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: i * 0.02,
            scrollTrigger: {
              trigger: expSectionRef.current,
              start: "bottom 80%",
              end: "bottom 30%",
              scrub: 0.5,
            },
          });
        });
      }

      gsap.fromTo(
        endButtonRef.current,
        { opacity: 0, y: 30, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: expSectionRef.current,
            start: "bottom 70%",
            end: "bottom 40%",
            scrub: 0.5,
          },
        }
      );
    });

    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((st) => st.kill());
      cleanupLenis();
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleMetadata = () => {
      ScrollTrigger.create({
        trigger: heroContainerRef.current,
        start: "top top",
        end: "+=4000",
        scrub: 1.5,
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          if (video.duration && !isNaN(video.duration)) {
            video.currentTime = self.progress * video.duration;
          }
        },
      });
    };

    if (video.readyState >= 1) {
      handleMetadata();
    } else {
      video.addEventListener("loadedmetadata", handleMetadata);
      return () => video.removeEventListener("loadedmetadata", handleMetadata);
    }
  }, []);

  return (
    <Box sx={{ overflowX: "hidden" }}>
      {/* Hero Section */}
      <Box
        ref={heroContainerRef}
        sx={{
          height: "100vh",
          position: "relative",
          overflow: "hidden",
          background: "#000",
        }}
      >
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: "scale(1.05)",
          }}
        >
          <source src={websiteData.hero.video} type="video/mp4" />
        </video>

        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.8))",
            zIndex: 1,
          }}
        />

        <Box
          ref={heroContentRef}
          sx={{
            position: "absolute",
            bottom: "10%",
            left: 0,
            right: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            px: 3,
            zIndex: 2,
          }}
        >
          <Typography
            variant="h1"
            sx={{
              color: "#fff",
              fontWeight: 800,
              overflow: "hidden",
              lineHeight: 1.2,
              mb: 2,
              fontSize: { xs: "3rem", sm: "4rem", md: "6rem", lg: "7rem" },
              textTransform: "uppercase",
              letterSpacing: "0.02em",
              textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
            }}
          >
            <SplitLetters text={websiteData.hero.title} />
          </Typography>

          <Typography
            className="subtitle"
            variant="h5"
            sx={{
              color: "#fff",
              mt: 2,
              opacity: 0.95,
              maxWidth: 700,
              lineHeight: 1.5,
              fontSize: { xs: "1.2rem", sm: "1.5rem", md: "1.8rem" },
              fontWeight: 500,
              letterSpacing: "0.05em",
              textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
            }}
          >
            {websiteData.hero.subtitle}
          </Typography>
        </Box>
      </Box>

      {/* Experience Section */}
      <Box
        ref={expSectionRef}
        component="section"
        sx={{
          pb: { xs: 8, md: 4 },
          pt: { xs: 8, md: 12 },
          backgroundColor: "#F5F4DE",
          position: "relative",
        }}
      >
        <Container maxWidth="xl">
          <Box
            sx={{
              textAlign: "center",
              mb: 8,
              overflow: "hidden",
              width: "100%",
            }}
          >
            <AnimatedMainTitle title={websiteData.titleData.mainTitle} />

            <Typography
              ref={sectionLabelRef}
              variant="caption"
              sx={{
                display: "block",
                textAlign: "center",
                mt: 4,
                fontSize: "0.75rem",
                opacity: 0,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "#999",
              }}
            >
              {websiteData.titleData.sectionLabel}
            </Typography>

            <Typography
              ref={tagLineRef}
              variant="caption"
              sx={{
                display: "block",
                textAlign: "center",
                mt: 2,
                fontSize: "0.75rem",
                opacity: 0,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "#999",
              }}
            >
              {websiteData.titleData.tagLine}
            </Typography>
          </Box>

          <SequentialScrollReveal slides={websiteData.experienceSlides} />
        </Container>
      </Box>

      {/* Coming Soon Section */}
      <ComingSoonFeatureSection data={websiteData.comingSoon} />

      {/* Technology Section */}
      <TechnologySection data={websiteData.technology} />

      {/* Bottom Section */}
      <BottomSection 
        data={websiteData.bottom} 
        endTitleRef={endTitleRef} 
        endButtonRef={endButtonRef} 
      />

      <style>
        {`
          html {
            scroll-behavior: smooth;
          }

          body {
            margin: 0;
            padding: 0;
            overflow-x: hidden;
          }

          ::-webkit-scrollbar {
            display: none;
          }

          * {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }

          .letter {
            display: inline-block;
            line-height: 1.2;
            white-space: pre;
            transform-style: preserve-3d;
          }

          .animated-char {
            display: inline-block;
            white-space: pre;
            transition: all 0.5s cubic-bezier(0.2, 0.9, 0.4, 1.1);
          }

          .coming-soon-char {
            display: inline-block;
            white-space: pre;
            transform-style: preserve-3d;
          }

          .desc-char {
            display: inline-block;
            white-space: pre;
            transition: all 0.6s cubic-bezier(0.2, 0.9, 0.4, 1.1);
          }

          .desc-char-coming {
            display: inline-block;
            white-space: pre;
            transition: all 0.5s cubic-bezier(0.2, 0.9, 0.4, 1.1);
          }

          .coming-desc-char {
            display: inline-block;
            white-space: pre;
            transition: all 0.6s cubic-bezier(0.2, 0.9, 0.4, 1.1);
          }

          .tech-title-line {
            overflow: hidden;
            display: inline-block;
          }

          .tech-title-line span {
            display: inline-block;
          }

          .tech-grid-item {
            opacity: 0;
            transform: translateY(60px);
          }

          .tech-stat-item {
            opacity: 0;
            transform: scale(0) rotateY(90deg);
          }

          .gsap-marker-start,
          .gsap-marker-end,
          .gsap-marker-scroller-start,
          .gsap-marker-scroller-end {
            display: none !important;
          }
        `}
      </style>
    </Box>
  );
}