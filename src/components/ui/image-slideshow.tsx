"use client";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export function ImageSlideshow({ images, alt }: { images: string[], alt: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && images.length > 1) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, images.length]);

  useEffect(() => {
    // Touch/Mobile: Play when visible in viewport
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && window.matchMedia('(max-width: 768px)').matches) {
          setIsPlaying(true);
        } else if (window.matchMedia('(max-width: 768px)').matches) {
          setIsPlaying(false);
          setCurrentIndex(0);
        }
      });
    }, { threshold: 0.6 });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  if (!images || images.length === 0) return null;

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full overflow-hidden"
      onMouseEnter={() => { if (window.matchMedia('(min-width: 769px)').matches) setIsPlaying(true); }}
      onMouseLeave={() => { if (window.matchMedia('(min-width: 769px)').matches) { setIsPlaying(false); setCurrentIndex(0); } }}
    >
      <div 
        className="flex transition-transform duration-500 ease-in-out h-full w-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((src, i) => (
          <div key={i} className="w-full h-full shrink-0">
            <img src={src} alt={`${alt} - Image ${i + 1}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
      
      {/* Indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1 z-10">
          {images.map((_, i) => (
            <div key={i} className={cn("h-1 rounded-full transition-all duration-300 shadow-sm", i === currentIndex ? "w-3 bg-white" : "w-1.5 bg-white/50")} />
          ))}
        </div>
      )}
    </div>
  );
}
