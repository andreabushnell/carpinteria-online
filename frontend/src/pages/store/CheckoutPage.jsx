import { Link } from "react-router-dom";

export default function CheckoutPage() {
  return (
    <section className="grid gap-8 xl:grid-cols-[1.3fr_0.7fr]">
      <div className="rounded-3xl border border-border/60 bg-surface p-8 shadow-sm">
        <div className="space-y-6">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-muted">Checkout</p>
            <h1 className="mt-3 text-3xl font-semibold text-text">Información de envío</h1>
          </div>

          <form className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm text-text">
                Nombre completo
                <input className="mt-2 w-full rounded-2xl border border-border/60 bg-background px-4 py-3 text-sm outline-none" />
              </label>
              <label className="block text-sm text-text">
                Email
                <input className="mt-2 w-full rounded-2xl border border-border/60 bg-background px-4 py-3 text-sm outline-none" />
              </label>
            </div>

            <label className="block text-sm text-text">
              Dirección de envío
              <input className="mt-2 w-full rounded-2xl border border-border/60 bg-background px-4 py-3 text-sm outline-none" />
            </label>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm text-text">
                Ciudad
                <input className="mt-2 w-full rounded-2xl border border-border/60 bg-background px-4 py-3 text-sm outline-none" />
              </label>
              <label className="block text-sm text-text">
                Código postal
                <input className="mt-2 w-full rounded-2xl border border-border/60 bg-background px-4 py-3 text-sm outline-none" />
              </label>
            </div>

            <button type="button" className="w-full rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-surface transition hover:bg-primary/90">
              Continuar con el pago
            </button>
          </form>
        </div>
      </div>

      <aside className="space-y-6">
        <div className="rounded-3xl border border-border/60 bg-surface p-6 shadow-sm">
          <p className="text-sm uppercase tracking-[0.3em] text-muted">Resumen del pedido</p>
          <div className="mt-5 space-y-4 text-sm text-text">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>€0.00</span>
            </div>
            <div className="flex justify-between">
              <span>Envío</span>
              <span>€0.00</span>
            </div>
            <div className="flex justify-between text-base font-semibold text-text">
              <span>Total</span>
              <span>€0.00</span>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-border/60 bg-surface p-6 shadow-sm">
          <p className="text-sm uppercase tracking-[0.3em] text-muted">Métodos de pago</p>
          <div className="mt-4 space-y-3 text-sm text-muted">
            <div className="rounded-2xl bg-background px-4 py-4">Tarjeta de crédito / débito</div>
            <div className="rounded-2xl bg-background px-4 py-4">Pago contra entrega</div>
          </div>
        </div>
      </aside>
    </section>
  );
}
