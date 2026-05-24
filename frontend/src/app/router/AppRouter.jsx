import { useAuth } from "../../features/auth/hooks/useAuth";
import AdminRouter from "./AdminRouter";
import GuestRouter from "./GuestRouter";
import StoreRouter from "./StoreRouter";

export default function AppRouter() {
  const { loading, isAuthenticated, user } = useAuth();

  if (loading) {
    return null;
  }

  if (!isAuthenticated) {
    return <GuestRouter />;
  }

  if (user?.role?.toLowerCase() === "admin") {
    return <AdminRouter />;
  }

  return <StoreRouter />;
}