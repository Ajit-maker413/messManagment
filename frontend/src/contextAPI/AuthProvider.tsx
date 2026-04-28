import React, { useEffect, useState } from "react";
import { AuthContext, UserRole } from "./AuthContext";
import { logoutApi } from "../api/user";
import { setAuthToken } from "../api/axiosInstance";

const storageKey = "messAuth";

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [role, setRole] = useState<UserRole>("STUDENT");
  const [token, setToken] = useState("");
  const [user, setUser] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed?.token) {
          setToken(parsed.token);
          setRole(parsed.role ?? "STUDENT");
          setUser(parsed.user ?? null);
          setAuthToken(parsed.token);
        }
      } catch {
        localStorage.removeItem(storageKey);
      }
    }
  }, []);

  const login = async (authData: {
    token: string;
    role: UserRole;
    user: Record<string, unknown> | null;
  }) => {
    setToken(authData.token);
    setRole(authData.role);
    setUser(authData.user);
    setAuthToken(authData.token);
    localStorage.setItem(storageKey, JSON.stringify(authData));
  };

  const logout = async () => {
    try {
      await logoutApi();
    } catch (err) {
      console.error("Logout failed", err);
    }

    setToken("");
    setRole(null);
    setUser(null);
    setEmail("");
    setOtp("");
    setAuthToken(null);
    localStorage.removeItem(storageKey);
  };

  const isAuthenticated = Boolean(token && role);

  return (
    <AuthContext.Provider
      value={{
        email,
        setEmail,
        otp,
        setOtp,
        role,
        setRole,
        token,
        setToken,
        user,
        setUser,
        isAuthenticated,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
