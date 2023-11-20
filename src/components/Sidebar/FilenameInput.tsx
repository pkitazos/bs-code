import { useState } from "react";

export function FilenameInput({ filename }: { filename?: string }) {
  const [value, setValue] = useState(filename ?? "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  return (
    <input
      className="w-fit bg-transparent"
      value={value}
      onChange={handleChange}
    />
  );
}
