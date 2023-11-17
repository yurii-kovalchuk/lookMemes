import { getCategoriesFromCookie, setCategoriesToCookie } from "@/utils/dbApi";
import { createEdgeRouter } from "next-connect";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { QueryParams } from "../types/common";

const router = createEdgeRouter<
  NextRequest,
  {
    params?: QueryParams;
  }
>();

router.get((req) => {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search");
  let categories = getCategoriesFromCookie(req);

  if (search) {
    categories = categories.filter((c) =>
      c.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );
  }
  return NextResponse.json(categories);
});

router.post(async (req) => {
  const body = await req.json();

  if (!body) {
    return NextResponse.json({ error: "body is required" });
  }

  const res = NextResponse.json("success");
  setCategoriesToCookie(res, body);
  return res;
});

router.put(async (req) => {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const body = await req.json();

  if (!id) {
    return NextResponse.json({ error: "ID is required" });
  }

  if (!body) {
    return NextResponse.json({ error: "body is required" });
  }

  const categories = getCategoriesFromCookie(req);

  let categoryIndex = categories.findIndex((category) => category.id === id);
  if (categoryIndex === -1) {
    return NextResponse.json({ error: "Category not found" });
  }

  categories[categoryIndex] = { ...categories[categoryIndex], ...body };
  const res = NextResponse.json(body);

  setCategoriesToCookie(res, categories);

  return res;
});

router.delete(async (req) => {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "ID is required" });
  }

  const categories = getCategoriesFromCookie(req);
  const updatedCategories = categories.filter((category) => category.id !== id);

  if (updatedCategories.length === categories.length) {
    return NextResponse.json({ error: "Category not found" });
  }

  const res = NextResponse.json({ message: "deleted" });
  setCategoriesToCookie(res, updatedCategories);

  return res;
});

export async function GET(
  request: NextRequest,
  ctx: { params?: QueryParams }
): Promise<void | Response> {
  return router.run(request, ctx) as Promise<void | Response>;
}

export async function POST(
  request: NextRequest,
  ctx: { params?: QueryParams }
): Promise<void | Response> {
  return router.run(request, ctx) as Promise<void | Response>;
}

export async function PUT(
  request: NextRequest,
  ctx: { params?: QueryParams }
): Promise<void | Response> {
  return router.run(request, ctx) as Promise<void | Response>;
}

export async function DELETE(
  request: NextRequest,
  ctx: { params?: QueryParams }
): Promise<void | Response> {
  return router.run(request, ctx) as Promise<void | Response>;
}
