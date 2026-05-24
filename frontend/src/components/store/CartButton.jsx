import { Link } from "react-router-dom";

export default function CartButton({ count = 0 }) {
  return (
    <Link to="/cart" className="relative inline-flex items-center rounded-2xl bg-surface px-3 py-2 text-text shadow-sm transition hover:bg-hover">
      <span className="text-lg">🛒</span>
      {count > 0 && (
        <span className="absolute -top-1 -right-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[10px] text-surface">
          {count}
        </span>
      )}
    </Link>
  );
}
