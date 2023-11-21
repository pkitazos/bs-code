import { FilenameInput } from "./FilenameInput";
import { Button } from "./button";

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
    <div className="text-white col-span-2 h-[100dvh] bg-slate-800">
      <div className="text-xl h-[5dvh] flex justify-start pl-10 items-center">
        project name
      </div>
      <div className="h-[95dvh]">
        <div className="h-1/2">
          <div className="bg-slate-900 flex justify-between px-10 py-2 items-center font-semibold">
            My Files
            <div className="flex gap-2 justify-center">
              <Button size="sm">new file</Button>
              <Button size="sm">new folder</Button>
            </div>
          </div>
          <ul className="pl-10 pt-10 flex flex-col gap-2">
            {allFiles.map(({ fileName }, i) => (
              <div key={i}>
                <FilenameInput filename={fileName} />
                <Button size="sm" onClick={() => setActiveFileIdx(i)}>
                  open
                </Button>
              </div>
            ))}
          </ul>
        </div>
        <div className="h-1/2">
          <div className="bg-slate-900 h-10 flex justify-start pl-10 items-center font-semibold">
            Function Voice Recordings
          </div>
          <ul className="pl-10 pt-10">
            11{" "}
            {/* {activeFileIdx !== -1 &&
              allFiles[activeFileIdx].functions.length !== 0 &&
              allFiles[activeFileIdx].functions.map(({ name }, i) => (
                <li key={i}>{name}</li>
              ))} */}
          </ul>
        </div>
      </div>
    </div>
  );
}
