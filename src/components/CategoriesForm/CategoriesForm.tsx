"use client";
import React from "react";
import { Formik, Form, FieldArray } from "formik";
import { object, array, string } from "yup";
import { FaPlus } from "react-icons/fa6";
import { randomId } from "@/utils/dbApi";
import type { Category } from "@/app/api/types/common";
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import CategoriesItem from "../CategoriesItem/CategoriesItem";
import { postCategories } from "@/services/fetchCategories";
import SubmittingBar from "../SubmittingBar/SubmittingBar";

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
      validateOnChange={false}
      onSubmit={async (values, { resetForm }) => {
        const payload = values.categories;
        const res = await postCategories(payload);
        console.log(res);
        resetForm({ values: { categories: payload } });
      }}
      enableReinitialize
    >
      {(props) => {
        const {
          values,
          setValues,
          dirty,
          touched,
          isValid,
          errors,
          handleSubmit,
          resetForm,
        } = props;

        const onDragEnd = (event: DragEndEvent) => {
          const { active, over } = event;
          if (over === null) {
            return;
          }
          setValues((prevState) => {
            const oldIndex = prevState.categories.findIndex(
              (category) => category.id === active.id
            );
            const newIndex = prevState.categories.findIndex(
              (category) => category.id === over.id
            );

            const initialOrder = prevState.categories.find(
              (category) => category.id === active.id
            )?.order;

            const currentOrder = prevState.categories.find(
              (category) => category.id === over.id
            )?.order;

            const newCategories = arrayMove(
              prevState.categories,
              oldIndex,
              newIndex
            );

            if (currentOrder !== undefined && initialOrder !== undefined) {
              if (initialOrder > currentOrder) {
                newCategories.forEach((category) => {
                  if (category.order === initialOrder) {
                    category.order = currentOrder;
                  } else if (
                    category.order >= currentOrder &&
                    category.order < initialOrder
                  ) {
                    category.order += 1;
                  }
                });
              } else if (initialOrder < currentOrder) {
                newCategories.forEach((category) => {
                  if (category.order === initialOrder) {
                    category.order = currentOrder;
                  } else if (
                    category.order <= currentOrder &&
                    category.order > initialOrder
                  ) {
                    category.order -= 1;
                  }
                });
              }
            }

            return { ...prevState, categories: newCategories };
          });
        };

        const onDelete = (id: string) => {
          setValues((prevState) => {
            const newCategories = prevState.categories.filter(
              (category) => category.id !== id
            );

            const orderDeleted = prevState.categories.find(
              (category) => category.id === id
            )?.order;

            if (orderDeleted !== undefined) {
              newCategories.forEach((category) => {
                if (category.order > orderDeleted) {
                  category.order -= 1;
                }
              });
            }

            return { ...prevState, categories: newCategories };
          });
        };

        const onCreate = () => {
          setValues((prevState) => {
            const newCategories = prevState.categories.map((category) => ({
              ...category,
              order: category.order + 1,
            }));
            newCategories.unshift({
              id: randomId(),
              name: "",
              isActive: false,
              isDefault: false,
              order: 0,
            });
            return { ...prevState, categories: newCategories };
          });
        };

        return (
          <Form>
            <FieldArray name="categories">
              {() => {
                return (
                  <div>
                    <button
                      type="button"
                      className="categoriesAddBtn"
                      onClick={onCreate}
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
                              remove={onDelete}
                              touched={touched}
                              errors={errors}
                              isValid={isValid}
                            />
                          ))}
                      </SortableContext>
                    </DndContext>
                  </div>
                );
              }}
            </FieldArray>

            {dirty && (
              <SubmittingBar
                handleSubmit={handleSubmit}
                resetForm={resetForm}
              />
            )}
          </Form>
        );
      }}
    </Formik>
  );
};

export default CategoriesForm;
