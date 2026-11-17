
"use client";

import { useState } from "react";
import Link from "next/link";
import { addToCart } from "../lib/cart";

const products = [
  {
    slug: "essential-hoodie",
    name: "Essential Hoodie",
    price: 85,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800",
    category: "HOODIES"
  },
  {
    slug: "streetwear-jacket",
    name: "Streetwear Jacket",
    price: 120,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800",
    category: "OUTERWEAR"
  },
  {
    slug: "essential-shirt",
    name: "Essential Tee",
    price: 45,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800",
    category: "TOPS"
  },
  {
    slug: "streetwear-fit",
    name: "Signature Streetwear",
    price: 95,
    image: "https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=800",
    category: "COLLECTION"
  }
];

export default function ShopPage() {
  const [message, setMessage] = useState("");

  return (
    <main style={{ background: "#080808", color: "white", minHeight: "100vh", padding: "35px 6%" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #333", paddingBottom: 22 }}>
        <Link href="/" style={{ fontSize: 24, fontWeight: 900, letterSpacing: 5 }}>PAXORAA</Link>
        <Link href="/cart">BAG / CART</Link>
      </header>

      <section style={{ padding: "55px 0 30px" }}>
        <p style={{ color: "#aaa", letterSpacing: 5 }}>PAXORAA / COLLECTION 001</p>
        <h1 style={{ fontSize: "clamp(42px, 8vw, 76px)", margin: "12px 0" }}>THE COLLECTION</h1>
        <p style={{ color: "#aaa" }}>Discover the latest from PAXORAA.</p>
        {message && <p style={{ color: "#9ee6b0" }}>{message}</p>}
      </section>

      <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 22 }}>
        {products.map((product) => (
          <article key={product.slug} style={{ background: "#121212", paddingBottom: 18 }}>
            <img
              src={product.image}
              alt={product.name}
              style={{ width: "100%", aspectRatio: "4 / 5", objectFit: "cover", display: "block" }}
            />
            <div style={{ padding: "12px 15px" }}>
              <p style={{ color: "#999", fontSize: 11, letterSpacing: 2 }}>{product.category}</p>
              <h2 style={{ fontSize: 18 }}>{product.name}</h2>
              <p>${product.price.toFixed(2)} USD</p>
              <button
                onClick={() => {
                  addToCart(product);
                  setMessage(`${product.name} added to your bag.`);
                }}
                style={{ width: "100%", padding: 14, background: "#eee", color: "#080808", border: 0, fontWeight: 700 }}
              >
                ADD TO BAG
              </button>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
