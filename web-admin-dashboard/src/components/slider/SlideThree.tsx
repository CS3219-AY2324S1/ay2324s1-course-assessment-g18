import code from "../../assets/auth/code.png";
import FloatingDiv from "../auth/FloatingDiv";

export default function SlideThree() {
  return (
    <div>
      <FloatingDiv
        delay={0}
        style={{ position: "absolute", top: "20%", left: "0px" }}
      >
        <img src={code} className="w-[1000px]" />
      </FloatingDiv>
      <div className="absolute text-center font-semibold p-2 bottom-10 md:text-base text-sm">
        Code in real-time with your partner and practice solving problems
        together, just like in a real interview.
      </div>
    </div>
  );
}
