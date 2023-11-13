import { Language } from '@/users/models/language.model';
import './CodeEditor.css';
import { useSyncedStore } from '@syncedstore/react';
import { store } from './store';
import { Editor } from '@monaco-editor/react';

interface Props {
  roomId: string;
  language: Language;
  onCodeChange: (newCode: string) => void;
  codeHistory: string;
}

export default function HistorySessionCodeEditor({
  roomId,
  language,
  onCodeChange,
  codeHistory,
}: Props) {
  const state = useSyncedStore(store);

  return (
    <div className="h-full">
      <Editor
        language={language}
        value={codeHistory}
        onChange={(value) => {
          onCodeChange(value);
          state.codeTextStore[roomId]= value;
        }}
        className="editor"
      />
    </div>
  );
}
