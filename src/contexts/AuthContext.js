import { XDSbackendHost } from '../config/endpoints';
import { axiosInstance } from '@/config/axiosConfig';
import { createContext, useContext, useEffect, useState } from 'react';
import { useLocalStorage } from '../hooks/useStorage';

export const AuthContext = createContext({});

export function useAuth() {
  return useContext(AuthContext);
}
export function AuthProvider({ children }) {
  const [error, setError] = useState(null);
  const [user, setLocal, removeLocal] = useLocalStorage('user', null);

  useEffect(() => {
    // Only run this on the client side
    if (typeof window !== 'undefined') {
      checkUserLoggedIn();
    }
  }, []);

  // Register user
  const register = (userData) => {
    setError(null);
    setLocal(userData);
  };

  // Login user
  const login = (userData) => {
    setError(null);
    setLocal(userData);
  };

  // Logout user
  const logout = async () => {
    axiosInstance
      .post(`${XDSbackendHost}/api/auth/logout`)
      .then((res) => removeLocal())
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        removeLocal();
      });
  };

  // Check if user is logged in
  const checkUserLoggedIn = async () => {
    axiosInstance
      .get(`${XDSbackendHost}/api/auth/validate`)
      .then((res) => {
        setLocal(res.data);
      })
      .catch((err) => {
        removeLocal();
        logout();
      });
  };
  
  return (
    <AuthContext.Provider value={{ user, error, register, login, logout, checkUserLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}