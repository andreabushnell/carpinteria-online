import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { 
    getCategoryById, 
    createCategory, 
    updateCategory, 
    deleteCategory 
} from "../../../api/endpoints/products";

export default function CategoryDetail() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const categoryId = searchParams.get("id"); 
    
    const isEditMode = !!categoryId;

    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (isEditMode) {
            setLoading(true);
            getCategoryById(categoryId)
                .then((data) => {
                    setName(data.name || "");
                    setLoading(false);
                })
                .catch((err) => {
                    setError("No se pudo cargar la categoría.");
                    setLoading(false);
                    console.error(err);
                });
        }
    }, [categoryId, isEditMode]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name.trim()) return;

        setLoading(true);
        setError("");

        try {
            if (isEditMode) {
                await updateCategory(categoryId, { name });
            } else {
                await createCategory({ name });
            }
            navigate(-1); 
        } catch (err) {
            setError("Ocurrió un error al guardar la categoría.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm(`¿Estás seguro de que deseas eliminar esta categoría?`)) {
            return;
        }

        setLoading(true);
        try {
            await deleteCategory(categoryId);
            navigate(-1);
        } catch (err) {
            setError("No se pudo eliminar la categoría. Asegúrate de que no tenga productos asociados.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading && name === "") {
        return <div className="text-center py-10 text-neutral-500">Cargando datos de la categoría...</div>;
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">
                    {isEditMode ? "Editar Categoría" : "Nueva Categoría"}
                </h2>
                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="text-sm text-neutral-500 hover:text-neutral-800 transition-colors"
                >
                    &larr; Volver
                </button>
            </div>

            {error && (
                <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded border border-red-200">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="category-name" className="block text-sm font-medium text-neutral-700 mb-2">
                        Nombre de la Categoría
                    </label>
                    <input
                        id="category-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ej. Salón, Cocina, Dormitorio..."
                        disabled={loading}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary disabled:bg-neutral-50 transition-all"
                        required
                    />
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-neutral-100">
                    {isEditMode ? (
                        <button
                            type="button"
                            onClick={handleDelete}
                            disabled={loading}
                            className="px-4 py-2 text-sm font-semibold text-red-600 bg-red-50 border border-red-200 rounded-md hover:bg-red-100 disabled:opacity-50 transition-colors"
                        >
                            Eliminar
                        </button>
                    ) : (
                        <div /> 
                    )}

                    <button
                        type="submit"
                        disabled={loading || !name.trim()}
                        className="px-5 py-2 text-sm font-semibold text-white bg-secondary rounded-md hover:bg-secondary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {loading ? "Guardando..." : "Guardar Cambios"}
                    </button>
                </div>
            </form>
        </div>
    );
}