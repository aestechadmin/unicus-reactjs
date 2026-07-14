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
import { Typography } from "@mui/material";
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
  const [videoDuration, setVideoDuration] = useState(0);
  const [showFallback, setShowFallback] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Reduce PIN_HEIGHT on mobile for less scrolling
  const PIN_HEIGHT = isMobile ? 800 : 1500;

  const scrollMV = useMotionValue(0);

  const textOpacity   = useTransform(scrollMV, [0, PIN_HEIGHT * 0.35], [1, 0]);
  const textY         = useTransform(scrollMV, [0, PIN_HEIGHT * 0.5],  [0, -80]);
  const heroOpacity   = useTransform(scrollMV, [PIN_HEIGHT * 0.85, PIN_HEIGHT], [1, 0]);
  const progressScale = useTransform(scrollMV, [0, PIN_HEIGHT], [0, 1]);
  const indicatorOpa  = useTransform(scrollMV, [0, PIN_HEIGHT * 0.6],  [1, 0]);

  // Video ready
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      setVideoDuration(video.duration);
      video.currentTime = 0;
      video.pause();
      setIsVideoReady(true);
    };

    const handleError = () => {
      console.warn("Video failed to load, using fallback");
      setShowFallback(true);
      setIsVideoReady(true);
    };

    if (video.readyState >= 3) {
      handleLoadedMetadata();
    } else {
      video.addEventListener("loadedmetadata", handleLoadedMetadata);
      video.addEventListener("error", handleError);
      return () => {
        video.removeEventListener("loadedmetadata", handleLoadedMetadata);
        video.removeEventListener("error", handleError);
      };
    }
  }, []);

  // Optimized scroll handler with mobile adjustments
  useEffect(() => {
    const video = videoRef.current;
    let rafId = null;
    let lastTime = 0;
    let frameSkip = isMobile ? 0.05 : 0.03; // More aggressive skip on mobile

    const updateVideo = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const clamped = Math.min(Math.max(scrollY, 0), PIN_HEIGHT);
      scrollMV.set(clamped);

      // Update video with frame skipping - more aggressive on mobile
      if (video && isVideoReady && !showFallback && videoDuration > 0) {
        const progress = clamped / PIN_HEIGHT;
        const targetTime = Math.min(progress * videoDuration, videoDuration - 0.01);
        
        // Only update if difference is significant (higher threshold on mobile)
        if (Math.abs(targetTime - lastTime) > frameSkip) {
          video.currentTime = targetTime;
          lastTime = targetTime;
        }
      }

      // Update done state
      if (scrollY >= PIN_HEIGHT + 100) {
        setIsDone(true);
      } else {
        setIsDone(false);
      }

      rafId = requestAnimationFrame(updateVideo);
    };

    rafId = requestAnimationFrame(updateVideo);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isVideoReady, videoDuration, showFallback, isMobile, scrollMV, PIN_HEIGHT]);

  return (
    <>
      {/* Spacer */}
      <div
        ref={heroContainerRef}
        style={{
          height: PIN_HEIGHT,
          width: "100%",
          background: "transparent",
          pointerEvents: "none",
          flexShrink: 0,
        }}
      />

      {/* Fixed hero */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          overflow: "hidden",
          zIndex: isDone ? -1 : 10,
          pointerEvents: "none",
          opacity: heroOpacity,
        }}
      >
        {/* Video or Fallback */}
        {!showFallback ? (
          <video
            ref={videoRef}
            muted
            playsInline
            preload="metadata"
            poster={websiteData.hero.poster}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: "scale(1.05)",
              backgroundColor: "transparent",
            }}
          >
            {/* Use lower resolution on mobile */}
            {isMobile ? (
              <source src={websiteData.hero.videoMobile || websiteData.hero.video} type="video/mp4" />
            ) : (
              <source src={websiteData.hero.video} type="video/mp4" />
            )}
          </video>
        ) : (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundImage: 'url(/img/hero-fallback.jpg)',
              backgroundSize: "cover",
              backgroundPosition: "center",
              transform: "scale(1.05)",
            }}
          />
        )}

        {/* Gradient */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.8))",
            zIndex: 1,
          }}
        />

        {/* Text */}
        <motion.div
          style={{
            position: "absolute",
            bottom: isMobile ? "15%" : "10%",
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
          <Typography
            variant="h1"
            sx={{
              color: "#fff",
              fontWeight: 700,
              lineHeight: 1.2,
              mb: isMobile ? 1 : 2,
              fontSize: { xs: "2rem", sm: "2.5rem", md: "5.5rem", lg: "7rem" },
              textTransform: "uppercase",
              letterSpacing: "0.02em",
              textShadow: "0 4px 30px rgba(0,0,0,0.5)",
              overflow: "hidden",
            }}
          >
            <SplitLetters text={websiteData.hero.title} />
          </Typography>

          <motion.div
            initial={{ y: 60, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 0.95, scale: 1 }}
            transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Typography
              variant="h5"
              sx={{
                color: "#fff",
                mt: isMobile ? 0.5 : 2,
                maxWidth: 700,
                lineHeight: 1.5,
                fontSize: { xs: "0.8rem", sm: "1rem", md: "1.8rem" },
                fontWeight: 400,
                letterSpacing: "0.05em",
                textShadow: "0 2px 20px rgba(0,0,0,0.4)",
              }}
            >
              {websiteData.hero.subtitle}
            </Typography>
          </motion.div>

          {/* Progress bar - hidden on mobile */}
          {!isMobile && (
            <div
              style={{
                marginTop: "32px",
                width: "200px",
                height: "2px",
                background: "rgba(255,255,255,0.15)",
                borderRadius: "9999px",
                overflow: "hidden",
              }}
            >
              <motion.div
                style={{
                  height: "100%",
                  background: "rgba(255,255,255,0.8)",
                  scaleX: progressScale,
                  transformOrigin: "left",
                }}
              />
            </div>
          )}

          {/* Scroll indicator - hidden on mobile */}
          {!isMobile && (
            <motion.div
              style={{ marginTop: "20px", opacity: indicatorOpa }}
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
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
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
          )}
        </motion.div>
      </motion.div>
    </>
  );
}

