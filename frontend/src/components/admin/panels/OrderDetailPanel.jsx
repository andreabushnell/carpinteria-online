import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getOrderById, updateOrder, updateOrderStatus } from "../../../api/endpoints/orders";
import PanelFooter from "../footers/PanelFooter";

export default function OrderDetailPanel() {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        id: "",
        date: "",
        state: "",
        total: "",
        user: "",
        shipping_address: "",
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (id) {
            getOrderById(id).then(setFormData);
        }
    }, [id]);

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleAccept = async () => {
        setLoading(true);
        try {
            await updateOrder(id, {
                shipping_address: formData.shipping_address,
            });

            await updateOrderStatus(id, formData.state);

            navigate("/admin/orders/list");
        } catch (err) {
            console.error("Error updating order:", err);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
            <h2 className="text-xl font-bold mb-6">Detalle del Pedido #{id}</h2>

            <div className="grid grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-500">
                        Fecha
                    </label>
                    <input
                        value={formData.date}
                        readOnly
                        className="w-full border p-2 rounded bg-gray-50"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-500">
                        Total
                    </label>
                    <input
                        value={`${formData.total} €`}
                        readOnly
                        className="w-full border p-2 rounded bg-gray-50"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Estado
                    </label>
                    <select
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    >
                        <option value="pending">Pending</option>
                        <option value="paid">Paid</option>
                        <option value="shipped">Shipped</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Dirección de envío
                    </label>
                    <input
                        name="shipping_address"
                        value={formData.shipping_address}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    />
                </div>
            </div>

            <PanelFooter
                showReset={false}
                onAccept={handleAccept}
                loading={loading}
            />
        </div>
    );
}
