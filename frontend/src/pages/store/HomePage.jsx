import { useState, useEffect } from 'react';
import ProductCard from '../../features/products/store/ProductCard'; 

const CategoryCarousel = ({ category }) => {
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 5;

  const handleNext = () => {
    if (startIndex + itemsPerPage < category.products.length) {
      setStartIndex((prev) => prev + itemsPerPage);
    }
  };

  const handlePrev = () => {
    if (startIndex - itemsPerPage >= 0) {
      setStartIndex((prev) => prev - itemsPerPage);
    }
  };

  const visibleProducts = category.products.slice(startIndex, startIndex + itemsPerPage);

  return (
    <section className="carousel-section w-full">
      <h2 className="text-2xl font-bold font-display mb-sm uppercase tracking-wide">
        {category.name}
      </h2>
      
      {category.products.length === 0 ? (
        <p className="text-neutral-400 italic">No hay productos en esta categoría.</p>
      ) : (
        <div className="flex items-center w-full gap-xs">
          
          <button 
            onClick={handlePrev}
            disabled={startIndex === 0}
            className="shrink-0 p-2 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-full disabled:opacity-30 transition-colors cursor-pointer"
          >
            &#8592;
          </button>

          <div className="flex-1 w-full overflow-hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-md w-full">
              
              {visibleProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}

            </div>
          </div>

          <button 
            onClick={handleNext}
            disabled={startIndex + itemsPerPage >= category.products.length}
            className="shrink-0 p-2 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-full disabled:opacity-30 transition-colors cursor-pointer"
          >
            &#8594;
          </button>
          
        </div>
      )}
    </section>
  );
};

export default function HomePage() {
  const [carousels, setCarousels] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomepageData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/homepage/?page=${currentPage}`);
        const data = await response.json();
        
        setCarousels(data.results); 
        setTotalPages(Math.ceil(data.count / 4)); 
      } catch (error) {
        console.error("Error loading homepage dynamic content:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHomepageData();
  }, [currentPage]); 

  if (loading) return <div className="text-center p-xl">Cargando colecciones...</div>;

  return (
    <div className="grid col-span-8 container mx-auto px-sm py-md space-y-xl w-full overflow-hidden">
      {carousels.map((category) => (
        <CategoryCarousel key={category.id} category={category} />
      ))}

      <div className="flex items-center justify-center space-x-md border-t border-surface pt-md">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(prev => prev - 1)}
          className="px-md py-xs bg-slate-100 hover:bg-slate-200 disabled:opacity-50 transition-colors"
        >
          Anterior
        </button>
        <span className="font-body text-sm">
          Página {currentPage} de {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(prev => prev + 1)}
          className="px-md py-xs bg-slate-100 hover:bg-slate-200 disabled:opacity-50 transition-colors"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}