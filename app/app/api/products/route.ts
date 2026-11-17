
import { NextResponse } from "next/server";
import { sql } from "@/app/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const products = await sql`
      SELECT *
      FROM products
      ORDER BY created_at DESC
    `;

    return NextResponse.json(products);
  } catch (error) {
    console.error("Failed to fetch products:", error);

    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
