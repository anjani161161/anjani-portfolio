import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";

import { motion } from "motion/react";
import {
  ArrowRight,
  Download,
  Mail,
  Github,
  Linkedin,
  Instagram,
  ExternalLink,
  Code2,
  Layers,
  Palette,
  Sparkles,
  Gauge,
  Compass,
  GraduationCap,
  Briefcase,
  Send,
  MapPin,
  Code,
  Trophy,
  Atom,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
} from "lucide-react";
import { sendContactEmail, isEmailConfigured, getEmailConfigStatus } from "@/lib/emailjs";
import heroImg from "@/assets/hero-visual.jpg";
import {
  PROFILE,
  STATS,
  SKILL_GROUPS,
  EXPERIENCES,
  PROJECTS,
  PROJECT_CATEGORIES,
  SERVICES,
  ACHIEVEMENTS,
  NAV_LINKS,
} from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";
import { Tilt, Spotlight, FloatingTech, Marquee } from "./fx";
import { toast } from "sonner";

function Section({
  id,
  eyebrow,
  title,
  sub,
  children,
}: {
  id: string;
  eyebrow?: string;
  title: ReactNode;
  sub?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="relative scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 max-w-2xl"
        >
          {eyebrow && (
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border/60 glass px-3 py-1 text-xs text-muted-foreground">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: "var(--gradient-primary)" }}
              />{" "}
              {eyebrow}
            </div>
          )}
          <h2 className="font-display text-4xl font-semibold tracking-tight md:text-6xl lg:text-[3.75rem] leading-[1.05]">
            {title}
          </h2>
          {sub && <p className="mt-4 text-base text-muted-foreground md:text-lg">{sub}</p>}
        </motion.div>
        {children}
      </div>
    </section>
  );
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

/* ---------------- Hero ---------------- */
const ROLES = [
  "Quantum & Machine Learning R&D",
  "Quantum & ML Developer",
  "Full Stack Software Engineer",
  "Machine Learning Developer",
  "UI/UX & Systems Builder",
];

function useTyping(words: string[], speed = 70, pause = 1400) {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);
  useEffect(() => {
    const word = words[i];
    const timeout = setTimeout(
      () => {
        if (!del) {
          const next = word.slice(0, text.length + 1);
          setText(next);
          if (next === word) setTimeout(() => setDel(true), pause);
        } else {
          const next = word.slice(0, text.length - 1);
          setText(next);
          if (next === "") {
            setDel(false);
            setI((p) => (p + 1) % words.length);
          }
        }
      },
      del ? speed / 2 : speed,
    );
    return () => clearTimeout(timeout);
  }, [text, del, i, words, speed, pause]);
  return text;
}

