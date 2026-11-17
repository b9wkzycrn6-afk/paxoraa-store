
import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const products = await sql`
      SELECT id, slug, name, description, price, image_url, category, stock
      FROM products
      WHERE active = TRUE
      ORDER BY id DESC
    `;

    return NextResponse.json(products);
  } catch (error) {
    console.error("Products API error:", error);

    return NextResponse.json(
      { error: "Unable to load products" },
      { status: 500 }
    );
  }
}
