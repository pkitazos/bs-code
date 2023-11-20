import { EditArea } from "./components/EditArea";
import { Sidebar } from "./components/Sidebar/Sidebar";

function App() {
  const functionRecordings = ["func 1", "func 2", "func 3"];
  const files = ["main.tsx", "app.tsx"];
  return (
    <div className="container">
      <Sidebar functionRecordings={functionRecordings} files={files} />
      <EditArea />
    </div>
  );
}

export default App;
