export default function UsersPanel() {
  return (
    <div className="space-y-lg">
      <div>
        <h1 className="text-3xl font-display">Users list</h1>
        <p className="text-muted mt-sm">
          The users list appears here once the user API is available.
        </p>
      </div>

      <div className="overflow-hidden rounded-md border border-border bg-surface shadow-sm">
        <div className="grid grid-cols-[2fr_1fr_1fr] gap-4 border-b border-border px-4 py-3 text-xs uppercase tracking-[0.2em] text-muted">
          <div>Name</div>
          <div>Email</div>
          <div className="text-right">Status</div>
        </div>
        <div className="space-y-1 px-4 py-4 text-sm">
          {[
            ["Laura Pérez", "laura@example.com", "Active"],
            ["Samuel Díaz", "samuel@example.com", "Inactive"],
            ["Ana Ruiz", "ana@example.com", "Active"],
          ].map(([name, email, status]) => (
            <div key={email} className="grid grid-cols-[2fr_1fr_1fr] gap-4 rounded-sm bg-hover/50 px-4 py-3">
              <div className="font-medium text-text">{name}</div>
              <div className="text-muted">{email}</div>
              <div className="text-right text-text">{status}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
