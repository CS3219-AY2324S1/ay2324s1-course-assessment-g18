import { CSSProperties, Dispatch, SetStateAction, useState } from "react";
import "./Input.css";
import { Input } from "@/components/ui/input";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
interface Props {
  label: string;
  labelStyling?: CSSProperties;
  inputStyling?: CSSProperties;
  setData: Dispatch<SetStateAction<string>>;
  data: string;
}
function HiddenPwInput({
  label,
  labelStyling,
  inputStyling,
  setData,
  data,
}: Props) {
  const [isHidden, setIsHidden] = useState(true);
  return (
    <div className="input-div">
      <Label
        className="input-label"
        style={{ ...labelStyling }}
        htmlFor="string"
      >
        {label}
      </Label>
      <div className="relative flex items-center">
        <Input
          style={{ ...inputStyling }}
          className="pr-10"
          onChange={(e) => setData(e.target.value)}
          value={data}
          type={`${isHidden ? "password" : "text"}`}
        />
        <div
          className="w-10 absolute bg-white right-2 cursor-pointer flex items-center justify-center h-max"
          onClick={() => setIsHidden(!isHidden)}
        >
          {!isHidden ? (
            <AiFillEye size={20} />
          ) : (
            <AiFillEyeInvisible size={20} />
          )}
        </div>
      </div>
    </div>
  );
}

export default HiddenPwInput;
