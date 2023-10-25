import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import CustomTextArea from "./CustomTextArea";
import { Label } from "../ui/label";
import CustomExampleInput from "./CustomExampleInput";

interface Props {
  example: [string, string];
  setExample: Dispatch<SetStateAction<[string, string]>>;
  exampleNum: number;
}
function QnExampleInputs({ example, setExample, exampleNum }: Props) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  useEffect(() => {
    setExample([input, output]);
  }, [input, output]);
  return (
    <div>
      <Label>Example {exampleNum}</Label>
      <div className="flex flex-col gap-[10px]">
        <CustomExampleInput
          label="Input"
          data={input}
          setData={setInput}
          labelStyling={{ color: "gray" }}
        />
        <CustomExampleInput
          label="Output"
          data={output}
          setData={setOutput}
          labelStyling={{ color: "gray" }}
        />
      </div>
    </div>
  );
}

export default QnExampleInputs;