import { useCallback, useEffect, useRef, useState } from "react";
import { WorldMap } from "./WorldMap";

interface TeamMember {
  username: string;
  name: string;
  position: string;
  photoUrl: string;
}

interface Project {
  name: string;
  description: string;
  href: string;
  tags: string[];
  stars: string;
}

interface PresentationDeckProps {
  teamMembers: TeamMember[];
  projects: Project[];
}

const slides = [
  { id: "intro", label: "Intro" },
  { id: "who", label: "Who" },
  { id: "values", label: "Values" },
  { id: "how", label: "How" },
  { id: "where", label: "Where" },
  { id: "projects", label: "Projects" },
  { id: "team", label: "Team" },
  { id: "connect", label: "Connect" },
];

export function PresentationDeck({
  teamMembers,
  projects,
}: PresentationDeckProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const goToSlide = useCallback(
    (index: number, dir?: "next" | "prev") => {
      if (isTransitioning || index === currentSlide) return;
      if (index < 0 || index >= slides.length) return;

      setDirection(dir || (index > currentSlide ? "next" : "prev"));
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide(index);
        setIsTransitioning(false);
      }, 300);
    },
    [currentSlide, isTransitioning]
  );

  const nextSlide = useCallback(() => {
    if (currentSlide < slides.length - 1) {
      goToSlide(currentSlide + 1, "next");
    }
  }, [currentSlide, goToSlide]);

  const prevSlide = useCallback(() => {
    if (currentSlide > 0) {
      goToSlide(currentSlide - 1, "prev");
    }
  }, [currentSlide, goToSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " ") {
        e.preventDefault();
        nextSlide();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        prevSlide();
      } else if (e.key === "Home") {
        e.preventDefault();
        goToSlide(0);
      } else if (e.key === "End") {
        e.preventDefault();
        goToSlide(slides.length - 1);
      } else if (e.key >= "1" && e.key <= "9") {
        const index = parseInt(e.key) - 1;
        if (index < slides.length) {
          e.preventDefault();
          goToSlide(index);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide, goToSlide]);

  // Touch/swipe navigation
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (touchStartX.current === null || touchStartY.current === null) return;

      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const deltaX = touchEndX - touchStartX.current;
      const deltaY = touchEndY - touchStartY.current;

      // Only trigger if horizontal swipe is more significant than vertical
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
        if (deltaX < 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }

      touchStartX.current = null;
      touchStartY.current = null;
    };

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [nextSlide, prevSlide]);

  const slideClasses = `
    absolute inset-0 flex items-center justify-center p-8 md:p-16
    transition-all duration-500 ease-out
    ${isTransitioning ? (direction === "next" ? "opacity-0 translate-x-12" : "opacity-0 -translate-x-12") : "opacity-100 translate-x-0"}
  `;

  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      {/* Subtle animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-primary/5 via-transparent to-transparent rotate-12 animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-primary/3 via-transparent to-transparent -rotate-12 animate-pulse" style={{ animationDuration: '6s' }} />
      </div>

      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-neutral-900 z-50">
        <div
          className="h-full bg-primary transition-all duration-300 ease-out"
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        />
      </div>

      {/* Slide navigation dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 z-50">
        {slides.map((slide, i) => (
          <button
            key={slide.id}
            onClick={() => goToSlide(i)}
            className={`
              group relative h-2 transition-all duration-300
              ${i === currentSlide ? "w-8 bg-primary" : "w-2 bg-neutral-700 hover:bg-neutral-500"}
            `}
            aria-label={`Go to slide ${i + 1}: ${slide.label}`}
          >
            <span
              className={`
              absolute -top-8 left-1/2 -translate-x-1/2 text-xs whitespace-nowrap
              transition-opacity duration-200
              ${i === currentSlide ? "opacity-100 text-primary" : "opacity-0 group-hover:opacity-100 text-neutral-400"}
            `}
            >
              {slide.label}
            </span>
          </button>
        ))}
      </div>

      {/* Keyboard hint - Desktop */}
      <div className="absolute bottom-8 right-8 text-neutral-600 text-sm hidden md:flex items-center gap-4 z-50">
        <span className="flex items-center gap-1">
          <kbd className="px-2 py-1 bg-neutral-900 border border-neutral-800 text-xs">
            ←
          </kbd>
          <kbd className="px-2 py-1 bg-neutral-900 border border-neutral-800 text-xs">
            →
          </kbd>
          <span className="ml-1">navigate</span>
        </span>
      </div>

      {/* Swipe hint - Mobile */}
      <div className="absolute bottom-8 right-8 text-neutral-600 text-xs flex md:hidden items-center gap-2 z-50">
        <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
        </svg>
        <span>swipe</span>
      </div>

      {/* Slide counter */}
      <div className="absolute top-8 right-8 text-neutral-500 font-mono text-sm z-50">
        {String(currentSlide + 1).padStart(2, "0")} /{" "}
        {String(slides.length).padStart(2, "0")}
      </div>

      {/* Back to home */}
      <a
        href="/"
        className="absolute top-8 left-8 text-neutral-500 hover:text-primary transition-colors z-50 flex items-center gap-2"
      >
        <svg
          className="size-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
          />
        </svg>
        <span className="hidden md:inline text-sm">Back</span>
      </a>

      {/* Slides container */}
      <div className="relative w-full h-full">
        {/* Slide 1: Intro */}
        {currentSlide === 0 && (
          <div className={slideClasses}>
            <div className="text-center max-w-5xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 mb-8">
                <span className="size-2 bg-primary rounded-full animate-pulse" />
                <span className="text-sm text-primary font-medium">
                  Next.js Hackathon Winners 2025
                </span>
              </div>
              <h1 className="text-6xl md:text-8xl lg:text-[12rem] font-black text-white leading-[0.9] tracking-tighter">
                CRAFTER
                <br />
                <span className="text-primary">STATION</span>
              </h1>
              <p className="mt-8 text-xl md:text-3xl text-neutral-400">
                Building developer tools in public
              </p>
            </div>
          </div>
        )}

        {/* Slide 2: Who we are */}
        {currentSlide === 1 && (
          <div className={slideClasses}>
            <div className="max-w-4xl">
              <p className="text-primary text-lg font-medium mb-4">
                Who we are
              </p>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-8">
                A team of builders who believe in the{" "}
                <span className="text-primary">power of community</span>
              </h2>
              <p className="text-xl md:text-2xl text-neutral-400 leading-relaxed">
                We're engineers, designers, and creators united by a shared
                passion: making development better through open source.
              </p>
            </div>
          </div>
        )}

        {/* Slide 3: Values */}
        {currentSlide === 2 && (
          <div className={slideClasses}>
            <div className="max-w-5xl w-full">
              <p className="text-primary text-lg font-medium mb-8 text-center">
                Our values
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-8 bg-neutral-950 border border-neutral-800">
                  <div className="size-16 bg-primary/10 flex items-center justify-center mb-6">
                    <svg
                      className="size-8 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    Open by Default
                  </h3>
                  <p className="text-neutral-400">
                    All our code is open source. No exceptions.
                  </p>
                </div>
                <div className="p-8 bg-neutral-950 border border-neutral-800">
                  <div className="size-16 bg-primary/10 flex items-center justify-center mb-6">
                    <svg
                      className="size-8 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    Community First
                  </h3>
                  <p className="text-neutral-400">
                    Built with feedback from real developers.
                  </p>
                </div>
                <div className="p-8 bg-neutral-950 border border-neutral-800">
                  <div className="size-16 bg-primary/10 flex items-center justify-center mb-6">
                    <svg
                      className="size-8 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    Global Impact
                  </h3>
                  <p className="text-neutral-400">
                    From Peru to the world. Building globally.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Slide 4: How we operate */}
        {currentSlide === 3 && (
          <div className={slideClasses}>
            <div className="max-w-4xl">
              <p className="text-primary text-lg font-medium mb-4">
                How we operate
              </p>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-12">
                Building in <span className="text-primary">public</span>
              </h2>
              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <div className="size-12 bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-primary font-bold text-xl">01</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Every line of code is public
                    </h3>
                    <p className="text-neutral-400">
                      Transparency drives accountability and quality.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="size-12 bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-primary font-bold text-xl">02</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Ship fast, iterate faster
                    </h3>
                    <p className="text-neutral-400">
                      We believe in rapid iteration with community feedback.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="size-12 bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-primary font-bold text-xl">03</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Community-driven development
                    </h3>
                    <p className="text-neutral-400">
                      PRs welcome. Issues welcome. Ideas welcome.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Slide 5: Where we are */}
        {currentSlide === 4 && (
          <div className={slideClasses}>
            <div className="max-w-6xl w-full">
              <p className="text-primary text-lg font-medium mb-4 text-center">
                Where we are
              </p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 text-center">
                Born in <span className="text-primary">Peru</span>, now global
              </h2>
              <p className="text-lg md:text-xl text-neutral-400 mb-8 text-center">
                A distributed community across LATAM & Europe
              </p>

              {/* Real Map visualization */}
              <div className="relative w-full max-w-4xl mx-auto aspect-[2/1] bg-neutral-950/50 border border-neutral-800 overflow-hidden rounded-lg">
                <WorldMap
                  locations={[
                    { city: "Lima", country: "Peru", countryCode: "604", lat: -12.0464, lng: -77.0428, isHQ: true },
                    { city: "Arequipa", country: "Peru", countryCode: "604", lat: -16.409, lng: -71.537 },
                    { city: "Bogotá", country: "Colombia", countryCode: "170", lat: 4.711, lng: -74.0721 },
                    { city: "Medellín", country: "Colombia", countryCode: "170", lat: 6.2442, lng: -75.5812 },
                    { city: "São Paulo", country: "Brazil", countryCode: "076", lat: -23.5505, lng: -46.6333 },
                    { city: "Madrid", country: "Spain", countryCode: "724", lat: 40.4168, lng: -3.7038 },
                  ]}
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* City list */}
              <div className="flex flex-wrap justify-center gap-4 md:gap-8 mt-8">
                {[
                  { city: "Lima", country: "Peru", flag: "🇵🇪", isHQ: true },
                  { city: "Arequipa", country: "Peru", flag: "🇵🇪" },
                  { city: "Bogotá", country: "Colombia", flag: "🇨🇴" },
                  { city: "Medellín", country: "Colombia", flag: "🇨🇴" },
                  { city: "São Paulo", country: "Brazil", flag: "🇧🇷" },
                  { city: "Madrid", country: "Spain", flag: "🇪🇸" },
                ].map((loc) => (
                  <div key={loc.city} className={`flex items-center gap-2 ${loc.isHQ ? 'text-primary' : 'text-neutral-400'}`}>
                    <span className="text-lg">{loc.flag}</span>
                    <span className={`text-sm ${loc.isHQ ? 'font-semibold' : ''}`}>
                      {loc.city}
                      {loc.isHQ && <span className="text-xs ml-1 opacity-70">(HQ)</span>}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Slide 6: Projects */}
        {currentSlide === 5 && (
          <div className={slideClasses}>
            <div className="max-w-5xl w-full">
              <p className="text-primary text-lg font-medium mb-4 text-center">
                What we've built
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-12">
                Our Projects
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {projects.slice(0, 4).map((project) => (
                  <div
                    key={project.name}
                    className="p-6 bg-neutral-950 border border-neutral-800 hover:border-primary/50 transition-colors"
                  >
                    <span className="px-2 py-1 text-xs font-medium bg-primary/20 text-primary mb-4 inline-block">
                      {project.stars}
                    </span>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                      {project.name}
                    </h3>
                    <p className="text-sm text-neutral-400">
                      {project.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Slide 7: Team */}
        {currentSlide === 6 && (
          <div className={slideClasses}>
            <div className="max-w-5xl w-full">
              <p className="text-primary text-lg font-medium mb-4 text-center">
                The humans behind the code
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-12">
                Meet Our Team
              </h2>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-4 md:gap-6">
                {teamMembers.slice(0, 10).map((member) => (
                  <div key={member.username} className="text-center group">
                    <div className="aspect-square overflow-hidden border border-neutral-800 mb-3">
                      <img
                        src={member.photoUrl}
                        alt={member.name}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                      />
                    </div>
                    <p className="font-semibold text-white text-sm md:text-base truncate">
                      {member.name.split(" ")[0]}
                    </p>
                    <p className="text-xs text-neutral-500 truncate">
                      {member.position}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Slide 8: Connect */}
        {currentSlide === 7 && (
          <div className={slideClasses}>
            <div className="max-w-4xl text-center">
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-8">
                Let's <span className="text-primary">connect</span>
              </h2>
              <p className="text-xl md:text-2xl text-neutral-400 mb-12">
                Join our community and build with us
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="https://github.com/crafter-station"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-6 py-4 bg-white text-black font-semibold hover:bg-primary transition-colors"
                >
                  <svg className="size-6" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                  GitHub
                </a>
                <a
                  href="https://discord.gg/QvsS4jNpKa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-6 py-4 bg-[#5865F2] text-white font-semibold hover:bg-[#4752C4] transition-colors"
                >
                  <svg className="size-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.118.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                  </svg>
                  Discord
                </a>
                <a
                  href="https://x.com/CrafterStation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-6 py-4 border border-neutral-700 text-white font-semibold hover:border-primary hover:text-primary transition-colors"
                >
                  <svg className="size-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  X / Twitter
                </a>
              </div>
              <div className="mt-12 pt-8 border-t border-neutral-800">
                <a
                  href="https://railly.dev/meet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Book a call with us →
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        disabled={currentSlide === 0}
        className={`
          absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3
          transition-all z-50
          ${currentSlide === 0 ? "opacity-20 cursor-not-allowed" : "opacity-100 hover:bg-neutral-900 hover:text-primary"}
        `}
        aria-label="Previous slide"
      >
        <svg
          className="size-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        disabled={currentSlide === slides.length - 1}
        className={`
          absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3
          transition-all z-50
          ${currentSlide === slides.length - 1 ? "opacity-20 cursor-not-allowed" : "opacity-100 hover:bg-neutral-900 hover:text-primary"}
        `}
        aria-label="Next slide"
      >
        <svg
          className="size-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>
    </div>
  );
}
