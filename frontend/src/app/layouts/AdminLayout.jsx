import { Outlet } from "react-router-dom";

import AdminSidebar from "../../components/layout/sidebar/AdminSidebar";

export default function AdminLayout() {
  return (
    <div className="min-h-screen flex bg-bg text-text">

      {/* SIDEBAR */}
      <AdminSidebar />

      {/* MAIN CONTENT */}
      <main className="flex-1 p-lg">
        
        <div className="bg-surface border border-border shadow-sm rounded-md p-lg min-h-full">
          <Outlet />
        </div>

      </main>
    </div>
  );
}