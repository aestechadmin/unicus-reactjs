import React, { useRef, useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { websiteData } from "../Unicus";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Growth() {
  const sectionRef = useRef(null);
  const pinRef = useRef(null);
  const containerRef = useRef(null);
  const pinTriggerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef(null);

  const data = websiteData?.growth;
  const partners = data?.slides?.filter((slide) => slide.type === "partner") || [];
  const titleSlide = data?.slides?.find((slide) => slide.type === "title");
  const totalSlides = partners.length;

  const allSlides = [{ type: 'title', title: titleSlide?.title, isTitle: true }, ...partners];
  const totalItems = allSlides.length;

  const { scrollYProgress: sectionScrollProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  const progressBarWidth = useTransform(sectionScrollProgress, [0, 1], ["0%", "100%"]);


useEffect(() => {
  if (!pinRef.current || !containerRef.current) return;

  if (pinTriggerRef.current) {
    pinTriggerRef.current.kill();
  }

  const timer = setTimeout(() => {
    pinTriggerRef.current = ScrollTrigger.create({
      trigger: pinRef.current,
      start: "top top",
      end: "bottom bottom",
      pin: containerRef.current,
      pinSpacing: true,
      scrub: 1,
      invalidateOnRefresh: true,
      snap: {
        snapTo: 1 / (totalItems - 1),
        duration: 0.3,
        ease: "power1.out"
      },
      onUpdate: (self) => {
        const index = Math.min(totalItems - 1, Math.round(self.progress * (totalItems - 1)));
        setActiveIndex(index);
      },
    });
    ScrollTrigger.refresh();
  }, 100);

  return () => {
    clearTimeout(timer);
    if (pinTriggerRef.current) {
      pinTriggerRef.current.kill();
      pinTriggerRef.current = null;
    }
  };
}, [totalItems]);

  if (!data || !partners.length) {
    return null;
  }

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95, x: 20, rotateY: -10 },
    visible: { opacity: 1, scale: 1, x: 0, rotateY: 0 }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1 }
  };

  const descriptionVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" }
  };

  const menuItemVariants = {
    inactive: { opacity: 0.4, x: 0, fontWeight: 400, scale: 1 },
    active: { opacity: 1, x: 10, fontWeight: 700, scale: 1.05 }
  };

