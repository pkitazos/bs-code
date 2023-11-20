import React, { useState } from "react";
import RecordVoiceNote from "./RecordVoiceNote";
import { EditorHeader } from "./Header";

export function EditArea() {
  const [value, setValue] = useState("");
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };
  console.log(value);

  return (
    <div className="EditAreaContainer">
      <EditorHeader />
      <textarea
        id="code"
        className="EditAreaInput"
        onChange={handleTextChange}
      />
      <div className="RecordContainer">
        <RecordVoiceNote />
      </div>
    </div>
  );
}
