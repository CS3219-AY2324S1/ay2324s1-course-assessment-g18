import Editor from '@monaco-editor/react';
// @ts-ignore
import { WebrtcProvider } from 'y-webrtc';
import { MonacoBinding } from 'y-monaco';
import { store } from './store';
import { useSyncedStore } from '@syncedstore/react';
import { useRef, useState } from 'react';
import './CodeEditor.css';
import { getYjsValue } from '@syncedstore/core';

interface Props {
  onChange: any;
  roomId: string;
  language: string;
  onCodeChange: (newCode: string) => void;
}

export default function CodeEditor({
  onChange,
  roomId,
  language,
  onCodeChange,
}: Props) {
  const state: any = useSyncedStore(store);
  const editorRef: any = useRef(null);

  const [value, setValue] = useState<string>(
    state.codeTextStore[roomId] || '// Your Code Here',
  );

  const handleEditorChange = (value: any) => {
    onCodeChange(value);
    setValue(value);
    state.codeTextStore[roomId] = value;
    onChange('code', value);
  };

  function handleEditorDidMount(editor: any, monaco: any) {
    editorRef.current = editor;
    // Initialize YJS
    const doc: any = getYjsValue(store);
    // Connect to peers (or start connection) with WebRTC
    const provider = new WebrtcProvider({ roomId }, doc); // room1, room2
    const type = doc.getText('monaco'); // doc { "monaco": "what our IDE is showing" }
    // Bind YJS to Monaco
    const binding = new MonacoBinding(
      type,
      editorRef.current.getModel(),
      new Set([editorRef.current]),
      provider.awareness,
    );
    console.log(provider.awareness);
  }

  return (
    <div className="h-full border-b-2 border-gray-200">
      <Editor
        language={language}
        value={value}
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        className="editor"
      />
    </div>
  );
}
