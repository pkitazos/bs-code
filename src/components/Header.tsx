import React, { useState } from "react";
import RecordVoiceNote  from "./RecordVoiceNote";

export function Header(value: String) {

    const [fileName, setFileName] = useState<string>('file_name');


    const handleFileNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFileName(event.target.value);
      };

    const saveCodeFile = () => {
        const blob = new Blob([value], { type: 'text/plain' })
      }

    return (
        <div className="header">
            <h2 className="recordingName">File Name: </h2>
        <input id="fileName" onChange={handleFileNameChange}/>
        <button onClick={saveCodeFile}>Save</button>
        </div>

    );
}
