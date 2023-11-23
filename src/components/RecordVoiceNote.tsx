import { Mic } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { ReactMic } from "react-mic";
import "../RecordVoiceNote.css";
import { Button } from "./Button";

export function RecordVoiceNote({
  setBlobs,
}: {
  setBlobs: React.Dispatch<React.SetStateAction<string[]>>;
}) {
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
      audioRef.current.play();
    }
    // console.log({ audioBlob });
  }, [audioBlob]);

  const saveRecording = () => {
    if (audioBlob) {
      const audioUrl = URL.createObjectURL(audioBlob);
      setBlobs((prev) => [...prev, audioUrl]);
      // const a = document.createElement("a");
      // a.href = audioUrl;
      // a.download = `${fileName}.wav`;
      // a.click();
    }
  };

  return (
    <div className="fixed bottom-0 w-full flex items-center h-[5dvh] bg-neutral-900 text-white">
      <div>
        <Button size="sm" onClick={handleRecordChange}>
          <Mic className="w-4 h-4" />
          {isRecording ? "Recording..." : "Start Recording"}
        </Button>
        {audioBlob && (
          <div className="flex gap-4">
            <audio ref={audioRef} controls />
            <h2 className="recordingName">Recording Name: </h2>
            <input
              className="text-black"
              id="recordingName"
              onChange={handleFileNameChange}
            />
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
