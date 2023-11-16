"use client";
import React from "react";
import { Formik, Form, FieldArray } from "formik";
import { object, array, string } from "yup";
import { FaPlus } from "react-icons/fa6";
import { randomId } from "@/utils/dbApi";
import type { Category } from "@/app/api/types/common";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import CategoriesItem from "../CategoriesItem/CategoriesItem";
import "./CategoryForm.css";

type FormProps = {
  initialCategories: Category[];
};

const CategoriesSchema = object({
  categories: array(
    object({
      name: string().required("Name is required"),
    })
  ),
});

const CategoriesForm = ({ initialCategories }: FormProps) => {
  return (
    <Formik
      initialValues={{ categories: initialCategories }}
      validationSchema={CategoriesSchema}
      onSubmit={async (values) => {
        console.log("values", values);
      }}
      enableReinitialize
    >
      {({ values, setValues }) => {
        const onDragEnd = (event: any) => {
          const { active, over } = event;
          if (active.id === over.id) {
            return;
          }
          setValues((prevState) => {
            const oldIndex = prevState.categories.findIndex(
              (category) => category.id === active.id
            );
            const newIndex = prevState.categories.findIndex(
              (category) => category.id === over.id
            );
            const newCategories = arrayMove(
              prevState.categories,
              oldIndex,
              newIndex
            );
            return { ...prevState, categories: newCategories };
          });
        };
        return (
          <Form>
            <FieldArray name="categories">
              {({ insert, remove }) => (
                <div>
                  <button
                    type="button"
                    className="categoriesAddBtn"
                    onClick={() =>
                      insert(0, {
                        id: randomId(),
                        name: "",
                        order: 0,
                        isActive: false,
                        hasUpdate: true,
                        isDefault: false,
                      })
                    }
                  >
                    <FaPlus size={14} />
                    <span className="categoriesAddBtnText">
                      Create a Category
                    </span>
                  </button>
                  <DndContext
                    collisionDetection={closestCenter}
                    onDragEnd={onDragEnd}
                  >
                    <SortableContext
                      items={values.categories}
                      strategy={verticalListSortingStrategy}
                    >
                      {values.categories &&
                        values.categories.length > 0 &&
                        values.categories.map((category, idx) => (
                          <CategoriesItem
                            key={category.id}
                            category={category}
                            idx={idx}
                            remove={remove}
                          />
                        ))}
                    </SortableContext>
                  </DndContext>
                </div>
              )}
            </FieldArray>

            <button type="submit">Save Changes</button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CategoriesForm;
