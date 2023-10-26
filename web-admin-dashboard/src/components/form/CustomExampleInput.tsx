import { CSSProperties, Dispatch, SetStateAction } from "react";
import "./Input.css";
import { Input } from "@/components/ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

interface Props {
  label: string;
  labelStyling?: CSSProperties;
  inputStyling?: CSSProperties;
  setData: Dispatch<SetStateAction<string>>;
  data: string;
}
function CustomExampleInput({
  label,
  labelStyling,
  inputStyling,
  setData,
  data,
}: Props) {
  return (
    <div className="flex items-center gap-[10px]">
      <Label className="w-[80px]" style={{ ...labelStyling }} htmlFor="string">
        {label}
      </Label>
      <Textarea
        style={{ minHeight: "40px" }}
        onChange={(e) => setData(e.target.value)}
        value={data}
      />
    </div>
  );
}

export default CustomExampleInput;
