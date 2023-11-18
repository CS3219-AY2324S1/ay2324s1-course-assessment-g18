import './CodeEditor.css';
import { useSyncedStore } from '@syncedstore/react';
import { store } from './store';
import { Editor } from '@monaco-editor/react';
import { useState } from 'react';
import { motion } from 'framer-motion';

interface Props {
  onChange: any;
  roomId: string;
  language: string;
  onCodeChange: (newCode: string) => void;
  codeHistory: string;
}

export default function HistorySessionCodeEditor({
  onChange,
  roomId,
  language,
  onCodeChange,
  codeHistory,
}: Props) {
  const state: any = useSyncedStore(store);

  console.log(codeHistory);

  const [value, setValue] = useState<string>(codeHistory);

  const handleEditorChange = (value: any) => {
    onCodeChange(value);
    setValue(value);
    state.codeTextStore[roomId] = value;
  };

  return (
    <div className="h-full border-gray-200">
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -10 }}
        transition={{ duration: 0.2 }}
        style={{ height: '100%', width: '100%' }}
      >
        <Editor
          language={language}
          value={value}
          onChange={handleEditorChange}
          className="editor"
          options={{
            minimap: {
              enabled: false,
            },
          }}
        />
      </motion.div>
    </div>
  );
}
