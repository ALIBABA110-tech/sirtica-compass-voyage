import { createFileRoute } from "@tanstack/react-router";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  Anchor, ArrowRight, ShieldCheck, Compass, Users, Wrench, Search,
  Ship, Cpu, CheckCircle2, ClipboardCheck, Gauge, Globe2, MapPin,
  Phone, Mail, ChevronDown, Quote, Layers, Clock, BookOpen, FileCheck,
  AlertTriangle, TrendingUp,
} from "lucide-react";
import heroImg from "@/assets/hero-vessel.jpg";
import sirticaLogo from "@/assets/sirtica-logo.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sirtica Ship Management — Premium Boutique Ship Management Partner" },
      { name: "description", content: "Ship management without corporate layers. Direct access to maritime experts, faster technical decisions, and dedicated vessel attention from India & Cyprus." },
      { property: "og:title", content: "Sirtica Ship Management — Premium Boutique Ship Management" },
      { property: "og:description", content: "Direct access to experts. Faster decisions. Dedicated vessel attention. Global standards from India & Cyprus." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Sirtica Ship Management Pvt. Ltd.",
          url: "/",
          description: "Premium boutique ship management partner operating from India and Cyprus.",
          sameAs: [],
          address: [
            { "@type": "PostalAddress", addressCountry: "IN" },
            { "@type": "PostalAddress", addressCountry: "CY" },
          ],
          areaServed: "Worldwide",
        }),
      },
    ],
  }),
  component: SirticaHome,
});

/* -------------------- shared atoms -------------------- */

function Section({
  children,
  className = "",
  id,
}: { children: React.ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} className={`relative py-24 md:py-32 ${className}`}>
      <div className="container-premium">{children}</div>
    </section>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <div className="eyebrow mb-5 flex items-center gap-3">
    <span className="inline-block h-px w-8 bg-[var(--emerald-tide)]" />
    {children}
  </div>;
}

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Counter({ to, suffix = "", duration = 2 }: { to: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - start) / (duration * 1000), 1);
      setN(Math.floor(p * to));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, to, duration]);
  return <span ref={ref}>{n}{suffix}</span>;
}

