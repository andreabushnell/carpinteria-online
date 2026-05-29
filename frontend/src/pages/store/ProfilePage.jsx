import { useState, useEffect } from "react";
import { getMe, updateProfile, changePassword } from "../../api/endpoints/users"; 

export default function ProfilePage() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({ type: "", message: "" });

    useEffect(() => {
        getMe().then((data) => {
            setFormData((prev) => ({
                ...prev,
                username: data.username || "",
                email: data.email || "",
            }));
        });
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ type: "", message: "" });
        setLoading(true);

        try {
            await updateProfile({
                username: formData.username,
                email: formData.email,
            });

            if (formData.oldPassword || formData.newPassword) {
                if (formData.newPassword !== formData.confirmPassword) {
                    setStatus({ type: "error", message: "Las contraseñas nuevas no coinciden." });
                    setLoading(false);
                    return;
                }
                
                await changePassword({
                    old_password: formData.oldPassword,
                    new_password: formData.newPassword,
                });
            }

            setStatus({ type: "success", message: "¡Perfil y credenciales actualizados correctamente!" });
         
            setFormData((prev) => ({ ...prev, oldPassword: "", newPassword: "", confirmPassword: "" }));
        } catch (err) {
            console.error(err);
            const backendMessage = err.response?.data?.detail || "Error al actualizar tu información.";
            setStatus({ type: "error", message: backendMessage });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="col-span-8 mx-auto bg-white p-6 rounded-lg shadow-sm border border-neutral-200 my-8">
            <h2 className="text-xl font-bold mb-2">Mi Perfil</h2>
            <p className="text-sm text-neutral-500 mb-6">Actualiza tu información personal y credenciales de acceso.</p>

            {status.message && (
                <div className={`mb-6 p-3 text-sm rounded border ${
                    status.type === "success" 
                        ? "bg-green-50 text-green-700 border-green-200" 
                        : "bg-red-50 text-red-600 border-red-200"
                }`}>
                    {status.message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-neutral-600">Nombre de Usuario</label>
                    <input
                        name="username"
                        type="text"
                        value={formData.username}
                        onChange={handleChange}
                        className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-secondary/20"
                        required
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-neutral-600">Correo Electrónico</label>
                    <input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-secondary/20"
                        required
                    />
                </div>

                <div className="border-t border-neutral-100 my-6 pt-4">
                    <h3 className="text-sm font-bold text-neutral-700 mb-3">Cambiar Contraseña (Opcional)</h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-semibold text-neutral-600">Nueva Contraseña</label>
                            <input
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-secondary/20"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-semibold text-neutral-600">Confirmar Contraseña</label>
                            <input
                                name="confirmPassword"
                                type="password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="••••••••"
                                className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-secondary/20"
                            />
                        </div>
                    </div>
                </div>

                <div className="pt-4 flex justify-end">
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-5 py-2 text-sm font-semibold text-white bg-secondary rounded-md hover:bg-secondary/90 disabled:opacity-50 transition-colors shadow-sm"
                    >
                        {loading ? "Guardando..." : "Guardar Cambios"}
                    </button>
                </div>
            </form>
        </div>
    );
}