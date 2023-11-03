import React from "react";

import { motion } from "framer-motion";
interface Props {
  children: React.ReactNode;
  delay: number;
}
function FloatingDiv({ children, delay }: Props) {
  return (
    <motion.div
      animate={["initial"]}
      variants={{
        rotate: {
          rotate: [null, -5, 5, 0],
          transition: {
            // delay,
            duration: 10,
            // repeat: Infinity,
            // repeatDelay: 0.2,
            // repeatType: "reverse"
          },
        },
        initial: {
          y: [-10, 10],
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
