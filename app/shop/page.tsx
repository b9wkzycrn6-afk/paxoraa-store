
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { addToCart } from "../lib/cart";

type Product = {
  id: number;
  slug: string;
  name: string;
  price: number;
  image_url: string;
  category: string;
};

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await fetch("/api/products");
        if (!response.ok) throw new Error("Failed to load products");

        const data = await response.json();
        setProducts(data);
      } catch {
        setMessage("Unable to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

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

      {loading ? (
        <p>Loading PAXORAA collection...</p>
      ) : products.length === 0 ? (
        <p>No products available right now.</p>
      ) : (
        <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 22 }}>
          {products.map((product) => (
            <article key={product.id} style={{ background: "#121212", paddingBottom: 18 }}>
              <img
                src={product.image_url}
                alt={product.name}
                style={{ width: "100%", aspectRatio: "4 / 5", objectFit: "cover", display: "block" }}
              />
              <div style={{ padding: "12px 15px" }}>
                <p style={{ color: "#999", fontSize: 11, letterSpacing: 2 }}>{product.category}</p>
                <h2 style={{ fontSize: 18 }}>{product.name}</h2>
                <p>${(product.price / 100).toFixed(2)} USD</p>
                <button
                  onClick={() => {
                    addToCart({
                      slug: product.slug,
                      name: product.name,
                      price: product.price / 100,
                      image: product.image_url,
                    });
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
      )}
    </main>
  );
}
