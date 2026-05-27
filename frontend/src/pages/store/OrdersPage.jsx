import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getOrders } from "../../api/endpoints/orders"; 

export default function OrdersPage() {
  const navigate = useNavigate();
  
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await getOrders();
        setOrders(data.results || data || []);
      } catch (error) {
        console.error("Error al traer el historial de pedidos:", error);
        setOrders([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadOrders();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("es-ES", options);
  };

  const getStatusBadge = (state) => {
    const states = {
      pending: { text: "Pendiente", classes: "bg-amber-50 text-amber-700 border-amber-200" },
      paid: { text: "Pagado", classes: "bg-emerald-50 text-emerald-700 border-emerald-200" },
      shipped: { text: "Enviado", classes: "bg-blue-50 text-blue-700 border-blue-200" },
      cancelled: { text: "Cancelado", classes: "bg-rose-50 text-rose-700 border-rose-200" },
    };
    const current = states[state] || { text: state, classes: "bg-slate-50 text-slate-700 border-slate-200" };
    
    return (
      <span className={`text-[10px] uppercase tracking-wide font-semibold px-xxs py-[2px] border rounded-xxs ${current.classes}`}>
        {current.text}
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-sm py-xl text-center text-slate-600 font-body">
        Cargando tu historial de pedidos...
      </div>
    );
  }

  return (
    <div className="col-span-8 container mx-auto px-sm py-md w-full max-w-5xl">
      
      <div className="mb-sm">
        <Link 
          to="/" 
          className="inline-flex items-center space-x-xs text-slate-600 hover:text-slate-900 transition-colors cursor-pointer group py-xxs"
        >
          <span className="text-lg transform group-hover:-translate-x-0.5 transition-transform">
            &#8592;
          </span>
          <span className="font-medium text-sm font-body">
            Volver al catálogo
          </span>
        </Link>
      </div>

      {orders.length === 0 ? (
        <div className="border border-surface p-xl bg-white rounded-sm shadow-sm text-center">
          <p className="text-sm text-slate-500 font-body italic mb-sm">
            Aún no has realizado ningún pedido.
          </p>
          <Link
            to="/"
            className="inline-block px-sm py-xxs bg-slate-900 hover:bg-slate-800 text-white text-xs uppercase tracking-wider font-semibold rounded-xxs transition-colors"
          >
            Realizar mi primer pedido
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-md border border-surface p-sm bg-white rounded-sm shadow-sm w-full items-start">
          
          <div className="md:col-span-2 flex flex-col w-full">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-700 mb-sm border-b border-surface pb-xxs">
              Mis Pedidos ({orders.length})
            </h2>
            
            <div className="flex flex-col max-h-[calc(100vh-240px)] overflow-y-auto pr-xs space-y-sm custom-scrollbar">
              {orders.map((order) => (
                <div 
                  key={order.id}
                  className="flex items-center justify-between p-xs border border-surface rounded-xxs bg-white hover:bg-slate-50 transition-colors"
                >
                  <div className="flex flex-col space-y-xxs font-body">
                    <span className="text-xs font-semibold text-slate-800">
                      Pedido realizado el {formatDate(order.date)}
                    </span>
                    <div className="flex items-center space-x-xs text-xxs text-slate-500">
                      <span>Ref: #{order.id}</span>
                      <span>•</span>
                      <span className="font-medium text-slate-900">${parseFloat(order.total).toFixed(2)}</span>
                      <span>•</span>
                      {getStatusBadge(order.state)}
                    </div>
                  </div>

                  <div>
                    <button
                      onClick={() => navigate(`/orders/${order.id}`)}
                      className="px-sm py-xxs border border-slate-900 hover:bg-slate-900 hover:text-white text-slate-900 text-xs font-medium uppercase tracking-wider transition-colors rounded-xxs font-display cursor-pointer"
                    >
                      Ver
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-1 bg-slate-50 p-sm border border-surface rounded-xxs flex flex-col space-y-xs w-full md:sticky md:top-4 font-body">
            <div>
              <span className="text-xxs uppercase tracking-wider text-neutral-400 font-semibold">
                Mi Perfil
              </span>
              <h2 className="text-md font-bold font-display text-slate-900 mt-xxs">
                Resumen de cuenta
              </h2>
            </div>

            <div className="border-t border-surface pt-xs space-y-xxs text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Total de pedidos:</span>
                <span className="font-semibold text-slate-900">{orders.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Miembro desde:</span>
                <span className="font-semibold text-slate-900">2026</span>
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}