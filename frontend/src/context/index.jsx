
import { useLayoutEffect, useState } from "react";
import { createContext, useContext } from "react";
import axios from "axios";

export const RegisterCtx = createContext();
export const AuthCtx = createContext();

export const useAuth = () => useContext(AuthCtx);

export const AuthCtxProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null);

  useLayoutEffect(() => {
    const checkAuthReq = async () => {
      await axios
        .get("http://localhost:4000/profile/me", { withCredentials: true })
        .then((res) => {
          if (res.data?.type == "success") setIsAuth(res.data.data);
          else {
            setIsAuth(null);
          }
        })
        .catch((err) => {
          setIsAuth(false);
        });
    };
    checkAuthReq();
  }, []);

  return (
    <AuthCtx.Provider value={{ isAuth, setIsAuth }}>
      {children}
    </AuthCtx.Provider>
  );
};

export const RegisterCtxProvider = ({ children }) => {
  const [registerPl, setRegisterPl] = useState(null);

  return (
    <RegisterCtx.Provider value={{ registerPl, setRegisterPl }}>
      {children}
    </RegisterCtx.Provider>
  );
};
