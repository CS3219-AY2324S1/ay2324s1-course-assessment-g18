import React, { Dispatch, SetStateAction } from "react";
import CodeEditor from "./code-editor/CodeEditor";
import Board from "./board/Board";

interface Props {
  mode: string;
  setSelectedTab: Dispatch<SetStateAction<string>>;
  roomId: string;
  language: string;
  onChange: any;
}
function SessionForm({
  mode,
  setSelectedTab,
  roomId,
  language,
  onChange,
}: Props) {
  return (
    <React.Fragment>
      <div className="h-full w-full">
        {mode === "Code" ? (
          <CodeEditor onChange={onChange} roomId={roomId} language={language} />
        ) : (
          <Board initialColor="#000000" initialSize="3" /> 
        )}
      </div>
    </React.Fragment>
  );
}

export default SessionForm;
