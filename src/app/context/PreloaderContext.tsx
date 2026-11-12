"use client";

import React, { createContext, useContext, useState } from "react";

interface PreloaderContextType {
  isPreloaderComplete: boolean;
  setIsPreloaderComplete: (complete: boolean) => void;
}

const PreloaderContext = createContext<PreloaderContextType>({
  isPreloaderComplete: false,
  setIsPreloaderComplete: () => {},
});

export const PreloaderProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isPreloaderComplete, setIsPreloaderComplete] = useState(false);

  return (
    <PreloaderContext.Provider
      value={{ isPreloaderComplete, setIsPreloaderComplete }}
    >
      {children}
    </PreloaderContext.Provider>
  );
};

export const usePreloader = () => useContext(PreloaderContext);

