import { createContext, useContext, type ReactNode, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

interface ModalContextType {
  activeId: string | null; // El ID que esté en la URL actualmente
  openModal: (id: string | number) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Obtenemos el ID de la URL (usamos 'modalId' como clave genérica)
  const activeId = searchParams.get("modalId");

  const openModal = (id: string | number) => {
    const params = new URLSearchParams(searchParams);
    params.set("modalId", id.toString());
    setSearchParams(params);
  };

  const closeModal = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("modalId");
    setSearchParams(params);
  };

  const value = useMemo(
    () => ({ activeId, openModal, closeModal }),
    [activeId, searchParams]
  );

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useModal must be used within ModalProvider");
  return context;
};
