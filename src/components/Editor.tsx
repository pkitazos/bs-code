import { X } from "lucide-react";
import { useState } from "react";
import MonacoEditor, {
  type EditorConstructionOptions,
} from "react-monaco-editor";
import { getFunctions } from "../utils/getFunctions";
import { Button } from "./Button";

interface EditorProps {
  width: number;
  height: number;
  allFiles: CodeFile[];
  activeFileIdx: number;
  setActiveFileIdx: React.Dispatch<React.SetStateAction<number>>;
  setAllFiles: React.Dispatch<React.SetStateAction<CodeFile[]>>;
}

export function Editor({
  width,
  height,
  allFiles,
  activeFileIdx,
  setActiveFileIdx,
  setAllFiles,
}: EditorProps) {
  const [currentCode, setCurrentCode] = useState("");
  const activeFile = allFiles[activeFileIdx];

  const updateCode = (changedCode: string) => {
    setCurrentCode(changedCode);
  };

  const handleSave = () => {
    const parsedFunctions = getFunctions(currentCode, activeFile.language);

    const changedFile: CodeFile = {
      code: currentCode,
      fileName: activeFile.fileName,
      functions: parsedFunctions.map((item) => ({
        name: item,
        audioURL:
          activeFile.functions.find((obj) => obj.name === item)?.audioURL ?? "",
      })),

      language: activeFile.language,
    };

    const temp = structuredClone(allFiles);
    temp[activeFileIdx] = changedFile;
    setAllFiles(temp);
  };

  return (
    <div className="col-span-8 h-[100dvh] fixed bottom-0">
      <div className="h-[5dvh] bg-neutral-900 flex justify-start items-center">
        <div className="flex gap-6 items-center bg-neutral-800 h-full px-5">
          <div className="text-white">{activeFile.fileName} </div>
          <Button size="sm" onClick={handleSave}>
            Save
          </Button>
          <button onClick={() => setActiveFileIdx(-1)}>
            <X className="w-9 h-9 text-white hover:bg-neutral-700 rounded-md p-2" />
          </button>
        </div>
      </div>
      <MonacoEditor
        options={options}
        width={0.8 * width}
        height={0.95 * height}
        theme="vs-dark"
        value={activeFile.code}
        onChange={updateCode}
      />
    </div>
  );
}

const options = {
  autoIndent: "full",
  contextmenu: true,
  fontFamily: "monospace",
  fontSize: 13,
  lineHeight: 24,
  hideCursorInOverviewRuler: true,
  matchBrackets: "always",
  minimap: {
    enabled: false,
  },
  scrollbar: {
    horizontalSliderSize: 4,
    verticalSliderSize: 18,
  },
  selectOnLineNumbers: true,
  roundedSelection: false,
  readOnly: false,
  cursorStyle: "line",
  automaticLayout: true,
} as EditorConstructionOptions;
