import { useState, useEffect } from "react";
import "./Slider.css";
import SlideOne from "./SlideOne";
import SlideTwo from "./SlideTwo";
import React from "react";
import { AnimatePresence, easeInOut, motion } from "framer-motion";
import SlideThree from "./SlideThree";

const Slider = () => {
  const [slide, setSlide] = useState(0);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const items = [<SlideOne />, <SlideTwo />, <SlideThree />];

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }
  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () => setSlide((prevIndex) => (prevIndex === 3 - 1 ? 0 : prevIndex + 1)),
      7000
    );

    return () => {
      resetTimeout();
    };
  }, [slide]);

  const variants = {
    active: { width: "10px", backgroundColor: "#5562eb" },
    inactive: { width: "30px", backgroundColor: "rgb(203 213 225)" },
  };

  return (
    <main className="flex items-center flex-col justify-center w-full h-full">
      <div className="flex items-center flex-col justify-center">
        <div className="relative w-[400px] h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              transition={{ duration: 0.6, ease: easeInOut }}
              style={{ height: "100%", width: "100%", position: "relative" }}
            >
              {items[slide]}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex gap-[10px]">
          <AnimatePresence>
            {[1, 2, 3].map((_, index) => {
              return (
                <motion.div
                  onClick={() => setSlide(index)}
                  key={index}
                  className={`h-[10px] rounded-full cursor-pointer`}
                  animate={index === slide ? "active" : "inactive"}
                  transition={{ duration: 1, ease: easeInOut }}
                  variants={variants}
                ></motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
};

export default Slider;
