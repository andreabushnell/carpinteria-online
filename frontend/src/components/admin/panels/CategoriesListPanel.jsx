import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../../../api/endpoints/products";
import DataTable from "../tables/DataTable";

export default function UsersListPanel() {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getCategories().then((res) => {
            setCategories(res.results || []);
        });
    }, []);

    const columns = [
        { key: "id", label: "ID" },
        { key: "name", label: "Nombre" },
    ];

        const handleView = useCallback((id) => {
            navigate(`/admin/categories/detail?id=${id}`);
        }, [navigate]);

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Gestión de Categorías</h2>
                <button
                    onClick={() => navigate("/admin/categories/detail")}
                    className="bg-white text-secondary px-4 py-2 rounded-md font-semibold text-sm hover:bg-secondary/90 hover:text-white"
                >
                    + Nueva Categoría
                </button>
            </div>

            <DataTable
                columns={columns}
                data={categories}
                onView={handleView}
            />
        </div>
    );
}
