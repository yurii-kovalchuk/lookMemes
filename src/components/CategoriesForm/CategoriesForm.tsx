"use client";
import React from "react";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import { object, array, string } from "yup";
import { FaPlus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { randomId } from "@/utils/dbApi";
import type { Category } from "@/app/api/types/common";
import Toggle from "../Toggle/Toggle";
import "./CategoryForm.css";

type FormProps = {
  initialCategories: Category[];
};

const newCategory = {
  id: randomId(),
  name: "",
  order: 0,
  isActive: false,
  hasUpdate: true,
  isDefault: false,
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
      {({ values }) => (
        <Form>
          <FieldArray name="categories">
            {({ insert, remove }) => (
              <div>
                <button
                  type="button"
                  className="categoriesAddBtn"
                  onClick={() => insert(0, newCategory)}
                >
                  <FaPlus size={14} />
                  <span className="categoriesAddBtnText">
                    Create a Category
                  </span>
                </button>
                {values.categories &&
                  values.categories.length > 0 &&
                  values.categories.map(({ isActive, isDefault }, idx) => (
                    <div key={idx}>
                      <div className="inputdWrap">
                        <Field
                          name={`categories.${idx}.name`}
                          placeholder="Enter Category Name"
                          type="text"
                          className={`inputItem ${
                            isActive ? `inputActive` : ``
                          }`}
                        />
                        <ErrorMessage
                          name={`categories.${idx}.name`}
                          component="div"
                          className="errorMessage"
                        />
                        <div className="inputInteractive">
                          <Toggle
                            name={`categories.${idx}.isActive`}
                            isChecked={isActive}
                          />

                          {!isDefault && (
                            <button type="button" onClick={() => remove(idx)}>
                              <MdDelete size={16} />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </FieldArray>

          <button type="submit">Save Changes</button>
        </Form>
      )}
    </Formik>
  );
};

export default CategoriesForm;
