"use client";
import React from "react";
import useSWR from "swr";
import { useFormik } from "formik";
import { LuSearch } from "react-icons/lu";

import "./SearchBar.css";
import { getCategoriesBySearch } from "@/services/fetchCategories";

const SearchBar = () => {
  const { mutate } = useSWR("categories");
  const formik = useFormik({
    initialValues: {
      search: "",
    },
    onSubmit: async ({ search }, { resetForm }) => {
      const filteredCategories = await getCategoriesBySearch(search);
      mutate(filteredCategories);

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
