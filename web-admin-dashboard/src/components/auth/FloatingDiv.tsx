import React from "react";

import { MotionStyle, motion } from "framer-motion";
interface Props {
  children: React.ReactNode;
  delay: number;
  style?: MotionStyle;
}
function FloatingDiv({ children, delay, style }: Props) {
  return (
    <motion.div
      style={style}
      animate={["initial"]}
      variants={{
        rotate: {
          rotate: [null, -5, 5, 0],
          transition: {
            duration: 8,
            repeat: Infinity,
            repeatDelay: 0.2,
            repeatType: "reverse",
          },
        },
        initial: {
          y: [-6, 6],
          rotate: 0,
          transition: {
            delay,
            duration: 3,
            repeat: Infinity,
            // repeatDelay: 0.2,
            repeatType: "reverse",
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export default FloatingDiv;
