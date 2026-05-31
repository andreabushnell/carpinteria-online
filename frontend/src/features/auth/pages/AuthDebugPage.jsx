import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

export default function AuthDebugPage() {
  const { user, login, logout, loading, isAuthenticated } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await login({ email, password });
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Auth Debug Panel</h1>

      <div>
        <p>Loading: {loading ? "true" : "false"}</p>
        <p>Authenticated: {isAuthenticated ? "true" : "false"}</p>
      </div>

      <div>
        <h3>Current User</h3>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </div>

      <div style={{ marginTop: "20px" }}>
        <h3>Test Login</h3>

        <input
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          placeholder="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Login</button>
      </div>

      <div style={{ marginTop: "20px" }}>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}