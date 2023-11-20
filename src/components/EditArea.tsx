import React, { useState } from "react";
import RecordVoiceNote  from "./RecordVoiceNote";

export function EditArea() {
  
  const [value, setValue] = useState<String>("");
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };
  console.log(value);


  return (
    <div className="EditAreaContainer">
      <textarea className="EditAreaInput" onChange={handleTextChange}/>
      <div className="RecordContainer">
      <RecordVoiceNote/>
    </div>
    </div>
    
  );
}
