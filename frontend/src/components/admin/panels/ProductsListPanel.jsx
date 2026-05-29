import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../../../api/endpoints/products";
import DataTable from "../tables/DataTable";

export default function ProductsListPanel() {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasNext, setHasNext] = useState(false);
    const [hasPrev, setHasPrev] = useState(false);
    const [totalProducts, setTotalProducts] = useState(0);
    const navigate = useNavigate();

    const fetchProducts = async (pageNumber) => {
        try {
            const res = await getProducts(pageNumber);
            setProducts(res.results || []);
            setTotalProducts(res.count || 0);
            setHasNext(!!res.next);
            setHasPrev(!!res.previous);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        fetchProducts(currentPage);
    }, [currentPage]);

    const columns = [
        { key: "id", label: "ID" },
        { key: "name", label: "Nombre" },
        { key: "description", label: "Descripción" },
        { key: "stock", label: "Stock" },
        { key: "price", label: "Precio" },
        { key: "category_id", label: "Categoría" },
    ];

    const handleView = useCallback(
        (id) => {
            navigate(`/admin/products/detail?id=${id}`);
        },
        [navigate],
    );

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-baseline gap-3">
                    <h2 className="text-xl font-bold">Gestión de Productos</h2>
                    <span className="text-sm text-gray-500">
                        Total: {totalProducts} productos
                    </span>
                </div>
                <button
                    onClick={() => navigate("/admin/products/detail")}
                    className="bg-white text-secondary px-4 py-2 rounded-md font-semibold text-sm hover:bg-secondary/90 hover:text-white border border-neutral-200 shadow-sm"
                >
                    + Nuevo Producto
                </button>
            </div>

            <DataTable columns={columns} data={products} onView={handleView} />

            <div className="flex justify-between items-center mt-4 pt-4 border-t border-neutral-100">
                <button
                    onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={!hasPrev}
                    className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded shadow-sm hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    Anterior
                </button>

                <span className="text-sm font-medium text-gray-700">
                    Página {currentPage}
                </span>

                <button
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    disabled={!hasNext}
                    className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded shadow-sm hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    Siguiente
                </button>
            </div>
        </div>
    );
}
