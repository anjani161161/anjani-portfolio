import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/portfolio/theme";
import {
  BackgroundFX,
  CursorGlow,
  Navbar,
  BackToTop,
  PortfolioCommandPalette,
} from "@/components/portfolio/chrome";
import {
  Hero,
  About,
  Skills,
  Experience,
  Projects,
  Services,
  Contact,
  Footer,
  MarqueeBand,
} from "@/components/portfolio/sections";
import { LoadingScreen, ScrollProgress } from "@/components/portfolio/fx";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Anjani Singh — Software Engineer, Quantum Tech & Machine Learning" },
      {
        name: "description",
        content:
          "Portfolio of Anjani Singh — Software Engineer, Quantum & Machine Learning Developer (R&D at Quantum Insight Labs, IIT Delhi), and Full Stack Builder.",
      },
      {
        property: "og:title",
        content: "Anjani Singh — Software Engineer, Quantum Tech & Machine Learning",
      },
      {
        property: "og:description",
        content:
          "Portfolio showcasing engineering and research projects across quantum technology, machine learning, and scalable web software.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [paletteOpen, setPaletteOpen] = useState(false);
  return (
    <ThemeProvider>
      <LoadingScreen />
      <ScrollProgress />
      <div className="relative min-h-screen">
        <BackgroundFX />
        <CursorGlow />
        <Navbar onOpenPalette={() => setPaletteOpen(true)} />
        <main>
          <Hero />
          <MarqueeBand />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Services />
          <Contact />
        </main>
        <Footer />
        <BackToTop />
        <PortfolioCommandPalette open={paletteOpen} setOpen={setPaletteOpen} />
        <Toaster position="bottom-right" />
      </div>
    </ThemeProvider>
  );
}
