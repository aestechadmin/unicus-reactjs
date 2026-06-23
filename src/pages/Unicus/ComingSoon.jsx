import React, { useRef } from "react";
import { Box, Typography, Container, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { websiteData } from "../Unicus";

export default function ComingSoon() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const featuresRef = useRef(null);
  const descriptionRef = useRef(null);
  const comingTextRef = useRef(null);
  const data = websiteData.comingSoon;

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
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
        gsap.fromTo(titleChars, { y: 50, opacity: 0, rotateX: -90 }, { y: 0, opacity: 1, rotateX: 0, duration: 0.8, stagger: 0.03, ease: "back.out(1.2)", scrollTrigger: { trigger: sectionRef.current, start: "top 70%", end: "top 30%", scrub: 0.5 } });
      }

      const descChars = descriptionRef.current?.querySelectorAll(".desc-char-coming");
      if (descChars) {
        gsap.fromTo(descChars, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.02, scrollTrigger: { trigger: sectionRef.current, start: "top 60%", end: "top 30%", scrub: 0.5 } });
      }

      const featureItems = featuresRef.current?.querySelectorAll(".feature-item");
      if (featureItems) {
        gsap.fromTo(featureItems, { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, stagger: 0.15, scrollTrigger: { trigger: sectionRef.current, start: "top 70%", end: "top 40%", scrub: 0.5 } });
      }

      const comingChars = comingTextRef.current?.querySelectorAll(".coming-desc-char");
      if (comingChars) {
        gsap.fromTo(comingChars, { opacity: 0.5, y: 20 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.02, scrollTrigger: { trigger: sectionRef.current, start: "top 80%", end: "top 50%", scrub: 0.8 } });
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <Box ref={sectionRef} component="section" sx={{ py: { xs: 8, md: 12 }, px: { xs: 2, md: 4 }, backgroundColor: "#F5F4DE", position: "relative", overflow: "hidden" }}>
      <Container maxWidth="xl">
        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: { xs: 4, md: 6 }, alignItems: "center" }}>
          <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 100%" }, position: "relative" }}>
            <motion.div style={{ scale: imageScale, opacity: imageOpacity }}>
              <Box component="img" src={data.feature.mainImage} alt="Coming soon preview" sx={{ width: "100%", height: "auto", borderRadius: "24px", boxShadow: "0 20px 40px rgba(0,0,0,0.15)", display: "block" }} />
            </motion.div>
          </Box>
          <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 35%" } }}>
            <motion.div style={{ x: contentX, opacity: contentOpacity }}>
              {!isMobile && (
                <Box sx={{ mb: 4, maxWidth: "100%" }}>
                  <Box component="img" src={data.feature.appIcon} alt="App icon" sx={{ width: "100%", height: "auto", borderRadius: "16px", boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }} />
                </Box>
              )}
              <Typography ref={descriptionRef} variant="body1" sx={{ fontSize: { xs: "1rem", md: "2rem" }, lineHeight: 1.6, color: "#666", mb: 4, textAlign: "justify" }}>
                {data.feature.description.split("").map((char, index) => (<span key={index} className="desc-char-coming" style={{ display: "inline-block", whiteSpace: "pre", opacity: 0, transform: "translateY(30px)" }}>{char === " " ? "\u00A0" : char}</span>))}
              </Typography>
              <Box ref={featuresRef}>
                {data.feature.features.map((feature, index) => (
                  <Box key={index} className="feature-item" sx={{ display: "flex", alignItems: "center", mb: 2, opacity: 0, transform: "translateX(-30px)" }}>
                    <Box sx={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#000", mr: 2 }} />
                    <Typography variant="body2" sx={{ fontSize: { xs: "0.9rem", md: "1.7rem" }, color: "#555" }}>{feature}</Typography>
                  </Box>
                ))}
              </Box>
              {isMobile && (
                <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
                  <Box component="img" src={data.feature.appIcon} alt="App icon" sx={{ width: "80px", height: "auto", borderRadius: "16px", boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }} />
                </Box>
              )}
            </motion.div>
          </Box>
        </Box>
        {/* <motion.div style={{ opacity: comingTextOpacity, scale: comingTextScale, marginTop: "4rem", textAlign: "center" }}>
          <Typography ref={comingTextRef} variant="h4" sx={{ fontSize: { xs: "1.2rem", sm: "1.5rem", md: "2rem" }, fontWeight: 500, color: "#666", fontStyle: "italic" }}>
            {data.description.description.split("").map((char, idx) => (<span key={idx} className="coming-desc-char" style={{ display: "inline-block", whiteSpace: "pre", opacity: 0.5 }}>{char === " " ? "\u00A0" : char}</span>))}
          </Typography>
        </motion.div> */}
      </Container>
    </Box>
  );
}