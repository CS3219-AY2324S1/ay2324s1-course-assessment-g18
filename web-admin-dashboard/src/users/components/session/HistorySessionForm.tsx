import React, { Dispatch, SetStateAction } from 'react';
import Board from './board/Board';
import HistorySessionCodeEditor from './code-editor/HistorySessionCodeEditor';

interface Props {
  mode: string;
  setSelectedTab: Dispatch<SetStateAction<string>>;
  roomId: string;
  language: string;
  onChange: any;
  onCodeChange: (newCode: string) => void;
  codeHistory: string;
}
function HistorySessionForm({
  mode,
  setSelectedTab,
  roomId,
  language,
  onChange,
  onCodeChange,
  codeHistory,
}: Props) {
  return (
    <React.Fragment>
      <div className="h-full w-full">
        {mode === 'Code' ? (
          <HistorySessionCodeEditor
            onChange={onChange}
            roomId={roomId}
            language={language}
            onCodeChange={onCodeChange}
            codeHistory={codeHistory}
          />
        ) : (
          <Board initialColor="#000000" initialSize="3" />
        )}
      </div>
    </React.Fragment>
  );
}

export default HistorySessionForm;