/* -------------------- NAV -------------------- */

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [
    ["The Difference", "#difference"],
    ["Services", "#services"],
    ["Process", "#process"],
    ["Intelligence", "#intelligence"],
    ["Knowledge", "#knowledge"],
    ["Contact", "#contact"],
  ];
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 bg-white transition-all duration-500 ${
        scrolled
          ? "shadow-[0_8px_30px_-12px_rgba(4,27,61,0.18)] border-b border-black/5"
          : "border-b border-black/5"
      }`}
    >
      <div className="container-premium flex h-24 items-center justify-between py-3 md:h-28">
        <motion.a
          href="#top"
          aria-label="Sirtica Maritime Pvt. Ltd."
          className="flex items-center"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -1 }}
        >
          <motion.img
            src={sirticaLogo.url}
            alt="Sirtica Maritime Pvt. Ltd."
            className="h-16 w-auto md:h-20"
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.a>
        <nav className="hidden items-center gap-9 lg:flex">
          {links.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="group relative text-sm font-medium tracking-wide text-[#0A1F44] transition-colors duration-300 hover:text-[#009245]"
            >
              {label}
              <span className="absolute -bottom-1.5 left-0 h-[2px] w-0 bg-gradient-to-r from-[#009245] to-[#00D4AA] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-[#0A1F44] via-[#009245] to-[#00D4AA] px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_-10px_rgba(0,146,69,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-12px_rgba(0,146,69,0.7)]"
        >
          <span className="relative z-10">Request Consultation</span>
          <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
        </a>
      </div>
    </header>
  );
}

/* -------------------- 1. HERO -------------------- */

function Hero() {
  return (
    <section id="top" className="relative min-h-screen overflow-hidden bg-[var(--navy)] text-white">
      <div className="absolute inset-0 gradient-hero" />
      <img
        src={heroImg}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover opacity-20 mix-blend-luminosity"
      />
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute -left-32 top-1/3 h-[28rem] w-[28rem] rounded-full bg-[var(--emerald-tide)]/15 blur-3xl" />
      <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[var(--navy)] to-transparent" />

      <div className="container-premium relative grid min-h-screen items-center gap-12 pb-24 pt-36 md:pt-44 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
       <div>
        <FadeIn>
          <Eyebrow>Premium Boutique Ship Management · India · Cyprus</Eyebrow>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h1 className="max-w-3xl text-balance text-5xl leading-[1.05] md:text-6xl lg:text-7xl">
            Ship Management <span className="italic text-[var(--emerald-glow)]">without</span> corporate layers.
          </h1>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="mt-8 max-w-xl text-lg text-white/75 md:text-xl">
            Direct access to maritime experts, faster technical decisions, dedicated vessel
            support, and global standards — delivered from India and Cyprus.
          </p>
        </FadeIn>
        <FadeIn delay={0.3}>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-sm gradient-emerald px-7 py-4 text-sm font-semibold text-[var(--navy)] shadow-glow transition hover:brightness-110"
            >
              Request Consultation
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </a>
            <a
              href="#services"
              className="inline-flex items-center gap-2 rounded-sm border border-white/20 px-7 py-4 text-sm font-medium text-white transition hover:bg-white/5"
            >
              Explore Services
            </a>
          </div>
        </FadeIn>

        <FadeIn delay={0.5}>
          <div className="mt-14 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-white/10 pt-8 md:grid-cols-2 xl:grid-cols-4">
            {[
              ["Technical Management", Wrench],
              ["Crew Management", Users],
              ["Inspection Expertise", Search],
              ["24/7 Vessel Support", Clock],
            ].map(([label, Icon]) => {
              const I = Icon as typeof Wrench;
              return (
                <div key={label as string} className="flex items-center gap-3 text-sm text-white/80">
                  <I className="h-5 w-5 text-[var(--emerald-tide)]" strokeWidth={1.75} />
                  {label as string}
                </div>
              );
            })}
          </div>
        </FadeIn>
       </div>

       <FadeIn delay={0.2}>
         <HeroVisual />
       </FadeIn>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50">
          <ChevronDown className="h-5 w-5 animate-bounce" />
        </div>
      </div>
    </section>
  );
}

/* -------------------- HERO VISUAL (animated cargo vessel + data overlay) -------------------- */

function HeroVisual() {
  return (
    <div className="relative aspect-[5/4] w-full">
      {/* glow ring */}
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(0,212,170,0.18),transparent_60%)]" />

      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0"
      >
        <svg viewBox="0 0 600 480" className="h-full w-full" aria-label="Animated cargo vessel with maritime intelligence overlay">
          <defs>
            <linearGradient id="hullGrad" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#0A2A5E" />
              <stop offset="100%" stopColor="#041B3D" />
            </linearGradient>
            <linearGradient id="deckGrad" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="#E6EEF8" />
              <stop offset="100%" stopColor="#9BB3CC" />
            </linearGradient>
            <linearGradient id="oceanGrad" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#00D4AA" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#0A2A5E" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="routeGrad" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="#00D4AA" stopOpacity="0" />
              <stop offset="50%" stopColor="#00D4AA" />
              <stop offset="100%" stopColor="#00D4AA" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* concentric radar rings */}
          {[60, 110, 170, 230].map((r, i) => (
            <motion.circle
              key={r}
              cx="300" cy="240" r={r}
              fill="none" stroke="#00D4AA" strokeOpacity="0.18" strokeWidth="1"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: [0, 0.6, 0], scale: [0.6, 1.05, 1.2] }}
              transition={{ duration: 4, repeat: Infinity, delay: i * 0.8, ease: "easeOut" }}
              style={{ transformOrigin: "300px 240px" }}
            />
          ))}

          {/* curved route path */}
          <motion.path
            d="M 30 360 Q 200 220 360 280 T 580 180"
            fill="none" stroke="url(#routeGrad)" strokeWidth="1.5" strokeDasharray="4 6"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, delay: 0.4, ease: "easeOut" }}
          />

          {/* waypoint dots */}
          {[[60, 348], [220, 248], [400, 272], [560, 192]].map(([x, y], i) => (
            <motion.g key={i}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 1 + i * 0.2 }}
            >
              <circle cx={x} cy={y} r="3" fill="#00D4AA" />
              <motion.circle cx={x} cy={y} r="3" fill="none" stroke="#00D4AA"
                animate={{ r: [3, 12], opacity: [0.7, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
              />
            </motion.g>
          ))}

          {/* ship group, gentle drift forward */}
          <motion.g
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: [0, 6, 0], opacity: 1 }}
            transition={{
              x: { duration: 5, repeat: Infinity, ease: "easeInOut" },
              opacity: { duration: 1, delay: 0.3 },
            }}
          >
            {/* hull */}
            <path
              d="M 130 290 L 470 290 L 440 340 L 160 340 Z"
              fill="url(#hullGrad)" stroke="#00D4AA" strokeOpacity="0.4" strokeWidth="1"
            />
            {/* bow accent line */}
            <line x1="160" y1="340" x2="180" y2="290" stroke="#00D4AA" strokeOpacity="0.6" />
            {/* deck */}
            <rect x="160" y="270" width="280" height="22" fill="url(#deckGrad)" opacity="0.85" />
            {/* containers */}
            {Array.from({ length: 12 }).map((_, i) => {
              const colors = ["#00D4AA", "#E6EEF8", "#0A2A5E", "#9BB3CC"];
              return (
                <motion.rect
                  key={i}
                  x={170 + i * 22} y={240} width={20} height={32}
                  fill={colors[i % colors.length]} opacity={0.9}
                  initial={{ y: 200, opacity: 0 }}
                  animate={{ y: 240, opacity: 0.9 }}
                  transition={{ delay: 0.6 + i * 0.06, duration: 0.5, ease: "easeOut" }}
                />
              );
            })}
            {/* bridge / superstructure */}
            <rect x="380" y="210" width="60" height="60" fill="#0A2A5E" stroke="#00D4AA" strokeOpacity="0.5" />
            <rect x="390" y="220" width="40" height="10" fill="#00D4AA" opacity="0.6" />
            <rect x="390" y="236" width="40" height="6" fill="#9BB3CC" opacity="0.5" />
            {/* funnel */}
            <rect x="402" y="186" width="16" height="24" fill="#041B3D" stroke="#00D4AA" strokeOpacity="0.5" />
            <rect x="404" y="190" width="12" height="4" fill="#00C389" />
            {/* mast */}
            <line x1="410" y1="186" x2="410" y2="150" stroke="#E6EEF8" strokeOpacity="0.6" />
            <circle cx="410" cy="150" r="2" fill="#00D4AA" />
            <motion.circle cx="410" cy="150" r="2" fill="none" stroke="#00D4AA"
              animate={{ r: [2, 8], opacity: [0.8, 0] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            />
          </motion.g>

          {/* ocean waves */}
          <motion.path
            d="M 0 360 Q 75 350 150 360 T 300 360 T 450 360 T 600 360 L 600 480 L 0 480 Z"
            fill="url(#oceanGrad)"
            animate={{ d: [
              "M 0 360 Q 75 350 150 360 T 300 360 T 450 360 T 600 360 L 600 480 L 0 480 Z",
              "M 0 360 Q 75 370 150 360 T 300 360 T 450 360 T 600 360 L 600 480 L 0 480 Z",
              "M 0 360 Q 75 350 150 360 T 300 360 T 450 360 T 600 360 L 600 480 L 0 480 Z",
            ]}}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.path
            d="M 0 380 Q 100 372 200 380 T 400 380 T 600 380 L 600 480 L 0 480 Z"
            fill="#0A2A5E" opacity="0.45"
            animate={{ d: [
              "M 0 380 Q 100 372 200 380 T 400 380 T 600 380 L 600 480 L 0 480 Z",
              "M 0 380 Q 100 388 200 380 T 400 380 T 600 380 L 600 480 L 0 480 Z",
              "M 0 380 Q 100 372 200 380 T 400 380 T 600 380 L 600 480 L 0 480 Z",
            ]}}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* light reflection on water */}
          <motion.ellipse cx="300" cy="400" rx="180" ry="6" fill="#00D4AA" opacity="0.2"
            animate={{ opacity: [0.1, 0.3, 0.1], cx: [280, 320, 280] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* floating particles */}
          {Array.from({ length: 14 }).map((_, i) => {
            const x = 40 + ((i * 47) % 540);
            const y = 60 + ((i * 31) % 260);
            return (
              <motion.circle
                key={i} cx={x} cy={y} r="1.2" fill="#00D4AA"
                animate={{ y: [y, y - 12, y], opacity: [0.2, 0.8, 0.2] }}
                transition={{ duration: 4 + (i % 3), repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }}
              />
            );
          })}

          {/* data readouts */}
          <motion.g
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
          >
            <line x1="470" y1="250" x2="540" y2="220" stroke="#00D4AA" strokeOpacity="0.5" />
            <rect x="540" y="200" width="56" height="40" fill="#041B3D" stroke="#00D4AA" strokeOpacity="0.5" rx="2" />
            <text x="546" y="216" fill="#00D4AA" fontSize="9" fontFamily="monospace">SPEED</text>
            <text x="546" y="232" fill="#E6EEF8" fontSize="11" fontFamily="monospace">14.2 kn</text>

            <line x1="170" y1="260" x2="80" y2="220" stroke="#00D4AA" strokeOpacity="0.5" />
            <rect x="14" y="200" width="70" height="40" fill="#041B3D" stroke="#00D4AA" strokeOpacity="0.5" rx="2" />
            <text x="20" y="216" fill="#00D4AA" fontSize="9" fontFamily="monospace">STATUS</text>
            <text x="20" y="232" fill="#E6EEF8" fontSize="11" fontFamily="monospace">ON ROUTE</text>
          </motion.g>
        </svg>
      </motion.div>
    </div>
  );
}

/* -------------------- 2. METRICS -------------------- */

function Metrics() {
  const items = [
    { v: 50, s: "+", label: "Years combined leadership experience", note: "Senior officers, superintendents, inspectors" },
    { v: 2, s: "", label: "Strategic operating hubs", note: "India & Cyprus" },
    { v: 24, s: "/7", label: "Vessel support availability", note: "Direct line to decision-makers" },
    { v: 100, s: "%", label: "Senior-level vessel oversight", note: "Every vessel, every voyage" },
  ];
  return (
    <Section className="bg-white" id="metrics">
      <FadeIn><Eyebrow>Performance at a glance</Eyebrow></FadeIn>
      <FadeIn delay={0.05}>
        <h2 className="max-w-3xl text-balance text-4xl md:text-5xl">
          Verified expertise. Measurable involvement. Global reach.
        </h2>
      </FadeIn>
      <div className="mt-16 grid gap-px overflow-hidden rounded-sm bg-border md:grid-cols-4">
        {items.map((it, i) => (
          <FadeIn key={it.label} delay={i * 0.08}>
            <div className="h-full bg-white p-8 md:p-10">
              <div className="text-5xl font-display font-medium text-[var(--navy)] md:text-6xl">
                <Counter to={it.v} suffix={it.s} />
              </div>
              <div className="mt-4 text-sm font-medium text-[var(--navy)]">{it.label}</div>
              <div className="mt-2 text-xs text-muted-foreground">{it.note}</div>
            </div>
          </FadeIn>
        ))}
      </div>
      <p className="mt-6 text-xs text-muted-foreground">
        Metrics reflect Sirtica's operating model. Specific fleet figures available on request.
      </p>
    </Section>
  );
}

/* -------------------- 3. THE SIRTICA DIFFERENCE -------------------- */

function Difference() {
  const big = [
    "Multiple management layers between you and decisions",
    "Slower technical response cycles",
    "Standardised service across portfolios",
    "Large client portfolios competing for attention",
    "Corporate processes optimised for scale",
  ];
  const us = [
    "Direct access to leadership on every issue",
    "Faster technical response — hours, not days",
    "Customised strategy tailored to each vessel",
    "Dedicated vessel attention from senior staff",
    "Relationship-driven support, not ticket queues",
  ];
  return (
    <section id="difference" className="relative overflow-hidden bg-[var(--navy)] py-24 text-white md:py-32">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="container-premium relative">
        <FadeIn><Eyebrow>The Sirtica Difference</Eyebrow></FadeIn>
        <FadeIn delay={0.05}>
          <h2 className="max-w-4xl text-balance text-4xl md:text-6xl">
            Most ship managers operate at scale. <span className="italic text-[var(--emerald-glow)]">We operate with precision.</span>
          </h2>
        </FadeIn>
        <FadeIn delay={0.15}>
          <p className="mt-6 max-w-2xl text-lg text-white/70">
            The boutique model removes the layers that slow large managers down — so your fleet
            gets the senior attention it actually deserves.
          </p>
        </FadeIn>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          <FadeIn delay={0.1}>
            <div className="h-full rounded-sm border border-white/10 bg-white/[0.03] p-8 md:p-10">
              <div className="eyebrow !text-white/50">Large ship managers</div>
              <h3 className="mt-3 text-2xl text-white/90">Built for volume</h3>
              <ul className="mt-8 space-y-4">
                {big.map((t) => (
                  <li key={t} className="flex items-start gap-3 text-sm text-white/60">
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-white/30" strokeWidth={1.5} />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="relative h-full overflow-hidden rounded-sm border border-[var(--emerald-tide)]/40 bg-gradient-to-br from-[var(--emerald-tide)]/10 to-transparent p-8 shadow-glow md:p-10">
              <div className="eyebrow">Sirtica</div>
              <h3 className="mt-3 text-2xl">Built for precision</h3>
              <ul className="mt-8 space-y-4">
                {us.map((t) => (
                  <li key={t} className="flex items-start gap-3 text-sm text-white">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--emerald-tide)]" strokeWidth={2} />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* -------------------- 4. SERVICES -------------------- */

function Services() {
  const services = [
    { icon: Ship, title: "Ship Management", desc: "Full technical, operational and commercial oversight with senior superintendents on every vessel.", outcome: "Optimised vessel performance & lifecycle ROI." },
    { icon: Users, title: "Crew Management", desc: "Recruitment, certification, welfare and retention through a vetted maritime talent pipeline.", outcome: "Stable, certified, well-supported crews." },
    { icon: ShieldCheck, title: "Safety Management", desc: "ISM/ISPS compliant safety systems built around real onboard culture, not paperwork.", outcome: "Lower incident rates & cleaner audits." },
    { icon: Search, title: "Vessel Inspection", desc: "Condition surveys, vetting prep, and RightShip-grade pre-inspection.", outcome: "Inspection-ready vessels, every time." },
    { icon: ClipboardCheck, title: "Pre-Purchase Inspection", desc: "Independent technical due diligence before you commit capital.", outcome: "Confident, data-backed acquisitions." },
    { icon: Wrench, title: "Dry Docking", desc: "Specification, yard selection, project management and on-site supervision.", outcome: "On-time, on-budget dockings." },
    { icon: Cpu, title: "Marine Digital Solutions", desc: "Fleet intelligence, planned maintenance and compliance dashboards.", outcome: "Visibility into every vessel, in real time." },
  ];
  return (
    <Section className="bg-white" id="services">
      <FadeIn><Eyebrow>Services</Eyebrow></FadeIn>
      <FadeIn delay={0.05}>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="max-w-3xl text-balance text-4xl md:text-5xl">
            A complete management capability, delivered with boutique attention.
          </h2>
          <a href="#contact" className="inline-flex items-center gap-2 text-sm font-medium text-[var(--navy)] hover:text-[var(--emerald-tide)]">
            Discuss your fleet <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </FadeIn>
      <div className="mt-16 grid gap-px overflow-hidden rounded-sm bg-border md:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <FadeIn key={s.title} delay={(i % 3) * 0.06}>
            <article className="group h-full bg-white p-8 transition hover:bg-[var(--navy)] hover:text-white md:p-10">
              <s.icon className="h-8 w-8 text-[var(--emerald-tide)]" strokeWidth={1.5} />
              <h3 className="mt-8 text-2xl">{s.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground transition group-hover:text-white/70">{s.desc}</p>
              <div className="mt-8 border-t border-border pt-5 transition group-hover:border-white/10">
                <div className="eyebrow !text-[var(--emerald-tide)]">Outcome</div>
                <div className="mt-2 text-sm font-medium">{s.outcome}</div>
              </div>
            </article>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}

/* -------------------- 5. PROCESS -------------------- */

function Process() {
  const steps = [
    { n: "01", t: "Technical Review", d: "Deep-dive on vessel condition, systems, maintenance history and certification status." },
    { n: "02", t: "Risk Assessment", d: "Operational, regulatory and commercial risk mapped against your trading pattern." },
    { n: "03", t: "Crew Evaluation", d: "Existing crew assessed; gaps closed through Sirtica's vetted talent pipeline." },
    { n: "04", t: "Compliance Audit", d: "ISM, ISPS, MLC, flag and vetting readiness audited and rectified." },
    { n: "05", t: "Full Management Implementation", d: "Seamless handover with dedicated superintendent and 24/7 escalation." },
  ];
  return (
    <section id="process" className="relative bg-[var(--mist)] py-24 md:py-32">
      <div className="container-premium">
        <FadeIn><Eyebrow>How we take over your vessel</Eyebrow></FadeIn>
        <FadeIn delay={0.05}>
          <h2 className="max-w-3xl text-balance text-4xl md:text-5xl">
            A transparent 5-step handover, designed to build confidence on day one.
          </h2>
        </FadeIn>
        <div className="mt-20 grid gap-12 md:grid-cols-5 md:gap-6">
          {steps.map((s, i) => (
            <FadeIn key={s.n} delay={i * 0.08}>
              <div className="relative">
                <div className="font-mono text-xs text-[var(--emerald-tide)]">{s.n}</div>
                <div className="mt-3 h-px w-full bg-border">
                  <div className="h-px w-1/2 gradient-emerald" />
                </div>
                <h3 className="mt-6 text-xl text-[var(--navy)]">{s.t}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{s.d}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- 6. LEADERSHIP -------------------- */

function Leadership() {
  const team = [
    { name: "Leadership Profile", role: "Managing Director", note: "Decades in technical management & vetting" },
    { name: "Leadership Profile", role: "Director, Operations", note: "Senior superintendent background" },
    { name: "Leadership Profile", role: "Head of Crewing", role2: "", note: "Maritime HR & welfare specialist" },
    { name: "Leadership Profile", role: "Head of Inspections", note: "RightShip & vetting expertise" },
  ];
  return (
    <Section className="bg-white" id="leadership">
      <FadeIn><Eyebrow>Meet the experts behind every vessel</Eyebrow></FadeIn>
      <FadeIn delay={0.05}>
        <h2 className="max-w-3xl text-balance text-4xl md:text-5xl">
          Senior maritime professionals — accessible, accountable, hands-on.
        </h2>
      </FadeIn>
      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {team.map((m, i) => (
          <FadeIn key={i} delay={i * 0.06}>
            <div className="group relative overflow-hidden rounded-sm bg-[var(--mist)]">
              <div className="aspect-[4/5] w-full bg-gradient-to-br from-[var(--deep-ocean)] to-[var(--navy)]">
                <div className="flex h-full items-center justify-center text-white/30">
                  <Users className="h-16 w-16" strokeWidth={1} />
                </div>
              </div>
              <div className="p-6">
                <div className="text-sm text-[var(--navy)] font-medium">{m.name}</div>
                <div className="mt-1 text-xs text-muted-foreground">{m.role}</div>
                <div className="mt-3 text-xs text-muted-foreground/80">{m.note}</div>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
      <p className="mt-6 text-xs text-muted-foreground">
        Placeholder profiles — to be replaced with named leadership and photography supplied by Sirtica.
      </p>
    </Section>
  );
}

/* -------------------- 7. CASE STUDIES -------------------- */

function CaseStudies() {
  const cases = [
    { tag: "Tanker · 2024", challenge: "Vessel facing repeated vetting observations", action: "Full technical audit + targeted crew retraining + pre-inspection programme", result: "Cleared subsequent vetting with zero observations" },
    { tag: "Bulk Carrier · 2024", challenge: "Aging vessel approaching special survey", action: "End-to-end dry-dock specification & yard supervision", result: "Delivered on schedule and within approved budget" },
    { tag: "Pre-Purchase · 2023", challenge: "Buyer evaluating second-hand acquisition", action: "Independent condition survey & technical due diligence", result: "Negotiation leverage on identified deferred maintenance" },
  ];
  return (
    <section className="relative bg-[var(--navy)] py-24 text-white md:py-32">
      <div className="container-premium">
        <FadeIn><Eyebrow>Case studies</Eyebrow></FadeIn>
        <FadeIn delay={0.05}>
          <h2 className="max-w-3xl text-balance text-4xl md:text-5xl">
            Real vessels. Real outcomes.
          </h2>
        </FadeIn>
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {cases.map((c, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <article className="group h-full rounded-sm border border-white/10 bg-white/[0.03] p-8 transition hover:border-[var(--emerald-tide)]/40">
                <div className="font-mono text-xs text-[var(--emerald-tide)]">{c.tag}</div>
                <div className="mt-6 space-y-5 text-sm">
                  <div>
                    <div className="eyebrow !text-white/40">Challenge</div>
                    <p className="mt-2 text-white/85">{c.challenge}</p>
                  </div>
                  <div>
                    <div className="eyebrow !text-white/40">Action</div>
                    <p className="mt-2 text-white/85">{c.action}</p>
                  </div>
                  <div className="border-t border-white/10 pt-5">
                    <div className="eyebrow">Result</div>
                    <p className="mt-2 font-medium text-white">{c.result}</p>
                  </div>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
        <p className="mt-6 text-xs text-white/40">
          Illustrative case framings — final, client-verified case studies available on request.
        </p>
      </div>
    </section>
  );
}

/* -------------------- 8. FLEET INTELLIGENCE -------------------- */

function Intelligence() {
  const features = [
    { icon: Gauge, t: "Fleet performance dashboards", d: "Single view of every vessel's KPIs, fuel, and operational state." },
    { icon: Wrench, t: "Planned maintenance", d: "Component-level PMS with predictive alerts and history." },
    { icon: Search, t: "Inspection monitoring", d: "Observations, root cause and close-out tracked to completion." },
    { icon: FileCheck, t: "Compliance tracking", d: "Certificates, surveys and audits — never miss a date." },
    { icon: ShieldCheck, t: "Risk visibility", d: "Trading-pattern, port and vetting risk surfaced before it bites." },
    { icon: TrendingUp, t: "Business outcomes", d: "Translate vessel data into commercial decisions — not noise." },
  ];
  return (
    <Section className="bg-[var(--mist)]" id="intelligence">
      <FadeIn><Eyebrow>Fleet intelligence</Eyebrow></FadeIn>
      <FadeIn delay={0.05}>
        <h2 className="max-w-3xl text-balance text-4xl md:text-5xl">
          Maritime data, translated into <span className="italic text-[var(--emerald-tide)]">business decisions</span>.
        </h2>
      </FadeIn>
      <div className="mt-16 grid gap-px overflow-hidden rounded-sm bg-border md:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => (
          <FadeIn key={f.t} delay={(i % 3) * 0.06}>
            <div className="h-full bg-white p-8">
              <f.icon className="h-7 w-7 text-[var(--navy)]" strokeWidth={1.5} />
              <h3 className="mt-6 text-lg text-[var(--navy)]">{f.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.d}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}

/* -------------------- 9. TESTIMONIALS -------------------- */

function Testimonials() {
  const items = [
    { q: "What used to take days through layers of management now takes hours. We deal directly with people who can decide.", a: "Technical Director", c: "Owner — Tanker Operations" },
    { q: "Their pre-purchase inspection paid for itself many times over in the negotiation that followed.", a: "Managing Partner", c: "Investment Fund" },
    { q: "Inspection readiness has gone from anxiety to routine. The senior attention is the difference.", a: "Fleet Manager", c: "Bulk Carrier Owner" },
  ];
  return (
    <Section className="bg-white">
      <FadeIn><Eyebrow>Voices from the bridge</Eyebrow></FadeIn>
      <FadeIn delay={0.05}>
        <h2 className="max-w-3xl text-balance text-4xl md:text-5xl">Trusted by shipowners who value direct access.</h2>
      </FadeIn>
      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {items.map((t, i) => (
          <FadeIn key={i} delay={i * 0.08}>
            <figure className="h-full rounded-sm border border-border bg-[var(--mist)] p-8">
              <Quote className="h-7 w-7 text-[var(--emerald-tide)]" strokeWidth={1.5} />
              <blockquote className="mt-6 text-lg leading-relaxed text-[var(--navy)]">"{t.q}"</blockquote>
              <figcaption className="mt-8 border-t border-border pt-5 text-sm">
                <div className="font-medium text-[var(--navy)]">{t.a}</div>
                <div className="text-muted-foreground">{t.c}</div>
              </figcaption>
            </figure>
          </FadeIn>
        ))}
      </div>
      <p className="mt-6 text-xs text-muted-foreground">
        Anonymised testimonial framings pending client approval for naming.
      </p>
    </Section>
  );
}

/* -------------------- 10. KNOWLEDGE CENTER -------------------- */

function Knowledge() {
  const posts = [
    { cat: "RightShip", t: "A practical guide to RightShip readiness", d: "Pre-inspection workstreams that consistently clear observations." },
    { cat: "Dry Docking", t: "Building a dry-dock spec that protects budget", d: "How early specification de-risks yard overruns." },
    { cat: "Vetting", t: "Why most vetting failures are leadership failures", d: "The senior-attention pattern behind clean inspections." },
    { cat: "Compliance", t: "ISM beyond the binder", d: "Designing safety culture, not safety paperwork." },
    { cat: "Fleet Optimisation", t: "Fuel, KPIs and the cost of vague data", d: "What a useful fleet dashboard actually looks like." },
    { cat: "Maritime Insights", t: "The boutique advantage in ship management", d: "Where smaller, senior-led managers outperform." },
  ];
  return (
    <Section className="bg-[var(--mist)]" id="knowledge">
      <FadeIn>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>Knowledge center</Eyebrow>
            <h2 className="max-w-2xl text-balance text-4xl md:text-5xl">
              Insights from people who run vessels — not write blog posts.
            </h2>
          </div>
          <a href="#contact" className="inline-flex items-center gap-2 text-sm font-medium text-[var(--navy)] hover:text-[var(--emerald-tide)]">
            Subscribe for updates <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </FadeIn>
      <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((p, i) => (
          <FadeIn key={i} delay={(i % 3) * 0.06}>
            <article className="group h-full rounded-sm border border-border bg-white p-8 transition hover:border-[var(--emerald-tide)]/50 hover:shadow-premium">
              <div className="flex items-center gap-2 text-xs">
                <BookOpen className="h-3.5 w-3.5 text-[var(--emerald-tide)]" />
                <span className="font-mono uppercase tracking-widest text-[var(--emerald-tide)]">{p.cat}</span>
              </div>
              <h3 className="mt-5 text-xl text-[var(--navy)]">{p.t}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{p.d}</p>
              <div className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--navy)] transition group-hover:gap-2.5 group-hover:text-[var(--emerald-tide)]">
                Read insight <ArrowRight className="h-4 w-4" />
              </div>
            </article>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}

/* -------------------- 11. GLOBAL PRESENCE -------------------- */

function Global() {
  return (
    <section className="relative overflow-hidden bg-[var(--navy)] py-24 text-white md:py-32">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="container-premium relative grid gap-16 lg:grid-cols-[1fr_1.2fr] lg:items-center">
        <FadeIn>
          <Eyebrow>Global presence</Eyebrow>
          <h2 className="mt-2 text-balance text-4xl md:text-5xl">
            Operating hubs in India & Cyprus. Vessels supported worldwide.
          </h2>
          <p className="mt-6 max-w-md text-white/70">
            Two strategic time-zone hubs give your fleet senior-level coverage across the
            major shipping lanes — without handing you off to a call centre.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {[
              { c: "India", r: "Technical & crewing headquarters" },
              { c: "Cyprus", r: "European operations & client desk" },
            ].map((h) => (
              <div key={h.c} className="rounded-sm border border-white/10 bg-white/[0.03] p-5">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <MapPin className="h-4 w-4 text-[var(--emerald-tide)]" />
                  {h.c}
                </div>
                <div className="mt-2 text-xs text-white/60">{h.r}</div>
              </div>
            ))}
          </div>
        </FadeIn>
        <FadeIn delay={0.15}>
          <div className="relative aspect-[4/3] w-full">
            <div className="absolute inset-0 rounded-sm border border-white/10 bg-gradient-to-br from-[var(--deep-ocean)] to-[var(--navy)]" />
            <Globe2 className="absolute inset-0 m-auto h-72 w-72 text-[var(--emerald-tide)]/20" strokeWidth={0.5} />
            <div className="absolute left-[28%] top-[55%]">
              <Pin label="India" />
            </div>
            <div className="absolute left-[52%] top-[38%]">
              <Pin label="Cyprus" />
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function Pin({ label }: { label: string }) {
  return (
    <div className="relative">
      <div className="absolute -inset-3 animate-ping rounded-full bg-[var(--emerald-tide)]/30" />
      <div className="relative grid h-3 w-3 place-items-center rounded-full gradient-emerald shadow-glow" />
      <div className="absolute left-5 top-1/2 -translate-y-1/2 rounded-sm border border-white/10 bg-[var(--navy)]/80 px-2 py-1 text-[10px] font-mono uppercase tracking-widest text-white backdrop-blur">
        {label}
      </div>
    </div>
  );
}

/* -------------------- 12. LEAD GEN -------------------- */

function LeadGen() {
  const offers = [
    { icon: FileCheck, t: "RightShip Readiness Checklist", d: "The pre-inspection workstream we use on every vessel." },
    { icon: Wrench, t: "Dry Dock Preparation Guide", d: "A spec-building framework that protects budget and schedule." },
    { icon: Search, t: "Vessel Inspection Checklist", d: "Condition survey and vetting prep in one downloadable file." },
    { icon: Phone, t: "Free 30-Minute Consultation", d: "A direct call with a senior superintendent — no intermediaries." },
  ];
  return (
    <Section className="bg-white">
      <FadeIn><Eyebrow>Take the next step</Eyebrow></FadeIn>
      <FadeIn delay={0.05}>
        <h2 className="max-w-3xl text-balance text-4xl md:text-5xl">
          Free resources, built from real fleet operations.
        </h2>
      </FadeIn>
      <div className="mt-16 grid gap-6 md:grid-cols-2">
        {offers.map((o, i) => (
          <FadeIn key={o.t} delay={i * 0.06}>
            <a
              href="#contact"
              className="group flex h-full items-start gap-5 rounded-sm border border-border bg-[var(--mist)] p-8 transition hover:border-[var(--emerald-tide)]/60 hover:shadow-premium"
            >
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-sm gradient-emerald">
                <o.icon className="h-5 w-5 text-[var(--navy)]" strokeWidth={2} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-lg font-medium text-[var(--navy)]">{o.t}</div>
                <div className="mt-2 text-sm text-muted-foreground">{o.d}</div>
                <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--navy)] transition group-hover:gap-2.5 group-hover:text-[var(--emerald-tide)]">
                  Request access <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </a>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}

/* -------------------- 13. FAQ -------------------- */

function FAQ() {
  const faqs = [
    { q: "What kinds of vessels does Sirtica manage?", a: "Tankers, bulk carriers and general cargo vessels — with management plans tailored to each owner's commercial pattern." },
    { q: "How is Sirtica different from larger ship managers?", a: "Senior staff are directly involved with every vessel. There are no intermediate layers between your fleet and the people making decisions." },
    { q: "Where are you based?", a: "We operate from India and Cyprus, with capability to support vessels trading worldwide." },
    { q: "What does the onboarding process look like?", a: "A 5-step handover: technical review, risk assessment, crew evaluation, compliance audit and full management implementation." },
    { q: "Can Sirtica handle a single vessel?", a: "Yes — boutique scale is the point. Single-vessel owners often get more attention with us than they would in a large portfolio." },
    { q: "Do you offer inspection-only engagements?", a: "Yes. Pre-purchase inspections, vetting prep and condition surveys are available as standalone services." },
  ];
  return (
    <Section className="bg-[var(--mist)]" id="faq">
      <FadeIn><Eyebrow>Frequently asked</Eyebrow></FadeIn>
      <FadeIn delay={0.05}>
        <h2 className="max-w-3xl text-balance text-4xl md:text-5xl">
          The questions shipowners actually ask.
        </h2>
      </FadeIn>
      <div className="mx-auto mt-16 max-w-3xl divide-y divide-border rounded-sm border border-border bg-white">
        {faqs.map((f, i) => (
          <details key={i} className="group p-6 md:p-8" {...(i === 0 ? { open: true } : {})}>
            <summary className="flex cursor-pointer list-none items-start justify-between gap-6">
              <span className="text-base font-medium text-[var(--navy)] md:text-lg">{f.q}</span>
              <ChevronDown className="mt-1 h-5 w-5 shrink-0 text-[var(--navy)] transition group-open:rotate-180" />
            </summary>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
          </details>
        ))}
      </div>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />
    </Section>
  );
}

/* -------------------- CONTACT + FOOTER -------------------- */

function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-[var(--navy)] py-24 text-white md:py-32">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--navy)] via-[var(--deep-ocean)] to-[var(--navy)]" />
      <div className="container-premium relative grid gap-16 lg:grid-cols-2 lg:items-start">
        <FadeIn>
          <Eyebrow>Request consultation</Eyebrow>
          <h2 className="mt-2 text-balance text-4xl md:text-6xl">
            Talk to a senior superintendent — not a sales desk.
          </h2>
          <p className="mt-6 max-w-md text-white/70">
            Tell us about your vessel or fleet. We'll respond within one business day with a
            direct line to a senior team member.
          </p>
          <div className="mt-10 space-y-4 text-sm">
            <div className="flex items-center gap-3 text-white/80">
              <Mail className="h-4 w-4 text-[var(--emerald-tide)]" /> contact@sirtica.com
            </div>
            <div className="flex items-center gap-3 text-white/80">
              <Phone className="h-4 w-4 text-[var(--emerald-tide)]" /> +91 / +357 (India & Cyprus desks)
            </div>
            <div className="flex items-center gap-3 text-white/60">
              <Layers className="h-4 w-4 text-[var(--emerald-tide)]" /> Contact details to be confirmed by Sirtica
            </div>
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <form
            onSubmit={(e) => { e.preventDefault(); alert("Thank you — a senior team member will be in touch."); }}
            className="rounded-sm border border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm md:p-10"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Full name" name="name" required />
              <Field label="Company" name="company" required />
              <Field label="Email" name="email" type="email" required />
              <Field label="Phone" name="phone" type="tel" />
            </div>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <Field label="Vessel type" name="vessel" placeholder="Tanker / Bulker / Other" />
              <Field label="Fleet size" name="fleet" placeholder="1, 2–5, 6+" />
            </div>
            <div className="mt-5">
              <label className="block text-xs font-medium text-white/70">How can we help?</label>
              <textarea
                name="message"
                rows={4}
                maxLength={1000}
                className="mt-2 w-full rounded-sm border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[var(--emerald-tide)] focus:outline-none"
                placeholder="Tell us about your vessel and what you're looking to achieve."
              />
            </div>
            <button
              type="submit"
              className="group mt-8 inline-flex w-full items-center justify-center gap-2 rounded-sm gradient-emerald px-6 py-4 text-sm font-semibold text-[var(--navy)] shadow-glow transition hover:brightness-110"
            >
              Request Consultation
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </button>
            <p className="mt-4 text-center text-xs text-white/40">
              We respond within one business day.
            </p>
          </form>
        </FadeIn>
      </div>
    </section>
  );
}

function Field({ label, name, type = "text", placeholder, required }: { label: string; name: string; type?: string; placeholder?: string; required?: boolean }) {
  return (
    <div>
      <label className="block text-xs font-medium text-white/70">{label}{required && <span className="text-[var(--emerald-tide)]"> *</span>}</label>
      <input
        type={type}
        name={name}
        required={required}
        maxLength={255}
        placeholder={placeholder}
        className="mt-2 w-full rounded-sm border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[var(--emerald-tide)] focus:outline-none"
      />
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-[var(--navy)] pb-12 pt-20 text-white/70">
      <div className="container-premium">
        <div className="grid gap-12 border-b border-white/10 pb-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center text-white">
              <img src={sirticaLogo.url} alt="Sirtica Maritime Pvt. Ltd." className="h-14 w-auto bg-white rounded-sm px-2 py-1" />
            </div>
            <p className="mt-5 max-w-xs text-sm">
              The premium boutique ship management partner. Direct expert access, faster
              decisions, dedicated vessel attention.
            </p>
          </div>
          <FooterCol title="Services" links={["Ship Management", "Crew Management", "Safety Management", "Vessel Inspection", "Dry Docking", "Marine Digital"]} />
          <FooterCol title="Company" links={["The Difference", "Leadership", "Case Studies", "Knowledge Center"]} />
          <FooterCol title="Offices" links={["India HQ", "Cyprus", "contact@sirtica.com"]} />
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 pt-8 text-xs text-white/40">
          <div>© {new Date().getFullYear()} Sirtica Ship Management Pvt. Ltd. All rights reserved.</div>
          <div className="flex items-center gap-2">
            <Compass className="h-3.5 w-3.5" /> India · Cyprus · Worldwide
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <div className="text-xs font-mono uppercase tracking-widest text-[var(--emerald-tide)]">{title}</div>
      <ul className="mt-5 space-y-3 text-sm">
        {links.map((l) => <li key={l}><a href="#contact" className="transition hover:text-white">{l}</a></li>)}
      </ul>
    </div>
  );
}

/* -------------------- PAGE -------------------- */

function SirticaHome() {
  return (
    <main className="min-h-screen bg-background">
      <Nav />
      <Hero />
      <Metrics />
      <Difference />
      <Services />
      <Process />
      <Leadership />
      <CaseStudies />
      <Intelligence />
      <Testimonials />
      <Knowledge />
      <Global />
      <LeadGen />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}
