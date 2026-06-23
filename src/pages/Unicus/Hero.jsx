// import React, { useRef, useEffect } from "react";
// import { Box, Typography } from "@mui/material";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { useGSAP } from "@gsap/react";
// import { websiteData } from "../Unicus";

// // Register GSAP plugins
// gsap.registerPlugin(ScrollTrigger);

// const SplitLetters = ({ text }) => {
//   return (
//     <>
//       {text.split("").map((char, index) => (
//         <span key={index} className="letter" style={{ display: "inline-block", lineHeight: 1.2 }}>
//           {char === " " ? "\u00A0" : char}
//         </span>
//       ))}
//     </>
//   );
// };

// export default function Hero({ heroContainerRef, expSectionRef }) {
//   const videoRef = useRef(null);
//   const heroContentRef = useRef(null);

//   useGSAP(() => {
//     const heroContainer = heroContainerRef.current;
//     if (!heroContainer) return;

//     const heroContent = heroContentRef.current;
//     if (!heroContent) return;

//     const scroller = document.scrollingElement || document.documentElement;

//     // Create animations
//     const tl = gsap.timeline({
//       scrollTrigger: {
//         trigger: heroContainer,
//         scroller,
//         start: "top 80%",
//         end: "top 30%",
//         scrub: 0.5,
//         invalidateOnRefresh: true,
//       }
//     });

//     // Letter animation
//     tl.fromTo(".letter",
//       { y: 100, opacity: 0, rotateX: -90 },
//       {
//         y: 0,
//         opacity: 1,
//         rotateX: 0,
//         duration: 1.2,
//         stagger: 0.03,
//         ease: "back.out(1.2)",
//       }
//     );

//     // Subtitle animation
//     tl.fromTo(".subtitle",
//       { y: 80, opacity: 0, scale: 0.9 },
//       {
//         y: 0,
//         opacity: 1,
//         scale: 1,
//         duration: 1,
//         delay: 0.5,
//         ease: "power3.out",
//       },
//       "-=0.5" // Overlap with previous animation
//     );

//     // Fade out animation - separate ScrollTrigger
//     gsap.to(".letter, .subtitle", {
//       opacity: 0,
//       y: -50,
//       ease: "power2.in",
//       scrollTrigger: {
//         trigger: heroContainer,
//         scroller,
//         start: "top top",
//         end: "+=500",
//         scrub: true,
//         invalidateOnRefresh: true,
//       },
//     });

//     // Cleanup function
//     return () => {
//       ScrollTrigger.getAll().forEach(trigger => trigger.kill());
//     };
//   }, [heroContainerRef]);

//   useEffect(() => {
//     const video = videoRef.current;
//     if (!video) return;

//     const scroller = document.scrollingElement || document.documentElement;
//     let scrollTriggerInstance = null;

//     const handleMetadata = () => {
//       // Kill any existing trigger
//       if (scrollTriggerInstance) {
//         scrollTriggerInstance.kill();
//       }

//       scrollTriggerInstance = ScrollTrigger.create({
//         trigger: heroContainerRef.current,
//         scroller,
//         start: "top top",
//         end: "+=2000",
//         scrub: 1.5,
//         pin: true,
//         anticipatePin: 1,
//         onUpdate: (self) => {
//           // Update letter opacity and position
//           gsap.set(".letter, .subtitle", {
//             opacity: Math.max(0, 1 - self.progress * 4),
//             y: -90 * self.progress,
//           });
          
//           // Update video progress
//           if (video.duration && !isNaN(video.duration)) {
//             video.currentTime = self.progress * video.duration;
//           }
//         },
//       });
//     };

//     if (video.readyState >= 1) {
//       handleMetadata();
//     } else {
//       video.addEventListener("loadedmetadata", handleMetadata);
//     }

//     // Cleanup
//     return () => {
//       video.removeEventListener("loadedmetadata", handleMetadata);
//       if (scrollTriggerInstance) {
//         scrollTriggerInstance.kill();
//       }
//     };
//   }, [heroContainerRef]);

//   return (
//     <Box 
//       ref={heroContainerRef} 
//       sx={{ 
//         height: "100vh", 
//         position: "relative", 
//         overflow: "hidden", 
//         background: "#000" 
//       }}
//     >
//       <video 
//         ref={videoRef} 
//         muted 
//         playsInline 
//         preload="auto" 
//         style={{ 
//           width: "100%", 
//           height: "100%", 
//           objectFit: "cover", 
//           transform: "scale(1.05)" 
//         }}
//       >
//         <source src={websiteData.hero.video} type="video/mp4" />
//       </video>
      
