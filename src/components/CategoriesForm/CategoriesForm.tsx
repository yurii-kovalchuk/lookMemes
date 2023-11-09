"use client";
import React from "react";
import {
  Formik,
  Field,
  Form,
  ErrorMessage,
  FieldArray,
  FieldProps,
} from "formik";
import { FaPlus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { randomId } from "@/utils/api";
import "./CategoryForm.css";

type FormValue = {
  id: string;
  name: string;
  isActive: boolean;
};

type MyFormValues = {
  categories: FormValue[] | [];
};

const emptyCategory = {
  id: randomId(),
  name: "",
  isActive: false,
};

function validateName(value: string) {
  let error;
  if (value?.length < 1) {
    error = "Name required";
  }
  return error;
}

const AddingForm = () => {
  const initialValues: { categories: FormValue[] | [] } = { categories: [] };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values) => {
        console.log(values);
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
                  onClick={() => insert(0, emptyCategory)}
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
                          className="inputItem"
                          validate={validateName}
                        />
                        <ErrorMessage
                          name={`categories.${idx}.name`}
                          component="div"
                        />
                        {/* <label htmlFor={`categories.${idx}.isActive`}>
                          qweqwe
                          <Field
                            type="checkbox"
                            name={`categories.${idx}.isActive`}
                          >
                            {({ field }: FieldProps) => {
                              console.log(field.value);
                              return (
                                <Field
                                  type="checkbox"
                                  name={`categories.${idx}.isActive`}
                                />
                              );
                            }}
                          </Field>
                        </label> */}
                        <button
                          type="button"
                          onClick={() => {
                            values.categories[idx].isActive =
                              !values.categories[idx].isActive;
                          }}
                        >
                          {values.categories[idx].isActive
                            ? "active"
                            : "disabled"}
                        </button>

                        <button
                          type="button"
                          onClick={() => remove(idx)}
                          className="deleteBtn"
                        >
                          <MdDelete size={16} />
                        </button>
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

export default AddingForm;
