import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
    getProductById,
    updateProduct,
    createProduct,
    deleteProduct,
    getCategories,
} from "../../../api/endpoints/products";

export default function ProductDetailPanel() {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const isCreating = !id;
    const navigate = useNavigate();
    
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        stock: 0,
        price: "",
        category_id: "",
    });

    useEffect(() => {
        getCategories().then((res) => {
            setCategories(res.results || []);
        });
    }, []);

    useEffect(() => {
        if (!isCreating) {
            setLoading(true);
            getProductById(id)
                .then((data) => {
                    setFormData(data);
                    setLoading(false);
                })
                .catch((err) => {
                    setError("No se pudo cargar el producto.");
                    setLoading(false);
                    console.error(err);
                });
        }
    }, [id, isCreating]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ 
            ...formData, 
            [name]: name === "stock" ? parseInt(value, 10) || 0 : value 
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            if (isCreating) {
                await createProduct(formData);
            } else {
                await updateProduct(id, formData);
            }
            navigate("/admin/products/list");
        } catch (err) {
            setError("Ocurrió un error al guardar el producto.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm("¿Estás seguro de que deseas eliminar este producto?")) {
            return;
        }

        setLoading(true);
        setError("");
        try {
            await deleteProduct(id);
            navigate("/admin/products/list");
        } catch (err) {
            setError("No se pudo eliminar el producto. Asegúrate de que no esté asociado a ningún pedido activo.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading && formData.name === "") {
        return <div className="text-center py-10 text-neutral-500">Cargando datos del producto...</div>;
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">
                    {isCreating ? "Nuevo Producto" : "Editar Producto"}
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
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-neutral-600">Nombre</label>
                        <input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Nombre del producto"
                            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary"
                            disabled={loading}
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-neutral-600">Categoría</label>
                        <select
                            name="category_id"
                            value={formData.category_id}
                            onChange={handleChange}
                            className="border p-2 rounded bg-white focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary"
                            disabled={loading}
                            required
                        >
                            <option value="">Selecciona una categoría</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-neutral-600">Precio (€)</label>
                        <input
                            name="price"
                            type="number"
                            step="0.01"
                            value={formData.price}
                            onChange={handleChange}
                            placeholder="0.00"
                            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary"
                            disabled={loading}
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-neutral-600">Stock</label>
                        <input
                            name="stock"
                            type="number"
                            value={formData.stock}
                            onChange={handleChange}
                            placeholder="Cantidad disponible"
                            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary"
                            disabled={loading}
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-1 col-span-2">
                        <label className="text-xs font-semibold text-neutral-600">Descripción</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Escribe una descripción detallada..."
                            rows="4"
                            className="border p-2 rounded resize-none focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary"
                            disabled={loading}
                            required
                        />
                    </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-neutral-100">
                    {!isCreating ? (
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
                        disabled={loading || !formData.name.trim()}
                        className="px-5 py-2 text-sm font-semibold text-white bg-secondary rounded-md hover:bg-secondary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {loading ? "Guardando..." : "Guardar Cambios"}
                    </button>
                </div>
            </form>
        </div>
    );
}