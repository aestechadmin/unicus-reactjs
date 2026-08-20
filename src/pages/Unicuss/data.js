export const IMG = "/img/unicuss";

export const websiteData = {
  header: {
    cta: "Get Quote",
  },
  hero: {
    backgroundImage: `${IMG}/hero.png`,
    title: "Partner for workforce outsourcing across India.",
    cta: "Get Quote",
    targetId: "contact",
  },
  about: {
    title: "About Us",
    heading: "Who We Are",
    image: `${IMG}/about-team.png`,
    description:
      "UNICUS is a dedicated manpower agency providing trained personnel across skilled, semiskilled, and unskilled categories. With over 4 years of experience, we deliver reliable workforce solutions.",
    extra: "",
    values: [
      { title: "Regular skill development programs" },
      { title: "Dedicated site supervisors at each location" },
      { title: "Full-spectrum manpower supply" },
      { title: "Rapid workforce deployment" },
      { title: "Full compliance with labor and safety standards" },
    ],
  },
  growth: {
    title: "Our Growth",
    backgroundImage: `${IMG}/growth-bars.jpg`,
    stats: [
      { value: "2022", label: "Founded", height: 48 },
      { value: "4+", label: "Operational hubs & states", height: 62 },
      { value: "500+", label: "Workforce Deployed", height: 80 },
      { value: "₹ 4 Cr+", label: "Annual Turnover", height: 94 },
      { value: "Pan-India", label: "Presence", height: 70 },
    ],
  },
  expertise: {
    title: "Our Expertise",
    subtitle: "UNICUS specializes in comprehensive manpower solutions across industrial, manufacturing, healthcare, and commercial sectors.",
    cta: "Request a Site Assessment",
    items: [
      { title: "Manufacturing & Assembly", text: "Production and assembly support" },
      { title: "Commercial & Residential Properties", text: "Property management and maintenance" },
      { title: "Hospitals & Healthcare", text: "Patient care and housekeeping" },
      { title: "Government Institutions", text: "Facility operations and maintenance" },
      { title: "Educational Institutions", text: "Campus maintenance and security" },
      { title: "Logistics & Warehousing", text: "Storage, handling, and distribution" },
    ],
  },
  vision: {
    title: "Vision & Mission",
    image: `${IMG}/vision-3d.jpg`,
    visionTitle: "Our Vision",
    visionText:
      "To be India's most reliable manpower partner — delivering skilled workforce solutions that drive operational excellence.",
    missionTitle: "Our Mission",
    highlights: [
      { text: "Comprehensive manpower supply across all skill levels" },
      { text: "Rigorous training aligned with industry standards" },
      { text: "Partnerships built on reliability and transparency" },
      { text: "Rapid deployment meeting project timelines" },
    ],
  },
  manpower: {
    title: "Manpower Categories & Services",
    subtitle: "UNICUS specializes in manpower outsourcing, supplying skilled, semi-skilled, and unskilled workforce to manufacturing, industrial, healthcare, and commercial sectors.",
    backgroundImage: `${IMG}/manpower-factory.png`,
    items: [
      { title: "Housekeeping, Security & Pest Control", text: "Facility and security services" },
      { title: "Semi-Skilled Assembly Workers", text: "Assembly and manufacturing" },
      { title: "Unskilled Support Staff", text: "Material handling and packaging" },
      { title: "Skilled Technical Personal", text: "Machine operation and maintenance" },
      { title: "Quality Control & Inspection", text: "Quality assurance and testing" },
      { title: "Logistics & Material Handling", text: "Warehouse and supply chain" },
      { title: "Maintenance & Operations", text: "Equipment and facility support" },
      { title: "Food & Beverage Processing", text: "Processing and packaging" },
    ],
  },
  whyChoose: {
    title: "Why Choose UNICUS?",
    image: `${IMG}/why-flower.jpg`,
    items: [
      { title: "Trained Professionals", text: "Role-ready teams with healthcare and industrial SOPs, not generic temp labour." },
      { title: "Digital Reporting", text: "Daily checklists, attendance and monthly performance reviews you can audit." },
      { title: "Onsite Accountability", text: "Work managers on the floor so service quality never depends on guesswork." },
      { title: "Pan-India Deployment", text: "Rapid mobilisation across states with verified, shift-flexible manpower." },
    ],
  },
  partners: {
    title: "Our Esteemed Partners",
    cta: "Request a Site Assessment",
    items: [
      { name: "KIMS Guntur", description: "Healthcare-grade facilities management", image: `${IMG}/partner-kims-guntur.jpg` },
      { name: "KIMS Nellore", description: "Hospital manpower & facility support", image: `${IMG}/partner-kims-nellore.png` },
      { name: "TNR Constructions", description: "Residential & commercial site staffing", image: `${IMG}/partner-tnr.jpg` },
    ],
  },
  contact: {
    title: "Contact Us",
    subtitle: "Get a Quote Immediately Upon Form Submission",
    items: [
      { title: "Office", value: "3rd Floor, Habsiguda Main Road, Hyderabad, Telangana" },
      { title: "Email", value: "hello@unicusfacilities.in", href: "mailto:hello@unicusfacilities.in" },
      { title: "Call us", value: "+91 9550322111", href: "tel:+919550322111" },
    ],
    cta: "Request a Site Assessment",
  },
  footer: {
    brand: "unicus",
    linkCols: [
      [
        { label: "About Us", href: "about-us" },
        { label: "Expertise", href: "expertise" },
      ],
      [
        { label: "Categories", href: "manpower" },
        { label: "Partners", href: "partners" },
      ],
      [
        { label: "Growth", href: "growth" },
        { label: "Vision & Mission", href: "vision" },
      ],
      [
        { label: "Why UNICUS", href: "why-choose" },
        { label: "Partners", href: "partners" },
      ],
    ],
    legal: ["Privacy Policy", "Terms of Use"],
    copyright: "© 2026 Unicus, Inc.",
  },
};

export const menuSections = [
  { id: "hero", name: "Home" },
  { id: "about-us", name: "About" },
  { id: "growth", name: "Growth" },
  { id: "expertise", name: "Expertise" },
  { id: "vision", name: "Vision" },
  { id: "manpower", name: "Services" },
  { id: "why-choose", name: "Why UNICUS" },
  { id: "partners", name: "Partners" },
  { id: "contact", name: "Contact" },
];

export const pageSections = [
  { key: "hero", id: "hero" },
  { key: "about", id: "about-us" },
  { key: "growth", id: "growth" },
  { key: "expertise", id: "expertise" },
  { key: "vision", id: "vision" },
  { key: "manpower", id: "manpower" },
  { key: "whyChoose", id: "why-choose" },
  { key: "partners", id: "partners" },
  { key: "contact", id: "contact" },
  { key: "footer", id: "footer" },
];
