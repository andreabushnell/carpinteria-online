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
        setLoading(false);
        return;
      }

      try {
        const currentUser = await getMe();
        setUserState(currentUser);
        setUser(currentUser);
      } catch (error) {
        console.warn("Session invalid or expired:", error);
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

    setToken(data.access || data.token);
    setUser(data.user);
    setUserState(data.user);

    return data.user;
  };

  const register = async (userData) => {
    const data = await registerUser(userData);

    setToken(data.access || data.token);
    setUser(data.user);
    setUserState(data.user);

    return data.user;
  };

  const logout = async () => {
    try {
      await logoutUser();
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