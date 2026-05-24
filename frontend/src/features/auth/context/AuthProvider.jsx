// src/features/auth/context/AuthProvider.jsx
import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import apiClient from "../../../api/client/axios"; 

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
        apiClient.defaults.headers.common["Authorization"] = `Token ${token}`;
        
        const currentUser = await getMe();
        setUserState(currentUser);
        setUser(currentUser);
      } catch (error) {
        console.warn("Session invalid or expired, resetting states:", error);
        clearAuth();
        setUserState(null);
        
        delete apiClient.defaults.headers.common["Authorization"];
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
    
    apiClient.defaults.headers.common["Authorization"] = `Token ${resolvedToken}`;

    setUser(data.user);
    setUserState(data.user);

    return data.user;
  };

  const register = async (userData) => {
    const data = await registerUser(userData);
    const resolvedToken = data.access || data.token;

    setToken(resolvedToken);
    
    apiClient.defaults.headers.common["Authorization"] = `Token ${resolvedToken}`;

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
      delete apiClient.defaults.headers.common["Authorization"];
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