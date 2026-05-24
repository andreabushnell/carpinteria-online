import { Link } from "react-router-dom";

export default function OrderSuccessPage() {
  return (
    <section className="rounded-3xl border border-border/60 bg-surface p-10 shadow-sm">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-muted">Compra completa</p>
        <h1 className="mt-4 text-4xl font-semibold text-text">¡Gracias! Tu pedido ha sido enviado</h1>
        <p className="mt-4 text-sm leading-7 text-muted">
          Hemos recibido tu pedido y te enviaremos una confirmación por correo electrónico muy pronto.
        </p>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link
            to="/orders"
            className="rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-surface transition hover:bg-primary/90"
          >
            Ver mis pedidos
          </Link>
          <Link
            to="/"
            className="rounded-2xl border border-border bg-background px-5 py-3 text-sm font-semibold text-text transition hover:bg-hover"
          >
            Seguir comprando
          </Link>
        </div>
      </div>
    </section>
  );
}
