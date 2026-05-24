// src/components/UserDropdown.jsx
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import userAvatarPng from '/user-icon.png'; 

export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

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

  return (
    <div className="relative w-10 h-10" ref={dropdownRef}>
      
      <button 
        onClick={toggleDropdown}
        className="w-full h-full flex items-center justify-center hover:bg-hover transition-colors shadow-sm focus:outline-none overflow-hidden"
      >
        <img 
          src={userAvatarPng} 
          alt="Abrir menú"
          className="object-contain" 
        />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-xs w-64 bg-white border border-surface rounded-none shadow-xl z-50 text-right">
          
          <div className="flex items-center justify-between border-b border-slate-800 p-sm">
            <span className="text-xs font-body text-muted">Nombre de usuario</span>
          
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
            
            <Link to='/'>
              <button 
                onClick={() => alert('Cerrando sesion')}
                className="w-full text-right text-md text-accent font-body hover:bg-slate-50 block transition-colors p-sm"
              >
                Cerrar sesión
              </button>
            </Link>
          </div>

        </div>
      )}

    </div>
  );
}