import { useState } from "react";
import { Link } from "react-router-dom";

export default function ProductDetailPage() {
  const [isLoggedIn] = useState(false); // temporary placeholder

  return (
    <section className="grid gap-8 xl:grid-cols-[1.25fr_0.75fr]">
      <div className="rounded-3xl border border-border/60 bg-surface p-8 shadow-sm">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-border/60 bg-background p-8 flex items-center justify-center">
            <span className="text-[6rem]">🪑</span>
          </div>

          <div className="space-y-5">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-muted">Estantería</p>
              <h1 className="mt-4 text-4xl font-semibold text-text">Estantería de madera natural</h1>
            </div>

            <div className="flex items-center gap-3 text-3xl font-semibold text-primary">
              <span>€79.99</span>
              <span className="rounded-full bg-accent/10 px-3 py-1 text-sm text-accent">En stock</span>
            </div>

            <p className="text-sm leading-7 text-muted">
              Una estantería resistente y elegante ideal para sala de estar, oficina o dormitorio. Con acabado natural y un diseño modular que se adapta a tu espacio.
            </p>

            <div className="flex flex-wrap gap-3">
              {['Madera', '3 niveles', 'Montaje fácil'].map((tag) => (
                <span key={tag} className="rounded-full bg-accent/10 px-3 py-1 text-sm text-accent">
                  {tag}
                </span>
              ))}
            </div>

            {isLoggedIn ? (
              <button className="mt-4 w-full rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-surface transition hover:bg-primary/90">
                Añadir al carrito
              </button>
            ) : (
              <div className="mt-4 rounded-3xl border border-border/60 bg-background p-5 text-sm text-muted">
                <p className="mb-4">Inicia sesión para añadir este producto al carrito.</p>
                <Link
                  to="/login"
                  className="inline-flex rounded-2xl bg-accent px-4 py-2 text-sm font-semibold text-surface transition hover:bg-accent/90"
                >
                  Iniciar sesión
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <aside className="space-y-6">
        <div className="rounded-3xl border border-border/60 bg-surface p-6 shadow-sm">
          <p className="text-sm uppercase tracking-[0.3em] text-muted">Resumen</p>
          <div className="mt-5 space-y-4 text-sm text-muted">
            <div className="flex justify-between">
              <span>Marca</span>
              <span className="text-text">Carpintería Premium</span>
            </div>
            <div className="flex justify-between">
              <span>Dimensiones</span>
              <span className="text-text">120 × 40 × 180 cm</span>
            </div>
            <div className="flex justify-between">
              <span>Garantía</span>
              <span className="text-text">2 años</span>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-border/60 bg-surface p-6 shadow-sm">
          <p className="text-sm uppercase tracking-[0.3em] text-muted">Detalles</p>
          <ul className="mt-5 space-y-3 text-sm text-muted">
            <li>Material: Madera maciza</li>
            <li>Color: Natural claro</li>
            <li>Soporta hasta 60 kg por repisa</li>
          </ul>
        </div>
      </aside>
    </section>
  );
}
