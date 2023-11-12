import React, { useState } from "react";

interface Props {
  examples: Array<Array<string>>;
}

function QuestionExamples({ examples }: Props) {
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

  return (
    <div className="flex gap-[10px] flex-col">
      {examples.map((example, i) => (
        <div key={i}>
          <div className="font-bold">Example {i + 1}</div>
          <div className="flex flex-col gap-[15px]">
            {example[3] && (
              <img
                src={example[3]}
                onLoad={(event) => handleImageLoad(i, event)}
                style={{
                  maxWidth: imageDimensions[i]?.width,
                  maxHeight: imageDimensions[i]?.height,
                  width: "100%",
                  height: "auto",
                }}
                alt={`Example ${i + 1}`}
              />
            )}
            <div>
              Input: <code className="text-slate-500">{example[0]}</code>
            </div>
            <div>
              Output: <code className="text-slate-500">{example[1]}</code>
            </div>
            <div>
              Explanation: <code className="text-slate-500">{example[2]}</code>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default QuestionExamples;
