/* eslint-disable @typescript-eslint/no-explicit-any */

import { Mic, Save } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { ReactMic } from "react-mic";
import Select from "react-select";
import "../RecordVoiceNote.css";
import { Button } from "./Button";

type SelectOption = { value: string; label: string };

// new dropdown changes, style away guys!

const customStyles = {
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected ? "grey" : "white",
    color: state.isSelected ? "white" : "black",
  }),
  control: (provided: any) => ({
    ...provided,
    backgroundColor: "lightgrey",
    color: "white",
  }),
};

export function RecordVoiceNote({
  setBlobs,
  allFiles,
  activeFileIdx,
}: {
  setBlobs: React.Dispatch<React.SetStateAction<string[]>>;
  allFiles: CodeFile[];
  activeFileIdx: number;
}) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [selected, setSelected] = useState<SelectOption | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const options = allFiles.flatMap((file) =>
    file.functions.map((fn) => ({ value: fn.name, label: fn.name }))
  );

  const handleSave = () => {
    const audioUrl = URL.createObjectURL(audioBlob!);
    setBlobs((prev) => [...prev, audioUrl]);

    const fileFns = allFiles[activeFileIdx].functions;
    const selectedFn = fileFns.find((obj) => obj.name === selected?.label);

    if (selectedFn) selectedFn.audioURL = audioUrl;

    setAudioBlob(null);
    setSelected(null);
  };

  useEffect(() => {
    if (audioBlob && audioRef.current) {
      audioRef.current.src = URL.createObjectURL(audioBlob);
    }
  }, [audioBlob]);

  return (
    <div className="fixed bottom-0 w-full flex items-center h-[5dvh] bg-neutral-900 text-white">
      <div>
        <Button size="md" onClick={() => setIsRecording(!isRecording)}>
          <Mic className="w-4 h-4" />
          {isRecording ? "Recording..." : "Start Recording"}
        </Button>
      </div>
      <div className="m-5">
        <Select
          value={selected}
          onChange={setSelected}
          options={options}
          styles={customStyles}
          menuPlacement="top"
        />
      </div>
      <div>
        {audioBlob && (
          <div className="flex gap-4 items-center">
            <audio ref={audioRef} controls />
            <Button size="md" className="bg-indigo-700" onClick={handleSave}>
              <Save className="w-4 h-4" />
              Save Recording
            </Button>
          </div>
        )}
      </div>
      <div className="hideAudio">
        <ReactMic
          record={isRecording}
          onStop={(e) => setAudioBlob(e.blob)}
          strokeColor="transparent"
          backgroundColor="transparent"
        />
      </div>
    </div>
  );
}
