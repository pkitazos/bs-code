/* eslint-disable @typescript-eslint/no-explicit-any */

import { Mic, Save, Trash2, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { ReactMic } from "react-mic";
import Select from "react-select";
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
  allFiles,
  setAllFiles,
  activeFileIdx,
}: {
  allFiles: CodeFile[];
  setAllFiles: React.Dispatch<React.SetStateAction<CodeFile[]>>;
  activeFileIdx: number;
}) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [selected, setSelected] = useState<SelectOption | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const closeModal = () => {
    setAudioBlob(null);
    setSelected(null);
    setModalIsOpen(false);
  };

  const options = allFiles[activeFileIdx].functions
    .filter((item) => item.audioURL === "")
    .map((item) => ({ value: item.name, label: item.name }));

  const handleSave = () => {
    const audioUrl = URL.createObjectURL(audioBlob!);

    const temp = structuredClone(allFiles);

    const selectedFn = temp[activeFileIdx].functions.find(
      (obj) => obj.name === selected?.label
    );

    const idx = allFiles[activeFileIdx].functions
      .map((item) => item.name)
      .indexOf(selectedFn!.name);

    temp[activeFileIdx].functions[idx].audioURL = audioUrl;

    setAllFiles(temp);
    closeModal();
  };

  useEffect(() => {
    if (audioBlob && audioRef.current) {
      audioRef.current.src = URL.createObjectURL(audioBlob);
    }
  }, [audioBlob]);

  return (
    <>
      <div className="fixed bottom-0 w-full flex items-center h-[5dvh] bg-neutral-900 text-white">
        <Button
          className="bg-red-900 hover:bg-red-950"
          size="sm"
          onClick={() => setModalIsOpen(true)}
        >
          <Mic className="w-4 h-4" />
          Record Voice Note
        </Button>
        <ReactMic
          className="hidden"
          record={isRecording}
          onStop={(e) => setAudioBlob(e.blob)}
          strokeColor="transparent"
          backgroundColor="transparent"
        />
      </div>
      {modalIsOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-[rgba(0, 0, 0, 0.5)] justify-center items-center flex">
          <div className="bg-black p-5 rounded-sm shadow-lg flex flex-col gap-2 min-w-[400px]">
            <div className="flex w-full justify-end">
              <Button size="sm" className="bg-transparent" onClick={closeModal}>
                <X />
              </Button>
            </div>
            <h2 className="text-white">Select Function:</h2>
            <Select
              value={selected}
              onChange={setSelected}
              options={options}
              styles={customStyles}
              menuPlacement="top"
            />
            {selected && audioBlob && (
              <audio className="mt-4 mb-2 w-full" ref={audioRef} controls />
            )}
            {selected && (
              <>
                <div className="flex justify-between gap-3 mt-2.5">
                  <Button
                    className="bg-red-900 hover:bg-red-950"
                    size="sm"
                    onClick={() => setIsRecording(!isRecording)}
                  >
                    <Mic className="w-4 h-4" />
                    {isRecording ? "Stop Recording" : "Start Recording"}
                  </Button>
                  <Button
                    size="sm"
                    disabled={!audioBlob}
                    onClick={() => setAudioBlob(null)}
                  >
                    <Trash2 className="w-4 h-4" />
                    Cancel
                  </Button>
                  <Button
                    className="bg-lime-600"
                    disabled={!audioBlob}
                    size="sm"
                    onClick={handleSave}
                  >
                    <Save className="w-4 h-4" />
                    Save
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
