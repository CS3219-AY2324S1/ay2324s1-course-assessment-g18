import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Label } from "../ui/label";
import CustomExampleInput from "./CustomExampleInput";
import GoogleStorageFileUploader from "../dashboard/add-qns/GoogleStorageFileUploader";

interface Props {
  example: string[];
  setExample: Dispatch<SetStateAction<string[]>>;
  exampleNum: number;
}
function QnExampleInputs({ example, setExample, exampleNum }: Props) {
  const [input, setInput] = useState(example[0]);
  const [output, setOutput] = useState(example[1]);
  const [explanation, setExplanation] = useState(example[2]);
  const [url, setUrl] = useState(example[3]);

  const [imageDimensions, setImageDimensions] = useState<
    Array<{ width: number; height: number }>
  >([]);

  const handleImageLoad = (
    index: number,
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    const img = event.currentTarget;
    setImageDimensions((prevDimensions) => {
      const newDimensions = [...prevDimensions];
      newDimensions[index] = {
        width: img.naturalWidth,
        height: img.naturalHeight,
      };
      return newDimensions;
    });
  };
  useEffect(() => {
    setExample([input, output, explanation, url]);
  }, [input, output, explanation, url]);
  return (
    <div>
      <Label>Example {exampleNum}</Label>
      <div className="flex flex-col gap-[15px] mt-2">
        {url && (
          <img
            src={url}
            onLoad={(event) => handleImageLoad(exampleNum - 1, event)}
            style={{
              maxWidth: imageDimensions[exampleNum - 1]?.width,
              maxHeight: imageDimensions[exampleNum - 1]?.height,
              width: "100%",
              height: "auto",
            }}
            alt={`Example ${exampleNum}`}
          />
        )}
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
        <CustomExampleInput
          label="Explanation"
          data={explanation}
          setData={setExplanation}
          labelStyling={{ color: "gray" }}
        />
        <GoogleStorageFileUploader url={url} setUrl={setUrl} />
      </div>
    </div>
  );
}

export default QnExampleInputs;