//       <Box sx={{ 
//         position: "absolute", 
//         inset: 0, 
//         background: "linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.8))", 
//         zIndex: 1 
//       }} />
      
//       <Box 
//         ref={heroContentRef} 
//         sx={{ 
//           position: "absolute", 
//           bottom: "10%", 
//           left: 0, 
//           right: 0, 
//           display: "flex", 
//           flexDirection: "column", 
//           justifyContent: "center", 
//           alignItems: "center", 
//           textAlign: "center", 
//           px: 3, 
//           zIndex: 2 
//         }}
//       >
//         <Typography 
//           variant="h1" 
//           sx={{ 
//             color: "#fff", 
//             fontWeight: 700, 
//             overflow: "hidden", 
//             lineHeight: 1.2, 
//             mb: 2, 
//             fontSize: { xs: "3rem", sm: "4rem", md: "6rem", lg: "7rem" }, 
//             textTransform: "uppercase", 
//             letterSpacing: "0.02em", 
//             textShadow: "2px 2px 4px rgba(0,0,0,0.3)" 
//           }}
//         >
//           <SplitLetters text={websiteData.hero.title} />
//         </Typography>
        
//         <Typography 
//           className="subtitle" 
//           variant="h5" 
//           sx={{ 
//             color: "#fff", 
//             mt: 2, 
//             opacity: 0.95, 
//             maxWidth: 700, 
//             lineHeight: 1.5, 
//             fontSize: { xs: "1.2rem", sm: "1.5rem", md: "1.8rem" }, 
//             fontWeight: 500, 
//             letterSpacing: "0.05em", 
//             textShadow: "1px 1px 2px rgba(0,0,0,0.3)" 
//           }}
//         >
//           {websiteData.hero.subtitle}
//         </Typography>
//       </Box>
//     </Box>
//   );
// }

