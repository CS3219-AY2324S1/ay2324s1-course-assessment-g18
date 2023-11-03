import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AuthForm from "@/components/auth/AuthForm";
import logo from "../assets/logo.png";
import auth1 from "../assets/auth/authone.png";
import AuthRight from "../components/auth/AuthRight";
import useMouse from "@react-hook/mouse-position";

function Auth() {
  const tabs = ["Login", "Register"];
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const [cursorText, setCursorText] = useState("");
  const [cursorVariant, setCursorVariant] = useState("default");

  const ref = useRef(null);

  const useVariants = (ref: React.MutableRefObject<null>) => {
    const mouse = useMouse(ref, {
      enterDelay: 100,
      leaveDelay: 100,
    });

    let mouseXPosition = 0;
    let mouseYPosition = 0;
    if (mouse.clientX !== null) {
      mouseXPosition = mouse.clientX;
      console.log(mouseXPosition);
    }

    if (mouse.clientY !== null) {
      mouseYPosition = mouse.clientY;
    }

    return {
      default: {
        opacity: 1,
        height: 10,
        width: 10,
        borderRadius: "50%",
        fontSize: "20px",
        backgroundColor: "#13ACDE",
        x: mouseXPosition,
        y: mouseYPosition,
        transition: {
          type: "spring",
          mass: 0.6,
        },
      },
      disappear: {
        opacity: 0,
        // display: "none",
        transition: {
          // type: "spring",
          // mass: 0.6,
        },
      },
    };
  };

  const spring = {
    type: "spring",
    stiffness: 500,
    damping: 28,
  };
  function mouseEnter() {
    setCursorText("");
    setCursorVariant("disappear");
  }

  function mouseLeave() {
    setCursorText("");
    setCursorVariant("default");
  }

  const variants = useVariants(ref);
  return (
    <div>
      <div className="flex w-screen h-screen" ref={ref}>
        <AnimatePresence mode="wait">
          <motion.div
            variants={variants}
            className="circle"
            animate={cursorVariant}
            transition={spring}
          >
            <span className="cursorText">{cursorText}</span>
          </motion.div>
        </AnimatePresence>

        {/* left side */}
        <div
          className="flex w-6/12 h-full p-5 justify-center items-center"
          onMouseEnter={mouseEnter}
          onMouseLeave={mouseLeave}
        >
          {/* container for auth page */}
          <div className="flex flex-col p-10 items-center justify-center w-4/6 ">
            <img src={logo} className="w-12 m-5" />

            <main className="flex w-full h-4/6">
              <AnimatePresence mode="wait">
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.3 }}
                  style={{ width: "100%" }}
                >
                  {selectedTab && (
                    <AuthForm
                      mode={selectedTab}
                      setSelectedTab={setSelectedTab}
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </main>
          </div>
        </div>
        {/* auth page -right */}
        <div className="flex w-6/12 h-full bg-gradient-to-b from-[#F1F5FD] from-70% to-[#F6F1F2]">
          {/* <AuthRight /> */}
        </div>
      </div>
    </div>
  );
}
export default Auth;
