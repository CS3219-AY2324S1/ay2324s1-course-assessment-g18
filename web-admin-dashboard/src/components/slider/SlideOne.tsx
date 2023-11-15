import totalQns from "../../assets/dashboard/total-qns.svg";
import computer from "../../assets/dashboard/active-now.svg";
import members from "../../assets/dashboard/members.svg";
import FloatingDiv from "../auth/FloatingDiv";
import easy from "../../assets/auth/easy.svg";
import hard from "../../assets/auth/hard.svg";
import medium from "../../assets/auth/medium.svg";
import blob1 from "../../assets/blobs/blob1.svg";
import blob2 from "../../assets/blobs/blob2.svg";
import blob3 from "../../assets/blobs/blob3.svg";
import blob4 from "../../assets/blobs/blob4.svg";
export default function SlideOne() {
  return (
    <div>
      <FloatingDiv
        delay={4}
        style={{ left: "10%", top: "30%", position: "absolute" }}
      >
        <img src={totalQns} className="md:w-[100px] w-[80px]" />
      </FloatingDiv>
      <FloatingDiv
        delay={2}
        style={{
          top: "15%",
          left: "35%",
          position: "absolute",
        }}
      >
        <img src={computer} className="md:w-[100px] w-[80px]" />
      </FloatingDiv>
      <FloatingDiv
        delay={2}
        style={{ right: "10%", top: "30%", position: "absolute" }}
      >
        <img src={members} className="md:w-[100px] w-[80px]" />
      </FloatingDiv>
      {/* easy medium hard */}
      <FloatingDiv
        delay={0.3}
        style={{ top: "55%", left: "15%", position: "absolute" }}
      >
        <img src={easy} className="md:w-[100px] w-[80px]" />
      </FloatingDiv>
      <FloatingDiv
        delay={0.8}
        style={{ top: "45%", left: "30%", position: "absolute" }}
      >
        <img src={medium} className="md:w-[100px] w-[90px]" />
      </FloatingDiv>
      <FloatingDiv
        delay={2}
        style={{ top: "55%", right: "15%", position: "absolute" }}
      >
        <img src={hard} className="md:w-[100px] w-[80px]" />
      </FloatingDiv>
      <div className="md:text-base text-sm absolute text-center font-semibold p-2 bottom-10">
        Customize your learning experience by selecting the difficulty level you
        want to tackle.
      </div>
      {/* left yellow */}
      <img
        src={blob1}
        className="absolute left-[22%] top-[14%] md:w-[20px] w-[15px]"
      />
      {/* top red */}
      <img
        src={blob4}
        className="absolute left-[40%] top-[10%] md:w-[15px] w-[10px]"
      />

      {/* yellow middle */}
      <img
        src={blob2}
        className="absolute left-[45%] top-[35%] md:w-[20px] w-[15px]"
      />
      {/* right green */}
      <img
        src={blob3}
        className="absolute left-[75%] top-[18%] md:w-[20px] w-[15px]"
      />
      {/* bottom red */}
      <img
        src={blob4}
        className="absolute left-[10%] top-[60%] md:w-[15px] w-[10px]"
      />
    </div>
  );
}
