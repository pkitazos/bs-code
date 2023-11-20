import { FilenameInput } from "./FilenameInput";
import "./Sidebar.css";
import { Button } from "./button";

export function Sidebar(props: {
  files: string[];
  functionRecordings: string[];
}) {
  const { files, functionRecordings } = props;
  return (
    <div className="Sidebar bg-[#5E5B5B]">
      <div className="text-xl h-[5%] flex justify-start pl-10 items-center">
        project name
      </div>
      <section className="Sidebar__files">
        <div className="Sidebar__title flex justify-between px-10 py-2 items-center font-semibold">
          My Files
          <div className="flex gap-2 justify-center">
            <Button>new file</Button>
            <Button>new folder</Button>
          </div>
        </div>
        <ul className="pl-10 pt-10 flex flex-col gap-2">
          {files.map((item, i) => (
            <FilenameInput filename={item} key={i} />
          ))}
        </ul>
      </section>
      <section className="Sidebar__recordings">
        <div className="Sidebar__title h-10 flex justify-start pl-10 items-center font-semibold">
          Function Voice Recordings
        </div>
        <ul className="pl-10 pt-10">
          {functionRecordings.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
