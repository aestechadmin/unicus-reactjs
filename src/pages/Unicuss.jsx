import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Box } from "@mui/material";
import { ThemeProvider, createTheme, useTheme } from "@mui/material/styles";
import Lenis from "lenis";
import { menuSections, pageSections, websiteData } from "./Unicuss/data";
import Header from "./Unicuss/Header";
import Hero from "./Unicuss/Hero";
import AboutUs from "./Unicuss/AboutUs";
import Growth from "./Unicuss/Growth";
import Expertise from "./Unicuss/Expertise";
import VisionMission from "./Unicuss/VisionMission";
import Manpower from "./Unicuss/Manpower";
import WhyChoose from "./Unicuss/WhyChoose";
import Partners from "./Unicuss/Partners";
import Contact from "./Unicuss/Contact";
import Footer from "./Unicuss/Footer";
import { FONT, scrollToId } from "./Unicuss/motion";
import "./Unicuss/fustat.css";

export { websiteData };

const COMPONENTS = {
  hero: Hero,
  about: AboutUs,
  growth: Growth,
  expertise: Expertise,
  vision: VisionMission,
  manpower: Manpower,
  whyChoose: WhyChoose,
  partners: Partners,
  contact: Contact,
  footer: Footer,
};

export default function Unicuss() {
  const [activeSection, setActiveSection] = useState(0);
  const theme = useTheme();
  const fustatTheme = useMemo(
    () =>
      createTheme(theme, {
        typography: {
          ...theme.typography,
          fontFamily: FONT,
        },
      }),
    [theme]
  );

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.1,
    });
    window.__lenis = lenis;
    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      if (window.__lenis === lenis) window.__lenis = undefined;
    };
  }, []);

  const handleSectionClick = useCallback((index) => {
    const target = menuSections[index];
    if (!target) return;
    setActiveSection(index);
    scrollToId(target.id);
  }, []);

  return (
    <ThemeProvider theme={fustatTheme}>
    <Box sx={{ fontFamily: FONT, overflowX: "hidden", width: "100%", maxWidth: "100%" }}>
      <Header
        onSectionClick={handleSectionClick}
        activeSection={activeSection}
        sections={menuSections}
      />
      {pageSections.map((section) => {
        const Component = COMPONENTS[section.key];
        return (
          <Box key={section.key} id={section.id}>
            <Component data={websiteData[section.key]} />
          </Box>
        );
      })}
    </Box>
    </ThemeProvider>
  );
}
