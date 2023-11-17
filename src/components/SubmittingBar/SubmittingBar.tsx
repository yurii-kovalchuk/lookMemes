import React from "react";
import { FormikState } from "formik";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import type { Category } from "@/app/api/types/common";
import "./SubmittingBar.css";

type SubmittingBarProps = {
  handleSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void;
  resetForm: (
    nextState?:
      | Partial<
          FormikState<{
            categories: Category[];
          }>
        >
      | undefined
  ) => void;
};

const SubmittingBar = ({ handleSubmit, resetForm }: SubmittingBarProps) => {
  return (
    <div className="submittingBar">
      <div className="container">
        <div className="wrapBtns">
          <button
            type="button"
            className="submitBtn"
            onClick={() => handleSubmit()}
          >
            <IoMdCheckmarkCircleOutline size={20} />
            <span>Save Changes</span>
          </button>
          <button
            type="button"
            className="cancelBtn"
            onClick={() => resetForm()}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubmittingBar;
