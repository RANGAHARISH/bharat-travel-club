"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function ImageSlider({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  // Auto-play
  useEffect(() => {
    if (images.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [images.length]);

  return (
    <div className="relative w-full h-full group">
      <div
        style={{ backgroundImage: `url(${images[currentIndex]})` }}
        className="w-full h-full bg-center bg-cover transition-all duration-500"
      >
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)" }} />
      </div>
      
      {/* Left Arrow - Always visible on mobile, visible on hover for desktop */}
      {images.length > 1 && (
        <div 
          className="absolute top-[50%] -translate-x-0 translate-y-[-50%] left-2 sm:left-5 text-2xl rounded-full p-1.5 sm:p-2 bg-black/30 text-white cursor-pointer hover:bg-black/60 transition-all opacity-100 sm:opacity-0 sm:group-hover:opacity-100 z-10"
          onClick={prevSlide}
        >
          <ChevronLeft size={30} />
        </div>
      )}
      
      {/* Right Arrow - Always visible on mobile, visible on hover for desktop */}
      {images.length > 1 && (
        <div 
          className="absolute top-[50%] -translate-x-0 translate-y-[-50%] right-2 sm:right-5 text-2xl rounded-full p-1.5 sm:p-2 bg-black/30 text-white cursor-pointer hover:bg-black/60 transition-all opacity-100 sm:opacity-0 sm:group-hover:opacity-100 z-10"
          onClick={nextSlide}
        >
          <ChevronRight size={30} />
        </div>
      )}

      {/* Indicators */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
        {images.map((_, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => setCurrentIndex(slideIndex)}
            className={`transition-all h-2 rounded-full cursor-pointer shadow-sm ${
              currentIndex === slideIndex ? "bg-white w-4" : "bg-white/50 w-2"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
