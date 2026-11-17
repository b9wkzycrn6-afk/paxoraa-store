
const products = [
  {
    name: "PAXORAA Essential Hoodie",
    price: "$85.00",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=700"
  },
  {
    name: "PAXORAA Streetwear",
    price: "$95.00",
    image: "https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=700"
  },
  {
    name: "PAXORAA Collection",
    price: "$120.00",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=700"
  }
];

export default function Home() {
  return (
    <>
      <header>
        <a className="logo" href="/">PAXORAA</a>
        <nav>
          <a href="/shop">SHOP</a>
          <a href="/shop">COLLECTIONS</a>
          <a href="/about">ABOUT</a>
          <a href="/contact">CONTACT</a>
        </nav>
      </header>

      <main>
        <section className="hero">
          <span className="eyebrow">THE NEXT GENERATION</span>
          <h1>BUILT<br />DIFFERENT.</h1>
          <p>
            A new expression of streetwear.
            Designed to stand apart. Made to be remembered.
          </p>
          <a className="button" href="/shop">EXPLORE COLLECTION</a>
        </section>

        <section className="section">
          <span className="eyebrow">PAXORAA / SEASON 001</span>
          <h2>FEATURED COLLECTION</h2>
          <div className="products">
            {products.map((product) => (
              <article className="product" key={product.name}>
                <img src={product.image} alt={product.name} />
                <h3>{product.name}</h3>
                <p>{product.price}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer>
        PAXORAA © 2026 — ALL RIGHTS RESERVED
      </footer>
    </>
  );
}
