import { Trash2 } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./Accordion";
import { Button } from "./Button";

export function Sidebar({
  allFiles,
  activeFileIdx,
  setAllFiles,
  setActiveFileIdx,
}: {
  allFiles: CodeFile[];
  activeFileIdx: number;
  setAllFiles: React.Dispatch<React.SetStateAction<CodeFile[]>>;
  setActiveFileIdx: React.Dispatch<React.SetStateAction<number>>;
}) {
  const handleDelete = (fnName: string) => {
    const temp = structuredClone(allFiles);

    const idx = allFiles[activeFileIdx].functions
      .map((item) => item.name)
      .indexOf(fnName);

    temp[activeFileIdx].functions[idx].audioURL = "";
    setAllFiles(temp);
  };

  return (
    <div className="text-white col-span-2 h-[100dvh] bg-neutral-900">
      <div className="text-xl h-[5dvh] flex justify-start pl-10 items-center">
        demo-project
      </div>
      <div className="h-[95dvh]">
        <div className="h-1/2">
          <div className="bg-neutral-800 flex justify-between px-10 py-2 items-center font-semibold">
            My Files
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
              allFiles[activeFileIdx].functions.map(({ name, audioURL }, i) => (
                <li key={i}>
                  <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                      <AccordionTrigger disabled={audioURL === ""}>
                        {name}
                      </AccordionTrigger>
                      {audioURL !== "" && (
                        <AccordionContent className="flex gap-5 items-center">
                          <audio key={i} src={audioURL} controls />
                          <Button
                            size="lg"
                            className="bg-red-500 hover:bg-red-600"
                            onClick={() => handleDelete(name)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </AccordionContent>
                      )}
                    </AccordionItem>
                  </Accordion>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
