"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface loginContextType {
  isLoggedIn: boolean;
  userLogin: () => void;
  userLogout: () => void;
  onRoomCreate: (slug:string) => void;
}
const loginContext = createContext<loginContextType | undefined>(undefined);

export function CtxProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [roomId, setRoomId] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    setIsLoggedIn(!!token);
    setLoading(false);
  }, []);

  const userLogin = () => {
    setIsLoggedIn(true);
  };
  const userLogout = () => {
    setIsLoggedIn(false);
  };

  const onRoomCreate = (slug: string) => {
    setRoomId(slug);
  };

  return (
    <loginContext.Provider value={{ isLoggedIn, userLogin, userLogout,onRoomCreate }}>
      {!loading && children}
    </loginContext.Provider>
  );
}

export function useLoginContext() {
  const context = useContext(loginContext);
  if (!context) {
    throw new Error(
      "the component must be inside the provider to access the context",
    );
  }
  return context;
}