const AnimatedTitle = ({ text }) => {
  const characters = text.split('');
  
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={{
        hidden: { opacity: 1 },
        visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
        hidden: { opacity: 0, transition: { staggerChildren: 0.02 } }
      }}
    >
      <Typography
        sx={{
          fontSize: { xs: "2rem", sm: "2.5rem", md: "3.5rem", lg: "9rem" },
          fontWeight: 700,
          textAlign: "center",
          whiteSpace: "pre-line",
          color: "#000",
          lineHeight: 1.6,
        }}
      >
        {characters.map((char, index) => (
          <motion.span
            key={index}
            variants={{
              hidden: { opacity: 0, y: 50, rotateX: 90 },
              visible: { opacity: 1, y: 0, rotateX: 0 },
              hidden: { opacity: 0, y: -50, rotateX: -90 }
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{ display: 'inline-block' }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </Typography>
    </motion.div>
  );
};

// Use it like this:


  return (
    <Box 
      ref={sectionRef}
      sx={{ 
        backgroundColor: "#F5F4DE",
        position: "relative",
        zIndex: 1,
        overflowX: "hidden",
        minHeight: "100vh",
      }}
    >
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "3px",
          background: "#000",
          transformOrigin: "0%",
          scaleX: progressBarWidth,
          zIndex: 1000,
        }}
      />

      <Box
        ref={pinRef}
        sx={{
          height: `${totalItems * 100}vh`,
          position: "relative",
          background: "#F5F4DE",
        }}
      >
        <Box
          ref={containerRef}
          sx={{
            position: "sticky",
            top: 0,
            height: "100vh",
            background: "#F5F4DE",
            overflow: "hidden",
            zIndex: 10,

          }}
        >
          <motion.div
            style={{
              position: "absolute",
              top: 30,
              right: 30,
              zIndex: 20,
              fontFamily: "monospace",
              fontSize: 14,
              color: "#000",
              background: "rgba(0,0,0,0.05)",
              padding: "8px 16px",
              borderRadius: 20,
              backdropFilter: "blur(10px)",
            }}
          >
            {activeIndex === 0 ? "✨" : `${activeIndex} / ${totalItems - 1}`}
          </motion.div>

          {/* LEFT MENU */}
          <AnimatePresence>
            {activeIndex > 0 && (
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                style={{
                  position: "absolute",
                  top: "30%",
                  transform: "translateY(-50%)",
                  width: "30%",
                  zIndex: 10,
                  
                }}
              >
                {partners.map((item, idx) => (
                  <motion.div
                    key={idx}
                    variants={menuItemVariants}
                    initial="inactive"
                    animate={activeIndex - 1 === idx ? "active" : "inactive"}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    whileHover={{ x: 15, scale: 1.02 }}
                  >
                    <Typography
                      sx={{
                        mb: { xs: 2, md: 3 },
                        fontSize: { xs: 14, md: 16, lg: 18 },
                        color: "#000",
                        transition: "color 0.3s ease",
                        position: "relative",
                        cursor: "pointer",
                        "&::before": activeIndex - 1 === idx ? {
                          content: '""',
                          position: "absolute",
                          left: -20,
                          top: "50%",
                          transform: "translateY(-50%)",
                          width: 12,
                          height: 2,
                          background: "#000",
                          borderRadius: 2,
                        } : {},
                      }}
                    >
                      {item.name}
                    </Typography>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* CENTER IMAGE */}
          <Box
            sx={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: "90%",
              textAlign: "center",
              my:3

            }}
          >
            <AnimatePresence mode="wait">
              {allSlides.map((item, idx) => (
                activeIndex === idx && (
                  <motion.div
                    key={idx}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={item.isTitle ? titleVariants : imageVariants}
                    transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                    style={{ width: "100%" }}
                  >
                    {item.isTitle ? (
                      <AnimatedTitle text={item.title} />
                    ) : (
                      <Box>
                        <Box
                          sx={{
                            width: "100%",
                            maxWidth: '45%',
                            // height: { xs: "40vh", md: "55vh" },
                            margin: "0 auto",
                            borderRadius: 16,
                            overflow: "hidden",
                            boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
                            mb: 4,
                          }}
                        >
                          <Box
                            component="img"
                            src={item.image}
                            alt={item.name}
                            sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                          />
                        </Box>
                        <Typography sx={{ fontSize: { xs: 20, md: 28 }, fontWeight: 700, color: "#000", mb: 2 }}>
                          {item.name}
                        </Typography>
                      </Box>
                    )}
                  </motion.div>
                )
              ))}
            </AnimatePresence>
          </Box>

          {/* RIGHT DESCRIPTION */}
          <Box
            sx={{
              position: "absolute",
              right: '4%',
              top: "45%",
              transform: "translateY(-50%)",
              width: "25%",
              zIndex: 10,
            }}
          >
            <AnimatePresence mode="wait">
              {partners.map((item, idx) => (
                activeIndex - 1 === idx && (
                  <motion.div
                    key={idx}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={descriptionVariants}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
                    style={{ width: "100%" }}
                  >
                    <Typography
                      sx={{
                        fontSize: { xs: 12, md: 16, lg: 18 },
                        lineHeight: 1.7,
                        color: "#555",
                        textAlign: "right",
                      }}
                    >
                      {item.description}
                    </Typography>
                  </motion.div>
                )
              ))}
            </AnimatePresence>
          </Box>

          {/* Next section indicator */}
          {/* <AnimatePresence>
            {activeIndex === totalItems - 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                style={{
                  position: "absolute",
                  bottom: 40,
                  left: "50%",
                  transform: "translateX(-50%)",
                  textAlign: "center",
                  zIndex: 20,
                }}
              >
                <Typography sx={{ fontSize: 14, color: "#000", opacity: 0.6, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                  Continue to Technology ↓
                </Typography>
              </motion.div>
            )}
          </AnimatePresence> */}
        </Box>
      </Box>
    </Box>
  );
}