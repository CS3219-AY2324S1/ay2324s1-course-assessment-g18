import React from "react";
import code from "../../assets/auth/code.jpg";

import { AnimatePresence, motion } from "framer-motion";
export default function SlideThree() {
  return (
    <div>
      <img src={code} className="w-[1000px]" />
      <div className="absolute text-center font-semibold p-2 bottom-10">
        Code in real-time with your partner and practice solving problems
        together, just like in a real interview.
      </div>
    </div>
  );
}
