"use client";
import React from "react";
import { Field, ErrorMessage } from "formik";
import { MdDelete } from "react-icons/md";
import { MdDragIndicator } from "react-icons/md";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Category } from "@/app/api/types/common";
import Toggle from "@/components/Toggle/Toggle";
import "./CategoriesItem.css";

type ItemProps = {
  category: Category;
  idx: number;
  remove: (idx: number) => void;
};

const CategoriesItem = ({
  category: { id, isActive, isDefault },
  idx,
  remove,
}: ItemProps) => {
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
      />
      <ErrorMessage
        name={`categories.${idx}.name`}
        component="div"
        className="errorMessage"
      />
      <div className="itemInteractive">
        <Toggle name={`categories.${idx}.isActive`} isChecked={isActive} />

        {!isDefault && (
          <button
            type="button"
            className="interactiveBtn"
            onClick={() => remove(idx)}
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
    </div>
  );
};

export default CategoriesItem;
