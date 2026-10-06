import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Moon, Sun, Menu, X, ArrowUp, Command, Sparkles } from "lucide-react";
import {
  Command as Cmd,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useTheme } from "./theme";
import { NAV_LINKS, PROFILE } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";

/* ---------------- Background FX ---------------- */
export function BackgroundFX() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{ background: "var(--gradient-page)" }}
    >
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div
        className="absolute -top-32 -left-32 h-[480px] w-[480px] rounded-full animate-blob opacity-60"
        style={{
          background: "radial-gradient(circle, oklch(0.65 0.23 260 / 0.35), transparent 70%)",
        }}
      />
      <div
        className="absolute top-1/3 -right-32 h-[520px] w-[520px] rounded-full animate-blob opacity-50"
        style={{
          background: "radial-gradient(circle, oklch(0.7 0.22 295 / 0.3), transparent 70%)",
          animationDelay: "-6s",
        }}
      />
      <div
        className="absolute bottom-0 left-1/3 h-[420px] w-[420px] rounded-full animate-blob opacity-40"
        style={{
          background: "radial-gradient(circle, oklch(0.6 0.22 220 / 0.3), transparent 70%)",
          animationDelay: "-12s",
        }}
      />
    </div>
  );
}

/* ---------------- Cursor Glow ---------------- */
export function CursorGlow() {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  useEffect(() => {
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed z-[60] hidden h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50 mix-blend-screen md:block"
      style={{
        left: pos.x,
        top: pos.y,
        background: "radial-gradient(circle, oklch(0.7 0.23 260 / 0.18), transparent 60%)",
        transition: "left 120ms ease-out, top 120ms ease-out",
      }}
    />
  );
}

/* ---------------- Theme Toggle ---------------- */
export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-card/40 backdrop-blur transition hover:bg-accent"
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={theme}
          initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.25 }}
          className="absolute"
        >
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

/* ---------------- Navbar ---------------- */
export function Navbar({ onOpenPalette }: { onOpenPalette: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
      const offsets = NAV_LINKS.map((l) => {
        const el = document.getElementById(l.id);
        if (!el) return { id: l.id, top: Infinity };
        const rect = el.getBoundingClientRect();
        return { id: l.id, top: Math.abs(rect.top - 120) };
      });
      offsets.sort((a, b) => a.top - b.top);
      setActive(offsets[0].id);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={cn("fixed inset-x-0 top-0 z-50 transition-all", scrolled ? "py-2" : "py-4")}
    >
      <div className="mx-auto max-w-6xl px-4">
        <div
          className={cn(
            "flex items-center justify-between rounded-full border border-border/40 px-4 py-2 transition-all",
            scrolled ? "glass-strong shadow-soft" : "bg-transparent",
          )}
        >
          <button
            onClick={() => go("home")}
            className="flex items-center gap-2 font-display text-sm font-semibold"
          >
            <span
              className="grid h-7 w-7 place-items-center rounded-lg shadow-glow"
              style={{ background: "var(--gradient-primary)" }}
            >
              <Sparkles className="h-3.5 w-3.5 text-white" />
            </span>
            <span>{PROFILE.shortName}</span>
          </button>

          <nav className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className={cn(
                  "relative rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                  active === l.id
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {active === l.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-accent"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative">{l.label}</span>
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenPalette}
              className="hidden items-center gap-2 rounded-full border border-border/60 bg-card/40 px-3 py-1.5 text-xs text-muted-foreground transition hover:bg-accent md:inline-flex"
            >
              <Command className="h-3.5 w-3.5" /> Search
              <kbd className="ml-2 rounded bg-muted px-1.5 py-0.5 text-[10px]">⌘K</kbd>
            </button>
            <ThemeToggle />
            <button
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/60 md:hidden"
              onClick={() => setOpen((o) => !o)}
              aria-label="Menu"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mt-2 rounded-2xl border border-border/40 glass-strong p-2 shadow-elevated md:hidden"
            >
              {NAV_LINKS.map((l) => (
                <button
                  key={l.id}
                  onClick={() => go(l.id)}
                  className={cn(
                    "block w-full rounded-xl px-3 py-2 text-left text-sm transition",
                    active === l.id
                      ? "bg-accent text-foreground"
                      : "text-muted-foreground hover:bg-accent/60",
                  )}
                >
                  {l.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}

/* ---------------- Back to top ---------------- */
export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-40 grid h-11 w-11 place-items-center rounded-full text-primary-foreground shadow-elevated"
          style={{ background: "var(--gradient-primary)" }}
        >
          <ArrowUp className="h-4 w-4" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/* ---------------- Command Palette ---------------- */
export function PortfolioCommandPalette({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(!open);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  const go = (id: string) => {
    setOpen(false);
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 80);
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Jump to a section or action…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigate">
          {NAV_LINKS.map((l) => (
            <CommandItem key={l.id} onSelect={() => go(l.id)}>
              {l.label}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Actions">
          <CommandItem
            onSelect={() => {
              window.location.href = `mailto:${PROFILE.targetEmail || PROFILE.email}`;
            }}
          >
            Email Anjani
          </CommandItem>
          <CommandItem onSelect={() => window.open(PROFILE.socials.github, "_blank")}>
            Open GitHub
          </CommandItem>
          <CommandItem onSelect={() => window.open(PROFILE.socials.linkedin, "_blank")}>
            Open LinkedIn
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
