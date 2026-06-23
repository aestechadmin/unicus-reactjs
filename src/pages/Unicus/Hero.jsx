import React, { useRef, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { websiteData } from "../Unicus";

const SplitLetters = ({ text }) => {
  return (
    <>
      {text.split("").map((char, index) => (
        <span key={index} className="letter" style={{ display: "inline-block", lineHeight: 1.2 }}>
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </>
  );
};

export default function Hero({ heroContainerRef, expSectionRef }) {
  const videoRef = useRef(null);
  const heroContentRef = useRef(null);

  useGSAP(() => {
    const heroContainer = heroContainerRef.current;
    if (!heroContainer) return;

    const heroContent = heroContentRef.current;
    if (!heroContent) return;

    const scroller = document.scrollingElement || document.documentElement;

    gsap.fromTo(
      ".letter",
      { y: 100, opacity: 0, rotateX: -90 },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 1.2,
        stagger: 0.03,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: heroContainer,
          scroller,
          start: "top 80%",
          end: "top 30%",
          scrub: 0.5,
        },
      }
    );

    gsap.fromTo(
      ".subtitle",
      { y: 80, opacity: 0, scale: 0.9 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        delay: 0.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: heroContainer,
          scroller,
          start: "top 80%",
          end: "top 40%",
          scrub: 0.5,
        },
      }
    );

    gsap.to(".letter, .subtitle", {
      opacity: 0,
      y: -50,
      ease: "power2.in",
      overwrite: 'auto',
      scrollTrigger: {
        trigger: heroContainer,
        scroller,
        start: "top top",
        end: "+=500",
        scrub: true,
        invalidateOnRefresh: true,
      },
    });
  }, [heroContainerRef]);

  useEffect(() => {
    const video = videoRef.current;
    
    if (!video) return;

    const scroller = document.scrollingElement || document.documentElement;

    const handleMetadata = () => {
      ScrollTrigger.create({
        trigger: heroContainerRef.current,
        scroller,
        start: "top top",
        // end: "+=2000",
        // scrub: 1.5,
        // pin: true,
        // anticipatePin: 1,
        onUpdate: (self) => {
          gsap.set(".letter, .subtitle", {
            opacity: 1 - self.progress * 4,
            y: -90 * self.progress,
          });
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
  }, [heroContainerRef]);

  return (
    <Box ref={heroContainerRef} sx={{ height: "100vh", position: "relative", overflow: "hidden", background: "#000" }}>
      <video ref={videoRef} muted playsInline preload="auto" style={{ width: "100%", height: "100%", objectFit: "cover", transform: "scale(1.05)" }}>
        <source src={websiteData.hero.video} type="video/mp4" />
      </video>
      <Box sx={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.8))", zIndex: 1 }} />
      <Box ref={heroContentRef} sx={{ position: "absolute", bottom: "10%", left: 0, right: 0, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", px: 3, zIndex: 2 }}>
        <Typography variant="h1" sx={{ color: "#fff", fontWeight: 700, overflow: "hidden", lineHeight: 1.2, mb: 2, fontSize: { xs: "3rem", sm: "4rem", md: "6rem", lg: "7rem" }, textTransform: "uppercase", letterSpacing: "0.02em", textShadow: "2px 2px 4px rgba(0,0,0,0.3)" }}>
          <SplitLetters text={websiteData.hero.title} />
        </Typography>
        <Typography className="subtitle" variant="h5" sx={{ color: "#fff", mt: 2, opacity: 0.95, maxWidth: 700, lineHeight: 1.5, fontSize: { xs: "1.2rem", sm: "1.5rem", md: "1.8rem" }, fontWeight: 500, letterSpacing: "0.05em", textShadow: "1px 1px 2px rgba(0,0,0,0.3)" }}>
          {websiteData.hero.subtitle}
        </Typography>
      </Box>
    </Box>
  );
}