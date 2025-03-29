
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

interface Slide {
  image: string;
  title: string;
  description: string;
  buttonText: string;
  link: string;
}

interface CarouselProps {
  slides: Slide[];
  autoPlay?: boolean;
  interval?: number;
}

const Carousel: React.FC<CarouselProps> = ({
  slides,
  autoPlay = true,
  interval = 5000,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const location = useLocation();

  // Reset to first slide when route changes
  useEffect(() => {
    setCurrentSlide(0);
  }, [location.pathname]);

  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval, slides.length]);

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <motion.div 
            key={index} 
            className="w-full flex-shrink-0 relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div 
              className="h-[400px] md:h-[500px] bg-cover bg-center flex items-center justify-center" 
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>
              <motion.div 
                className="max-w-3xl mx-auto px-8 text-center relative z-10"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <h2 className="text-white text-3xl md:text-4xl font-bold mb-4 drop-shadow-lg">
                  {slide.title}
                </h2>
                <p className="text-white text-lg mb-6 drop-shadow-md">
                  {slide.description}
                </p>
                <motion.a
                  href={slide.link}
                  className="inline-block bg-beige-300 hover:bg-beige-400 text-foreground font-medium px-6 py-2.5 rounded-md transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {slide.buttonText}
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Navigation buttons */}
      <motion.button
        onClick={goToPrevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-60 hover:bg-opacity-80 p-2 rounded-full shadow-md transition-colors"
        aria-label="Previous slide"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronLeft className="h-6 w-6" />
      </motion.button>
      <motion.button
        onClick={goToNextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-60 hover:bg-opacity-80 p-2 rounded-full shadow-md transition-colors"
        aria-label="Next slide"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronRight className="h-6 w-6" />
      </motion.button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              "w-3 h-3 rounded-full transition-all",
              currentSlide === index
                ? "bg-white w-6"
                : "bg-white bg-opacity-50 hover:bg-opacity-75"
            )}
            aria-label={`Go to slide ${index + 1}`}
            whileHover={{ scale: 1.2 }}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
