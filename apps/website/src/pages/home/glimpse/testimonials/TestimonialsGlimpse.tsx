import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import testimonialData from "../../../../data/testimonials.json";
import "./testimonials-glimpse.css";

interface ReviewItem {
  platform: string;
  ratingText: string;
  quote: string;
  author: string;
  designation: string;
}

interface TestimonialStructure {
  eyebrow: string;
  title: string;
  description: string;
  reviews: ReviewItem[];
}

const data = testimonialData as TestimonialStructure;

function GoldStarsRow() {
  return (
    <div className="paa-testimonial-card__stars">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className="paa-star-svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </div>
  );
}

export function TestimonialsGlimpse() {
  const { eyebrow, title, description, reviews } = data;
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const timerRef = useRef<number | null>(null);

  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const hasMultiple = reviews.length > 1;

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % reviews.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  useEffect(() => {
    if (!hasMultiple || isHovered) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [hasMultiple, isHovered, reviews.length]);

  function handleTouchStart(e: React.TouchEvent) {
    if (!hasMultiple) return;
    touchStartX.current = e.targetTouches[0].clientX;
    touchEndX.current = e.targetTouches[0].clientX;
  }

  function handleTouchMove(e: React.TouchEvent) {
    if (!hasMultiple) return;
    touchEndX.current = e.targetTouches[0].clientX;
  }

  function handleTouchEnd() {
    if (!hasMultiple) return;
    const threshold = 50;
    const diff = touchStartX.current - touchEndX.current;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) handleNext();
      else handlePrev();
    }
  }

  return (
    <section className="paa-reviews-glimpse">
      <div className="paa-reviews-glimpse__container">
        
        <header className="paa-reviews-glimpse__header">
          <span className="paa-reviews-glimpse__eyebrow">{eyebrow}</span>
          <h2 className="paa-reviews-glimpse__title">{title}</h2>
          <p className="paa-reviews-glimpse__desc">{description}</p>
        </header>

        <div 
          className="paa-reviews-glimpse__carousel-zone"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="paa-reviews-glimpse__slider-viewport">
            {reviews.map((review, index) => {
              const isActive = index === activeIndex;
              
              let cardSlideState = "is-next-review";
              if (isActive) cardSlideState = "is-active-review";
              else if (index < activeIndex) cardSlideState = "is-prev-review";

              return (
                <div 
                  key={index} 
                  className={`paa-testimonial-card ${cardSlideState}`}
                >
                  <div className="paa-testimonial-card__platform-row">
                    <div className="paa-testimonial-card__network-tag">
                      <span className="paa-testimonial-card__network-indicator" />
                      <span className="paa-testimonial-card__network-name">{review.platform}</span>
                    </div>
                    <div className="paa-testimonial-card__stars-wrapper">
                      <GoldStarsRow />
                      <span className="paa-testimonial-card__rating-sub">{review.ratingText}</span>
                    </div>
                  </div>
                  
                  <p className="paa-testimonial-card__quote-text">"{review.quote}"</p>
                  
                  <div className="paa-testimonial-card__profile-row">
                    <h4 className="paa-testimonial-card__author-name">{review.author}</h4>
                    <span className="paa-testimonial-card__author-title">{review.designation}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {hasMultiple && (
            <div className="paa-reviews-glimpse__controls">
              <span className="paa-reviews-glimpse__counter">
                {activeIndex + 1} <span className="paa-reviews-glimpse__counter-slash">/</span> {reviews.length}
              </span>
              <div className="paa-reviews-glimpse__btn-group">
                <button 
                  onClick={handlePrev} 
                  className="paa-reviews-nav-btn"
                  aria-label="Previous Trust Badge"
                >
                  <ChevronLeft size={18} />
                </button>
                <button 
                  onClick={handleNext} 
                  className="paa-reviews-nav-btn"
                  aria-label="Next Trust Badge"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}