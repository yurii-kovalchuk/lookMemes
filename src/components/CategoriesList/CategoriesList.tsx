"use client";
import { getCategories } from "@/services/fetchCategories";
import type { Category } from "@/utils/common";
import React from "react";
import useSWR from "swr";

const CategoriesList = () => {
  const { data: categories, isLoading } = useSWR("categories", getCategories);
  return isLoading ? (
    <h3>Loading... </h3>
  ) : (
    <ul>
      {categories.map((c: Category) => (
        <li key={c.id}>{c.name}</li>
      ))}
    </ul>
  );
};

export default CategoriesList;
