import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
    getUserById,
    updateUser,
    registerUser,
} from "../../../api/endpoints/users";
import PanelFooter from "../footers/PanelFooter";

export default function UserDetailPanel() {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const isCreating = !id;
    const navigate = useNavigate();
    const [originalData, setOriginalData] = useState(null);

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        first_name: "",
        last_name: "",
        role: "client",
        password: "",
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!isCreating) {
            getUserById(id).then((data) => {
                setFormData(data);
                setOriginalData(data);
            });
        }
    }, [id, isCreating]);

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleAccept = async () => {
        setLoading(true);
        try {
            if (isCreating) {
                await registerUser(formData);
            } else {
                await updateUser(id, formData);
            }
            navigate("/admin/users/list");
        } catch (err) {
            console.error("Error saving user:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
            <h2 className="text-xl font-bold mb-6">
                {isCreating ? "Nuevo Usuario" : "Editar Usuario"}
            </h2>

            <div className="grid grid-cols-2 gap-4">
                <input
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Username"
                    className="border p-2 rounded"
                />
                <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="border p-2 rounded"
                />
                <input
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    placeholder="Nombre"
                    className="border p-2 rounded"
                />
                <input
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    placeholder="Apellido"
                    className="border p-2 rounded"
                />

                <input
                    name="password"
                    type="password"
                    onChange={handleChange}
                    placeholder={
                        isCreating
                            ? "Contraseña"
                            : "Nueva contraseña (opcional)"
                    }
                    className="border p-2 rounded"
                />

                <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    disabled={!isCreating}
                    className="border p-2 rounded"
                >
                    <option value="client">Cliente</option>
                    <option value="admin">Admin</option>
                </select>
            </div>

            <PanelFooter
                onReset={() =>
                    setFormData(
                        originalData || {
                            username: "",
                            email: "",
                            first_name: "",
                            last_name: "",
                            role: "client",
                            password: "",
                        },
                    )
                }
                onAccept={handleAccept}
                loading={loading}
            />
        </div>
    );
}
