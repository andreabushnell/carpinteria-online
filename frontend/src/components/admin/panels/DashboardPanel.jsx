import { Link } from "react-router-dom";

export default function DashboardPanel() {
  
  const modules = [
    { title: "Usuarios", desc: "Gestión de clientes, roles y perfiles.", route: "/admin/users/list", color: "border-blue-500 text-blue-600" },
    { title: "Productos", desc: "Gestión de productos, precios y stock.", route: "/admin/products/list", color: "border-green-500 text-green-600" },
    { title: "Pedidos", desc: "Gestión de historial de pedidos.", route: "/admin/orders/list", color: "border-pink-500 text-purple-600" },
    { title: "Categorías", desc: "Gestión de categorías de productos.", route: "/admin/categories/list", color: "border-amber-500 text-amber-600" }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Panel de administración</h1>
        <p className="text-gray-500 mt-1">Bienvenido de vuelta! Escoge un módulo para empezar.</p>
      </div>
 
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {modules.map((mod, index) => (
          <Link 
            key={index} 
            to={mod.route}
            className={`block p-6 bg-white border-l-4 ${mod.color} rounded-r-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group`}
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl font-bold text-gray-800 group-hover:text-primary transition-colors">
                {mod.title}
              </h3>
              <span className="text-gray-300 group-hover:text-primary group-hover:translate-x-1 transition-all text-xl">
                &rarr;
              </span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              {mod.desc}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}