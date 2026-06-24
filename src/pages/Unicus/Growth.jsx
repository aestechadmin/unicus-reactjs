import React, { useRef, useState, useEffect } from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { websiteData } from "../Unicus";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Growth() {
  const sectionRef = useRef(null);
  const pinRef = useRef(null);
  const containerRef = useRef(null);
  const pinTriggerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Responsive detection
  const isMobile = useMediaQuery('(max-width:600px)');
  const isTablet = useMediaQuery('(max-width:960px)');
  const isDesktop = !isMobile && !isTablet;

  const data = websiteData?.growth;
  const partners = data?.slides?.filter((slide) => slide.type === "partner") || [];
  const titleSlide = data?.slides?.find((slide) => slide.type === "title");

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

    const scroller = document.scrollingElement || document.documentElement;

    const timer = setTimeout(() => {
      pinTriggerRef.current = ScrollTrigger.create({
        trigger: pinRef.current,
        scroller,
        start: "top top",
        end: "bottom bottom",
        pin: containerRef.current,
        pinSpacing: true,
        scrub: 1,
        invalidateOnRefresh: true,
        snap: {
          snapTo: 1 / (totalItems - 1),
          duration: 0.2,
          ease: "power1.out"
        },
        onUpdate: (self) => {
          const index = Math.min(totalItems - 1, Math.round(self.progress * (totalItems - 1)));
          setActiveIndex(index);
        },
      });
    }, 150);

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

  // Web variants (unchanged)
  const webImageVariants = {
    hidden: { opacity: 0, scale: 0.95, x: 20, rotateY: -10 },
    visible: { opacity: 1, scale: 1, x: 0, rotateY: 0 }
  };

  const webTitleVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1 }
  };

  const webDescriptionVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" }
  };

  const webMenuItemVariants = {
    inactive: { opacity: 0.4, x: 0, fontWeight: 400, scale: 1 },
    active: { opacity: 1, x: 10, fontWeight: 700, scale: 1.05 }
  };

  // Mobile/Tablet variants
  const mobileImageVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 30 },
    visible: { opacity: 1, scale: 1, y: 0 }
  };

  const mobileTitleVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1 }
  };

  const mobileDescriptionVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(5px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" }
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
          exit: { opacity: 0, transition: { staggerChildren: 0.02 } }
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
                exit: { opacity: 0, y: -50, rotateX: -90 }
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

  return (
    <Box 
      ref={sectionRef}
      sx={{ 
        backgroundColor: "#F5F4DE",
        position: "relative",
        zIndex: 1,
        isolation: "isolate", 
        overflowX: "hidden",
        minHeight: "100vh",
      }}
    >
      <motion.div
        style={{
          position: "absolute",
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
          overflow: "hidden",
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
          {/* Counter badge */}
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

          {/* ─── WEB LAYOUT (UNCHANGED) ─── */}
          {isDesktop && (
            <>
              {/* LEFT MENU - Web */}
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
                      paddingLeft: "20px",
                    }}
                  >
                    {partners.map((item, idx) => (
                      <motion.div
                        key={idx}
                        variants={webMenuItemVariants}
                        initial="inactive"
                        animate={activeIndex - 1 === idx ? "active" : "inactive"}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        whileHover={{ x: 15, scale: 1.02 }}
                        onClick={() => setActiveIndex(idx + 1)}
                        style={{ cursor: "pointer" }}
                      >
                        <Typography
                          sx={{
                            mb: 3,
                            fontSize: { md: 16, lg: 18 },
                            color: "#000",
                            transition: "color 0.3s ease",
                            position: "relative",
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

              {/* CENTER IMAGE - Web */}
              <Box
                sx={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "90%",
                  textAlign: "center",
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
                        variants={item.isTitle ? webTitleVariants : webImageVariants}
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

              {/* RIGHT DESCRIPTION - Web */}
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
                        variants={webDescriptionVariants}
                        transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
                        style={{ width: "100%" }}
                      >
                        <Typography
                          sx={{
                            fontSize: { md: 16, lg: 18 },
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
            </>
          )}

          {/* ─── MOBILE/TABLET LAYOUT ─── */}
          {(isMobile || isTablet) && (
            <>
              {/* TOP CENTER MENU - Mobile/Tablet (SAME AS WEB BUT AT TOP CENTER) */}
              <AnimatePresence>
                {activeIndex > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.5 }}
                    style={{
                      position: "absolute",
                      top: "8%",
                      left: "8%",
                      transform: "translateX(-50%)",
                      width: "85%",
                      maxWidth: "500px",
                      zIndex: 10,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      padding: "12px 20px",
                      backdropFilter: "blur(20px)",
                      borderRadius: "12px",
                    }}
                  >
                    {partners.map((item, idx) => (
                      <motion.div
                        key={idx}
                        variants={webMenuItemVariants}
                        initial="inactive"
                        animate={activeIndex - 1 === idx ? "active" : "inactive"}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        whileHover={{ x: 8, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setActiveIndex(idx + 1)}
                        style={{
                          cursor: "pointer",
                          width: "100%",
                          padding: "4px 0",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: { xs: "1.2rem", sm: "0.9rem" },
                            color: "#000",
                            fontWeight: activeIndex - 1 === idx ? 700 : 400,
                            position: "relative",
                            paddingLeft: "16px",
                            lineHeight: 2,
                            transition: "all 0.3s ease",
                          }}
                        >
                          {item.name}
                        </Typography>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* CENTER CONTENT - Mobile/Tablet */}
              <Box
                sx={{
                  position: "absolute",
                  left: "50%",
                  top: "60%",
                  transform: "translate(-50%, -50%)",
                  width: "100%",
                  textAlign: "center",
                  px: { xs: 2, sm: 3 },
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
                        variants={item.isTitle ? mobileTitleVariants : mobileImageVariants}
                        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                        style={{ width: "100%" }}
                      >
                        {item.isTitle ? (
                          <AnimatedTitle text={item.title} />
                        ) : (
                          <Box>
                            <Box
                              sx={{
                                width: "100%",
                                maxWidth: { xs: "100%", sm: "50%" },
                                margin: "0 auto",
                                borderRadius: { xs: 2, sm: 16 },
                                overflow: "hidden",
                                boxShadow: { 
                                  xs: "0 15px 30px rgba(0,0,0,0.12)",
                                  sm: "0 20px 40px rgba(0,0,0,0.15)"
                                },
                                mb: { xs: 2, sm: 3 },
                              }}
                            >
                              <Box
                                component="img"
                                src={item.image}
                                alt={item.name}
                                sx={{ 
                                  width: "100%", 
                                  height: "auto", 
                                  objectFit: "cover",
                                  aspectRatio: "4/3",
                                }}
                              />
                            </Box>
                            <Typography sx={{ 
                              fontSize: { xs: "2rem", sm: "1.5rem" },
                              fontWeight: 700, 
                              color: "#000",
                              mb: { xs: 1, sm: 2 },
                            }}>
                              {item.name}
                            </Typography>
                            <AnimatePresence mode="wait">
                              {partners.map((partner, pIdx) => (
                                activeIndex - 1 === pIdx && (
                                  <motion.div
                                    key={pIdx}
                                    initial="hidden"
                                    animate="visible"
                                    exit="hidden"
                                    variants={mobileDescriptionVariants}
                                    transition={{ duration: 0.3, delay: 0.1 }}
                                  >
                                    <Typography sx={{
                                      fontSize: { xs: "1.6rem", sm: "0.9rem" },
                                      color: "#555",
                                      lineHeight: 1.5,
                                      maxWidth: "85%",
                                      mx: "auto",
                                      px: 2,
                                    }}>
                                      {partner.description}
                                    </Typography>
                                  </motion.div>
                                )
                              ))}
                            </AnimatePresence>
                          </Box>
                        )}
                      </motion.div>
                    )
                  ))}
                </AnimatePresence>
              </Box>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
}