import "./hero.css";

import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";

import type { HeroConfig } from "../../types/hero";
import { Button } from "../button";

export interface HeroProps {
  hero: HeroConfig;
}

function isVideo(src: string) {
  return /\.(mp4|webm|ogg)$/i.test(src);
}

export function Hero({ hero }: HeroProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  function goToNext() {
    setActiveIndex((current) => {
      const next = current + 1;
      if (next >= hero.slides.length) return hero.settings.loop ? 0 : current;
      return next;
    });
  }

  function goToPrevious() {
    setActiveIndex((current) => {
      const previous = current - 1;
      if (previous < 0) return hero.settings.loop ? hero.slides.length - 1 : current;
      return previous;
    });
  }

  useEffect(() => {
    if (!hero.settings.autoPlay || hero.slides.length <= 1) return;

    const timer = window.setInterval(goToNext, hero.settings.autoPlayInterval);
    return () => window.clearInterval(timer);
  }, [activeIndex, hero.settings.autoPlay, hero.settings.autoPlayInterval]);

  if (!hero.slides || hero.slides.length === 0) return null;

  return (
    <section className="paa-hero">
      {/* 🌌 HARDWARE-ACCELERATED CROSS-FADE STACK CONTAINER */}
      <div className="paa-hero__media-stack">
        {hero.slides.map((slide, index) => {
          const isActive = index === activeIndex;
          const mediaIsVideo = slide.mediaSrc ? isVideo(slide.mediaSrc) : false;

          return (
            <div
              key={slide.id}
              className={`paa-hero__media-layer ${isActive ? "is-active" : ""}`}
            >
              {mediaIsVideo ? (
                <video
                  src={slide.mediaSrc}
                  className="paa-hero__asset"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              ) : (
                <img
                  src={slide.mediaSrc}
                  alt={slide.mediaAlt}
                  className="paa-hero__asset"
                />
              )}
            </div>
          );
        })}
        <div className="paa-hero__overlay" />
      </div>

      {/* CONTENT CARD MATRIX (Maps only the current slide safely) */}
      {hero.slides.map((slide, index) => {
        const isActive = index === activeIndex;
        if (!isActive) return null;

        // 🧠 INTELLIGENT CTA VARIANT MATCHING
        // Automatically upgrades "Explore" or "Process" actions to use your ↗ signature button variant
        const isExploreVariant = 
          slide.cta.label.toLowerCase().includes("explore") || 
          slide.cta.label.toLowerCase().includes("process") ||
          slide.cta.label.toLowerCase().includes("our");

        return (
          <div key={slide.id} className="paa-hero__content-card">
            <p className="paa-hero__subtitle">{slide.subtitle}</p>
            <h1 className="paa-hero__title">{slide.title}</h1>
            <p className="paa-hero__description">{slide.description}</p>

            <div className="paa-hero__cta-wrapper">
              <Button
                variant={isExploreVariant ? "explore" : "explore"}
                size="md"
                icon={isExploreVariant ? <ArrowUpRight /> : <ArrowUpRight />}
                onClick={() => window.location.href = slide.cta.path}
              >
                {slide.cta.label}
              </Button>
            </div>
          </div>
        );
      })}

      {/* 🕹️ CONSOLIDATED INTERACTIVE CONTROL PANEL DECK */}
      <div className="paa-hero__controls-wrapper">
        {hero.settings.showIndicators && hero.slides.length > 1 && (
          <div className="paa-hero__indicators" role="tablist">
            {hero.slides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                className={index === activeIndex ? "is-active" : ""}
                onClick={() => setActiveIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
                role="tab"
                aria-selected={index === activeIndex}
              />
            ))}
          </div>
        )}

        {hero.settings.showNavigationArrows && hero.slides.length > 1 && (
          <div className="paa-hero__controls">
            <button type="button" onClick={goToPrevious} aria-label="Previous slide">
              <ChevronLeft />
            </button>
            <button type="button" onClick={goToNext} aria-label="Next slide">
              <ChevronRight />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}