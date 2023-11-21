import { FilePlus, FolderPlus } from "lucide-react";
import { Button } from "./Button";

export function Sidebar({
  allFiles,
  activeFileIdx,
  setActiveFileIdx,
}: {
  allFiles: CodeFile[];
  activeFileIdx: number;
  setActiveFileIdx: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <div className="text-white col-span-2 h-[100dvh] bg-neutral-900">
      <div className="text-xl h-[5dvh] flex justify-start pl-10 items-center">
        project name
      </div>
      <div className="h-[95dvh]">
        <div className="h-1/2">
          <div className="bg-neutral-800 flex justify-between px-10 py-2 items-center font-semibold">
            My Files
            <div className="flex gap-2 justify-center">
              <Button size="sm">
                <FilePlus className="w-5 h-5 place-self-center" />
              </Button>
              <Button size="sm">
                <FolderPlus className="w-5 h-5 place-self-center" />
              </Button>
            </div>
          </div>
          <ul className="pl-10 pt-10 flex flex-col gap-4">
            {allFiles.map(({ fileName }, i) => (
              <div key={i} className="flex items-center gap-3">
                <button
                  onClick={() => setActiveFileIdx(i)}
                  className="text-white bg-transparent hover:bg-neutral-700 rounded-md px-4 py-2"
                >
                  {fileName}
                </button>
              </div>
            ))}
          </ul>
        </div>
        <div className="h-1/2">
          <div className="bg-neutral-800 h-10 flex justify-start pl-10 items-center font-semibold">
            Function Voice Recordings
          </div>
          <ul className="pl-10 pt-10">
            {activeFileIdx !== -1 &&
              allFiles[activeFileIdx].functions.length !== 0 &&
              allFiles[activeFileIdx].functions.map(({ name }, i) => (
                <li key={i}>{name}</li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
