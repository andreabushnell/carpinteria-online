export default function CategoriesPanel() {
  return (
    <div className="space-y-lg">
      <div>
        <h1 className="text-3xl font-display">Categories</h1>
        <p className="text-muted mt-sm">The categories panel is waiting for category data from the API.</p>
      </div>

      <div className="rounded-md border border-border bg-surface p-lg shadow-sm">
        <div className="grid gap-2 text-sm text-muted sm:grid-cols-2">
          <div>Category Name</div>
          <div className="text-right">Products</div>
        </div>
        <div className="mt-lg space-y-sm">
          {[
            ["Live Edge Boards", "12"],
            ["Wood Finishes", "7"],
            ["Hardware", "18"],
          ].map(([name, count]) => (
            <div key={name} className="grid gap-2 rounded-sm bg-hover/50 px-4 py-3 sm:grid-cols-2">
              <div className="font-medium text-text">{name}</div>
              <div className="text-right text-muted">{count}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-md border border-border bg-hover p-sm text-sm text-muted">
        Placeholder content will be replaced by real category data once the API is implemented.
      </div>
    </div>
  );
}
