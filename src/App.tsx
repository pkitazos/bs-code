import { MyEditor } from "./components/MyEditor";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { FileContext, useFileContext } from "./components/FileContext";

function App() {
  const functionRecordings = ["func 1", "func 2", "func 3"];
  const files = ["main.tsx", "app.tsx"];

  const { fileNames, addNewFile } = useFileContext();

  return (
    <FileContext.Provider value={{ fileNames, addNewFile }}>
      <div className="grid grid-cols-10 h-[100dvh]">
        <Sidebar functionRecordings={functionRecordings} files={files} />
        {/* <EditArea /> */}
        <MyEditor />
      </div>
    </FileContext.Provider>
  );
}

export default App;
