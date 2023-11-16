'use client';
import AxiosClient from '@/lib/AxiosClient';
import { User } from '@/lib/types';
import { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  user: null | {
    id: string;
    name: string;
  };
}

const AuthContext = createContext<AuthContextType>({
  user: null,
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean | null>(true);
  useEffect(() => {
    (async function verifyToken() {
      try {
        const response = await AxiosClient.get('/auth/verify');
        setUser(response.data);
      } catch {
        return;
      } finally {
        setLoading(false);
      }
    })();
  }, [setUser]);
  if (loading) {
    return <div>loading</div>;
  }
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthProvider;
