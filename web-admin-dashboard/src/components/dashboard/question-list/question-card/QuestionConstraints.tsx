interface Props {
  constraints: string;
}

function QuestionConstraints(constraints: Props) {
  if (constraints.constraints === undefined) {
    return;
  }
  return (
    <div>
      <div className="font-bold">Constraints:</div>
      <div className="whitespace-pre-line">{constraints.constraints}</div>
    </div>
  );
}

export default QuestionConstraints;
