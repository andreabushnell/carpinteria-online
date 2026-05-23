import { Link } from "react-router-dom";

const featuredProducts = [
  { id: "1", title: "Estantería Moderna", price: "€79.99", label: "Destacado" },
  { id: "2", title: "Mesa de Taller", price: "€119.00", label: "Nuevo" },
  { id: "3", title: "Set de Sillas", price: "€149.00", label: "Oferta" },
];

export default function HomePage() {
  return (
    <section className="space-y-10">
      <div className="rounded-3xl border border-border/60 bg-surface p-8 shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.3em] text-muted">Bienvenido</p>
            <h1 className="mt-4 text-4xl font-semibold text-text">Tu carpintería online de confianza</h1>
            <p className="mt-4 text-sm leading-7 text-muted">
              Descubre muebles hechos para durar, accesorios de madera y piezas únicas para casa y oficina.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <Link
              to="/cart"
              className="rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-surface transition hover:bg-primary/90"
            >
              Ver carrito
            </Link>
            <Link
              to="/orders"
              className="rounded-2xl border border-border bg-background px-5 py-3 text-sm font-semibold text-text transition hover:bg-hover"
            >
              Mis pedidos
            </Link>
          </div>
        </div>
      </div>

      <div className="grid gap-8 xl:grid-cols-[1.3fr_0.7fr]">
        <div className="space-y-6">
          <div className="rounded-3xl border border-border/60 bg-surface p-8 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-muted">Colecciones</p>
                <h2 className="mt-2 text-2xl font-semibold text-text">Productos destacados</h2>
              </div>
              <Link
                to="/cart"
                className="rounded-2xl bg-accent px-4 py-3 text-sm font-semibold text-surface transition hover:bg-accent/90"
              >
                Explorar catálogo
              </Link>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {featuredProducts.map((product) => (
                <div key={product.id} className="rounded-3xl border border-border/60 bg-background p-5 shadow-sm">
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-muted">
                    <span>{product.label}</span>
                    <span className="text-text font-semibold">{product.price}</span>
                  </div>
                  <div className="mt-4 h-40 rounded-3xl bg-slate-100" />
                  <h3 className="mt-5 text-lg font-semibold text-text">{product.title}</h3>
                  <p className="mt-2 text-sm text-muted">Perfecto para almacenar tus herramientas y objetos del hogar.</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-3xl border border-border/60 bg-surface p-6 shadow-sm">
            <p className="text-sm uppercase tracking-[0.3em] text-muted">Categorías</p>
            <div className="mt-4 space-y-3">
              {['Estanterías', 'Mesas', 'Sillas', 'Decoración'].map((category) => (
                <button key={category} className="w-full rounded-2xl border border-border/60 bg-background px-4 py-3 text-left text-sm text-text transition hover:bg-hover">
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-border/60 bg-surface p-6 shadow-sm">
            <p className="text-sm uppercase tracking-[0.3em] text-muted">Recomendado</p>
            <div className="mt-4 space-y-4">
              <div className="rounded-3xl bg-background p-4 text-sm text-text">Envío gratuito en pedidos superiores a €80.</div>
              <div className="rounded-3xl bg-background p-4 text-sm text-text">Productos premium seleccionados a mano.</div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
