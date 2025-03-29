
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

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

  // Animation variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  // Track slide direction
  const [direction, setDirection] = useState(0);

  const handleNextSlide = () => {
    setDirection(1);
    goToNextSlide();
  };

  const handlePrevSlide = () => {
    setDirection(-1);
    goToPrevSlide();
  };

  return (
    <div className="relative w-full overflow-hidden">
      <AnimatePresence initial={false} mode="wait" custom={direction}>
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          className="w-full"
        >
          <div 
            className="h-[400px] md:h-[500px] lg:h-[600px] bg-cover bg-center flex items-center justify-center relative" 
            style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            <motion.div 
              className="max-w-3xl mx-auto px-8 text-center relative z-10"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <motion.h2 
                className="text-white text-3xl md:text-4xl font-bold mb-4 drop-shadow-lg"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                {slides[currentSlide].title}
              </motion.h2>
              <motion.p 
                className="text-white text-lg mb-6 drop-shadow-md"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                {slides[currentSlide].description}
              </motion.p>
              <motion.a
                href={slides[currentSlide].link}
                className="inline-block bg-beige-300 hover:bg-beige-400 text-foreground font-medium px-6 py-2.5 rounded-md transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.3 }}
              >
                {slides[currentSlide].buttonText}
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation buttons */}
      <motion.button
        onClick={handlePrevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-60 hover:bg-opacity-80 p-2 rounded-full shadow-md transition-colors"
        aria-label="Previous slide"
        whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.9)" }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronLeft className="h-6 w-6" />
      </motion.button>
      <motion.button
        onClick={handleNextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-60 hover:bg-opacity-80 p-2 rounded-full shadow-md transition-colors"
        aria-label="Next slide"
        whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.9)" }}
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
            whileHover={{ scale: 1.2, backgroundColor: "rgba(255,255,255,0.9)" }}
            animate={currentSlide === index ? { width: 24 } : { width: 12 }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
