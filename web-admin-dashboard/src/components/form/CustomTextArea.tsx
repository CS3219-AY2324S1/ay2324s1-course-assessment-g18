import { CSSProperties, Dispatch, SetStateAction } from "react";
import "./Input.css";
import { Input } from "@/components/ui/input";
import { Label } from "../ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  label: string;
  labelStyling?: CSSProperties;
  inputStyling?: CSSProperties;
  setData: Dispatch<SetStateAction<string>>;
  data: string;
}
function CustomTextArea({
  label,
  labelStyling,
  inputStyling,
  setData,
  data,
}: Props) {
  return (
    <div className="input-div">
      <Label className="input-label" style={{ ...labelStyling }}>
        {label}
      </Label>
      <Textarea
        style={{ minHeight: "80px" }}
        onChange={(e) => setData(e.target.value)}
        value={data}
      />
    </div>
  );
}

export default CustomTextArea;
