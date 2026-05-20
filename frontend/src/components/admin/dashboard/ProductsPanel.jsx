export default function ProductsPanel() {
  return (
    <div className="space-y-lg">
      <div>
        <h1 className="text-3xl font-display">Products list</h1>
        <p className="text-muted mt-sm">
          Product rows are placeholders until the products endpoint is ready.
        </p>
      </div>

      <div className="overflow-hidden rounded-md border border-border bg-surface shadow-sm">
        <div className="grid grid-cols-[1.8fr_1fr_1fr_1fr] gap-4 border-b border-border px-4 py-3 text-xs uppercase tracking-[0.2em] text-muted">
          <div>Name</div>
          <div>SKU</div>
          <div>Stock</div>
          <div className="text-right">Price</div>
        </div>
        <div className="space-y-1 px-4 py-4 text-sm">
          {[
            ["Oak plank set", "OAK-112", "24", "€32.00"],
            ["Rounded handle kit", "HDL-009", "56", "€12.90"],
            ["Table leg pair", "TBL-221", "18", "€21.50"],
          ].map(([name, sku, stock, price]) => (
            <div key={sku} className="grid grid-cols-[1.8fr_1fr_1fr_1fr] gap-4 rounded-sm bg-hover/50 px-4 py-3">
              <div className="font-medium text-text">{name}</div>
              <div className="text-muted">{sku}</div>
              <div className="text-text">{stock}</div>
              <div className="text-right text-text">{price}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
