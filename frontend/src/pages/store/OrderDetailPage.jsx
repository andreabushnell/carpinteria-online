import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOrderById } from "../../api/endpoints/orders";
import { getProductById } from "../../api/endpoints/products";
import { getMe } from "../../api/endpoints/users";

const formatDate = (dateString) => {
    if (!dateString) return "Fecha reciente";

    const date = new Date(dateString);

    if (isNaN(date.getTime())) return dateString;

    return date.toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
};

export default function OrderDetailPage() {
    const { id: orderId } = useParams();
    const navigate = useNavigate();

    const [order, setOrder] = useState(null);
    const [customerName, setCustomerName] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const STATUS_TRANSLATIONS = {
        pending: "Pendiente",
        paid: "Pagado",
        shipped: "Enviado",
        cancelled: "Cancelado",
    };

    useEffect(() => {
        if (!orderId) {
            setError("No se proporcionó un ID de pedido en la URL.");
            setLoading(false);
            return;
        }

        const fetchOrderAndUserDetails = async () => {
            try {
                setLoading(true);

                const [orderData, userData] = await Promise.all([
                    getOrderById(orderId),
                    getMe(),
                ]);

                const fullName = [userData.first_name, userData.last_name]
                    .filter(Boolean)
                    .join(" ");
                setCustomerName(
                    fullName || userData.username || userData.email,
                );

                if (orderData.items && orderData.items.length > 0) {
                    const enrichedItems = await Promise.all(
                        orderData.items.map(async (item) => {
                            if (
                                item.product &&
                                typeof item.product === "object" &&
                                item.product.name
                            ) {
                                return {
                                    ...item,
                                    product_name: item.product.name,
                                };
                            }

                            let pId = item.product || item.product_id;
                            if (pId && typeof pId === "object") pId = pId.id;

                            if (pId && typeof pId !== "object") {
                                try {
                                    const productData =
                                        await getProductById(pId);
                                    return {
                                        ...item,
                                        product_name: productData.name,
                                    };
                                } catch (err) {
                                    return {
                                        ...item,
                                        product_name: `Producto (ID: ${pId})`,
                                    };
                                }
                            }
                            return {
                                ...item,
                                product_name: "Producto Desconocido",
                            };
                        }),
                    );
                    orderData.items = enrichedItems;
                }

                setOrder(orderData);
            } catch (err) {
                console.error(err);
                setError("No se pudo cargar el detalle del pedido.");
            } finally {
                setLoading(false);
            }
        };

        fetchOrderAndUserDetails();
    }, [orderId]);

    if (loading) {
        return (
            <div className="text-center py-12 text-neutral-500">
                Cargando detalles del pedido...
            </div>
        );
    }

    if (error || !order) {
        return (
            <div className="text-center py-12 text-red-500">
                {error || "Pedido no encontrado."}
            </div>
        );
    }

    return (
        <div className="col-span-8 mx-auto bg-white p-6 rounded-lg shadow-sm border border-neutral-200 my-8">
            <div className="flex justify-between items-center border-b border-neutral-100 pb-4 mb-6">
                <div>
                    <h2 className="text-xl font-bold">Pedido #{order.id}</h2>
                    <p className="text-sm text-neutral-500">
                        Fecha: {formatDate(order.date)}
                    </p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-secondary/10 text-secondary capitalize">
                    {STATUS_TRANSLATIONS[order.state?.toLowerCase()] ||
                        order.state ||
                        "Procesando"}
                </span>
            </div>

            <div className="mb-8">
                <h3 className="text-sm font-semibold text-neutral-700 uppercase tracking-wider mb-4">
                    Artículos
                </h3>
                <div className="divide-y divide-neutral-100 border-t border-b border-neutral-100">
                    {order.items?.map((item, index) => (
                        <div
                            key={item.id || index}
                            className="flex justify-between items-center py-4"
                        >
                            <div>
                                <h4 className="font-medium text-neutral-800">
                                    {item.product_name}
                                </h4>
                                <p className="text-sm text-neutral-500">
                                    Cantidad: {item.quantity}
                                </p>
                            </div>
                            <span className="font-semibold text-neutral-800">
                                {typeof item.unitary_price === "number"
                                    ? `${item.unitary_price.toFixed(2)}€`
                                    : `${item.unitary_price}€`}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6 bg-neutral-50 p-4 rounded-md border border-neutral-100">
                <div>
                    <h4 className="text-xs font-bold text-neutral-500 uppercase mb-2">
                        Dirección de Envío
                    </h4>
                    <p className="text-sm text-neutral-700">
                        {order.shipping_address || "No especificada"}
                    </p>

                    {order.user && (
                        <p className="text-xs text-neutral-400 mt-2">
                            Cliente:{" "}
                            <span className="font-medium text-neutral-600">
                                {customerName}
                            </span>
                        </p>
                    )}
                </div>
                <div className="flex flex-col justify-end text-right">
                    <span className="text-sm text-neutral-500">
                        Total del pedido:
                    </span>
                    <span className="text-2xl font-bold text-neutral-900 mt-1">
                        {typeof order.total === "number"
                            ? `${order.total.toFixed(2)}€`
                            : `${order.total}€`}
                    </span>
                </div>
            </div>

            <div className="mt-8 pt-4 border-t border-neutral-100 flex justify-start">
                <button
                    onClick={() => navigate(-1)}
                    className="text-sm font-semibold text-neutral-600 hover:text-neutral-900 transition-colors"
                >
                    &larr; Volver a mis pedidos
                </button>
            </div>
        </div>
    );
}
