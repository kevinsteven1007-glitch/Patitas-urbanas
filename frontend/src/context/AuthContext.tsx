'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { usuariosApi, Usuario } from '@/lib/api';

interface AuthContextType {
  user: Usuario | null;
  userId: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (usuario: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Usuario | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('patitas_user');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUser(parsed);
        setUserId(parsed.uid);
      } catch { /* ignore */ }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Simple login: find user by uid (email used as uid for simplicity)
    const uid = email.toLowerCase().replace(/[^a-z0-9]/g, '_');
    try {
      const found = await usuariosApi.obtener(uid);
      if (!found || !found.uid) {
        throw new Error('Usuario no encontrado. ¿Ya te registraste?');
      }
      setUser(found);
      setUserId(found.uid);
      localStorage.setItem('patitas_user', JSON.stringify(found));
    } catch {
      throw new Error('Usuario no encontrado. ¿Ya te registraste?');
    }
  };

  const register = async (usuario: string, email: string, _password: string) => {
    const uid = email.toLowerCase().replace(/[^a-z0-9]/g, '_');
    // Check if already exists
    try {
      const existing = await usuariosApi.obtener(uid);
      if (existing && existing.uid) {
        throw new Error('Este correo ya está registrado');
      }
    } catch (e: unknown) {
      if (e instanceof Error && e.message === 'Este correo ya está registrado') throw e;
      // If 404 or error, user doesn't exist — proceed
    }
    const newUser = await usuariosApi.crear({ uid, usuario, email });
    setUser(newUser);
    setUserId(newUser.uid);
    localStorage.setItem('patitas_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    setUserId(null);
    localStorage.removeItem('patitas_user');
  };

  return (
    <AuthContext.Provider value={{ user, userId, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
