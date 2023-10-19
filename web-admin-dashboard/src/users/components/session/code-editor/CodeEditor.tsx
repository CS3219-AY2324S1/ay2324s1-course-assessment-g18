import { CodeEditorProps } from "./interface";
import Editor from "@monaco-editor/react";
import { store } from "./store";
import { useSyncedStore } from "@syncedstore/react";
import { useState } from "react";
import { Language } from "@/users/models/language.model";
import "./CodeEditor.css";
interface Props {
  roomId: string;
  language: Language;
}
export default function CodeEditor({ roomId, language }: Props) {
  const state = useSyncedStore(store);

  return (
    <div className="h-full">
      <Editor
        language={language}
        value={state.codeTextStore[roomId]}
        onChange={(value) => (state.codeTextStore[roomId] = value)}
        className="editor"
      />
    </div>
  );
}
