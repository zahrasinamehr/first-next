"use client";

import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

type Permission = {
  id: number;
  code: string;
};

type RoleMapPermission = {
  id: number;
  permissionId: number;
  permission: Permission;
};

type Role = {
  id: number;
  name: string;
  roleMapPermissions: RoleMapPermission[];
};

type UserMapRole = {
  id: number;
  roleId: number;
  role: Role;
};

type user = {
  id: number;
  brandId: number | null;
  branchId: number | null;
  firstName: string;
  lastName: string | null;
  mobile: string;
  email: string | null;
  avatar: string | null;
  inviteCode: string | null;
  status: string;
  brand: { id: number; name: string } | null;
  branch: { id: number; name: string } | null;
  userMapRoles: UserMapRole[];
  fullName: string;
};

type AuthContextValue = {
  user: user | null;
  setUserInfo: (user: user) => void;
  logout: () => void;
};
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export default function AuthContextProvider({
  children,
  initialUser,
}: {
  children: React.ReactNode;
  initialUser: user | null;
}) {
  const [user, setUser] = useState<user | null>(initialUser);
  const setUserInfo = (user: user) => {
    setUser(user);
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  const fetchUser = async () => {
    try {
      const { data } = await axios.get("https://posapi.7solution.net/auth/me", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setUser(data.data);
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  };

  useEffect(() => {
    fetchUser(); // fetch user by access token
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUserInfo, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// custom hook
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
