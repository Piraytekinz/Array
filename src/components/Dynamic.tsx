import { createContext, useContext, useState } from "react";

const DynamicContext = createContext<any>(null);

export const DynamicProvider = ({ children }: { children: React.ReactNode }) => {
  const [value, setValue] = useState("initial");

  return (
    <DynamicContext.Provider value={{ value, setValue }}>
      {children}
    </DynamicContext.Provider>
  );
};

export const useDynamic = () => useContext(DynamicContext);