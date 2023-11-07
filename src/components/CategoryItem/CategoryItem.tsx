import React from "react";
import type { Category } from "@/utils/common";
import "./CategoryItem.css";

const CategoryItem = ({ info }: { info: Category }) => {
  return <li className="categoryItem">{info.name}</li>;
};

export default CategoryItem;
