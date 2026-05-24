import { Link } from "react-router-dom";

export default function ProfilePage() {
  return (
    <section className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
      <div className="rounded-3xl border border-border/60 bg-surface p-8 shadow-sm">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-muted">Perfil</p>
          <h1 className="mt-3 text-3xl font-semibold text-text">Información del usuario</h1>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {[
            ['Nombre', 'Ana García'],
            ['Email', 'ana.garcia@example.com'],
            ['Teléfono', '+34 600 123 456'],
            ['Dirección', 'Calle Falsa 123, Madrid'],
          ].map(([label, value]) => (
            <div key={label} className="rounded-3xl border border-border/60 bg-background p-5">
              <p className="text-sm text-muted">{label}</p>
              <p className="mt-2 text-text font-semibold">{value}</p>
            </div>
          ))}
        </div>
      </div>

      <aside className="space-y-6">
        <div className="rounded-3xl border border-border/60 bg-surface p-6 shadow-sm">
          <p className="text-sm uppercase tracking-[0.3em] text-muted">Cuenta</p>
          <div className="mt-4 space-y-3 text-sm text-text">
            <button className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-left transition hover:bg-hover">
              Editar perfil
            </button>
            <button className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-left transition hover:bg-hover">
              Cambiar contraseña
            </button>
          </div>
        </div>

        <div className="rounded-3xl border border-border/60 bg-surface p-6 shadow-sm">
          <p className="text-sm uppercase tracking-[0.3em] text-muted">Acciones rápidas</p>
          <Link
            to="/orders"
            className="mt-4 block rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-surface text-center transition hover:bg-primary/90"
          >
            Ver pedidos
          </Link>
        </div>
      </aside>
    </section>
  );
}
