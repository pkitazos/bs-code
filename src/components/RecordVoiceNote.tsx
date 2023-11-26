import { Mic } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { ReactMic } from "react-mic";
import "../RecordVoiceNote.css";
import { Button } from "./Button";
import Select from 'react-select';


export function RecordVoiceNote({
  setBlobs, allFiles, activeFileIdx
}: {
  setBlobs: React.Dispatch<React.SetStateAction<string[]>>;
  allFiles: CodeFile[];
  activeFileIdx: number;
})

{
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [fileName, setFileName] = useState<string>("recorded_audio");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleRecordChange = () => {
    const current_state = isRecording;
    setIsRecording(!current_state);
    if (current_state) handleRecordStop;
  };

  const handleFileNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFileName(event.target.value);
  };

  const handleRecordStop = (recordedBlob: { blob: Blob }) => {
    setAudioBlob(recordedBlob.blob);
    setIsRecording(false);
  };

  useEffect(() => {
    if (audioBlob && audioRef.current) {
      const audioUrl = URL.createObjectURL(audioBlob);
      audioRef.current.src = audioUrl;
    }
  }, [audioBlob]);

  const saveRecording = () => {
    if (audioBlob) {
      const audioUrl = URL.createObjectURL(audioBlob);
      setBlobs((prev) => [...prev, audioUrl]);
      const currFile = allFiles[activeFileIdx]
      const fileFns = currFile.functions
      const currFn = fileFns.find(obj => obj.name === selectedFn);
      if (currFn)
      currFn.audioURL = audioUrl;
    console.log(currFile);
      // const a = document.createElement("a");
      // a.href = audioUrl;
      // a.download = `${fileName}.wav`;
      // a.click();
    }
  };

  //////new dropdown changes, style away guys!

  const [selectedFn, setSelectedFn] = useState<string>("");

   const handleFnChange = (currentSelection:any) =>{
     setSelectedFn(currentSelection.value);
   }
 const options = allFiles.flatMap(file => (
    file.functions.map(fn => (
       ({value: fn.name, label: fn.name})
    ))
  ))
  const customStyles = {
    option: (provided:any, state:any) => ({
      ...provided,
      backgroundColor: state.isSelected ? 'grey' : 'white',
      color: state.isSelected ? 'white' : 'black',
    }),
    control: (provided: any) => ({
      ...provided,
      backgroundColor: 'lightgrey',
      color: 'white',
    }),
  };

   //////new dropdown changes

  return (
    <div className="fixed bottom-0 w-full flex items-center h-[5dvh] bg-neutral-900 text-white">
      <div>
        <Button size="sm" onClick={handleRecordChange}>
          <Mic className="w-4 h-4" />
          {isRecording ? "Recording..." : "Start Recording"}
        </Button>
        </div>
        <div className="m-5">
        <Select 
        options={options}
        styles={customStyles}
        onChange={handleFnChange} 
        menuPlacement="top" />
        </div>
        <div>
        {audioBlob && (
          <div className="flex gap-4">
            <audio ref={audioRef} controls />
            <button className="bg-red-500" onClick={saveRecording}>
              Save Recording
            </button>
          </div>
        )}
      </div>
      
      <div className="hideAudio">
        <ReactMic
          record={isRecording}
          onStop={handleRecordStop}
          onData={(recordedData) => {
            // Handle real-time data if needed
            console.log("Recording data is available:", recordedData);
          }}
          strokeColor="transparent"
          backgroundColor="transparent"
        />
      </div>
    </div>
  );
}
