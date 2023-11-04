import React from "react";
import auth2 from "../../assets/auth/authtwo.png";
import auth1 from "../../assets/auth/authone.png";

import { AnimatePresence, motion } from "framer-motion";
export default function SlideTwo() {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -100, opacity: 0 }}
        transition={{ duration: 1 }}
        style={{ height: "100%", width: "100%" }}
      >
        <div>
          <img src={auth1} />
          <img src={auth2} />
          <div className="absolute text-center font-semibold p-2 bottom-10">
            PeerPrep matches you with a partner based on your chosen
            preferences.
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
