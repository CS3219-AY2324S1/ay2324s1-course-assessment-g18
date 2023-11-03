import React, { useRef, useState } from "react";

import { motion } from "framer-motion";
import FloatingDiv from "./FloatingDiv";
import useMouse from "@react-hook/mouse-position";

function AuthRight() {
  return (
    <div className="flex w-full h-full">
      <div className="flex w-full h-full">
        <div className="flex w-full h-full" ref={ref}>
          <motion.div
            variants={variants}
            className="circle"
            animate={cursorVariant}
            transition={spring}
          >
            <span className="cursorText">{cursorText}</span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default AuthRight;
// PeerPrep is a technical technical interview preparation platform and
// peer matching system, where students can find peers to tackle
// whiteboard-style interview questions together.
