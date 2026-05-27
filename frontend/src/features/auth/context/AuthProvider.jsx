import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";

import {
  setToken,
  getToken,
  setUser,
  getUser,
  clearAuth,
} from "../utils/authStorage";

import {
  loginUser,
  registerUser,
  logoutUser,
  getMe,
} from "../../../api/endpoints/users";

export const AuthProvider = ({ children }) => {
  const [user, setUserState] = useState(getUser());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = getToken();

      if (!token) {
        clearAuth();
        setUserState(null);
        setLoading(false);
        return;
      }

      try {
        const currentUser = await getMe();
        setUserState(currentUser);
        setUser(currentUser);
      } catch (error) {
        console.warn("Sesión inválida o expirada, limpiando estados:", error);
        clearAuth();
        setUserState(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (credentials) => {
    const data = await loginUser(credentials);
    const resolvedToken = data.access || data.token;

    setToken(resolvedToken);
    setUser(data.user);
    setUserState(data.user);

    return data.user;
  };

  const register = async (userData) => {
    const data = await registerUser(userData);
    const resolvedToken = data.access || data.token;

    setToken(resolvedToken);
    setUser(data.user);
    setUserState(data.user);

    return data.user;
  };

  const logout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Error al revocar token en el backend:", error);
    } finally {
      clearAuth();
      setUserState(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};