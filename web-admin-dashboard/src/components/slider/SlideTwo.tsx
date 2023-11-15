import auth2 from "../../assets/auth/authtwo.png";
import auth1 from "../../assets/auth/authone.png";

import FloatingDiv from "../auth/FloatingDiv";
export default function SlideTwo() {
  return (
    <div>
      <FloatingDiv
        delay={0}
        style={{ position: "absolute", top: "20%", left: "0px" }}
      >
        <img src={auth1} className="md:w-[350px] w:[300px]" />
      </FloatingDiv>
      <FloatingDiv
        delay={0.8}
        style={{
          position: "absolute",
          top: "40%",
          left: "50px",
        }}
      >
        <img src={auth2} className="md:w-[500px]" />
      </FloatingDiv>
      <div className="absolute text-center font-semibold p-2 bottom-10 md:text-base text-sm">
        PeerPrep matches you with a partner based on your chosen preferences.
      </div>
    </div>
  );
}
