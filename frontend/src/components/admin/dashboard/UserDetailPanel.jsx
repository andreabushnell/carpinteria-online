export default function UserDetailPanel() {
  return (
    <div className="space-y-lg">
      <div>
        <h1 className="text-3xl font-display">User detail</h1>
        <p className="text-muted mt-sm">
          Placeholder detail view for user information and status management.
        </p>
      </div>

      <div className="rounded-md border border-border bg-surface p-lg shadow-sm space-y-lg">
        <div className="grid gap-sm sm:grid-cols-2">
          <div>
            <div className="text-xs uppercase tracking-[0.24em] text-muted">User name</div>
            <div className="text-text font-medium">Sofia Alvarez</div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.24em] text-muted">Email</div>
            <div className="text-text font-medium">sofia@example.com</div>
          </div>
        </div>

        <div className="grid gap-sm sm:grid-cols-2">
          <div>
            <div className="text-xs uppercase tracking-[0.24em] text-muted">Role</div>
            <div className="text-text font-medium">Administrator</div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.24em] text-muted">Status</div>
            <div className="text-text font-medium">Active</div>
          </div>
        </div>

        <div className="rounded-sm border border-border bg-hover p-sm text-sm text-muted">
          This is a placeholder until the users API is connected.
        </div>
      </div>
    </div>
  );
}
