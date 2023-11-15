export type QueryParams = Record<string, string>;

const URL = "/api/categories";

export const getCategories = async (
  params: QueryParams = { search: "search" }
) => {
  const queryString = new URLSearchParams(params).toString();
  const fullUrl = `${URL}?${queryString}`;

  const res = await fetch(fullUrl);

  if (!res.ok) throw new Error("Unable to fetch");
  return res.json();
};
