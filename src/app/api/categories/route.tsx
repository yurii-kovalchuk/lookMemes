import {
  getCategoriesFromCookie,
  randomId,
  createCategories,
} from "@/utils/dbApi";
import { createEdgeRouter } from "next-connect";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { Category } from "../types/common";
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

  const res = NextResponse.json("success");
  createCategories(res, body);
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
