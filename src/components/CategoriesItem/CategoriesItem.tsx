"use client";
import React, { useState } from "react";
import { Field, ErrorMessage, FormikTouched, FormikErrors } from "formik";
import { MdDelete } from "react-icons/md";
import { MdDragIndicator } from "react-icons/md";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Category } from "@/app/api/types/common";
import Toggle from "@/components/Toggle/Toggle";
import "./CategoriesItem.css";
import { Modal } from "../Modal/Modal";

type FormValues = {
  categories: Category[];
};

type ItemProps = {
  category: Category;
  idx: number;
  remove: (id: string) => void;
  touched: FormikTouched<FormValues>;
  errors: FormikErrors<FormValues>;
  isValid: boolean;
};

const CategoriesItem = ({
  category: { id, isActive, isDefault },
  idx,
  remove,
  errors,
  touched,
  isValid,
}: ItemProps) => {
  const [isModal, setIsModal] = useState(false);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  return (
    <div ref={setNodeRef} {...attributes} style={style} className="itemWrap">
      <Field
        name={`categories.${idx}.name`}
        placeholder="Enter Category Name"
        type="text"
        className={`item ${isActive ? `itemActive` : ``}`}
        readOnly={isDefault}
      />
      {!isValid && touched.categories?.[idx] && errors.categories?.[idx] && (
        <ErrorMessage
          name={`categories.${idx}.name`}
          component="div"
          className="errorMessage"
        />
      )}
      <div className="itemInteractive">
        <Toggle name={`categories.${idx}.isActive`} isChecked={isActive} />

        {!isDefault && (
          <button
            type="button"
            className="interactiveBtn"
            onClick={() => setIsModal(true)}
          >
            <MdDelete size={16} />
          </button>
        )}
        {!isDefault && (
          <button type="button" className="interactiveBtn" {...listeners}>
            <MdDragIndicator size={20} />
          </button>
        )}
      </div>
      {isModal && (
        <Modal onDelete={() => remove(id)} close={() => setIsModal(false)} />
      )}
    </div>
  );
};

export default CategoriesItem;
