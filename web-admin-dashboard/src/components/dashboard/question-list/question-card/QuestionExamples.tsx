interface Props {
  examples: string[][];
}
function QuestionExamples({ examples }: Props) {
  console.log(examples);
  return (
    <div className="flex gap-[10px] flex-col">
      {examples.map((example, i) => (
        <div key={i}>
          <div className="font-bold">Example {i + 1}</div>
          <div className="flex flex-col gap-[15px]">
            <img src={example[3]} />
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
