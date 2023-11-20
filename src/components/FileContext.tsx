"use client";
import { ReactNode, createContext, useContext, useState } from "react";

export const FileContext = createContext({
  fileNames: [] as string[],
  addNewFile: (() => {
    return;
  }) as React.Dispatch<React.SetStateAction<string[]>>,
});

export function SpaceContextProvider({ children }: { children: ReactNode }) {
  const [fileNames, setFileNames] = useState<string[]>([]);

  return (
    <FileContext.Provider value={{ fileNames, addNewFile: setFileNames }}>
      {children}
    </FileContext.Provider>
  );
}

export const useFileContext = () => {
  return useContext(FileContext);
};
