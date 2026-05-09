import { useCallback, useEffect, useRef, useState } from "react";

const slides = [
  { id: "announcement", label: "1K Stars" },
  { id: "join", label: "Únete" },
];

const QR_URL =
  "https://api.qrserver.com/v1/create-qr-code/?size=500x500&margin=12&data=https%3A%2F%2Fcrafters.chat";

export function HackDeck() {
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
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-primary/5 via-transparent to-transparent rotate-12 animate-pulse"
          style={{ animationDuration: "4s" }}
        />
        <div
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-primary/3 via-transparent to-transparent -rotate-12 animate-pulse"
          style={{ animationDuration: "6s" }}
        />
      </div>

      <div className="absolute top-0 left-0 right-0 h-1 bg-neutral-900 z-50">
        <div
          className="h-full bg-primary transition-all duration-300 ease-out"
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        />
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 z-50">
        {slides.map((slide, i) => (
          <button
            key={slide.id}
            onClick={() => goToSlide(i)}
            className={`
              group relative h-2 transition-all duration-300
              ${i === currentSlide ? "w-8 bg-primary" : "w-2 bg-neutral-700 hover:bg-neutral-500"}
            `}
            aria-label={`Ir a la slide ${i + 1}: ${slide.label}`}
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

      <div className="absolute bottom-8 right-8 text-neutral-600 text-sm hidden md:flex items-center gap-4 z-50">
        <span className="flex items-center gap-1">
          <kbd className="px-2 py-1 bg-neutral-900 border border-neutral-800 text-xs">
            ←
          </kbd>
          <kbd className="px-2 py-1 bg-neutral-900 border border-neutral-800 text-xs">
            →
          </kbd>
          <span className="ml-1">navegar</span>
        </span>
      </div>

      <div className="absolute bottom-8 right-8 text-neutral-600 text-xs flex md:hidden items-center gap-2 z-50">
        <svg
          className="size-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
          />
        </svg>
        <span>swipe</span>
      </div>

      <div className="absolute top-8 right-8 text-neutral-500 font-mono text-sm z-50">
        {String(currentSlide + 1).padStart(2, "0")} /{" "}
        {String(slides.length).padStart(2, "0")}
      </div>

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
        <span className="hidden md:inline text-sm">Volver</span>
      </a>

      <div className="relative w-full h-full">
        {currentSlide === 0 && (
          <div className={slideClasses}>
            <div className="text-center max-w-5xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 mb-8">
                <span className="size-2 bg-primary rounded-full animate-pulse" />
                <span className="text-sm text-primary font-medium">
                  Crafter Station · Open Source
                </span>
              </div>

              <div className="flex items-center justify-center gap-3 mb-6">
                <svg
                  className="size-10 md:size-14 text-primary"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <span className="text-2xl md:text-4xl font-mono text-neutral-400">
                  1,000
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl lg:text-9xl font-black text-white leading-[0.9] tracking-tighter">
                NUESTRO PRIMER
                <br />
                <span className="text-primary">REPO 1K ⭐</span>
              </h1>

              <p className="mt-8 text-xl md:text-2xl text-neutral-400 max-w-3xl mx-auto leading-relaxed">
                Acabamos de cruzar las{" "}
                <span className="text-white font-semibold">1,000 estrellas</span>{" "}
                en nuestro primer repositorio open source.
              </p>
              <p className="mt-4 text-lg md:text-xl text-neutral-500">
                Construyendo en público, desde LATAM para el mundo.
              </p>
            </div>
          </div>
        )}

        {currentSlide === 1 && (
          <div className={slideClasses}>
            <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
              <div className="text-center md:text-left">
                <p className="text-primary text-lg font-medium mb-4">
                  Únete a la comunidad
                </p>
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
                  crafters
                  <span className="text-primary">.chat</span>
                </h2>
                <p className="text-lg md:text-xl text-neutral-400 leading-relaxed mb-8">
                  Escanea el código y construye con nosotros. PRs, issues e
                  ideas — todo es bienvenido.
                </p>
                <div className="hidden md:flex flex-wrap gap-2">
                  <span className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                    Open Source
                  </span>
                  <span className="px-3 py-1 text-xs font-medium bg-neutral-900 text-neutral-400 border border-neutral-800">
                    Building in public
                  </span>
                  <span className="px-3 py-1 text-xs font-medium bg-neutral-900 text-neutral-400 border border-neutral-800">
                    LATAM → World
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-center gap-4">
                <div className="bg-white p-6 md:p-8 shadow-2xl shadow-primary/10">
                  <img
                    src={QR_URL}
                    alt="QR code para crafters.chat"
                    className="size-56 md:size-72"
                    width={500}
                    height={500}
                  />
                </div>
                <a
                  href="https://crafters.chat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm md:text-base text-neutral-400 hover:text-primary transition-colors"
                >
                  → crafters.chat
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      <button
        onClick={prevSlide}
        disabled={currentSlide === 0}
        className={`
          absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3
          transition-all z-50
          ${currentSlide === 0 ? "opacity-20 cursor-not-allowed" : "opacity-100 hover:bg-neutral-900 hover:text-primary"}
        `}
        aria-label="Slide anterior"
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
        aria-label="Siguiente slide"
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
