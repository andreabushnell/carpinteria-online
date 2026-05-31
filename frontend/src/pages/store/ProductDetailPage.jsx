import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../../features/auth/hooks/useAuth"; 
import ProductDetailPanel from "../../features/products/store/ProductDetailPanel";
import AddToCartButton from "../../features/cart/store/AddToCartButton"; 

export default function ProductDetailPage() {
  const { id } = useParams();
  const { isAuthenticated } = useAuth(); 
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/products/${id}/`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product specifications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div className="text-center p-xl">Cargando especificaciones...</div>;
  if (!product) return <div className="text-center p-xl">Producto no encontrado.</div>;

  return (
    <div className="col-span-8 container mx-auto px-sm py-md w-full max-w-5xl">
      
      <div className="mb-sm">
        <Link 
          to="/" 
          className="inline-flex items-center space-x-xs text-slate-600 hover:text-slate-900 transition-colors cursor-pointer group py-xxs"
        >
          <span className="text-lg transform group-hover:-translate-x-0.5 transition-transform">
            &#8592;
          </span>
          <span className="font-medium text-sm font-body">
            Volver al catálogo
          </span>
        </Link>
      </div>

      <ProductDetailPanel product={product}>
        {isAuthenticated ? (
          <AddToCartButton productId={product.id} />
        ) : (
          <div className="bg-slate-50 p-sm border border-dashed border-slate-300 text-center rounded-sm">
            <p className="text-sm text-slate-500 font-body">
              ¿Quieres comprar esta pieza?{" "}
              <Link to="/login" className="text-accent underline font-semibold hover:text-amber-700">
                Inicia sesión
              </Link>{" "}
              o{" "}
              <Link to="/register" className="text-accent underline font-semibold hover:text-amber-700">
                regístrate
              </Link>.
            </p>
          </div>
        )}
      </ProductDetailPanel>

    </div>
  );
}