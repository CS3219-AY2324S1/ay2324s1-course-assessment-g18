import React from "react";
import totalQns from "../../assets/dashboard/total-qns.svg";
import computer from "../../assets/dashboard/active-now.svg";
import members from "../../assets/dashboard/members.svg";
import FloatingDiv from "../auth/FloatingDiv";
import easy from "../../assets/auth/easy.png";
import hard from "../../assets/auth/hard.png";
import medium from "../../assets/auth/medium.png";
import blob1 from "../../assets/blobs/blob1.svg";
import blob2 from "../../assets/blobs/blob2.svg";
import blob3 from "../../assets/blobs/blob3.svg";
import blob4 from "../../assets/blobs/blob4.svg";
import { AnimatePresence, easeInOut, motion } from "framer-motion";

export default function SlideOne() {
  return (
    <div>
      <FloatingDiv
        delay={4}
        style={{ left: "30px", top: "130px", position: "absolute" }}
      >
        <img src={totalQns} className="w-[100px]" />
      </FloatingDiv>
      <FloatingDiv
        delay={2}
        style={{
          top: "30px",
          left: "150px",
          position: "absolute",
        }}
      >
        <img src={computer} className="w-[100px]" />
      </FloatingDiv>
      <FloatingDiv
        delay={2}
        style={{ right: "30px", top: "130px", position: "absolute" }}
      >
        <img src={members} className="w-[100px]" />
      </FloatingDiv>
      {/* easy medium hard */}
      <FloatingDiv
        delay={4}
        style={{ top: "280px", left: "80px", position: "absolute" }}
      >
        <img src={easy} className="w-[100px]" />
      </FloatingDiv>
      <FloatingDiv
        delay={6}
        style={{ top: "200px", left: "150px", position: "absolute" }}
      >
        <img src={medium} className="w-[100px]" />
      </FloatingDiv>
      <FloatingDiv
        delay={2}
        style={{ top: "280px", right: "80px", position: "absolute" }}
      >
        <img src={hard} className="w-[100px]" />
      </FloatingDiv>
      <div className="absolute text-center font-semibold p-2 bottom-10">
        Customize your learning experience by selecting the difficulty level you
        want to tackle.
      </div>
      <img src={blob1} className="absolute left-[80px] top-[50px] w-[20px]" />
      <img src={blob4} className="absolute left-[200px] top-[0px] w-[15px]" />
      <img src={blob2} className="absolute left-[200px] top-[150px] w-[20px]" />
      <img src={blob3} className="absolute left-[310px] top-[80px] w-[20px]" />
      <img src={blob4} className="absolute left-[50px] top-[250px] w-[15px]" />
    </div>
  );
}
