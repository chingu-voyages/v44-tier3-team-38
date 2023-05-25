import React, { useState } from "react";
import { Modal } from "../../../context/Modal";
import LoginForm from "./LoginForm";
import "../auth.css";

interface LoginFormModalProps {}

const LoginFormModal: React.FC<LoginFormModalProps> = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button id="auth-modal-main-page" onClick={() => setShowModal(true)}>
        Login
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm />
        </Modal>
      )}
    </>
  );
};

export default LoginFormModal;
