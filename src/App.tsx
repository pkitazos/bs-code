import { useWindowSize } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";

import { Sidebar } from "./components/Sidebar/Sidebar";
import { MyEditor } from "./components/MyEditor";
import RecordVoiceNote from "./components/RecordVoiceNote";

function App() {
  const { width, height } = useWindowSize();

  const [allFiles, setAllFiles] = useState<CodeFile[]>([
    {
      fileName: "main.tsx",
      code: "",
      functions: [],
      language: "JavaScript",
    },
    {
      fileName: "app.tsx",
      code: "",
      functions: [],
      language: "JavaScript",
    },
  ]);
  const [activeFileIdx, setActiveFileIdx] = useState(-1);

  const updateActiveFile = (changedFile: CodeFile) => {
    const temp = allFiles;
    temp[activeFileIdx] = changedFile;
    setAllFiles(temp);
  };

  useEffect(() => {
    console.log(activeFileIdx);
  }, [activeFileIdx]);

  if (!(height && width)) return;
  return (
    <div className="grid grid-cols-10 h-[100dvh]">
      <Sidebar
        allFiles={allFiles}
        activeFileIdx={activeFileIdx}
        setActiveFileIdx={setActiveFileIdx}
      />
      <div className="col-span-8 bg-slate-700 h-[90dvh]">
        {activeFileIdx !== -1 ? (
          <MyEditor
            allFiles={allFiles}
            activeFileIdx={activeFileIdx}
            updateActiveFile={updateActiveFile}
            width={width}
            height={height}
          />
        ) : (
          <div className="h-[5dvh] bg-slate-800 flex justify-start items-center px-20 gap-6">
            &nbsp;
          </div>
        )}
        <RecordVoiceNote />
      </div>
    </div>
  );
}

export default App;
