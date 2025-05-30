import { useProjects } from "@/hooks/useProjects";
import { useServices } from "@/hooks/useServices";
import { useSetting } from "@/hooks/useSettings";
import React, { createContext, useContext, useState } from "react";



const ModalContext = createContext(undefined);

export const Context = ({ children }) => {
  const {projects , loading} = useProjects()
  const {services } = useServices()
  const {settings} = useSetting()

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
