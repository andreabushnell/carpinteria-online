import { useState } from "react";
import { useAuth } from "../../features/auth/hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";

export default function RegisterPage() {
    const { register } = useAuth(); 
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        first_name: "",
        last_name: "",
        password: "",
        confirmPassword: "",
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

        if (formData.password !== formData.confirmPassword) {
            setError("Las contraseñas no coinciden.");
            return;
        }

        setSubmitting(true);

      
        const registerPayload = {
            username: formData.username.trim(),
            email: formData.email.trim().toLowerCase(),
            first_name: formData.first_name.trim(),
            last_name: formData.last_name.trim(),
            password: formData.password
        };

        try {
            await register(registerPayload);
            
            navigate("/login"); 
        } catch (err) {
            if (err.response && err.response.data) {
                console.error("🛑 DJANGO REGISTRATION REJECTION REASON:", err.response.data);
                
                const serverErrors = err.response.data;
                if (serverErrors.username) {
                    setError(`Usuario: ${serverErrors.username[0]}`);
                } else if (serverErrors.email) {
                    setError(`Correo: ${serverErrors.email[0]}`);
                } else {
                    setError("Error al registrar el usuario. Compruebe los datos ingresados.");
                }
            } else {
                console.error("Register component error:", err);
                setError("Hubo un error de conexión con el servidor.");
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="w-full grid col-span-2 col-start-4 bg-white p-8 shadow-md border border-neutral-200 my-8">
            
            <div className="flex flex-col gap-2 text-center mb-6">
                <h2 className="text-3xl font-bold tracking-tight text-neutral-900 pt-xl">
                    Crear Cuenta
                </h2>
                <p className="text-sm text-neutral-600">
                    Regístrate para empezar tus compras en Carpintería Online
                </p>
            </div>

            {error && (
                <div className="p-3 mb-4 bg-red-100 text-red-700 text-sm rounded border border-red-200 font-medium text-center">
                    {error}
                </div>
            )}

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                
                <div className="flex flex-col gap-1">
                    <label htmlFor="username" className="text-sm font-medium text-neutral-700">
                        Nombre de Usuario
                    </label>
                    <input
                        id="username"
                        name="username"
                        type="text"
                        required
                        className="block w-full rounded border border-neutral-300 px-3 py-2 text-neutral-950 placeholder-neutral-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary text-sm"
                        placeholder="ejemplo123"
                        value={formData.username}
                        onChange={handleChange}
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="email" className="text-sm font-medium text-neutral-700">
                        Correo Electrónico
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        className="block w-full rounded border border-neutral-300 px-3 py-2 text-neutral-950 placeholder-neutral-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary text-sm"
                        placeholder="correo@ejemplo.com"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="first_name" className="text-sm font-medium text-neutral-700">
                            Nombre
                        </label>
                        <input
                            id="first_name"
                            name="first_name"
                            type="text"
                            required
                            className="block w-full rounded border border-neutral-300 px-3 py-2 text-neutral-950 placeholder-neutral-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary text-sm"
                            placeholder=""
                            value={formData.first_name}
                            onChange={handleChange}
                        />
                    </div>
                    
                    <div className="flex flex-col gap-1">
                        <label htmlFor="last_name" className="text-sm font-medium text-neutral-700">
                            Apellido
                        </label>
                        <input
                            id="last_name"
                            name="last_name"
                            type="text"
                            required
                            className="block w-full rounded border border-neutral-300 px-3 py-2 text-neutral-950 placeholder-neutral-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary text-sm"
                            placeholder=""
                            value={formData.last_name}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="password" className="text-sm font-medium text-neutral-700">
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

                <div className="flex flex-col gap-1 mb-xl">
                    <label htmlFor="confirmPassword" className="text-sm font-medium text-neutral-700">
                        Confirmar Contraseña
                    </label>
                    <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        required
                        className="block w-full rounded border border-neutral-300 px-3 py-2 text-neutral-950 placeholder-neutral-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary text-sm"
                        placeholder="••••••••"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                </div>

                <button
                    type="submit"
                    disabled={submitting}
                    className="w-full rounded-md bg-accent py-2 px-4 text-sm text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:bg-neutral-400 font-semibold transition-opacity"
                >
                    {submitting ? "Creando cuenta..." : "Registrarse"}
                </button>

                <p className="text-xs text-center text-neutral-600 mt-2">
                    ¿Ya tienes una cuenta?{" "}
                    <Link to="/login" className="text-accent font-semibold hover:underline">
                        Inicia sesión aquí
                    </Link>
                </p>
            </form>
        </div>
    );
}