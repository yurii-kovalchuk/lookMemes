import { getCategories, randomId, createCategories } from "@/utils/api";
import type { Category } from "@/utils/common";
import { validateCategory } from "@/utils/common";
import { createEdgeRouter } from "next-connect";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const router = createEdgeRouter<
  NextRequest,
  { params?: void | Response | Promise<void | Response> }
>();

router.get((req) => {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search");
  const categories = getCategories(req);

  let filteredCategories = categories;
  if (search) {
    filteredCategories = categories.filter((c) =>
      c.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );
  }
  return NextResponse.json(filteredCategories);
});

router.post(async (req) => {
  const body = await req.json();
  const categories = getCategories(req);
  const newCategory = {
    id: randomId(),
    isActive: false,
    ...body,
  } as Category;
  validateCategory(newCategory);
  categories.push(newCategory);
  const res = NextResponse.json(newCategory);
  createCategories(res, categories);
  return res;
});

export async function GET(
  request: NextRequest,
  ctx: { params?: void | Response | Promise<void | Response> }
) {
  return router.run(request, ctx);
}

export async function POST(
  request: NextRequest,
  ctx: { params?: void | Response | Promise<void | Response> }
) {
  return router.run(request, ctx);
}
