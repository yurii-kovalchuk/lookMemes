import type { NextRequest, NextResponse } from "next/server";
import type { Category } from "@/app/api/types/common";

export const randomId = () => crypto.randomUUID();

const COOKIE_NAME = "db_categories";

const defaultCategories = [
  {
    id: randomId(),
    name: "Other",
    isActive: true,
    hasUpdate: false,
    isDefault: true,
  },
];

export const getCategoriesFromCookie = (req: NextRequest): Category[] => {
  let cookie = req.cookies.get(COOKIE_NAME);

  while (!cookie) {
    req.cookies.set(COOKIE_NAME, JSON.stringify(defaultCategories));
    cookie = req.cookies.get(COOKIE_NAME);
  }

  return JSON.parse(cookie.value);
};

export const createCategories = (res: NextResponse, categories: Category[]) => {
  res.cookies.set(COOKIE_NAME, JSON.stringify(categories));
  return res;
};
