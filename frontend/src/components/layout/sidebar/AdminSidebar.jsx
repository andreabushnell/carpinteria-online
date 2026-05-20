import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

export default function AdminSidebar() {
  const { pathname } = useLocation();
  const [productsOpen, setProductsOpen] = useState(pathname.startsWith("/admin/products"));
  const [usersOpen, setUsersOpen] = useState(pathname.startsWith("/admin/users"));
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const adminUsername = "admin.user";

  const productsOpened = productsOpen || pathname.startsWith("/admin/products");
  const usersOpened = usersOpen || pathname.startsWith("/admin/users");

  const linkClass = ({ isActive }) =>
    isActive
      ? "block rounded-sm bg-hover px-md py-sm text-sm font-medium text-text"
      : "block rounded-sm px-md py-sm text-sm text-muted transition hover:bg-hover hover:text-text";

  return (
    <aside className="w-[240px] min-h-screen bg-surface border-r border-border p-md">

      {/* TITLE */}
      <div className="mb-lg">
        <h2 className="text-lg font-semibold text-text">
          Admin Panel
        </h2>
        <p className="text-xs text-muted">
          Management dashboard
        </p>
      </div>

      {/* NAVIGATION */}
      <nav className="space-y-xs flex-1">

        <NavLink to="/admin" className={linkClass} end>
          Dashboard
        </NavLink>

        <div>
          <button
            type="button"
            onClick={() => setProductsOpen((prev) => !prev)}
            className={`flex w-full items-center justify-between rounded-sm px-md py-sm text-sm font-medium transition ${
              pathname.startsWith("/admin/products")
                ? "bg-hover text-text"
                : "text-muted hover:bg-hover hover:text-text"
            }`}
          >
            Products
            <span className="text-xs">▾</span>
          </button>
          {productsOpened && (
            <div className="space-y-xs border-l border-border/50 pl-md">
              <NavLink to="/admin/products/list" className={linkClass}>
                Products list
              </NavLink>
              <NavLink to="/admin/products/detail" className={linkClass}>
                Product detail
              </NavLink>
            </div>
          )}
        </div>

        <NavLink to="/admin/orders" className={linkClass}>
          Orders
        </NavLink>

        <div>
          <button
            type="button"
            onClick={() => setUsersOpen((prev) => !prev)}
            className={`flex w-full items-center justify-between rounded-sm px-md py-sm text-sm font-medium transition ${
              pathname.startsWith("/admin/users")
                ? "bg-hover text-text"
                : "text-muted hover:bg-hover hover:text-text"
            }`}
          >
            Users
            <span className="text-xs">▾</span>
          </button>
          {usersOpened && (
            <div className="space-y-xs border-l border-border/50 pl-md">
              <NavLink to="/admin/users/list" className={linkClass}>
                Users list
              </NavLink>
              <NavLink to="/admin/users/detail" className={linkClass}>
                User detail
              </NavLink>
            </div>
          )}
        </div>

        <NavLink to="/admin/categories" className={linkClass}>
          Categories
        </NavLink>

      </nav>

      <div className="mt-auto rounded-md border border-border bg-surface p-sm shadow-sm">
        <button
          type="button"
          onClick={() => setUserMenuOpen((prev) => !prev)}
          className="flex w-full items-center justify-between rounded-sm border border-border bg-white px-md py-sm text-left text-sm text-text transition hover:bg-hover"
        >
          <span>{adminUsername}</span>
          <span className="text-xs text-muted">▾</span>
        </button>

        {userMenuOpen && (
          <div className="mt-xs space-y-xs rounded-md border border-border bg-surface p-sm shadow-sm">
            <div className="rounded-sm bg-hover p-3 text-sm text-text">{adminUsername}</div>
            <button className="w-full rounded-sm bg-surface px-3 py-2 text-left text-sm text-muted transition hover:bg-hover hover:text-text">
              Log off
            </button>
          </div>
        )}
      </div>

      <div className="mt-md text-xs text-muted">v1.0 admin system</div>

    </aside>
  );
}