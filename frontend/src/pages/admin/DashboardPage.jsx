import { Link } from "react-router-dom";

export default function DashboardPage() {
  return (
    <div className="space-y-lg">
      <div className="flex flex-col gap-md sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-display">Admin Dashboard</h1>
          <p className="text-muted mt-sm">
            Use the sidebar to manage orders, products, users, and categories.
          </p>
        </div>
        <div className="flex flex-wrap gap-sm">
          <Link
            to="/admin/orders"
            className="rounded-sm border border-border bg-surface px-4 py-2 text-sm font-medium text-text transition hover:bg-hover"
          >
            Orders
          </Link>
          <Link
            to="/admin/products/list"
            className="rounded-sm border border-border bg-surface px-4 py-2 text-sm font-medium text-text transition hover:bg-hover"
          >
            Products
          </Link>
          <Link
            to="/admin/users/list"
            className="rounded-sm border border-border bg-surface px-4 py-2 text-sm font-medium text-text transition hover:bg-hover"
          >
            Users
          </Link>
        </div>
      </div>

      <div className="grid gap-lg lg:grid-cols-3">
        <div className="rounded-md border border-border bg-surface p-lg shadow-sm">
          <div className="text-sm text-muted uppercase tracking-[0.24em] mb-sm">Orders</div>
          <div className="text-3xl font-semibold">14</div>
          <div className="text-sm text-muted mt-sm">Active orders waiting review</div>
        </div>
        <div className="rounded-md border border-border bg-surface p-lg shadow-sm">
          <div className="text-sm text-muted uppercase tracking-[0.24em] mb-sm">Products</div>
          <div className="text-3xl font-semibold">128</div>
          <div className="text-sm text-muted mt-sm">Products in the catalog</div>
        </div>
        <div className="rounded-md border border-border bg-surface p-lg shadow-sm">
          <div className="text-sm text-muted uppercase tracking-[0.24em] mb-sm">Users</div>
          <div className="text-3xl font-semibold">32</div>
          <div className="text-sm text-muted mt-sm">Registered admins and customers</div>
        </div>
      </div>
    </div>
  );
}
