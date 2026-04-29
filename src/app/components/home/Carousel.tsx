"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
interface CarouselProps {
  images?: string[];
  interval?: number;
}

export default function Carousel({ images = [], interval = 4000 }: CarouselProps) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const startX = useRef(0);

  const length = images.length;

  const nextSlide = () => {
    setCurrent((prev) => (prev === length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? length - 1 : prev - 1));
  };

  useEffect(() => {
    if (isPaused || length <= 1) return;
    const timer = setInterval(nextSlide, interval);
    return () => clearInterval(timer);
  }, [isPaused, current, length, interval]);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    const endX = e.changedTouches[0].clientX;
    const diff = startX.current - endX;

    if (diff > 50) nextSlide();     // swipe left
    if (diff < -50) prevSlide();    // swipe right
  };

  if (!images.length) return null;

  return (
    <div 
    className="relative w-full h-[20vh]  overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="flex h-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((img, index) => (
          <div key={index} className="min-w-full h-full">
            <img
              src={img}
              alt={`slide-${index}`}
              width={600}
              height={200}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>
      <h1 className="text-4xl font-bold text-center top-1/2 absolute left-5">Welcome to VictoryCloud</h1>
      <button
        onClick={prevSlide}
        className="btn btn-circle absolute left-5 top-1/2 -translate-y-1/2 z-10"
      >
        ❮
      </button>
      <button
        onClick={nextSlide}
        className="btn btn-circle absolute right-5 top-1/2 -translate-y-1/2 z-10"
      >
        ❯
      </button>

      {/* Indicators */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full ${
              current === index ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}