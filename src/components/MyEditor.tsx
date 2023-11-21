import { useEffect } from "react";
import MonacoEditor from "react-monaco-editor";
import { getFunctions } from "../utils/getFunctions";
import { Button } from "./Sidebar/button";

interface EditorProps {
  width: number;
  height: number;
  allFiles: CodeFile[];
  activeFileIdx: number;
  updateActiveFile: (_: CodeFile) => void;
}

export function MyEditor({
  width,
  height,
  allFiles,
  activeFileIdx,
  updateActiveFile,
}: EditorProps) {
  const activeFile = allFiles[activeFileIdx];
  const updateCode = (changedCode: string) => {
    console.log(changedCode);
    const temp: CodeFile = {
      code: changedCode,
      fileName: activeFile.fileName,
      functions: activeFile.functions,
      language: activeFile.language,
    };
    updateActiveFile(temp);
  };

  const handleSave = () => {
    console.log(activeFile);
    const functions = getFunctions(activeFile);
    console.log(functions);
  };

  useEffect(() => {
    console.log(activeFile.code);
  }, [activeFile.code]);

  useEffect(() => {
    console.log(activeFileIdx);
    console.log(allFiles[activeFileIdx]);
  }, [allFiles, activeFileIdx]);

  return (
    <div className="col-span-8 h-[100dvh]">
      <div className="h-[5dvh] bg-slate-800 flex justify-start items-center px-20 gap-6">
        <Button size="sm" onClick={handleSave}>
          Save
        </Button>
        <div className="text-white">{activeFile.fileName} </div>
      </div>
      <MonacoEditor
        width={0.8 * width}
        height={0.95 * height}
        language="javascript"
        theme="vs-dark"
        value={activeFile.code}
        onChange={updateCode}
      />
    </div>
  );
}
