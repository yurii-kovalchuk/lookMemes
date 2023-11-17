"use client";
import { useEffect } from "react";
import "./Modal.css";
import Popup from "../Popup/Popup";

type ModalProps = {
  close: () => void;
  onDelete: () => void;
};

export const Modal = ({ close, onDelete }: ModalProps) => {
  useEffect(() => {
    window.addEventListener("keydown", onKeydown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeydown);
      document.body.style.overflow = "unset";
    };
  });

  const onKeydown = (e: KeyboardEvent) => {
    if (e.code === "Escape") {
      close();
    }
  };

  const onOverlayClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.currentTarget === e.target) {
      close();
    }
  };

  return (
    <div className="overlay" onClick={onOverlayClick}>
      <div className="content">
        <Popup onSubmit={onDelete} onCancel={close} />
      </div>
    </div>
  );
};
