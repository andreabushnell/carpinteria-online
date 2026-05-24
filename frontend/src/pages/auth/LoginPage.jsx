// src/pages/auth/LoginPage.jsx
import { useState } from "react";
import { useAuth } from "../../features/auth/hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSubmitting(true);

        // 🧠 BACKEND ALIGNMENT PAYLOADMAP
        // We create a payload that includes both common variations.
        // Django will extract whichever key its internal configurations are looking for!
        const loginPayload = {
            username: formData.email, // Maps your text input value to "username"
            email: formData.email, // Maps your text input value to "email"
            password: formData.password,
        };

        try {
            // Send the unified mapping to your context handler
            const user = await login(loginPayload);

            if (user?.role?.toLowerCase() === "admin") {
                navigate("/admin");
            } else {
                navigate("/");
            }
        } catch (err) {
            // 🌟 THIS IS THE MAGIC CONSOLE LOG:
            if (err.response && err.response.data) {
                console.error("🛑 DJANGO REJECTION REASON:", err.response.data);
            } else {
                console.error("Login component error:", err);
            }

            setError(
                "Credenciales incorrectas. Por favor, inténtelo de nuevo.",
            );
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="w-full grid col-span-2 col-start-4 bg-white p-8 shadow-md border border-neutral-200">
            {/* Header Block */}
            <div className="flex flex-col gap-2 text-center mb-6">
                <h2 className="text-3xl font-bold tracking-tight text-neutral-900">
                    Iniciar Sesión
                </h2>
                <p className="text-sm text-neutral-600">
                    Panel Administrativo y Tienda
                </p>
            </div>

            {error && (
                <div className="p-3 mb-4 bg-red-100 text-red-700 text-sm rounded border border-red-200 font-medium text-center">
                    {error}
                </div>
            )}

            {/* Form Element */}
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                {/* Username/Email Input Group */}
                <div className="flex flex-col gap-1">
                    <label
                        htmlFor="email"
                        className="text-sm font-medium text-neutral-700"
                    >
                        Usuario o Correo
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="text"
                        required
                        className="block w-full rounded border border-neutral-300 px-3 py-2 text-neutral-950 placeholder-neutral-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary text-sm"
                        placeholder="email@example.com"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>

                {/* Password Input Group */}
                <div className="flex flex-col gap-1">
                    <label
                        htmlFor="password"
                        className="text-sm font-medium text-neutral-700"
                    >
                        Contraseña
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        className="block w-full rounded border border-neutral-300 px-3 py-2 text-neutral-950 placeholder-neutral-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary text-sm"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>

                {/* Action Button */}
                <button
                    type="submit"
                    disabled={submitting}
                    className="w-full rounded-md bg-primary py-2 px-4 mt-2 text-sm text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:bg-neutral-400 font-semibold"
                >
                    {submitting ? "Autenticando..." : "Ingresar"}
                </button>
            </form>
        </div>
    );
}
