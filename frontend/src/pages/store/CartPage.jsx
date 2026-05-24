import { Link } from "react-router-dom";

export default function CartPage() {
  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-border/60 bg-surface p-8 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-muted">Carrito</p>
            <h1 className="mt-3 text-3xl font-semibold text-text">Tu carrito</h1>
          </div>

          <Link
            to="/checkout"
            className="rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-surface transition hover:bg-primary/90"
          >
            Ir al checkout
          </Link>
        </div>

        <div className="mt-8 rounded-3xl border border-border/60 bg-background p-10 text-center text-sm text-muted">
          Tu carrito está vacío. Añade productos para continuar con el checkout.
        </div>
      </div>
    </section>
  );
}
