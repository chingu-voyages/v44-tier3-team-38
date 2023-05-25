import React, {
  useContext,
  createContext,
  useState,
  useRef,
  useEffect,
} from "react";
import ReactDOM from "react-dom";
import "./Modal.css";

export const ModalContext = createContext<any>(null);

interface ModalProviderProps {
  children: React.ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [value, setValue] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    setValue(modalRef.current);
  }, []);

  return (
    <>
      <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
};

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  const modalNode = useContext(ModalContext);
  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div id="modal">
      <div id="modal-background" onClick={onClose} className="fade-in" />
      <div id="modal-content" className="fade-in-grow">
        {children}
      </div>
    </div>,
    modalNode
  );
};
