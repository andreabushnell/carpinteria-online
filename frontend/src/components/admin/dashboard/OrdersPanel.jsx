import { useState } from "react";

const orderStates = ["Pending", "Processing", "Shipped", "Delivered", "Canceled"];

export default function OrdersPanel() {
  const [status, setStatus] = useState("Pending");

  return (
    <div className="space-y-lg">
      <div className="flex flex-col gap-md sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-display">Order details</h1>
          <p className="text-muted mt-sm">
            This is a placeholder view until the order endpoints are available.
          </p>
        </div>
        <div className="rounded-md border border-border bg-surface px-4 py-3 text-sm text-muted">
          Admin can only update the order state here.
        </div>
      </div>

      <div className="grid gap-lg xl:grid-cols-[1.8fr_1fr]">
        <section className="rounded-md border border-border bg-surface p-lg shadow-sm space-y-lg">
          <div className="grid gap-sm sm:grid-cols-2">
            <div className="space-y-1">
              <div className="text-xs uppercase tracking-[0.24em] text-muted">Order ID</div>
              <div className="text-text font-medium">#ORD-001234</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs uppercase tracking-[0.24em] text-muted">Customer</div>
              <div className="text-text font-medium">Maria García</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs uppercase tracking-[0.24em] text-muted">Created</div>
              <div className="text-text font-medium">April 28, 2026</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs uppercase tracking-[0.24em] text-muted">Total</div>
              <div className="text-text font-medium">€248.90</div>
            </div>
          </div>

          <div className="space-y-lg">
            <div>
              <h2 className="text-lg font-semibold">Items</h2>
              <div className="mt-sm grid gap-sm border-t border-border pt-sm">
                {[
                  { name: "Premium Oak Board", qty: 2, price: "€45.00" },
                  { name: "Wood Glue Set", qty: 1, price: "€18.90" },
                  { name: "Pine Shelf Kit", qty: 1, price: "€140.00" },
                ].map((item) => (
                  <div key={item.name} className="flex justify-between gap-sm text-sm">
                    <div>
                      <div className="font-medium text-text">{item.name}</div>
                      <div className="text-muted">Quantity: {item.qty}</div>
                    </div>
                    <div className="text-text">{item.price}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold">Shipping address</h2>
              <div className="mt-sm text-sm text-text">
                Avenida do Mar 12<br />
                46001 Valencia<br />
                Spain
              </div>
            </div>
          </div>
        </section>

        <aside className="space-y-lg rounded-md border border-border bg-surface p-lg shadow-sm">
          <div className="space-y-sm">
            <div className="text-xs uppercase tracking-[0.24em] text-muted">Order state</div>
            <select
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              className="w-full rounded-sm border border-border bg-white px-3 py-2 text-text outline-none transition focus:border-primary"
            >
              {orderStates.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-sm">
            <button className="rounded-sm bg-primary px-4 py-2 text-surface transition hover:bg-primary/90">
              Accept
            </button>
            <button className="rounded-sm border border-border bg-surface px-4 py-2 text-text transition hover:bg-hover">
              Cancel
            </button>
          </div>

          <div className="rounded-md bg-hover p-sm text-sm text-muted">
            Placeholder data is shown until backend order endpoints are ready.
          </div>
        </aside>
      </div>
    </div>
  );
}