// import React, { useRef, useEffect, useState } from "react";
// import { Typography } from "@mui/material";
// import { motion, useMotionValue, useTransform } from "framer-motion";
// import { websiteData } from "../Unicus";

// const SplitLetters = ({ text }) => {
//   const container = {
//     hidden: {},
//     visible: {
//       transition: {
//         staggerChildren: 0.03,
//         delayChildren: 0.2,
//       },
//     },
//   };

//   const letterVariant = {
//     hidden: { y: 100, opacity: 0, rotateX: -90 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       rotateX: 0,
//       transition: {
//         duration: 1.2,
//         ease: [0.34, 1.56, 0.64, 1],
//       },
//     },
//   };

//   return (
//     <motion.span
//       variants={container}
//       initial="hidden"
//       animate="visible"
//       style={{ display: "inline-block", perspective: 600 }}
//     >
//       {text.split("").map((char, index) => (
//         <motion.span
//           key={index}
//           className="letter"
//           variants={letterVariant}
//           style={{
//             display: "inline-block",
//             lineHeight: 1.2,
//             whiteSpace: "pre",
//             transformStyle: "preserve-3d",
//           }}
//         >
//           {char === " " ? "\u00A0" : char}
//         </motion.span>
//       ))}
//     </motion.span>
//   );
// };

// export default function Hero({ heroContainerRef }) {
//   const videoRef = useRef(null);
//   const [isVideoReady, setIsVideoReady] = useState(false);
//   const [isDone, setIsDone] = useState(false);

//   const PIN_HEIGHT = 2000;

//   const scrollMV = useMotionValue(0);

//   const textOpacity   = useTransform(scrollMV, [0, PIN_HEIGHT * 0.35], [1, 0]);
//   const textY         = useTransform(scrollMV, [0, PIN_HEIGHT * 0.5],  [0, -80]);
//   const heroOpacity   = useTransform(scrollMV, [PIN_HEIGHT * 0.85, PIN_HEIGHT], [1, 0]);
//   const progressScale = useTransform(scrollMV, [0, PIN_HEIGHT], [0, 1]);
//   const indicatorOpa  = useTransform(scrollMV, [0, PIN_HEIGHT * 0.6],  [1, 0]);

//   // Video ready
//   useEffect(() => {
//     const video = videoRef.current;
//     if (!video) return;
//     const handleLoaded = () => {
//       video.currentTime = 0;
//       video.pause();
//       setIsVideoReady(true);
//     };
//     if (video.readyState >= 3) {
//       handleLoaded();
//     } else {
//       video.addEventListener("loadeddata", handleLoaded);
//       return () => video.removeEventListener("loadeddata", handleLoaded);
//     }
//   }, []);

//   // Scroll handler
//   useEffect(() => {
//     const video = videoRef.current;

//     const onScroll = () => {
//       const scrollY = window.scrollY || window.pageYOffset;
//       const clamped = Math.min(Math.max(scrollY, 0), PIN_HEIGHT);
//       scrollMV.set(clamped);

//       // Scrub video
//       if (video && isVideoReady && video.duration && !isNaN(video.duration)) {
//         const progress = clamped / PIN_HEIGHT;
//         video.currentTime = Math.min(
//           progress * video.duration,
//           video.duration - 0.01
//         );
//       }

//       // Only mark done well AFTER hero fully fades — no white flash
//       if (scrollY >= PIN_HEIGHT + 100) {
//         setIsDone(true);
//       } else {
//         setIsDone(false);
//       }
//     };

