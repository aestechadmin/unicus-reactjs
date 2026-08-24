export const scrollToId = (id) => {
  if (typeof window === "undefined" || typeof document === "undefined") return;
  const el = document.getElementById(id);
  if (!el) return;
  if (window.__lenis) {
    window.__lenis.scrollTo(el, { offset: -80, duration: 1.4 });
    return;
  }
  const top = el.getBoundingClientRect().top + window.scrollY - 80;
  window.scrollTo({ top, behavior: "smooth" });
};

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

export const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
};

export const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.96, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export const viewport = { once: true, amount: 0.18 };

export const FONT = "'Fustat', sans-serif";

export const titleSx = {
  fontFamily: FONT,
  fontWeight: 700,
  fontSize: { xs: 28, sm: 48, md: 64 },
  letterSpacing: "-0.03em",
  lineHeight: 1.1,
};

export const subSx = {
  fontFamily: FONT,
  fontWeight: 600,
  fontSize: { xs: 18, md: 26 },
  lineHeight: 1.3,
};

export const bodySx = {
  fontFamily: FONT,
  fontWeight: 400,
  fontSize: { xs: 14, md: 18 },
  lineHeight: 1.7,
};

export const cardTitleSx = {
  fontFamily: FONT,
  fontWeight: 600,
  fontSize: { xs: 15, md: 16 },
  lineHeight: 1.4,
};

export const cardBodySx = {
  fontFamily: FONT,
  fontWeight: 400,
  fontSize: { xs: 13, md: 14 },
  lineHeight: 1.55,
};

export const blueBtn = {
  fontFamily: FONT,
  bgcolor: "#3B82F6",
  color: "#fff",
  borderRadius: 2,
  px: { xs: 2.4, md: 3.2 },
  py: { xs: 1, md: 1.15 },
  fontWeight: 600,
  textTransform: "none",
  fontSize: { xs: 14, md: 16 },
  "&:hover": { bgcolor: "#2563EB" },
};
