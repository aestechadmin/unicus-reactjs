import React, { useRef, useState, useEffect } from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { websiteData } from "../Unicus";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Sectors() {
  const sectionRef = useRef(null);
  const pinRef = useRef(null);
  const containerRef = useRef(null);
  const pinTriggerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Responsive detection
  const isMobile = useMediaQuery('(max-width:600px)');
  const isTablet = useMediaQuery('(max-width:960px)');
  const isDesktop = !isMobile && !isTablet;

  const data = websiteData?.sectors;
  const services = data?.slides?.filter((slide) => slide.type === "service") || [];
  const titleSlide = data?.slides?.find((slide) => slide.type === "title");
  const allSlides = [{ type: 'title', title: titleSlide?.title, isTitle: true }, ...services];
  const totalItems = allSlides.length;

  const { scrollYProgress: sectionScrollProgress } = useScroll({
    target: sectionRef, offset: ["start start", "end end"]
  });
  const progressBarWidth = useTransform(sectionScrollProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    if (!pinRef.current || !containerRef.current) return;
    if (pinTriggerRef.current) pinTriggerRef.current.kill();
    const scroller = document.scrollingElement || document.documentElement;
    const timer = setTimeout(() => {
      pinTriggerRef.current = ScrollTrigger.create({
        trigger: pinRef.current, scroller,
        start: "top top", end: "bottom bottom",
        pin: containerRef.current, pinSpacing: true,
        scrub: 1, invalidateOnRefresh: true,
        snap: { snapTo: 1 / (totalItems - 1), duration: 0.2, ease: "power1.out" },
        onUpdate: (self) => {
          const index = Math.min(totalItems - 1, Math.round(self.progress * (totalItems - 1)));
          setActiveIndex(index);
        },
      });
    }, 100);
    return () => {
      clearTimeout(timer);
      if (pinTriggerRef.current) { pinTriggerRef.current.kill(); pinTriggerRef.current = null; }
    };
  }, [totalItems]);

  if (!data || !services.length) return null;

  // Web variants (unchanged)
  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0 }
  };
  const titleVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1 }
  };
  const descriptionVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" }
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
        initial="hidden" animate="visible" exit="hidden"
        variants={{
          hidden: { opacity: 1 },
          visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
          exit: { opacity: 0 }
        }}
      >
        <Typography sx={{
          fontSize: { xs: "1.6rem", sm: "2.2rem", md: "4.5rem", lg: "7rem" },
          fontWeight: 700, textAlign: "center", whiteSpace: "pre-line",
          color: "#000", lineHeight: 1.3, px: { xs: 2, md: 0 },
        }}>
          {characters.map((char, index) => (
            <motion.span
              key={index}
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.4, ease: "easeOut" }}
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
    <Box ref={sectionRef} sx={{
      backgroundColor: "#F5F4DE", position: "relative",
      zIndex: 1, overflowX: "hidden", minHeight: "100vh",
    }}>
      <motion.div style={{
        position: "absolute", top: 0, left: 0, right: 0,
        height: "3px", background: "#000", transformOrigin: "0%",
        scaleX: progressBarWidth, zIndex: 100,
      }} />

      <Box ref={pinRef} sx={{
        height: `${totalItems * 100}vh`, position: "relative", background: "#F5F4DE",
      }}>
        <Box ref={containerRef} sx={{
          position: "sticky", top: 0, height: "100vh",
          background: "#F5F4DE", overflow: "hidden", zIndex: 10,
        }}>

          {/* Counter */}
          <Box sx={{
            position: "absolute", top: { xs: 16, md: 30 }, right: { xs: 16, md: 30 },
            zIndex: 20, fontFamily: "monospace", fontSize: { xs: 11, md: 14 },
            color: "#000", background: "rgba(0,0,0,0.05)",
            padding: { xs: "5px 10px", md: "8px 16px" },
            borderRadius: 20, backdropFilter: "blur(10px)",
          }}>
            {activeIndex === 0 ? "✨" : `${activeIndex} / ${totalItems - 1}`}
          </Box>

          {/* ─── WEB LAYOUT (UNCHANGED) ─── */}
          {isDesktop && (
            <>
              {/* ── LEFT MENU — vertically centered ── */}
              <AnimatePresence>
                {activeIndex > 0 && (
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.4 }}
                    style={{
                      position: "absolute",
                      left: 0,
                      top: "30%",
                      transform: "translateY(-50%)",
                      width: "28%",
                      zIndex: 10,
                      padding: "0 12px 0 16px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      maxHeight: "80vh",
                      overflowY: "auto",
                    }}
                  >
                    {services.map((item, idx) => (
                      <Box
                        key={idx}
                        onClick={() => setActiveIndex(idx + 1)}
                        sx={{ cursor: "pointer", mb: { xs: 1, md: 1.5 } }}
                      >
                        <motion.div
                          animate={activeIndex - 1 === idx
                            ? { opacity: 1, x: 8, scale: 1.03 }
                            : { opacity: 0.4, x: 0, scale: 1 }
                          }
                          transition={{ duration: 0.3 }}
                          whileHover={{ opacity: 0.8, x: 4 }}
                        >
                          <Typography sx={{
                            fontSize: { xs: 9, sm: 11, md: 14, lg: 16 },
                            fontWeight: activeIndex - 1 === idx ? 700 : 400,
                            color: "#000",
                            position: "relative",
                            pl: { xs: "12px", md: "18px" },
                            lineHeight: 2,
                            "&::before": activeIndex - 1 === idx ? {
                              content: '""', position: "absolute",
                              left: 0, top: "50%", transform: "translateY(-50%)",
                              width: { xs: 6, md: 10 }, height: 2,
                              background: "#000", borderRadius: 2,
                            } : {},
                          }}>
                            {item.name}
                          </Typography>
                        </motion.div>
                      </Box>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ── CENTER IMAGE ── */}
              <Box sx={{
                position: "absolute", left: "50%", top: "50%",
                transform: "translate(-50%, -50%)",
                width: { xs: "90%", md: "80%" },
                textAlign: "center",
              }}>
                <AnimatePresence mode="wait">
                  {allSlides.map((item, idx) => (
                    activeIndex === idx && (
                      <motion.div
                        key={idx}
                        initial="hidden" animate="visible" exit="hidden"
                        variants={item.isTitle ? titleVariants : imageVariants}
                        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                        style={{ width: "100%" }}
                      >
                        {item.isTitle ? (
                          <AnimatedTitle text={item.title} />
                        ) : (
                          <Box>
                            <Box sx={{
                              width: "100%",
                              maxWidth: { xs: "60%", sm: "45%", md: "40%" },
                              margin: "0 auto",
                              borderRadius: { xs: 6, md: 12 },
                              overflow: "hidden",
                              boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
                              mb: { xs: 2, md: 3 },
                            }}>
                              <Box component="img" src={item.image} alt={item.name}
                                sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                              />
                            </Box>
                            <Typography sx={{
                              fontSize: { xs: 13, sm: 16, md: 22, lg: 26 },
                              fontWeight: 700, color: "#000",
                            }}>
                              {item.name}
                            </Typography>
                          </Box>
                        )}
                      </motion.div>
                    )
                  ))}
                </AnimatePresence>
              </Box>

              {/* ── RIGHT DESCRIPTION — desktop ── */}
              <Box sx={{
                position: "absolute", right: "3%", top: "50%",
                transform: "translateY(-50%)", width: "22%",
                zIndex: 10, display: { xs: "none", md: "block" },
              }}>
                <AnimatePresence mode="wait">
                  {services.map((item, idx) => (
                    activeIndex - 1 === idx && (
                      <motion.div key={idx} initial="hidden" animate="visible" exit="hidden"
                        variants={descriptionVariants} transition={{ duration: 0.4, delay: 0.15 }}
                      >
                        <Typography sx={{ fontSize: { md: 15, lg: 17 }, lineHeight: 1.7, color: "#555", textAlign: "right" }}>
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
              {/* ── TOP CENTER MENU — Mobile/Tablet ── */}
              <AnimatePresence>
                {activeIndex > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.4 }}
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
                    {services.map((item, idx) => (
                      <Box
                        key={idx}
                        onClick={() => setActiveIndex(idx + 1)}
                        sx={{ 
                          cursor: "pointer", 
                          width: "100%",
                          padding: "4px 0",
                          transition: "all 0.3s ease",
                        }}
                      >
                        <motion.div
                          animate={activeIndex - 1 === idx
                            ? { opacity: 1, x: 8, scale: 1.03 }
                            : { opacity: 0.4, x: 0, scale: 1 }
                          }
                          transition={{ duration: 0.3 }}
                          whileHover={{ opacity: 0.8, x: 4 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Typography sx={{
                            fontSize: { xs: "1.5rem", sm: "0.9rem" },
                            fontWeight: activeIndex - 1 === idx ? 700 : 400,
                            color: "#000",
                            position: "relative",
                            paddingLeft: "16px",
                            lineHeight: 2,
                            transition: "all 0.3s ease",
                          }}>
                            {item.name}
                          </Typography>
                        </motion.div>
                      </Box>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ── CENTER CONTENT — Mobile/Tablet ── */}
              <Box sx={{
                position: "absolute", left: "50%", top: "60%",
                transform: "translate(-50%, -50%)",
                width: "100%",
                textAlign: "center",
                px: { xs: 2, sm: 3 },
              }}>
                <AnimatePresence mode="wait">
                  {allSlides.map((item, idx) => (
                    activeIndex === idx && (
                      <motion.div
                        key={idx}
                        initial="hidden" animate="visible" exit="hidden"
                        variants={item.isTitle ? mobileTitleVariants : mobileImageVariants}
                        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                        style={{ width: "100%" }}
                      >
                        {item.isTitle ? (
                          <AnimatedTitle text={item.title} />
                        ) : (
                          <Box>
                            <Box sx={{
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
                            }}>
                              <Box component="img" src={item.image} alt={item.name}
                                sx={{ 
                                  width: "100%", 
                                  height: "auto", 
                                  objectFit: "cover", 
                                  display: "block",
                                  aspectRatio: "4/3",
                                }}
                              />
                            </Box>
                            <Typography sx={{
                              fontSize: { xs: "2rem", sm: "1.5rem" },
                              fontWeight: 700, color: "#000",
                              mb: { xs: 1, sm: 2 },
                            }}>
                              {item.name}
                            </Typography>
                            {/* ── MOBILE DESCRIPTION ── */}
                            <AnimatePresence mode="wait">
                              {services.map((service, sIdx) => (
                                activeIndex - 1 === sIdx && (
                                  <motion.div
                                    key={sIdx}
                                    initial="hidden" animate="visible" exit="hidden"
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
                                      {service.description}
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