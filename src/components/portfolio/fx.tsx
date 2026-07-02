import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from "react";
import { motion, useScroll, useSpring, useMotionValue, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

/* ---------------- Loading Screen ---------------- */
export function LoadingScreen() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setDone(true), 1400);
    return () => clearTimeout(t);
  }, []);
  return (
    <motion.div
      aria-hidden={done}
      initial={{ opacity: 1 }}
      animate={{ opacity: done ? 0 : 1 }}
      transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
      onAnimationComplete={() => done && document.body.style.removeProperty("overflow")}
      style={{ pointerEvents: done ? "none" : "auto" }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
    >
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div
        className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-3xl"
        style={{
          background: "radial-gradient(circle, oklch(0.65 0.23 260 / 0.4), transparent 70%)",
        }}
      />
      <div className="relative flex flex-col items-center gap-6">
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative grid h-16 w-16 place-items-center rounded-2xl shadow-glow"
          style={{ background: "var(--gradient-primary)" }}
        >
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-2xl border border-white/30 border-t-white"
          />
          <span className="font-display text-2xl font-bold text-white">A</span>
        </motion.div>
        <div className="flex flex-col items-center gap-2">
          <div className="font-serif-italic text-2xl">Anjani Singh</div>
          <div className="h-px w-32 overflow-hidden rounded-full bg-border">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="h-full w-full"
              style={{ background: "var(--gradient-primary)" }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ---------------- Scroll Progress Bar ---------------- */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  return (
    <motion.div
      style={{ scaleX, transformOrigin: "0% 50%", background: "var(--gradient-primary)" }}
      className="fixed left-0 right-0 top-0 z-[55] h-[2px] origin-left"
    />
  );
}

/* ---------------- Spotlight wrapper ---------------- */
export function Spotlight({
  children,
  className,
  as: As = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "section";
}) {
  const ref = useRef<HTMLDivElement>(null);
  function onMove(e: React.MouseEvent<HTMLElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  }
  const Comp = As as React.ElementType;
  return (
    <Comp
      ref={ref as React.Ref<HTMLDivElement>}
      onMouseMove={onMove}
      className={cn("spotlight", className)}
    >
      {children}
    </Comp>
  );
}

/* ---------------- 3D Tilt ---------------- */
export function Tilt({
  children,
  className,
  intensity = 8,
}: {
  children: ReactNode;
  className?: string;
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const sRx = useSpring(rx, { stiffness: 200, damping: 20 });
  const sRy = useSpring(ry, { stiffness: 200, damping: 20 });

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    ry.set(x * intensity);
    rx.set(-y * intensity);
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  }
  function reset() {
    rx.set(0);
    ry.set(0);
  }
  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ rotateX: sRx, rotateY: sRy, transformStyle: "preserve-3d", perspective: 1000 }}
      className={cn("spotlight gradient-border will-change-transform", className)}
    >
      <div style={{ transform: "translateZ(0)" }}>{children}</div>
    </motion.div>
  );
}

/* ---------------- Parallax wrapper ---------------- */
export function Parallax({
  children,
  offset = 60,
  className,
}: {
  children: ReactNode;
  offset?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

/* ---------------- Floating Tech Orbs (Hero ornament) ---------------- */
const TECH = [
  { label: "TS", style: { top: "8%", left: "6%" }, delay: 0 },
  { label: "React", style: { top: "18%", right: "10%" }, delay: 0.4 },
  { label: "Node", style: { bottom: "16%", left: "2%" }, delay: 0.8 },
  { label: "AI", style: { bottom: "8%", right: "6%" }, delay: 1.2 },
  { label: "Figma", style: { top: "48%", left: "-4%" }, delay: 1.6 },
  { label: "Next", style: { top: "42%", right: "-4%" }, delay: 2.0 },
];

export function FloatingTech() {
  return (
    <div className="pointer-events-none absolute inset-0 hidden md:block">
      {TECH.map((t) => (
        <motion.span
          key={t.label}
          style={t.style as CSSProperties}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1 + t.delay * 0.05 }}
          className="absolute"
        >
          <span
            className="animate-float-soft inline-flex items-center gap-1 rounded-full border border-border/60 glass-strong px-3 py-1.5 text-[10px] font-mono shadow-soft"
            style={{ animationDelay: `${t.delay}s` }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: "var(--gradient-primary)" }}
            />
            {t.label}
          </span>
        </motion.span>
      ))}
    </div>
  );
}

/* ---------------- Marquee (skills/logos band) ---------------- */
export function Marquee({ items, className }: { items: string[]; className?: string }) {
  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={{
        maskImage: "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)",
      }}
    >
      <motion.div
        className="flex w-max gap-12 whitespace-nowrap py-2"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {[...items, ...items].map((it, i) => (
          <span
            key={i}
            className="font-display text-2xl font-medium text-muted-foreground/60 md:text-3xl"
          >
            {it}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
