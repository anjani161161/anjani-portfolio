import { useEffect, useMemo, useState, type ReactNode } from "react";

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
} from "lucide-react";
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
  "Full Stack Developer",
  "Frontend Developer",
  "UI/UX Designer",
  "AI Enthusiast",
  "Computer Science Student",
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
              <span className="text-foreground/80">I am</span>
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
              <div className="text-sm font-medium">React · Next · AI</div>
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
      sub="I'm an engineering student building real products. I love the intersection of clean systems, sharp interfaces, and pragmatic AI."
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
            I am a Computer Science Engineering student who enjoys solving real-world problems
            through technology. My journey has been driven by curiosity, continuous learning, and
            building practical projects that improve my skills in web development, design, and AI. I
            focus on creating responsive, user-friendly applications while constantly exploring
            modern frameworks, development practices, and emerging technologies. My goal is to grow
            as a software engineer by building impactful digital products and contributing to
            meaningful projects.
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
                  className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
                  style={{ background: "var(--glow)" }}
                />
                <span
                  className="relative h-3 w-3 rounded-full"
                  style={{ background: "var(--gradient-primary)" }}
                />
              </span>
              <div className="pl-10 md:pl-0 md:pr-10">
                <div className="rounded-2xl border border-border/60 glass p-6 shadow-soft">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Briefcase className="h-3.5 w-3.5" /> {exp.period}
                  </div>
                  <div className="mt-2 font-display text-lg font-semibold">{exp.role}</div>
                  <div className="text-sm text-primary">{exp.company}</div>
                  <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                    {exp.points.map((p) => (
                      <li key={p} className="flex gap-2">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-foreground/40" /> {p}
                      </li>
                    ))}
                  </ul>
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
  const filtered = useMemo(
    () => (filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === filter)),
    [filter],
  );

  return (
    <Section
      id="projects"
      eyebrow="Selected Work"
      title={
        <>
          Projects I'm <span className="text-gradient">proud</span> of.
        </>
      }
      sub="A snapshot of what I've shipped — across web, AI, and internal tooling."
    >
      <div className="mb-8 flex flex-wrap gap-2">
        {PROJECT_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-xs font-medium transition",
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

      <motion.div layout className="grid gap-6 md:grid-cols-2">
        {filtered.map((p, i) => (
          <motion.div
            key={p.title}
            layout
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: (i % 4) * 0.05 }}
          >
            <Tilt
              intensity={6}
              className="group h-full overflow-hidden rounded-3xl border border-border/60 glass shadow-soft transition hover:shadow-elevated"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-t-3xl">
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  width={1024}
                  height={640}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/10 to-transparent" />
                <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/40 px-2.5 py-1 text-[10px] font-medium text-white backdrop-blur">
                  {p.category}
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-display text-lg font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-md bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-5 flex gap-2">
                  {p.demo ? (
                    <a
                      href={p.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-primary-foreground transition hover:opacity-90"
                      style={{ background: "var(--gradient-primary)" }}
                    >
                      <ExternalLink className="h-3.5 w-3.5" /> Live
                    </a>
                  ) : null}
                  {p.github ? (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-border/70 px-3 py-1.5 text-xs font-medium transition hover:bg-accent"
                    >
                      <Github className="h-3.5 w-3.5" /> Code
                    </a>
                  ) : null}
                </div>
              </div>
            </Tilt>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}

/* ---------------- Services + Achievements ---------------- */
const ICONS = { Code2, Layers, Palette, Sparkles, Gauge, Compass } as const;

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
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Tailwind",
    "MongoDB",
    "Python",
    "Figma",
    "OpenAI",
    "Vercel",
  ];
  return (
    <div className="py-14 border-y border-border/40 bg-background/40 backdrop-blur-sm">
      <Marquee items={items} />
    </div>
  );
}

/* ---------------- Contact + Footer ---------------- */
export function Contact() {
  const [sending, setSending] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      toast.success("Thanks! I'll get back to you within 24 hours.");
      (e.target as HTMLFormElement).reset();
    }, 700);
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
      sub="Open to internships, full-time placements, and freelance work."
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
            href={`mailto:${PROFILE.email}`}
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
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-border/60 glass p-8 shadow-soft"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Name" name="name" placeholder="Your name" required />
            <Field label="Email" name="email" type="email" placeholder="you@example.com" required />
          </div>
          <div className="mt-4">
            <Field label="Subject" name="subject" placeholder="What's it about?" required />
          </div>
          <div className="mt-4">
            <label className="text-xs font-medium text-muted-foreground">Message</label>
            <textarea
              name="message"
              required
              minLength={10}
              maxLength={1000}
              rows={5}
              placeholder="Tell me about the project, role, or idea…"
              className="mt-1.5 w-full rounded-xl border border-border/70 bg-background/40 px-4 py-3 text-sm outline-none transition focus:border-primary/60 focus:bg-background/70"
            />
          </div>
          <button
            type="submit"
            disabled={sending}
            className="mt-6 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-primary-foreground shadow-elevated transition hover:shadow-glow disabled:opacity-60"
            style={{ background: "var(--gradient-primary)" }}
          >
            {sending ? (
              "Sending…"
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
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        maxLength={255}
        className="mt-1.5 w-full rounded-xl border border-border/70 bg-background/40 px-4 py-3 text-sm outline-none transition focus:border-primary/60 focus:bg-background/70"
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
                href={`mailto:${PROFILE.email}`}
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
