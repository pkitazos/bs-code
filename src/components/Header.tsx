import React from "react";
import { FilenameInput } from "./Sidebar/FilenameInput";
import { Button } from "./Sidebar/button";

export function EditorHeader({
  value,
  setValue,
}: {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}) {
  const handleFileNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const saveCodeFile = () => {
    const blob = new Blob([value], { type: "text/plain" });
  };

  return (
    <div className="header flex justify-start items-center px-20 gap-6">
      <Button>Save</Button>
      <FilenameInput filename={value} />
    </div>
  );
}
