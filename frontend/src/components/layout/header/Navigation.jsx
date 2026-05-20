export default function Navigation() {
  return (
    <nav className="bg-surface border-b border-border flex items-center justify-between px-lg py-sm">
      
      {/* LEFT: LINKS */}
      <div className="flex gap-md text-sm">
        <a
          href="/"
          className="text-muted hover:text-text transition-colors"
        >
          Home
        </a>

        <a
          href="/products"
          className="text-muted hover:text-text transition-colors"
        >
          Products
        </a>

        <a
          href="/orders"
          className="text-muted hover:text-text transition-colors"
        >
          Orders
        </a>
      </div>

      {/* RIGHT: SEARCH */}
      <div className="flex items-center bg-surface border border-border px-sm py-xs rounded-sm">
        <input
          type="text"
          placeholder="Search products..."
          className="outline-none text-sm bg-transparent text-text"
        />
      </div>
    </nav>
  );
}