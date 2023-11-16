import type { Category, QueryParams } from "@/app/api/types/common";

const URL = "/api/categories";

export const getCategories = async (params: QueryParams = {}) => {
  const queryString = new URLSearchParams(params).toString();
  const fullUrl = `${URL}?${queryString}`;

  const res = await fetch(fullUrl);

  if (!res.ok) throw new Error("Unable to fetch");
  return res.json();
};

// export const getCategories = async (body: Category[]) => {
//   const res = await fetch(fullUrl);

//   if (!res.ok) throw new Error("Unable to fetch");
//   return res.json();
// };
