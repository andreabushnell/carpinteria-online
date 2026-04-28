import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes/AppRouter";
import { AuthProvider } from "./features/auth/AuthContext";
import { AuthInit } from "./features/auth/AuthInit";

import "./styles/global.css";
import "./styles/variables.css";

function App() {
  return (
    <AuthProvider>
      <AuthInit />
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;