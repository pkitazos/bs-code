import MonacoEditor from "react-monaco-editor";
import { EditorHeader } from "./Header";
import { useState } from "react";

export function MyEditor() {
  const [fileName, setFileName] = useState("untitled");

  return (
    <div className="col-span-8">
      <EditorHeader value={fileName} setValue={setFileName} />
      <MonacoEditor
        className="outline outline-orange-500 h-full w-full flex"
        width={2000}
        language="python"
      />
    </div>
  );
}
