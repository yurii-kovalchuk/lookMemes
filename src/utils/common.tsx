export const COOKIE_NAME = "db_categories";
export const VIEW_COOKIE_NAME = "view_count";
export interface Category {
  id: string;
  name: string;
  isActive: boolean;
}

export const validateCategory = (category: Category) => {
  if (!category.name.trim()) throw new Error("Field cannot be empty");
};
