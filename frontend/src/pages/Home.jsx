import { useEffect, useState } from "react";
import { getProducts } from "../api/products.api";
import { useAuth } from "../features/auth/AuthContext";

export default function Home() {
  const { user } = useAuth();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProducts();
        setProducts(res.data.results || res.data);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <header className="header">
        <div className="header__title">Carpinteria Online</div>

        <div className="header__icons">
          {user ? (
            <span>{user.username}</span>
          ) : (
            <span>Invitado</span>
          )}
        </div>
      </header>

      <nav className="navbar">
        <div className="navbar__links">
          <a href="/" className="active">Inicio</a>
          <a href="/products">Productos</a>
          <a href="/cart">Carrito</a>
        </div>

        <div className="navbar__search">
          <input placeholder="Search products..." />
        </div>
      </nav>

      <section className="product-section">
        <h2 className="product-section__title">
          Productos destacados
        </h2>

        {loading ? (
          <p>Cargando productos...</p>
        ) : (
          <div className="product-grid">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                <img
                  src={product.image || "https://via.placeholder.com/150"}
                  alt={product.name}
                />

                <div className="product-card__name">
                  {product.name}
                </div>

                <div className="product-card__price">
                  {product.price} €
                </div>

                <button className="product-card__button">
                  Añadir a carrito
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* FOOTER */}
      <footer className="footer">
        © {new Date().getFullYear()} My Store
      </footer>
    </div>
  );
}