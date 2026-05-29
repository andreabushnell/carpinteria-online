import { useNavigate } from "react-router-dom";

export default function OrderSuccessPage() {
    const navigate = useNavigate();

    return (
        <div className="col-span-8 mx-auto text-center bg-white p-8 rounded-lg shadow-sm border border-neutral-200 my-16 flex flex-col items-center">

            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center border border-green-200 mb-6 animate-bounce">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
            </div>

            <h2 className="text-2xl font-bold text-neutral-800 mb-2">
                ¡Pedido realizado correctamente!
            </h2>
            
            <p className="text-sm text-neutral-500 mb-8 ">
                Tu compra se ha procesado con éxito. Puedes revisar el estado de tu envío desde tu panel de usuario en cualquier momento.
            </p>

            <button
                onClick={() => navigate("/")}
                className="w-full bg-secondary text-white py-3 rounded-md font-semibold text-sm hover:bg-secondary/90 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-secondary/20"
            >
                Volver al Inicio
            </button>
        </div>
    );
}