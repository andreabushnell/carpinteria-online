import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getOrders } from "../../../api/endpoints/orders";
import DataTable from "../tables/DataTable";

export default function OrdersListPanel() {
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasNext, setHasNext] = useState(false);
    const [hasPrev, setHasPrev] = useState(false);
    const [totalOrders, setTotalOrders] = useState(0);
    const navigate = useNavigate();

    const fetchOrders = async (page) => {
        try {
            const res = await getOrders(page); 
            
            setOrders(res.results || []);
            setTotalOrders(res.count || 0);
            
            setHasNext(!!res.next);
            setHasPrev(!!res.previous);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    useEffect(() => {
        fetchOrders(currentPage);
    }, [currentPage]);

    const columns = [
        { key: "id", label: "ID" },
        { key: "date", label: "Fecha" },
        { key: "state", label: "Estado" },
        { key: "total", label: "Total" },
        { key: "user", label: "Usuario" },
        { key: "shipping_address", label: "Dirección de envío" },
    ];

    const handleView = useCallback((id) => {
        navigate(`/admin/orders/detail?id=${id}`);
    }, [navigate]);

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Gestión de Pedidos</h2>
                <span className="text-sm text-gray-500">Total: {totalOrders} pedidos</span>
            </div>

            <DataTable
                columns={columns}
                data={orders}
                onView={handleView}
            />

            <div className="flex justify-between items-center mt-4 pt-4 border-t border-neutral-100">
                <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
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