"use client";
import React from "react";
import useSWR from "swr";
import { getCategories } from "@/services/fetchCategories";
import CategoriesForm from "@/components/CategoriesForm/CategoriesForm";
import type { Category } from "./api/types/common";
import "./styles.css";

export default function Home() {
  const { data: categories, isLoading } = useSWR<Category[]>(
    "categories",
    getCategories
  );

  return (
    <main>
      <div className="container">
        <div className="categoriesContainer">
          {isLoading ? (
            <h3>Loading... </h3>
          ) : (
            categories && <CategoriesForm initialCategories={categories} />
          )}
        </div>
      </div>
    </main>
  );
}
