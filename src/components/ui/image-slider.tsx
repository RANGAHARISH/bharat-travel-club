"use client";

import { useState } from "react";
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

  return (
    <div className="relative w-full h-full group">
      <div
        style={{ backgroundImage: `url(${images[currentIndex]})` }}
        className="w-full h-full bg-center bg-cover duration-500"
      >
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)" }} />
      </div>
      
      {/* Left Arrow */}
      {images.length > 1 && (
        <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer hover:bg-black/40 transition">
          <ChevronLeft onClick={prevSlide} size={30} />
        </div>
      )}
      
      {/* Right Arrow */}
      {images.length > 1 && (
        <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer hover:bg-black/40 transition">
          <ChevronRight onClick={nextSlide} size={30} />
        </div>
      )}

      {/* Indicators */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {images.map((_, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => setCurrentIndex(slideIndex)}
            className={`transition-all w-2 h-2 rounded-full cursor-pointer ${
              currentIndex === slideIndex ? "bg-white w-4" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
