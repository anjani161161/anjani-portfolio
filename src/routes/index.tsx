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
      { title: "Anjani Singh — Full Stack Developer, AI & Design" },
      {
        name: "description",
        content:
          "Portfolio of Anjani Singh — Full Stack Developer, AI Enthusiast, Graphic Designer, and Director of Technical Services at Brndfy.",
      },
      { property: "og:title", content: "Anjani Singh — Full Stack Developer & Designer" },
      {
        property: "og:description",
        content:
          "Premium portfolio showcasing projects, services, and experience across web, AI, and design.",
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
