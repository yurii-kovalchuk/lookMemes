import React from "react";
import { MdDelete } from "react-icons/md";
import "./Popup.css";

type PopupProps = {
  onSubmit: () => void;
  onCancel: () => void;
};

const Popup = ({ onSubmit, onCancel }: PopupProps) => {
  return (
    <div className="popup">
      <h3 className="title">Delete the Category?</h3>
      <p className="message">
        All templates in the category will be moved to the category
        &quot;Other&quot;
      </p>
      <button type="button" className="delSubmit" onClick={onSubmit}>
        <MdDelete size={20} />
        <span>Delete</span>
      </button>
      <button type="button" className="delCancel" onClick={onCancel}>
        Cancel
      </button>
    </div>
  );
};

export default Popup;
