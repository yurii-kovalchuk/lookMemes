import React from "react";
import { Field } from "formik";
import "./Toggle.css";

type ToggleProps = {
  name: string;
  isChecked: boolean;
};

const Toggle = ({ name, isChecked }: ToggleProps) => {
  return (
    <>
      <Field
        type="checkbox"
        id={name}
        name={name}
        className="visually-hidden"
        checked={isChecked}
      />
      <label htmlFor={name} className={`pill ${isChecked ? `active` : ``}`}>
        <div className="handle"></div>
        <div className="text">{isChecked ? "On" : "Off"}</div>
      </label>
    </>
  );
};

export default Toggle;
