import { useState } from "react";

export default function Header() {
  const [isLoggedIn] = useState(false); // temporary placeholder

  return (
    <header className="h-[70px] bg-primary text-white flex items-center justify-between px-lg shadow-sm">

      {/* LEFT: BRAND */}
      <div className="text-[20px] font-semibold tracking-wide">
        MyStore
      </div>

      {/* CENTER: NAV (optional placeholder for now) */}
      <nav className="hidden md:flex gap-md text-sm text-white/80">
        <a className="hover:text-white cursor-pointer">Home</a>
        <a className="hover:text-white cursor-pointer">Products</a>
      </nav>

      {/* RIGHT: ACTIONS */}
      <div className="flex items-center gap-md text-[20px]">

        {/* CART (only visible when logged in later) */}
        {isLoggedIn && (
          <button className="hover:opacity-80 transition">
            🛒
          </button>
        )}

        {/* AUTH BUTTONS (temporary) */}
        {!isLoggedIn ? (
          <div className="flex gap-sm text-sm">
            <button className="hover:opacity-80">Login</button>
            <button className="bg-accent px-sm py-xs rounded-sm hover:opacity-90">
              Register
            </button>
          </div>
        ) : (
          <button className="hover:opacity-80">
            👤
          </button>
        )}

      </div>
    </header>
  );
}