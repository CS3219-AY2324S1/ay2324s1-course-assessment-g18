import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AuthForm from "@/components/auth/AuthForm";
import logo from "../assets/logo.png";
import Slider from "@/components/slider/Slider";

function Auth() {
  const tabs = ["Login", "Register"];
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  // const ref = useRef(null);

  // const useVariants = (ref: React.MutableRefObject<null>) => {
  //   const mouse = useMouse(ref, {
  //     enterDelay: 100,
  //     leaveDelay: 100,
  //   });

  //   let mouseXPosition = 0;
  //   let mouseYPosition = 0;
  //   if (mouse.clientX !== null) {
  //     mouseXPosition = mouse.clientX;
  //     console.log(mouseXPosition);
  //   }

  //   if (mouse.clientY !== null) {
  //     mouseYPosition = mouse.clientY;
  //   }

  //   return {
  //     default: {
  //       height: 15,
  //       width: 15,
  //       opacity: 0.6,
  //       backdropFilter: "blur(10px)",
  //       borderRadius: "50%",
  //       fontSize: "20px",
  //       backgroundColor: "white",
  //       x: mouseXPosition,
  //       y: mouseYPosition,
  //       transition: {
  //         type: "spring",
  //         mass: 0.6,
  //       },
  //     },
  //     disappear: {
  //       backgroundColor: "#ffffff",
  //       color: "#000",
  //       opacity: 0,
  //       x: mouseXPosition,
  //       y: mouseYPosition,
  //       transition: {
  //         type: "ease: [0.17, 0.67, 0.83, 0.67]",
  //         mass: 0.6,
  //       },
  //     },
  //   };
  // };

  // const spring = {
  //   type: "spring",
  //   stiffness: 500,
  //   damping: 28,
  // };

  // const variants = useVariants(ref);
  return (
    <div>
      <div className="flex w-screen h-screen">
        {/* <div className="flex w-screen h-screen" ref={ref}> */}

        {/* <AnimatePresence mode="wait">
          <motion.div
            variants={variants}
            className="fixed z-50 flex top-0 left-0 items-center justify-center h-[10px] w-[10px] rounded-[200px] bg-[#5562eb]"
            animate={cursorVariant}
            transition={spring}
          />
        </AnimatePresence> */}

        {/* left side */}
        <div className="flex w-6/12 h-full p-5 justify-center items-center  z-[1]">
          {/* container for auth page */}
          <div className="flex flex-col p-10 items-center justify-center w-4/6 z-[0]">
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
          {/* <SlideOne /> */}
          <Slider />
        </div>
      </div>
    </div>
  );
}
export default Auth;
