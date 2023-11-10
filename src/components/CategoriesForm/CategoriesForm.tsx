"use client";
import React from "react";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import Image from "next/image";
import { FaPlus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { randomId } from "@/utils/api";
import "./CategoryForm.css";
import ToggleOn from "@/assets/toggleOn.svg";
import ToggleOff from "@/assets/toggleOff.svg";

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
  const initialValues: MyFormValues = { categories: [] };
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

export default AddingForm;