//     window.addEventListener("scroll", onScroll, { passive: true });
//     onScroll();
//     return () => window.removeEventListener("scroll", onScroll);
//   }, [isVideoReady, scrollMV, PIN_HEIGHT]);

//   return (
//     <>
//       {/* 
//         Spacer: exactly PIN_HEIGHT tall (NOT + 100vh).
//         The fixed hero covers the first 100vh visually.
//         Spacer just provides scroll distance.
//       */}
//       <div
//         ref={heroContainerRef}
//         style={{
//           height: PIN_HEIGHT,
//           width: "100%",
//           background: "transparent",
//           pointerEvents: "none",
//           flexShrink: 0,
//         }}
//       />

//       {/* Fixed hero — uses visibility:hidden instead of unmount to avoid white flash */}
//       <motion.div
//         style={{
//           position: "fixed",
//           top: 0,
//           left: 0,
//           width: "100%",
//           height: "100vh",
//           overflow: "hidden",
//           zIndex: isDone ? -1 : 10,   // push behind everything when done
//           pointerEvents: "none",
//           opacity: heroOpacity,
//           // No background on wrapper — prevents white/black flash
//         }}
//       >
//         {/* Video */}
//         <video
//           ref={videoRef}
//           muted
//           playsInline
//           preload="auto"
//           style={{
//             position: "absolute",
//             top: 0,
//             left: 0,
//             width: "100%",
//             height: "100%",
//             objectFit: "cover",
//             transform: "scale(1.05)",
//           }}
//         >
//           <source src={websiteData.hero.video} type="video/mp4" />
//         </video>

//         {/* Gradient */}
//         <div
//           style={{
//             position: "absolute",
//             inset: 0,
//             background:
//               "linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.8))",
//             zIndex: 1,
//           }}
//         />

//         {/* Text */}
//         <motion.div
//           style={{
//             position: "absolute",
//             bottom: "10%",
//             left: 0,
//             right: 0,
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             textAlign: "center",
//             padding: "0 1.5rem",
//             zIndex: 2,
//             opacity: textOpacity,
//             y: textY,
//           }}
//         >
//           <Typography
//             variant="h1"
//             sx={{
//               color: "#fff",
//               fontWeight: 700,
//               lineHeight: 1.2,
//               mb: 2,
//               fontSize: { xs: "3rem", sm: "4rem", md: "6rem", lg: "7rem" },
//               textTransform: "uppercase",
//               letterSpacing: "0.02em",
//               textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
//               overflow: "hidden",
//             }}
//           >
//             <SplitLetters text={websiteData.hero.title} />
//           </Typography>

//           <motion.div
//             initial={{ y: 60, opacity: 0, scale: 0.9 }}
//             animate={{ y: 0, opacity: 0.95, scale: 1 }}
//             transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
//           >
//             <Typography
//               variant="h5"
//               sx={{
//                 color: "#fff",
//                 mt: 2,
//                 maxWidth: 700,
//                 lineHeight: 1.5,
//                 fontSize: { xs: "1.2rem", sm: "1.5rem", md: "1.8rem" },
//                 fontWeight: 500,
//                 letterSpacing: "0.05em",
//                 textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
//               }}
//             >
//               {websiteData.hero.subtitle}
//             </Typography>
//           </motion.div>

//           {/* Progress bar */}
//           <div
//             style={{
//               marginTop: "28px",
//               width: "180px",
//               height: "2px",
//               background: "rgba(255,255,255,0.15)",
//               borderRadius: "9999px",
//               overflow: "hidden",
//             }}
//           >
//             <motion.div
//               style={{
//                 height: "100%",
//                 background: "rgba(255,255,255,0.7)",
//                 scaleX: progressScale,
//                 transformOrigin: "left",
//               }}
//             />
//           </div>

//           {/* Scroll indicator */}
//           <motion.div
//             style={{ marginTop: "16px", opacity: indicatorOpa }}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 1.2 }}
//           >
//             <div
//               style={{
//                 width: "24px",
//                 height: "40px",
//                 border: "2px solid rgba(255,255,255,0.3)",
//                 borderRadius: "12px",
//                 display: "flex",
//                 justifyContent: "center",
//                 paddingTop: "6px",
//                 margin: "0 auto",
//               }}
//             >
//               <motion.div
//                 animate={{ y: [0, 12, 0] }}
//                 transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
//                 style={{
//                   width: "3px",
//                   height: "12px",
//                   background: "rgba(255,255,255,0.6)",
//                   borderRadius: "2px",
//                 }}
//               />
//             </div>

//             <motion.p
//               style={{
//                 marginTop: "12px",
//                 color: "rgba(255,255,255,0.3)",
//                 fontSize: "10px",
//                 letterSpacing: "0.2em",
//                 textTransform: "uppercase",
//                 textAlign: "center",
//               }}
//             >
//               Scroll to explore
//             </motion.p>
//           </motion.div>
//         </motion.div>
//       </motion.div>
//     </>
//   );
// }

