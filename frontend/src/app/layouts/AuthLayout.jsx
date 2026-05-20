import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg px-lg">

      <div className="w-full max-w-md bg-surface border border-border shadow-md rounded-lg p-lg">
        <Outlet />
      </div>

    </div>
  );
}