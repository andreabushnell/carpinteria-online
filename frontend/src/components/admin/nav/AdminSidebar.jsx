import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../../features/auth/hooks/useAuth";
import UserIconSvg from "../../../assets/userIconSvg.svg?react";

export default function AdminSidebar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  const { user, loading, logout } = useAuth(); 

  if (loading) {
    return (
      <div className="col-span-8 flex items-center justify-center min-h-screen bg-bg">
        <div className="text-lg font-medium text-gray-500 animate-pulse">
          Verificando sesión...
        </div>
      </div>
    );
  }

  const adminUsername = user?.username || "Admin"; 

  const handleLogout = async () => {
    await logout(); 
    navigate("/login");
  };

  return (
    <div className="col-span-8 grid grid-cols-8 w-full">
      <aside className="col-span-2 bg-surface border-r border-gray-200 flex flex-col justify-between p-6 min-h-[calc(100vh-120px)]">
        <nav className="flex flex-col gap-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Navegación</h2>
          <Link to="/admin" className="p-3 rounded-lg font-medium text-gray-700 hover:bg-accent hover:text-white transition-colors">Inicio</Link>
          <Link to="/admin/users/list" className="p-3 rounded-lg font-medium text-gray-700 hover:bg-accent hover:text-white transition-colors">Usuarios</Link>
          <Link to="/admin/products/list" className="p-3 rounded-lg font-medium text-gray-700 hover:bg-accent hover:text-white transition-colors">Productos</Link>
          <Link to="/admin/orders/list" className="p-3 rounded-lg font-medium text-gray-700 hover:bg-accent hover:text-white transition-colors">Pedidos</Link>
          <Link to="/admin/categories/list" className="p-3 rounded-lg font-medium text-gray-700 hover:bg-accent hover:text-white transition-colors">Categorías</Link>
        </nav>

        <div className="relative">
          {menuOpen && (
            <div className="absolute bottom-16 left-0 w-56 bg-white border border-gray-200 rounded-xl shadow-xl p-4 z-50 flex flex-col gap-3">
              <div className="border-b border-gray-100 pb-2">
                <p className="text-xs text-gray-400">Sesión inciada como</p>
                <p className="font-semibold text-gray-800 truncate">{adminUsername}</p>
              </div>
              <button 
                onClick={handleLogout}
                className="w-full text-left text-sm text-red-600 font-medium hover:bg-red-50 p-2 rounded-lg transition-colors"
              >
                Log Out
              </button>
            </div>
          )}

          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-3 w-full p-2 rounded-xl hover:bg-gray-100 transition-colors text-left focus:outline-none"
          >
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary p-2">
              <UserIconSvg className="w-full h-full" />
            </div>
            <div className="truncate hidden md:block">
              <p className="text-sm font-semibold text-gray-800 truncate">{adminUsername}</p>
              <p className="text-xs text-gray-400">Admin del sistema</p>
            </div>
          </button>
        </div>
      </aside>

      <div className="col-span-6 p-8 bg-gray-50">
        <Outlet />
      </div>
    </div>
  );
}