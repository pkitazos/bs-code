import { Mic, Play, Trash2 } from "lucide-react"; // Assuming Play and Trash2 are icons for playback and delete
import React, { useState, useRef } from "react";
import { Button } from "./Button";
import { ReactMic } from "react-mic";
import "../RecordVoiceNote.css";

function RecordVoiceNote() {
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [fileName, setFileName] = useState<string>("recorded_audio");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [modal, setModal] = useState(false);
  const [selectedFunction, setSelectedFunction] = useState<string | null>(null);

  const toggleModal = () => {
    setModal(!modal);
    // Reset selected function when closing the modal
    setSelectedFunction(null);
  };

  const handleFunctionSelect = (selectedFunc: string) => {
    setSelectedFunction(selectedFunc);
  };

  return (
    <div className="fixed bottom-0 w-full flex items-center h-[5dvh] bg-neutral-900 text-white">
      <div>
        <Button className="record-voice-note-button" size="sm" onClick={toggleModal}>
          <Mic className="w-4 h-4" />
          Record Voice Note
        </Button>
      </div>

      {modal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-modal" onClick={toggleModal}>
              &times;
            </button>
            <h2>Select Function:</h2>
            <select className="function-selector"
              onChange={(e) => handleFunctionSelect(e.target.value)}
            >
              <option value="function1">Function 1</option>
              <option value="function2">Function 2</option>
              <option value="function1">Function 3</option>
              <option value="function2">Function 4</option>
            </select>

            {selectedFunction && (
              <>
                <h2>Audio Length: 00:00</h2>
                <div className="button-container">
                  <Button className="record-button" size={"sm"}>
                    <Mic className="w-4 h-4" />
                    Record</Button>
                  <Button size={"sm"}>
                    <Play className="w-4 h-4" />
                    Playback
                  </Button>
                  <Button size={"sm"}>
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default RecordVoiceNote;





/*
import { Mic } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { ReactMic } from "react-mic";
import "../RecordVoiceNote.css";
import { Button } from "./Button";

function RecordVoiceNote() {
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
  }, [audioBlob]);

  const saveRecording = () => {
    if (audioBlob) {
      const audioUrl = URL.createObjectURL(audioBlob);
      const a = document.createElement("a");
      a.href = audioUrl;
      a.download = `${fileName}.wav`;
      a.click();
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
          <div className="audioControls">
            <audio ref={audioRef} controls />
            <h2 className="recordingName">Recording Name: </h2>
            <input id="recordingName" onChange={handleFileNameChange} />
            <button onClick={saveRecording}>Save Recording</button>
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




*/