export function Hero() {
  const typed = useTyping(ROLES);
  const leetcode = PROFILE.socials.leetcode;
  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.div
              variants={item}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-border/60 glass px-3 py-1 text-xs"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Available for internships & freelance
            </motion.div>

            <motion.h1
              variants={item}
              className="font-display text-5xl font-semibold leading-[1.02] tracking-tight md:text-7xl lg:text-[5.75rem]"
            >
              <span className="block text-muted-foreground/80 font-serif-italic text-3xl md:text-4xl lg:text-5xl">
                Hello, I'm
              </span>
              <span className="text-aurora">{PROFILE.name.split(" ")[0]}</span>{" "}
              <span className="text-gradient">{PROFILE.name.split(" ").slice(1).join(" ")}</span>
              <span className="ml-2 inline-block align-baseline font-serif-italic text-primary">
                .
              </span>
            </motion.h1>

            <motion.div
              variants={item}
              className="mt-5 flex items-center gap-2 font-mono text-lg text-muted-foreground md:text-2xl"
            >
              <span className="text-primary font-semibold">&gt;</span>
              <span className="text-gradient-primary font-semibold">{typed}</span>
              <span className="cursor-blink text-primary">|</span>
            </motion.div>

            <motion.p
              variants={item}
              className="mt-6 max-w-xl text-base text-muted-foreground md:text-lg"
            >
              {PROFILE.bio}
            </motion.p>

            <motion.div variants={item} className="mt-8 flex flex-wrap gap-3">
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-primary-foreground shadow-elevated transition hover:shadow-glow"
                style={{ background: "var(--gradient-primary)" }}
              >
                View Projects
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-border/70 glass px-5 py-3 text-sm font-medium transition hover:bg-accent"
              >
                <Mail className="h-4 w-4" /> Contact Me
              </a>
              <a
                href={PROFILE.resumeUrl || "#"}
                target={PROFILE.resumeUrl ? "_blank" : undefined}
                rel={PROFILE.resumeUrl ? "noopener noreferrer" : undefined}
                onClick={(e) => {
                  if (!PROFILE.resumeUrl) e.preventDefault();
                }}
                className={`inline-flex items-center gap-2 rounded-full border border-border/70 px-5 py-3 text-sm font-medium transition hover:bg-accent ${
                  PROFILE.resumeUrl ? "" : "text-muted-foreground"
                }`}
                aria-label="Preview resume"
              >
                <ExternalLink className="h-4 w-4" /> Preview Resume
              </a>
              {PROFILE.resumeDownloadUrl ? (
                <a
                  href={PROFILE.resumeDownloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border/70 px-5 py-3 text-sm font-medium transition hover:bg-accent"
                  aria-label="Download resume"
                >
                  <Download className="h-4 w-4" /> Download Resume
                </a>
              ) : null}
            </motion.div>

            <motion.div
              variants={item}
              className="mt-10 flex items-center gap-4 text-muted-foreground"
            >
              <a
                href={PROFILE.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="transition hover:text-foreground"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href={PROFILE.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="transition hover:text-foreground"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href={leetcode}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LeetCode"
                className="transition hover:text-foreground"
              >
                <Code className="h-5 w-5" />
              </a>
              <a
                href={PROFILE.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="transition hover:text-foreground"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <span className="ml-3 inline-flex items-center gap-1 text-xs">
                <MapPin className="h-3.5 w-3.5" /> India
              </span>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <FloatingTech />
            <div
              className="absolute inset-0 -z-10 rounded-[2rem] blur-3xl opacity-60"
              style={{ background: "var(--gradient-primary)" }}
            />
            <Tilt
              intensity={10}
              className="relative overflow-hidden rounded-[2rem] border border-border/60 glass-strong p-2 shadow-elevated noise"
            >
              <img
                src={heroImg}
                alt="Developer workspace illustration"
                width={1024}
                height={1024}
                className="w-full rounded-[1.5rem]"
              />
              <div
                className="pointer-events-none absolute inset-0 rounded-[2rem]"
                style={{ boxShadow: "inset 0 0 80px oklch(0.7 0.25 260 / 0.15)" }}
              />
            </Tilt>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="absolute -top-4 -right-4 rounded-2xl border border-border/60 glass-strong px-4 py-3 shadow-soft"
            >
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                Building with
              </div>
              <div className="text-sm font-medium">Software · Quantum · ML</div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-20 flex justify-center"
        >
          <div className="flex flex-col items-center gap-2 text-xs text-muted-foreground">
            <span>Scroll</span>
            <span className="relative block h-8 w-5 rounded-full border border-border/60">
              <motion.span
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute left-1/2 top-1.5 h-1.5 w-1 -translate-x-1/2 rounded-full bg-foreground/60"
              />
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- About ---------------- */
export function About() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title={
        <>
          A builder who cares about <span className="text-gradient">craft</span>.
        </>
      }
      sub="Engineering scalable software, exploring quantum technology, and researching machine learning systems."
    >
      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl border border-border/60 glass p-8 shadow-soft"
        >
          <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
            I am a Computer Science engineer passionate about building impactful software, advancing
            quantum technology, and developing machine learning solutions. My work spans full-stack
            engineering, quantum computing, quantum key distribution (QKD), and scientific
            simulation in collaboration with IIT Delhi. I focus on bridging theoretical science and
            physical devices with reliable, modern software systems.
          </p>

          <div className="mt-8 flex items-start gap-4 rounded-2xl border border-border/60 bg-card/40 p-4">
            <div
              className="grid h-10 w-10 shrink-0 place-items-center rounded-xl"
              style={{ background: "var(--gradient-primary)" }}
            >
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="text-sm font-semibold">
                Galgotias College of Engineering and Technology
              </div>
              <div className="text-sm text-muted-foreground">
                B.Tech in Computer Science Engineering
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-4"
        >
          {STATS.map((s) => (
            <motion.div
              key={s.label}
              variants={item}
              className="group rounded-2xl border border-border/60 glass p-5 shadow-soft transition hover:-translate-y-0.5 hover:shadow-elevated"
            >
              <div className="font-display text-3xl font-semibold text-gradient-primary md:text-4xl">
                {s.value}
              </div>
              <div className="mt-1 text-xs text-muted-foreground">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}

/* ---------------- Skills ---------------- */
export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title={
        <>
          A toolbox built for <span className="text-gradient">shipping</span>.
        </>
      }
      sub="From the design canvas to production deploys — here's what I reach for."
    >
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {SKILL_GROUPS.map((group) => (
          <motion.div key={group.title} variants={item}>
            <Spotlight className="group h-full rounded-2xl border border-border/60 glass p-6 shadow-soft transition hover:-translate-y-0.5 hover:shadow-elevated">
              <div className="font-display text-base font-semibold flex items-center gap-2">
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: "var(--gradient-primary)" }}
                />
                {group.title}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.skills.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-border/60 bg-card/60 px-3 py-1 text-xs text-muted-foreground transition group-hover:text-foreground"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </Spotlight>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}

/* ---------------- Experience ---------------- */
export function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title={
        <>
          The <span className="text-gradient">journey</span> so far.
        </>
      }
      sub="Leadership, engineering, and shipping side-by-side."
    >
      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent md:left-1/2" />
        <div className="space-y-10">
          {EXPERIENCES.map((exp, i) => (
            <motion.div
              key={exp.role}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className={cn(
                "relative grid gap-4 md:grid-cols-2",
                i % 2 === 0 ? "" : "md:[&>div:first-child]:col-start-2",
              )}
            >
              <span className="absolute left-4 top-3 z-10 grid h-3 w-3 -translate-x-1/2 place-items-center md:left-1/2">
                <span
                  className={cn(
                    "absolute inline-flex h-full w-full animate-ping rounded-full opacity-60",
                    exp.current ? "bg-emerald-400" : "",
                  )}
                  style={{ background: exp.current ? undefined : "var(--glow)" }}
                />
                <span
                  className={cn(
                    "relative h-3 w-3 rounded-full",
                    exp.current ? "bg-emerald-500 shadow-glow" : "",
                  )}
                  style={{ background: exp.current ? undefined : "var(--gradient-primary)" }}
                />
              </span>
              <div className={cn("pl-10", i % 2 === 0 ? "md:pl-0 md:pr-10" : "md:pl-10 md:pr-0")}>
                <div
                  className={cn(
                    "rounded-2xl border border-border/60 glass p-6 shadow-soft transition hover:shadow-elevated",
                    exp.current ? "border-emerald-500/35 ring-1 ring-emerald-500/20" : "",
                  )}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5 font-medium">
                      <Briefcase className="h-3.5 w-3.5" /> {exp.period}
                    </span>
                    {exp.current && (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-medium text-emerald-400">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        </span>
                        Present / Current
                      </span>
                    )}
                  </div>
                  <div className="mt-2 font-display text-lg font-semibold">{exp.role}</div>
                  <div className="text-sm font-medium text-primary">{exp.company}</div>
                  {exp.description && (
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground/90">
                      {exp.description}
                    </p>
                  )}
                  {exp.points && exp.points.length > 0 && (
                    <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                      {exp.points.map((p) => (
                        <li key={p} className="flex gap-2">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-foreground/40" />{" "}
                          {p}
                        </li>
                      ))}
                    </ul>
                  )}
                  {exp.tags && exp.tags.length > 0 && (
                    <div className="mt-4 border-t border-border/40 pt-3">
                      <div className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/75">
                        Key Work
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {exp.tags.map((t) => (
                          <span
                            key={t}
                            className="rounded-md border border-border/60 bg-card/60 px-2.5 py-0.5 text-[11px] font-medium text-foreground/85"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ---------------- Projects ---------------- */
export function Projects() {
  const [filter, setFilter] = useState("All");

  const filtered = useMemo(() => {
    if (filter === "All") return PROJECTS;
    return PROJECTS.filter((p) => p.category.toLowerCase().includes(filter.toLowerCase()));
  }, [filter]);

  // Ensure enough items so that one half is wider than any display (at least 8 items per half),
  // then duplicate to form two identical halves for a mathematically seamless 0% -> -50% translateX marquee loop.
  const marqueeItems = useMemo(() => {
    const base = filtered.length > 0 ? filtered : PROJECTS;
    let items = [...base];
    while (items.length < 8) {
      items = [...items, ...base];
    }
    return [...items, ...items];
  }, [filtered]);

  return (
    <Section
      id="projects"
      eyebrow="Selected Work"
      title={
        <>
          Projects I'm <span className="text-gradient">proud</span> of.
        </>
      }
      sub="A continuous showcase of software, AI systems, and tools I've built."
    >
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {PROJECT_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-xs font-medium transition cursor-pointer",
                filter === cat
                  ? "border-transparent text-primary-foreground shadow-soft"
                  : "border-border/60 glass text-muted-foreground hover:text-foreground",
              )}
              style={filter === cat ? { background: "var(--gradient-primary)" } : undefined}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground">
          <Github className="h-3.5 w-3.5 text-primary" />
          <span>Click any card to explore code on GitHub</span>
        </div>
      </div>

      <div className="project-marquee-container relative -mx-4 overflow-hidden px-4 py-2 sm:-mx-6 sm:px-6 [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)]">
        <div className="project-marquee-track py-2">
          {marqueeItems.map((p, idx) => (
            <a
              key={`${p.title}-${idx}`}
              href={p.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${p.title} repository on GitHub`}
              className="group relative block w-[285px] sm:w-[315px] md:w-[335px] shrink-0 select-none overflow-hidden rounded-2xl border border-border/60 glass shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted/40">
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  width={640}
                  height={360}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/25 to-transparent" />
                <span className="absolute left-3 top-3 rounded-full border border-white/20 bg-black/60 px-2.5 py-0.5 text-[10px] font-medium text-white backdrop-blur">
                  {p.category}
                </span>
                <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full border border-white/20 bg-black/60 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Github className="h-3 w-3" />
                  <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>

              <div className="p-4 sm:p-4.5">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="truncate font-display text-base font-semibold text-foreground transition-colors group-hover:text-primary">
                    {p.title}
                  </h3>
                </div>

                <p className="mt-1.5 h-[2rem] text-xs leading-relaxed text-muted-foreground line-clamp-2">
                  {p.description}
                </p>

                <div className="mt-3 flex flex-wrap gap-1">
                  {p.tags.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="rounded-md bg-muted/80 px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                  {p.tags.length > 3 && (
                    <span className="rounded-md bg-muted/60 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground/75">
                      +{p.tags.length - 3}
                    </span>
                  )}
                </div>

                <div className="mt-3 flex items-center justify-between border-t border-border/40 pt-2.5 text-xs font-medium text-primary">
                  <span className="inline-flex items-center gap-1.5 text-[11px] text-muted-foreground transition-colors group-hover:text-primary">
                    <Github className="h-3 w-3 text-primary" /> View Repository
                  </span>
                  <span className="inline-flex items-center gap-0.5 text-[11px] text-primary">
                    Code{" "}
                    <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-muted-foreground">
        <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
        <span>Hover or focus card to pause scroll · Smooth infinite loop</span>
      </div>
    </Section>
  );
}

/* ---------------- Services + Achievements ---------------- */
const ICONS = { Code2, Layers, Palette, Sparkles, Gauge, Compass, Atom } as const;

export function Services() {
  return (
    <Section
      id="services"
      eyebrow="What I Offer"
      title={
        <>
          Services to help you <span className="text-gradient">ship</span>.
        </>
      }
      sub="Plug me in for design, engineering, or both. Hands-on, fast, and end-to-end."
    >
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
      >
        {SERVICES.map((s) => {
          const Icon = ICONS[s.icon as keyof typeof ICONS] ?? Sparkles;
          return (
            <motion.div key={s.title} variants={item}>
              <Spotlight className="group h-full rounded-2xl border border-border/60 glass p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-elevated">
                <div
                  className="absolute inset-x-0 top-0 h-px opacity-0 transition group-hover:opacity-100"
                  style={{ background: "var(--gradient-primary)" }}
                />
                <div className="grid h-11 w-11 place-items-center rounded-xl border border-border/60 bg-card shadow-soft">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mt-4 font-display text-base font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </Spotlight>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Achievements */}
      <div className="mt-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h3 className="font-display text-2xl font-semibold md:text-3xl">Achievements</h3>
        </motion.div>
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-4 sm:grid-cols-2"
        >
          {ACHIEVEMENTS.map((a) => (
            <motion.div
              key={a.title}
              variants={item}
              className="group relative overflow-hidden rounded-2xl border border-border/60 glass p-6 shadow-soft transition hover:-translate-y-0.5"
            >
              <Trophy className="absolute -right-4 -top-4 h-24 w-24 text-primary/5 transition group-hover:text-primary/10" />
              <div className="font-display text-base font-semibold">{a.title}</div>
              <p className="mt-2 text-sm text-muted-foreground">{a.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}

/* ---------------- Marquee Band ---------------- */
export function MarqueeBand() {
  const items = [
    "Quantum Tech",
    "Machine Learning",
    "QKD",
    "React",
    "Next.js",
    "TypeScript",
    "Python",
    "Node.js",
    "Tailwind",
    "MongoDB",
    "Figma",
    "OpenAI",
  ];
  return (
    <div className="py-14 border-y border-border/40 bg-background/40 backdrop-blur-sm">
      <Marquee items={items} />
    </div>
  );
}

/* ---------------- Contact + Footer ---------------- */
export function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState<string>("");
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const formRef = useRef<HTMLFormElement>(null);
  const isMountedRef = useRef(true);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    if (status === "success" || status === "error") {
      setStatus("idle");
      setFeedback("");
    }
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    const name = formValues.name.trim();
    const email = formValues.email.trim();
    const subject = formValues.subject.trim();
    const message = formValues.message.trim();

    if (!name || name.length < 2) {
      toast.error("Please enter your name (at least 2 characters).");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (!message || message.length < 5) {
      toast.error("Please enter a message (at least 5 characters).");
      return;
    }

    const fallbackEmail = PROFILE.targetEmail || PROFILE.email;

    // Case A — Configuration missing (e.g. Vercel build did not have environment variables injected)
    if (!isEmailConfigured) {
      console.warn("EmailJS configuration status:", getEmailConfigStatus());
      if (isMountedRef.current) {
        setStatus("error");
        setFeedback(
          `Email service is not configured yet. Please reach out directly at ${fallbackEmail}.`,
        );
      }
      toast.error("Email service is not configured yet. Please reach out directly via email.");
      return;
    }

    if (isMountedRef.current) {
      setStatus("sending");
      setFeedback("");
    }

    try {
      const res = await sendContactEmail({
        name,
        email,
        subject: subject || "Portfolio Inquiry",
        message,
      });

      if (!isMountedRef.current) return;

      if (res && (res.status === 200 || res.text === "OK")) {
        setStatus("success");
        setFeedback("Email sent successfully! I'll get back to you soon.");
        toast.success("Email sent successfully!");
        setFormValues({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
        formRef.current?.reset();
      } else {
        throw new Error(res?.text || "Failed to send message.");
      }
    } catch (err: unknown) {
      if (!isMountedRef.current) return;

      console.error("EmailJS submission failed:", err);
      setStatus("error");

      // Case B — Configuration exists but EmailJS API rejected the request
      let errorMessage =
        "Something went wrong while sending your message. Please try again or contact me directly.";
      if (err instanceof Error && err.message) {
        if (err.message.includes("timed out")) {
          errorMessage = "Request timed out. Please check your network or contact me directly.";
        }
      } else if (typeof err === "string") {
        errorMessage = err;
      } else if (
        err &&
        typeof err === "object" &&
        "text" in err &&
        typeof (err as { text: unknown }).text === "string"
      ) {
        errorMessage = (err as { text: string }).text;
      }

      setFeedback(errorMessage);
      toast.error(errorMessage);
    } finally {
      if (isMountedRef.current) {
        setStatus((prev) => (prev === "sending" ? "idle" : prev));
      }
    }
  }

  return (
    <Section
      id="contact"
      eyebrow="Let's Talk"
      title={
        <>
          Have an idea? <span className="text-gradient">Let's build it.</span>
        </>
      }
      sub="Open to internships, research collaborations, full-time roles, and freelance work."
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-border/60 glass p-8 shadow-soft"
        >
          <div className="text-sm text-muted-foreground">Reach me directly</div>
          <a
            href={`mailto:${PROFILE.targetEmail || PROFILE.email}`}
            className="mt-1 block font-display text-xl font-semibold md:text-2xl"
          >
            {PROFILE.email}
          </a>
          <div className="mt-8 space-y-3">
            <a
              href={PROFILE.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl border border-border/60 p-3 transition hover:bg-accent/60"
            >
              <Linkedin className="h-4 w-4 text-primary" />{" "}
              <span className="text-sm">LinkedIn</span>
            </a>
            <a
              href={PROFILE.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl border border-border/60 p-3 transition hover:bg-accent/60"
            >
              <Github className="h-4 w-4 text-primary" /> <span className="text-sm">GitHub</span>
            </a>
            <a
              href={PROFILE.socials.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl border border-border/60 p-3 transition hover:bg-accent/60"
            >
              <Code className="h-4 w-4 text-primary" /> <span className="text-sm">LeetCode</span>
            </a>
            <a
              href={PROFILE.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl border border-border/60 p-3 transition hover:bg-accent/60"
            >
              <Instagram className="h-4 w-4 text-primary" />{" "}
              <span className="text-sm">Instagram</span>
            </a>
          </div>
        </motion.div>

        <motion.form
          ref={formRef}
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-border/60 glass p-8 shadow-soft"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Name"
              name="name"
              value={formValues.name}
              onChange={handleInputChange}
              placeholder="Your name"
              required
              disabled={status === "sending"}
            />
            <Field
              label="Email"
              name="email"
              type="email"
              value={formValues.email}
              onChange={handleInputChange}
              placeholder="you@example.com"
              required
              disabled={status === "sending"}
            />
          </div>
          <div className="mt-4">
            <Field
              label="Subject"
              name="subject"
              value={formValues.subject}
              onChange={handleInputChange}
              placeholder="What's it about?"
              required
              disabled={status === "sending"}
            />
          </div>
          <div className="mt-4">
            <label className="text-xs font-medium text-muted-foreground">Message</label>
            <textarea
              name="message"
              value={formValues.message}
              onChange={handleInputChange}
              required
              disabled={status === "sending"}
              minLength={5}
              maxLength={1000}
              rows={5}
              placeholder="Tell me about the project, role, or idea…"
              className="mt-1.5 w-full rounded-xl border border-border/70 bg-background/40 px-4 py-3 text-sm outline-none transition focus:border-primary/60 focus:bg-background/70 disabled:cursor-not-allowed disabled:opacity-60"
            />
          </div>

          {feedback && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "mt-4 flex items-start gap-2.5 rounded-xl border p-3.5 text-xs transition-all",
                status === "success"
                  ? "border-emerald-500/40 bg-emerald-500/10 font-medium text-emerald-400"
                  : "border-destructive/40 bg-destructive/10 text-destructive-foreground",
              )}
            >
              {status === "success" ? (
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
              ) : (
                <AlertCircle className="h-4 w-4 shrink-0 text-destructive" />
              )}
              <span className="leading-relaxed">{feedback}</span>
            </motion.div>
          )}

          <button
            type="submit"
            disabled={status === "sending"}
            className="mt-6 inline-flex cursor-pointer items-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-primary-foreground shadow-elevated transition hover:shadow-glow disabled:cursor-not-allowed disabled:opacity-60"
            style={{ background: "var(--gradient-primary)" }}
          >
            {status === "sending" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Sending…
              </>
            ) : status === "success" ? (
              <>
                <CheckCircle2 className="h-4 w-4 text-emerald-300" /> Email Sent!
              </>
            ) : (
              <>
                Send Message <Send className="h-4 w-4" />
              </>
            )}
          </button>
        </motion.form>
      </div>
    </Section>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  required,
  disabled,
}: {
  label: string;
  name: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        maxLength={255}
        className="mt-1.5 w-full rounded-xl border border-border/70 bg-background/40 px-4 py-3 text-sm outline-none transition focus:border-primary/60 focus:bg-background/70 disabled:cursor-not-allowed disabled:opacity-60"
      />
    </label>
  );
}

export function Footer() {
  return (
    <footer className="relative border-t border-border/60 py-12">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2 font-display font-semibold">
            <span
              className="grid h-7 w-7 place-items-center rounded-lg"
              style={{ background: "var(--gradient-primary)" }}
            >
              <Sparkles className="h-3.5 w-3.5 text-white" />
            </span>
            {PROFILE.name}
          </div>
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">{PROFILE.tagline}</p>
        </div>
        <div>
          <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Navigate
          </div>
          <ul className="space-y-2 text-sm">
            {NAV_LINKS.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  className="text-muted-foreground transition hover:text-foreground"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Connect
          </div>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href={`mailto:${PROFILE.targetEmail || PROFILE.email}`}
                className="text-muted-foreground transition hover:text-foreground"
              >
                Email
              </a>
            </li>
            <li>
              <a
                href={PROFILE.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition hover:text-foreground"
                aria-label="LinkedIn"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href={PROFILE.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition hover:text-foreground"
                aria-label="GitHub"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href={PROFILE.socials.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition hover:text-foreground"
                aria-label="LeetCode"
              >
                LeetCode
              </a>
            </li>
            <li>
              <a
                href={PROFILE.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition hover:text-foreground"
                aria-label="Instagram"
              >
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-6xl px-4 text-xs text-muted-foreground">
        © {new Date().getFullYear()} {PROFILE.name}. Crafted with care.
      </div>
    </footer>
  );
}
