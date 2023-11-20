import React, { useState } from "react";
import RecordVoiceNote  from "./RecordVoiceNote";
import { Header } from "./Header";

export function EditArea() {
  
  const [value, setValue] = useState("");
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };
  console.log(value);

  return (
    
    <div className="EditAreaContainer">
      <Header/>
      <textarea id="code"className="EditAreaInput" onChange={handleTextChange}/>
      <div className="RecordContainer">
      <RecordVoiceNote/>
    </div>
    </div>
    
  );
}
