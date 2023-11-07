export const getCategories = async () => {
  const res = await fetch("/api/categories");

  if (!res.ok) throw new Error("Unable to fetch");
  return res.json();
};

export const getCategoriesBySearch = async (search: string) => {
  const res = await fetch(`/api/categories?search=${search}`);

  if (!res.ok) throw new Error("Unable to fetch");
  return res.json();
};
