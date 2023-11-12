import { CSSProperties, Dispatch, SetStateAction } from "react";
import "./Input.css";
import { Input } from "@/components/ui/input";
import { Label } from "../ui/label";

interface Props {
  label: string;
  labelStyling?: CSSProperties;
  inputStyling?: CSSProperties;
  setData: Dispatch<SetStateAction<string>>;
  data: string;
}


function CustomPassword({
  label,
  labelStyling,
  inputStyling,
  setData,
  data,
}: Props) {
  return (
    <div className="input-div">
      <Label
        className="input-label"
        style={{ ...labelStyling }}
        htmlFor="string"
      >
        {label}
      </Label>
      <Input
        style={{ ...inputStyling }}
        onChange={(e) => setData(e.target.value)}
        value={data}
        type="password"
      />
    </div>
  );
}

export default CustomPassword;
