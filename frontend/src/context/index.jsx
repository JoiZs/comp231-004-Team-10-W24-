import { useState } from "react";
import { createContext } from "react";

export const RegisterCtx = createContext();

export const RegisterCtxProvider = ({ children }) => {
  const [registerPl, setRegisterPl] = useState(null);

  return (
    <RegisterCtx.Provider value={{ registerPl, setRegisterPl }}>
      {children}
    </RegisterCtx.Provider>
  );
};
