import { useWindowSize } from "@uidotdev/usehooks";
import { useState } from "react";
import { Editor, RecordVoiceNote, Sidebar } from "./components";

function App() {
  const { width, height } = useWindowSize();

  const [blobs, setBlobs] = useState<string[]>([]);

  const [allFiles, setAllFiles] = useState<CodeFile[]>([
    {
      fileName: "main.py",
      code: "",
      functions: [],
      language: "Python",
    },
    {
      fileName: "app.js",
      code: "",
      functions: [],
      language: "JavaScript",
    },
  ]);
  const [activeFileIdx, setActiveFileIdx] = useState(-1);

  const closeTab = () => {
    setActiveFileIdx(-1);
  };

  if (!(height && width)) return;
  return (
    <div className="grid grid-cols-10 h-[100dvh]">
      <Sidebar
        allFiles={allFiles}
        activeFileIdx={activeFileIdx}
        setAllFiles={setAllFiles}
        setActiveFileIdx={setActiveFileIdx}
      />
      <div className="col-span-8 bg-neutral-800 h-[100dvh]">
        {activeFileIdx !== -1 ? (
          <>
            <Editor
              allFiles={allFiles}
              activeFileIdx={activeFileIdx}
              setAllFiles={setAllFiles}
              closeTab={closeTab}
              width={width}
              height={height}
            />
            <RecordVoiceNote
              setBlobs={setBlobs}
              allFiles={allFiles}
              activeFileIdx={activeFileIdx}
            />
          </>
        ) : (
          <div className="h-[5dvh] bg-neutral-800 flex justify-start items-center px-20 gap-6">
            &nbsp;
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
