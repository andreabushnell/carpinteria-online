import { AuthProvider } from "./features/auth/context/AuthProvider";
import AppRouter from "./app/router/AppRouter";

export default function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}