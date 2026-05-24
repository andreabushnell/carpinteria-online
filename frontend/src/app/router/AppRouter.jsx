import { useAuth } from "../../features/auth/hooks/useAuth";
import AdminRouter from "./AdminRouter";
import GuestRouter from "./GuestRouter";
import StoreRouter from "./StoreRouter";

export default function AppRouter() {
  const { loading, isAuthenticated, user } = useAuth();

  console.log("AUTH CHECK:", { loading, isAuthenticated, userRole: user?.role || user?.is_staff });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-bg">
        <p className="text-xl font-semibold">Cargando panel de control...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <GuestRouter />;
  }

  if (user?.role?.toLowerCase() === "admin" || user?.is_staff === true) {
    return <AdminRouter />;
  }

  return <StoreRouter />;
}