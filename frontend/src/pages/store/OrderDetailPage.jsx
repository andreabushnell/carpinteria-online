import { Link } from "react-router-dom";

const orderItems = [
  { id: 1, name: "Estantería de madera", quantity: 1, price: "€79.99" },
  { id: 2, name: "Mesa de trabajo", quantity: 1, price: "€119.00" },
];

export default function OrderDetailPage() {
  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-muted">Pedido</p>
          <h1 className="mt-3 text-3xl font-semibold text-text">Detalle de la orden #ORD-1234</h1>
        </div>
        <Link
          to="/orders"
          className="rounded-2xl border border-border bg-background px-5 py-3 text-sm font-semibold text-text transition hover:bg-hover"
        >
          Volver a pedidos
        </Link>
      </div>

      <div className="rounded-3xl border border-border/60 bg-surface p-8 shadow-sm">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <p className="text-sm text-muted">Estado</p>
            <p className="mt-2 font-semibold text-text">En preparación</p>
          </div>
          <div>
            <p className="text-sm text-muted">Fecha de orden</p>
            <p className="mt-2 font-semibold text-text">22 mayo 2026</p>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          {orderItems.map((item) => (
            <div key={item.id} className="rounded-3xl border border-border/60 bg-background p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-semibold text-text">{item.name}</p>
                  <p className="text-sm text-muted">Cantidad: {item.quantity}</p>
                </div>
                <span className="text-sm font-semibold text-text">{item.price}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-border/60 pt-5 text-sm text-text md:flex-row md:justify-between md:items-center">
          <span>Total</span>
          <strong className="text-xl">€198.99</strong>
        </div>
      </div>
    </section>
  );
}
