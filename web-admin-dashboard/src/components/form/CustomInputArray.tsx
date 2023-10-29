import React, { CSSProperties, Dispatch, SetStateAction } from "react";
import "./Input.css";
import { Input } from "@/components/ui/input";
import { Label } from "../ui/label";

interface Props {
  label: string;
  labelStyling?: CSSProperties;
  inputStyling?: CSSProperties;
  setData: Dispatch<SetStateAction<string[]>>;
  data: string[];
  delimiter: string; // Add a delimiter prop
}

function CustomInputArray({
  label,
  labelStyling,
  inputStyling,
  setData,
  data,
  delimiter = ",",
}: Props) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Split the input value into an array using the delimiter
    const newValue = e.target.value.split(delimiter);
    setData(newValue);
  };

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
        onChange={handleInputChange}
        value={data.join(delimiter)}
      />
    </div>
  );
}

export default CustomInputArray;
