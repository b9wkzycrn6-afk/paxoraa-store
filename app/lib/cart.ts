
export type CartItem = {
  slug: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

const CART_KEY = "paxoraa-cart";

export function getCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
  } catch {
    return [];
  }
}

export function saveCart(items: CartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("paxoraa-cart-updated"));
}

export function addToCart(item: Omit<CartItem, "quantity">) {
  const cart = getCart();
  const existing = cart.find((product) => product.slug === item.slug);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }

  saveCart(cart);
}

export function updateQuantity(slug: string, quantity: number) {
  const cart = getCart()
    .map((item) => item.slug === slug ? { ...item, quantity } : item)
    .filter((item) => item.quantity > 0);

  saveCart(cart);
}

export function clearCart() {
  saveCart([]);
}
