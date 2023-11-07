"use client";
import React from "react";
import { useFormik } from "formik";
import { LuSearch } from "react-icons/lu";

import "./SearchBar.css";

const SearchBar = () => {
  const formik = useFormik({
    initialValues: {
      search: "",
    },
    onSubmit: ({ search }, { resetForm }) => {
      console.log(search);
      resetForm();
    },
  });
  return (
    <form onSubmit={formik.handleSubmit} className="searchForm">
      <input
        id="search"
        name="search"
        type="search"
        placeholder="Search"
        className="searchInput"
        onChange={formik.handleChange}
        value={formik.values.search}
      />

      <button type="submit" className="searchBtn">
        <LuSearch size={20} />
      </button>
    </form>
  );
};

export default SearchBar;
