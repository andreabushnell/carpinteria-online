export default function ProductDetailPanel() {
  return (
    <div className="space-y-lg">
      <div>
        <h1 className="text-3xl font-display">Product detail</h1>
        <p className="text-muted mt-sm">
          This detail view is a placeholder until product detail data is connected.
        </p>
      </div>

      <div className="grid gap-lg xl:grid-cols-[1.8fr_1fr]">
        <section className="rounded-md border border-border bg-surface p-lg shadow-sm">
          <h2 className="text-lg font-semibold">Wooden shelf kit</h2>
          <p className="mt-sm text-sm text-muted">A placeholder product description for the detail page.</p>
          <div className="mt-lg grid gap-sm text-sm">
            <div className="flex justify-between"><span className="text-muted">SKU</span><span className="text-text">SHF-501</span></div>
            <div className="flex justify-between"><span className="text-muted">Category</span><span className="text-text">Shelving</span></div>
            <div className="flex justify-between"><span className="text-muted">Stock</span><span className="text-text">23</span></div>
            <div className="flex justify-between"><span className="text-muted">Price</span><span className="text-text">€78.00</span></div>
          </div>
        </section>

        <aside className="rounded-md border border-border bg-surface p-lg shadow-sm space-y-lg">
          <div className="rounded-sm border border-border bg-hover/50 px-4 py-3 text-sm text-muted">
            Product image placeholder
          </div>
          <button className="w-full rounded-sm bg-primary px-4 py-2 text-surface transition hover:bg-emerald-600">
            Save changes
          </button>
        </aside>
      </div>
    </div>
  );
}
