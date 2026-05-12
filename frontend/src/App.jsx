import { AuthProvider } from "./features/auth/context/AuthProvider";
import AuthDebugPage from "./features/auth/pages/AuthDebugPage";

function App() {
  return (
    <AuthProvider>
      <AuthDebugPage />
    </AuthProvider>
  );
}

export default App;