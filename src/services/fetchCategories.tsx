import type { Category, QueryParams } from "@/app/api/types/common";

const URL = "/api/categories";

export const getCategories = async (params: QueryParams = {}) => {
  const queryString = new URLSearchParams(params).toString();
  const fullUrl = `${URL}?${queryString}`;

  const res = await fetch(fullUrl);

  if (!res.ok) throw new Error("Unable to fetch");
  return res.json();
};

export const postCategories = async (categories: Category[]) => {
  const res = await fetch("/api/categories", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(categories),
  });

  if (!res.ok) throw new Error("Unable to fetch");
  return res.json();
};
