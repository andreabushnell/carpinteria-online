import { useState, useEffect, useRef } from 'react';
import UserIcon from '../../../assets/userIconSvg.svg?react'; 

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
        className="w-full h-full flex items-center justify-center hover:bg-hover overflow-hidden bg-white p-xs"
      >
        <UserIcon className="w-full h-full" />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-xs w-40 bg-white border border-surface rounded-none shadow-xl z-50 text-right">

          <div className="flex flex-col text-(--text-secondary)">
            <a 
              href="/login/" 
              className="w-full text-md font-body text-text hover:bg-slate-50 border-b border-slate-800 block transition-colors p-sm"
            >
              Iniciar sesión
            </a>
            
            <a 
              href="/register/" 
              className="w-full text-md font-body text-text hover:bg-slate-50 border-b border-slate-800 block transition-colors p-sm"
            >
              Registrarse
            </a>

          </div>

        </div>
      )}

    </div>
  );
}