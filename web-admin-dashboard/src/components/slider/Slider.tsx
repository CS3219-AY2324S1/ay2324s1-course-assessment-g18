import { useState, useEffect } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import "./Slider.css";
import SlideOne from "./SlideOne";
import SlideTwo from "./SlideTwo";
import React from "react";
import { AnimatePresence, color, easeInOut, motion } from "framer-motion";

const Slider = () => {
  const [slide, setSlide] = useState(0);
  const timeoutRef = React.useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }
  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () => setSlide((prevIndex) => (prevIndex === 3 - 1 ? 0 : prevIndex + 1)),
      5000
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
          {slide === 0 && <SlideOne />}
          {slide === 1 && <SlideTwo />}
          {slide === 2 && <SlideTwo />}
        </div>
        <div className="flex gap-[10px]">
          <AnimatePresence>
            {[1, 2, 3].map((_, index) => {
              return (
                <motion.div
                  key={index}
                  className={`h-[10px] rounded-full`}
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
