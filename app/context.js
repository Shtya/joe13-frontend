import { useSetting } from "@/hooks/useSettings";
import React, { createContext, useContext, useState } from "react";



const ModalContext = createContext(undefined);

export const Context = ({ children, initialSettings, initialNav }) => {
  const projects = initialNav?.projects || null;
  const services = initialNav?.services || null;
  const loading = false;
  const {settings} = useSetting(initialSettings)

  const [isModalOpen, setModalOpen] = useState(true);
  const [file, setFile] = useState(null);

  return (
    <ModalContext.Provider value={{projects ,services , settings , loading ,file, setFile , isModalOpen, setModalOpen }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useValues = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useModal must be used within Context");
  return context;
};
