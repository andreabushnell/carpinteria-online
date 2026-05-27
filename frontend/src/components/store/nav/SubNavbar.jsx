// components/store/nav/SubNavbar.jsx
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCategories } from "../../../api/endpoints/products"; 

export default function SubNavbar() {
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await getCategories();
        
        if (data && data.results) {
          setCategories(data.results);
        } else if (Array.isArray(data)) {
          setCategories(data);
        }
      } catch (err) {
        console.error("Error cargando categorías en SubNavbar:", err);
      }
    };

    loadCategories();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const queryClean = searchQuery.trim().toLowerCase();
    
    const matchedCategory = categories.find(
      (cat) => cat.name.toLowerCase() === queryClean
    );

    if (matchedCategory) {
      navigate(`/categories/${matchedCategory.id}`);
    } else {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
    setSearchQuery("");
  };

  return (
    <div className="col-span-8 bg-white border-b border-surface px-md py-xs flex flex-wrap items-center justify-between gap-sm">
      

      <div className="relative group">
        <button className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-md py-xs font-medium text-sm rounded-sm flex items-center space-x-xs cursor-pointer">
          <span>Explorar Categorías</span>
          <span className="text-xs">▼</span>
        </button>
        
        <div className="absolute left-0 mt-xxs w-48 bg-white border border-surface shadow-md rounded-sm hidden group-hover:block z-50">

          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/categories/${cat.id}`}
              className="block px-md py-sm text-sm text-slate-700 hover:bg-slate-50 transition-colors"
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </div>

      <form onSubmit={handleSearchSubmit} className="flex w-full sm:w-72">
        <input
          type="text"
          placeholder="Buscar muebles o categorías..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 border border-slate-300 px-sm py-xxs text-sm rounded-l-sm focus:outline-none focus:border-slate-500 bg-bg text-accent"
        />
        <button
          type="submit"
          className="bg-accent text-white px-md py-xxs text-sm rounded-r-sm hover:bg-slate-700 transition-colors cursor-pointer"
        >
          Buscar
        </button>
      </form>

    </div>
  );
}