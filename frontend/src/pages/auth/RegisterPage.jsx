import { Link } from 'react-router-dom';

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-surface text-on-surface flex items-center justify-center px-4 py-8">
      <section className="w-full max-w-md rounded-3xl border border-border/50 bg-background/95 p-6 shadow-lg shadow-slate-900/5 backdrop-blur-sm">
        <h1 className="mb-2 text-3xl font-semibold text-primary">Crear cuenta</h1>
        <p className="mb-6 text-sm text-muted">Empieza a comprar o administrar pedidos desde tu panel.</p>

        <form className="space-y-4">
          <label className="block space-y-2 text-sm font-medium">
            <span>Nombre</span>
            <input
              type="text"
              placeholder="Tu nombre"
              className="w-full rounded-2xl border border-border/60 bg-surface px-4 py-3 text-base text-on-surface outline-none transition focus:border-primary/80 focus:ring-2 focus:ring-primary/20"
            />
          </label>

          <label className="block space-y-2 text-sm font-medium">
            <span>Email</span>
            <input
              type="email"
              placeholder="nombre@ejemplo.com"
              className="w-full rounded-2xl border border-border/60 bg-surface px-4 py-3 text-base text-on-surface outline-none transition focus:border-primary/80 focus:ring-2 focus:ring-primary/20"
            />
          </label>

          <label className="block space-y-2 text-sm font-medium">
            <span>Contraseña</span>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full rounded-2xl border border-border/60 bg-surface px-4 py-3 text-base text-on-surface outline-none transition focus:border-primary/80 focus:ring-2 focus:ring-primary/20"
            />
          </label>

          <button type="submit" className="inline-flex w-full justify-center rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark">
            Registrarme
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-muted">
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" className="text-primary underline-offset-4 hover:underline">
            Inicia sesión
          </Link>
        </p>
      </section>
    </main>
  );
}
