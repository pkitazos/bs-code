import React, { useState, useRef, useEffect } from "react";
import  { ReactMic }  from 'react-mic';
import '../RecordVoiceNote.css';

const RecordVoiceNote: React.FC = () => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [fileName, setFileName] = useState<string>('recorded_audio');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleRecordChange = () => {
    const current_state = isRecording;
    setIsRecording(!current_state);
    if(current_state) handleRecordStop;
    
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
      const a = document.createElement('a');
      a.href = audioUrl;
      a.download = `${fileName}.wav`;
      a.click();
    }
  }

  return (
    <div>
      <div>
      <button onClick={handleRecordChange}>
        {isRecording ? 'Recording...' : 'Start Recording'}
      </button>
      {audioBlob && ( 
      <div className="audioControls"><audio ref={audioRef} controls />
      <h2 className="recordingName">Recording Name: </h2><input id="recordingName" onChange={handleFileNameChange}/>
      <button onClick={saveRecording}>Save Recording</button>

                      </div>)}
      </div>
      <div className="hideAudio">
      <ReactMic
        record={isRecording}
        onStop={handleRecordStop}
        onData={(recordedData) => {
          // Handle real-time data if needed
          console.log('Recording data is available:', recordedData);
        }}
        
        strokeColor="transparent"
        backgroundColor="transparent"
      />
    </div>
    </div>
  );
};

export default RecordVoiceNote;
