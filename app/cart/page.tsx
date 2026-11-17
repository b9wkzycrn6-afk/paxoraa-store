
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CartItem, getCart, updateQuantity } from "../lib/cart";

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const refresh = () => setItems(getCart());
    refresh();
    window.addEventListener("paxoraa-cart-updated", refresh);
    return () => window.removeEventListener("paxoraa-cart-updated", refresh);
  }, []);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <main style={{ background: "#080808", color: "white", minHeight: "100vh", padding: "35px 6%" }}>
      <header style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #333", paddingBottom: 22 }}>
        <Link href="/" style={{ fontSize: 24, fontWeight: 900, letterSpacing: 5 }}>PAXORAA</Link>
        <Link href="/shop">CONTINUE SHOPPING</Link>
      </header>

      <h1 style={{ fontSize: 48, marginTop: 45 }}>YOUR BAG</h1>

      {items.length === 0 ? (
        <section style={{ padding: "50px 0" }}>
          <p style={{ color: "#aaa" }}>Your shopping bag is currently empty.</p>
          <Link href="/shop" style={{ display: "inline-block", background: "#eee", color: "#080808", padding: 16, marginTop: 15 }}>
            EXPLORE THE COLLECTION
          </Link>
        </section>
      ) : (
        <>
          {items.map((item) => (
            <article key={item.slug} style={{ display: "flex", gap: 18, alignItems: "center", padding: "20px 0", borderBottom: "1px solid #333" }}>
              <img src={item.image} alt={item.name} style={{ width: 105, aspectRatio: "4 / 5", objectFit: "cover" }} />
              <div style={{ flex: 1 }}>
                <h2 style={{ fontSize: 18 }}>{item.name}</h2>
                <p>${item.price.toFixed(2)}</p>
                <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                  <button onClick={() => updateQuantity(item.slug, item.quantity - 1)}>-</button>
                  {item.quantity}
                  <button onClick={() => updateQuantity(item.slug, item.quantity + 1)}>+</button>
                  <button onClick={() => updateQuantity(item.slug, 0)}>Remove</button>
                </div>
              </div>
              <strong>${(item.price * item.quantity).toFixed(2)}</strong>
            </article>
          ))}

          <section style={{ maxWidth: 400, marginLeft: "auto", paddingTop: 30 }}>
            <h2>Subtotal: ${total.toFixed(2)} USD</h2>
            <p style={{ color: "#999" }}>Shipping and taxes calculated at checkout.</p>
            <button
              disabled
              style={{ width: "100%", padding: 17, background: "#555", color: "white", border: 0, marginTop: 15 }}
            >
              CHECKOUT COMING SOON
            </button>
            <p style={{ color: "#999", fontSize: 12 }}>Secure payment checkout will be connected after Square setup.</p>
          </section>
        </>
      )}
    </main>
  );
}
