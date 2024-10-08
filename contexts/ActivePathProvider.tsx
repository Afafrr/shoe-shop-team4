"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

type PathManager = {
  activePath: string;
  setActivePath: Dispatch<SetStateAction<string>>;
};

const ActivePathContext = createContext<PathManager | undefined>(undefined);

export const ActivePathProvider = ({ children }: { children: ReactNode }) => {
  const [activePath, setActivePath] = useState<string>("");
  return (
    <ActivePathContext.Provider value={{ activePath, setActivePath }}>
      {children}
    </ActivePathContext.Provider>
  );
};

export const useActivePath = () => {
  const context = useContext(ActivePathContext);
  if (!context) {
    throw new Error("useActivePath must be used within a ActivePathProvider");
  }
  return context;
};
