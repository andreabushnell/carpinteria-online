export default function CartPage() {
  return (
    <main className="min-h-screen bg-background text-on-background px-6 py-10">
      <section className="mx-auto max-w-4xl rounded-3xl border border-border/50 bg-surface p-8 shadow-lg shadow-slate-900/5">
        <h1 className="text-3xl font-semibold text-primary">Carrito</h1>
        <p className="mt-3 text-base text-muted">Tu carrito está vacío. Añade productos para continuar con el checkout.</p>
      </section>
    </main>
  );
}
