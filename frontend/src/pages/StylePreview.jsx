import React from "react";

export default function StylePreview() {
  return (
    <div className="space-y-lg font-body text-text">

      {/* Header */}
      <header className="flex items-center justify-between bg-primary text-surface p-lg rounded-md">
        <h1 className="text-2xl font-display tracking-wide">Brand / Header (bg-primary)</h1>
        <div className="flex gap-md text-surface">Icons</div>
      </header>

      {/* Navbar */}
      <div className="flex items-center justify-between bg-surface border border-border p-sm rounded-md">
        <nav className="flex gap-md text-muted">
          <a className="text-muted">Link 1</a>
          <a className="text-muted">Link 2</a>
          <a className="text-text font-semibold">Active</a>
        </nav>
        <div className="bg-surface border border-border p-2 rounded-sm">Search</div>
      </div>

      {/* Product grid */}
      <section className="grid grid-cols-3 gap-lg">
        {[1, 2, 3].map((n) => (
          <article key={n} className="bg-surface border border-border rounded-md shadow-sm p-md text-center">
            <div className="h-40 bg-[rgba(0,0,0,0.02)] mb-sm flex items-center justify-center">Image</div>
            <div className="text-text font-medium">Product {n}</div>
            <div className="text-muted mt-xs">$12.99</div>
            <button className="mt-sm bg-accent text-surface px-3 py-2 rounded-sm">Add</button>
          </article>
        ))}
      </section>

      {/* Footer */}
      <footer className="bg-footer text-surface text-center p-md rounded-md">
        Footer area (bg-footer)
      </footer>

    </div>
  );
}
