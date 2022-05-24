import React from "react";
import ReactModal from "react-modal";
export default function CardOptionsModal({ toggle, isOpen, commitChanges }) {
  return (
    <ReactModal
      isOpen={isOpen}
      style={{
        content: {
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px",
        },
      }}
    >
      <p>card modal content placeholder</p>
      <a
        onClick={() => {
          toggle();
        }}
      >
        close
      </a>
    </ReactModal>
  );
}
