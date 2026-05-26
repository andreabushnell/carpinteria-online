import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { useAuth } from '../../../features/auth/hooks/useAuth'; 
import UserIcon from '../../../assets/userIconSvg.svg?react'; 

export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  const navigate = useNavigate(); 
  const { logout } = useAuth();  

  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setIsOpen(false);
    
    if (logout) {
      await logout(); 
    } else {
      localStorage.removeItem('token'); 
      window.location.reload(); 
    }
    
    navigate('/', { replace: true }); 
  };

  return (
    <div className="relative w-10 h-10" ref={dropdownRef}>
      
      <button 
        onClick={toggleDropdown}
        className="w-full h-full flex items-center justify-center hover:bg-hover overflow-hidden bg-white p-xs"
      >
        <UserIcon className="w-full h-full" />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-xs w-64 bg-white border border-surface rounded-none shadow-xl z-50 text-right">

          <div className="flex items-center justify-between border-b border-slate-800 p-sm bg-slate-50">
            <span className="text-xs font-body text-neutral-400 uppercase tracking-wider">Cuenta</span>
            <span className="text-xs font-body font-semibold text-neutral-800">Mi Cuenta</span>
          </div>

          <div className="flex flex-col text-(--text-secondary)">
            <a 
              href="/profile" 
              className="w-full text-md font-body text-text hover:bg-slate-50 border-b border-slate-800 block transition-colors p-sm"
            >
              Mi perfil
            </a>
            
            <a 
              href="/orders" 
              className="w-full text-md font-body text-text hover:bg-slate-50 border-b border-slate-800 block transition-colors p-sm"
            >
              Mis pedidos
            </a>
            
            <button 
              onClick={handleLogout} 
              className="w-full text-right text-md text-accent font-body hover:bg-red-50 hover:text-red-600 block transition-colors p-sm"
            >
              Cerrar sesión
            </button>
          </div>

        </div>
      )}

    </div>
  );
}