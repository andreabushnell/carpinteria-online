
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

        const loginPayload = {
            username: formData.email, 
            email: formData.email, 
            password: formData.password,
        };

        try {
            const user = await login(loginPayload);

            if (user?.role?.toLowerCase() === "admin") {
                navigate("/admin");
            } else {
                navigate("/");
            }
        } catch (err) {
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

            <div className="flex flex-col gap-2 text-center mb-6">
                <h2 className="text-3xl font-bold tracking-tight text-neutral-900 pt-xl">
                    Iniciar Sesión
                </h2>
            </div>

            {error && (
                <div className="p-3 mb-4 bg-red-100 text-red-700 text-sm rounded border border-red-200 font-medium text-center">
                    {error}
                </div>
            )}

      
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      
                <div className="flex flex-col gap-1">
                    <label
                        htmlFor="email"
                        className="text-sm font-medium text-neutral-700"
                    >
                        Correo
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="text"
                        required
                        className="block w-full rounded border border-neutral-300 px-3 py-2 text-neutral-950 placeholder-neutral-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary text-sm"
                        placeholder="correo@ejemplo.com"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>

                <div className="flex flex-col gap-1 mb-xl">
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

                <button
                    type="submit"
                    disabled={submitting}
                    className="w-full rounded-md bg-accent py-2 px-4 text-sm text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:bg-neutral-400 font-semibold"
                >
                    {submitting ? "Autenticando..." : "Ingresar"}
                </button>
            </form>
        </div>
    );
}
