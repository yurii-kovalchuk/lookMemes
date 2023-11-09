"use client";
import { getCategories } from "@/services/fetchCategories";
import type { Category } from "@/utils/common";
import React from "react";
import useSWR from "swr";
import CategoryItem from "../CategoryItem/CategoryItem";
import "./CategoriesList";

const CategoriesList = () => {
  const { data: categories, isLoading } = useSWR("categories", getCategories);
  return isLoading ? (
    <h3>Loading... </h3>
  ) : (
    <ul>
      {categories.map((category: Category) => (
        <CategoryItem key={category.id} info={category} />
      ))}
    </ul>
  );
};

export default CategoriesList;
