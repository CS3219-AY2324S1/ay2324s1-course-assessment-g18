import React, { Dispatch, SetStateAction } from "react";
import CodeEditor from "./code-editor/CodeEditor";

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
          // white board
          ""
        )}
      </div>
    </React.Fragment>
  );
}

export default SessionForm;
