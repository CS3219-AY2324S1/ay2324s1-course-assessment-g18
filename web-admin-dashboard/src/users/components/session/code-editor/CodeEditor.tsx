import Editor from "@monaco-editor/react";
// @ts-ignore
import { WebrtcProvider } from "y-webrtc";
import { MonacoBinding } from "y-monaco";
import { store } from "./store";
import { useSyncedStore } from "@syncedstore/react";
import { useRef, useState } from "react";
import "./CodeEditor.css";
import { getYjsValue } from "@syncedstore/core";
import { motion } from "framer-motion";

interface Props {
  onChange: any;
  roomId: string;
  language: string;
}

export default function CodeEditor({ onChange, roomId, language }: Props) {
  const state: any = useSyncedStore(store);
  const editorRef: any = useRef(null);

  const [value, setValue] = useState<string>(
    state.codeTextStore[roomId] || "// Your Code Here"
  );

  const handleEditorChange = (value: any) => {
    setValue(value);
    state.codeTextStore[roomId] = value;
    onChange("code", value);
  };

  function handleEditorDidMount(editor: any, monaco: any) {
    editorRef.current = editor;
    // Initialize YJS
    const doc: any = getYjsValue(store);
    // Connect to peers (or start connection) with WebRTC
    const provider = new WebrtcProvider({ roomId }, doc); // room1, room2
    const type = doc.getText("monaco"); // doc { "monaco": "what our IDE is showing" }
    // Bind YJS to Monaco
    const binding = new MonacoBinding(
      type,
      editorRef.current.getModel(),
      new Set([editorRef.current]),
      provider.awareness
    );
    console.log(provider.awareness);
  }

  return (
    <div className="h-full border-gray-200">
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -10 }}
        transition={{ duration: 0.2 }}
        style={{ height: "100%", width: "100%" }}
      >
        <Editor
          language={language}
          value={value}
          onChange={handleEditorChange}
          onMount={handleEditorDidMount}
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
