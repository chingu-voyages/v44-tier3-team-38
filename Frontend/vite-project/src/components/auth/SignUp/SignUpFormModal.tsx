import React, { useState } from "react";
import { Modal } from "../../../context/Modal";
import SignUpForm from "./SignUpForm";
import "../auth.css";

interface SignUpModalProps {}

const SignUpModal: React.FC<SignUpModalProps> = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button id="auth-modal-main-page" onClick={() => setShowModal(true)}>
        Sign Up
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignUpForm />
        </Modal>
      )}
    </>
  );
};

export default SignUpModal;