import React, { useRef, useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { websiteData } from "../Unicus";

const SplitLetters = ({ text }) => {
  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.2,
      },
    },
  };

  const letterVariant = {
    hidden: { y: 100, opacity: 0, rotateX: -90 },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 1.2,
        ease: [0.34, 1.56, 0.64, 1],
      },
    },
  };

  return (
    <motion.span
      variants={container}
      initial="hidden"
      animate="visible"
      style={{ display: "inline-block", perspective: 600 }}
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          className="letter"
          variants={letterVariant}
          style={{
            display: "inline-block",
            lineHeight: 1.2,
            whiteSpace: "pre",
            transformStyle: "preserve-3d",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
};

export default function Hero({ heroContainerRef }) {
  const videoRef = useRef(null);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [isDone, setIsDone] = useState(false);

  // PIN_HEIGHT = how many px of scroll the hero stays pinned
  const PIN_HEIGHT = 2000;

  // Single motion value — manually driven by Lenis scroll
  const scrollMV = useMotionValue(0);

  // All transforms derived at top level — no hooks in JSX
  const textOpacity   = useTransform(scrollMV, [0, PIN_HEIGHT * 0.35], [1, 0]);
  const textY         = useTransform(scrollMV, [0, PIN_HEIGHT],         [0, -80]);
  const heroOpacity   = useTransform(scrollMV, [PIN_HEIGHT * 0.8, PIN_HEIGHT], [1, 0]);
  const progressScale = useTransform(scrollMV, [0, PIN_HEIGHT],         [0, 1]);
  const indicatorOpa  = useTransform(scrollMV, [0, PIN_HEIGHT * 0.75],  [1, 0]);

  // Video ready
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoaded = () => {
      video.currentTime = 0;
      video.pause();
      setIsVideoReady(true);
    };

    if (video.readyState >= 3) {
      handleLoaded();
    } else {
      video.addEventListener("loadeddata", handleLoaded);
      return () => video.removeEventListener("loadeddata", handleLoaded);
    }
  }, []);

  // Main scroll driver — listen to Lenis via its event,
  // fallback to native scroll. Updates scrollMV directly.
  useEffect(() => {
    const video = videoRef.current;

    const onScroll = (scrollY) => {
      // Clamp to pin range
      const clamped = Math.min(Math.max(scrollY, 0), PIN_HEIGHT);
      scrollMV.set(clamped);

      // Scrub video
      if (video && isVideoReady && video.duration && !isNaN(video.duration)) {
        const progress = clamped / PIN_HEIGHT;
        video.currentTime = Math.min(
          progress * video.duration,
          video.duration - 0.01
        );
      }

      // Unpin when scroll passes PIN_HEIGHT
      if (scrollY >= PIN_HEIGHT) {
        setIsDone(true);
      } else {
        setIsDone(false);
      }
    };

    // Try to hook into Lenis if available
    const tryLenis = () => {
      // Lenis instance is on window if you expose it, otherwise use scroll event
      const handleNative = () => onScroll(window.scrollY || window.pageYOffset);
      window.addEventListener("scroll", handleNative, { passive: true });
      handleNative();
      return () => window.removeEventListener("scroll", handleNative);
    };

    const cleanup = tryLenis();
    return cleanup;
  }, [isVideoReady, scrollMV, PIN_HEIGHT]);

  return (
    <>
      {/* 
        Spacer — height = 100vh (initial view) + PIN_HEIGHT px of scroll room.
        No background so Experience section shows through once hero is gone.
      */}
      <div
        ref={heroContainerRef}
        style={{
          height: `calc(100vh + ${PIN_HEIGHT}px)`,
          width: "100%",
          background: "transparent",
          pointerEvents: "none",
          flexShrink: 0,
        }}
      />

      {/* Fixed hero — removed from DOM once scroll past PIN_HEIGHT */}
      {!isDone && (
        <motion.div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            overflow: "hidden",
            zIndex: 10,
            pointerEvents: "none",
            opacity: heroOpacity,
          }}
        >
          {/* Video */}
          <video
            ref={videoRef}
            muted
            playsInline
            preload="auto"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: "scale(1.05)",
            }}
          >
            <source src={websiteData.hero.video} type="video/mp4" />
          </video>

          {/* Gradient overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.8))",
              zIndex: 1,
            }}
          />

          {/* Text + indicators */}
          <motion.div
            style={{
              position: "absolute",
              bottom: "10%",
              left: 0,
              right: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              padding: "0 1.5rem",
              zIndex: 2,
              opacity: textOpacity,
              y: textY,
            }}
          >
            {/* Title */}
            <Typography
              variant="h1"
              sx={{
                color: "#fff",
                fontWeight: 700,
                lineHeight: 1.2,
                mb: 2,
                fontSize: { xs: "3rem", sm: "4rem", md: "6rem", lg: "7rem" },
                textTransform: "uppercase",
                letterSpacing: "0.02em",
                textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                overflow: "hidden",
              }}
            >
              <SplitLetters text={websiteData.hero.title} />
            </Typography>

            {/* Subtitle */}
            <motion.div
              initial={{ y: 60, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 0.95, scale: 1 }}
              transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <Typography
                variant="h5"
                sx={{
                  color: "#fff",
                  mt: 2,
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
            </motion.div>

            {/* Progress bar */}
            <div
              style={{
                marginTop: "28px",
                width: "180px",
                height: "2px",
                background: "rgba(255,255,255,0.15)",
                borderRadius: "9999px",
                overflow: "hidden",
              }}
            >
              <motion.div
                style={{
                  height: "100%",
                  background: "rgba(255,255,255,0.7)",
                  scaleX: progressScale,
                  transformOrigin: "left",
                }}
              />
            </div>

            {/* Bouncing dot indicator */}
            <motion.div
              style={{ marginTop: "16px", opacity: indicatorOpa }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <div
                style={{
                  width: "24px",
                  height: "40px",
                  border: "2px solid rgba(255,255,255,0.3)",
                  borderRadius: "12px",
                  display: "flex",
                  justifyContent: "center",
                  paddingTop: "6px",
                  margin: "0 auto",
                }}
              >
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{
                    width: "3px",
                    height: "12px",
                    background: "rgba(255,255,255,0.6)",
                    borderRadius: "2px",
                  }}
                />
              </div>

              <motion.p
                style={{
                  marginTop: "12px",
                  color: "rgba(255,255,255,0.3)",
                  fontSize: "10px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  textAlign: "center",
                }}
              >
                Scroll to explore
              </motion.p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}