import { Link } from "react-router-dom";

const orders = [
  { id: "ORD-1234", date: "22 mayo 2026", status: "En preparación", total: "€198.99" },
  { id: "ORD-1229", date: "15 mayo 2026", status: "Entregado", total: "€79.99" },
];

export default function OrdersPage() {
  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-border/60 bg-surface p-8 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-muted">Pedidos</p>
            <h1 className="mt-3 text-3xl font-semibold text-text">Tus pedidos recientes</h1>
          </div>
          <Link
            to="/"
            className="rounded-2xl border border-border bg-background px-5 py-3 text-sm font-semibold text-text transition hover:bg-hover"
          >
            Seguir comprando
          </Link>
        </div>

        <div className="mt-8 space-y-4">
          {orders.map((order) => (
            <Link
              key={order.id}
              to={`/orders/${order.id}`}
              className="block rounded-3xl border border-border/60 bg-background p-5 shadow-sm transition hover:bg-hover"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-semibold text-text">{order.id}</p>
                  <p className="text-sm text-muted">{order.date}</p>
                </div>
                <div className="text-sm text-muted">{order.status}</div>
                <div className="text-sm font-semibold text-text">{order.total}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
