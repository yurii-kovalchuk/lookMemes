"use client";
import React from "react";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import Image from "next/image";
import { FaPlus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { randomId } from "@/utils/api";
import ToggleOn from "@/assets/toggleOn.svg";
import ToggleOff from "@/assets/toggleOff.svg";
import type { Category } from "@/app/api/types/common";
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

function validateName(value: string) {
  let error = "";
  if (value?.length < 1) {
    error = "Name required";
  }
  return error;
}

const CategoriesForm = ({ initialCategories }: FormProps) => {
  return (
    <Formik
      initialValues={{ categories: initialCategories }}
      onSubmit={async (values) => {
        console.log(values.categories.length);
      }}
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
                {values.categories.length > 0 &&
                  values.categories.map((category, idx) => (
                    <div key={idx}>
                      <div className="inputdWrap">
                        <Field
                          name={`categories.${idx}.name`}
                          placeholder="Enter Category Name"
                          type="text"
                          className={`inputItem ${
                            category.isActive ? `inputActive` : ``
                          }`}
                          validate={validateName}
                        />
                        <ErrorMessage
                          name={`categories.${idx}.name`}
                          component="div"
                        />
                        <div className="inputInteractive">
                          <label className="InputToggle">
                            {category.isActive ? (
                              <Image src={ToggleOn} alt="toggle on" />
                            ) : (
                              <Image src={ToggleOff} alt="toggle off" />
                            )}

                            <Field
                              type="checkbox"
                              name={`categories.${idx}.isActive`}
                              className="visually-hidden"
                              checked={category.isActive}
                            />
                          </label>

                          <button type="button" onClick={() => remove(idx)}>
                            <MdDelete size={16} />
                          </button>
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
