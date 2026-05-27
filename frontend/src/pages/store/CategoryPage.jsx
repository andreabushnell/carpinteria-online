// pages/store/CategoryPage.jsx
import { useParams, Link, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ProductCard from "../../features/products/store/ProductCard";
import { getCategoryById } from "../../api/endpoints/products"; 
import axiosClient from "../../api/client/axios"; 

export default function CategoryPage() {
  const { id } = useParams(); 
  const [searchParams] = useSearchParams();
  
  // Mantenemos searchParams solo para capturar el texto del buscador (?q=...)
  const searchQuery = searchParams.get("q"); 

  const [title, setTitle] = useState("Productos");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true; 
    
    const fetchCatalogData = async () => {
      setLoading(true);
      try {
        let endpoint = "";
        
        if (id) {
          endpoint = `/products/?category=${id}`;
          const catData = await getCategoryById(id);
          if (isMounted) setTitle(catData.name);
        } else if (searchQuery) {
          endpoint = `/products/?search=${encodeURIComponent(searchQuery)}`;
          if (isMounted) setTitle(`Resultados para: "${searchQuery}"`);
        }

        const res = await axiosClient.get(endpoint);
        
        if (isMounted) {
          // Curación de datos: si tu Django mantiene la paginación global activa, 
          // los productos vendrán dentro de .results; si la quitas en el backend, vendrán en res.data directamente.
          const data = res.data.results ? res.data.results : res.data;
          setProducts(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error("Error al cargar el catálogo:", error);
        if (isMounted) setProducts([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchCatalogData();

    return () => {
      isMounted = false;
    };
  }, [id, searchQuery]); // Quitamos currentPage de las dependencias

  if (loading) return <div className="text-center p-xl">Cargando catálogo...</div>;

  return (
    <div className="col-span-8 container mx-auto px-sm py-md w-full max-w-6xl">
      
      <div className="mb-md">
        <Link to="/" className="inline-flex items-center space-x-xs text-slate-500 hover:text-slate-900 text-sm">
          <span>&#8592;</span>
          <span>Volver al inicio</span>
        </Link>
      </div>

      <h1 className="text-3xl font-bold font-display text-slate-900 uppercase tracking-wide mb-lg border-b border-surface pb-xs">
        {title}
      </h1>

      {products.length === 0 ? (
        <p className="text-slate-500 italic text-center py-xl">
          No se encontraron piezas en este momento.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-md mb-xl">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}