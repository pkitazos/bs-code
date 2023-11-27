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
        demo-project
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
          
          <div className="hs-accordion-group">
            <div className="hs-accordion active" id="hs-basic-heading-one">
              <button className="hs-accordion-toggle hs-accordion-active:text-blue-600 px-6 py-3 inline-flex items-center gap-x-3 text-sm w-full font-semibold text-start text-gray-800 hover:text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" aria-controls="hs-basic-collapse-one">
                <svg className="hs-accordion-active:hidden hs-accordion-active:text-blue-600 hs-accordion-active:group-hover:text-blue-600 block w-4 h-4 text-gray-600 group-hover:text-gray-500 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                <svg className="hs-accordion-active:block hs-accordion-active:text-blue-600 hs-accordion-active:group-hover:text-blue-600 hidden w-4 h-4 text-gray-600 group-hover:text-gray-500 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/></svg>
                Accordion #1
              </button>
            <div id="hs-basic-collapse-one" className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300" aria-labelledby="hs-basic-heading-one">
              <div className="pb-4 px-6">
                <p className="text-sm text-gray-600 dark:text-gray-200">
                  It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element.
                </p>
              </div>
            </div>
          </div>
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
