import React, { useCallback, useState } from "react";
import { Box } from "@mui/material";
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

  const handleSectionClick = useCallback((index) => {
    const target = menuSections[index];
    if (!target) return;
    setActiveSection(index);
    scrollToId(target.id);
  }, []);

  return (
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
  );
}
