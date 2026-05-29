import { useNavigate } from "react-router-dom";

export default function PanelFooter({ onReset, onAccept, loading, showReset = true }) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center pt-6 border-t border-gray-200 mt-6">
      <button 
        onClick={() => navigate(-1)} 
        className="px-4 py-2 text-sm font-semibold text-gray-600 hover:text-gray-900 hover:underline transition-colors"
      >
        ← Volver
      </button>

      <div className="flex gap-3">
        {showReset && (
          <button
            onClick={onReset}
            className="px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Reset
          </button>
        )}
        <button
          onClick={onAccept}
          disabled={loading}
          className="px-4 py-2 text-sm font-semibold text-white bg-accent rounded-md hover:bg-primary/90 transition-colors disabled:bg-gray-400"
        >
          {loading ? "Guardando..." : "Aceptar"}
        </button>
      </div>
    </div>
  );
}