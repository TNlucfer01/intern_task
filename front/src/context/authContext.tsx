import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { user } from "../api/types/user.types";
import type { authContextType } from "../api/types/auth.types";
import { auth } from "../api/endpoints";
import { ApiError } from "../api/client";

const AuthContext = createContext<authContextType | undefined>(undefined);


export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<user | null|undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const [sessionError, setSessionError] = useState<string | null>(null);
    
    
    const checkSession = useCallback(async () => {
        setIsLoading(true);
        setSessionError(null);
        try {
            const response = await auth.me();
            setUser(response.user);
        }
        catch (error) {
            if (error instanceof ApiError && (error.status === 401 || error.status === 403)) {
                setUser(null);
            } else {
                setUser(undefined);
                setSessionError(
                    error instanceof Error ? error.message : "Unable to check your session.",
                );
            }
        }
        finally {
            setIsLoading(false);
        }
    }, []);

    const login = async (email: string, password: string) => {
        const data = await auth.login(email, password);
        setSessionError(null);
        setUser(data.user);
    };

    const logout = async () => {
        await auth.logout();
        setUser(null);
    };

  useEffect(() => {
    void checkSession();
  }, [checkSession]);

  const value: authContextType = {
    user,
    isLoading,
    sessionError,
    isAuthenticated: !!user,
    login,
    logout,
    checkSession,
  };
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}


export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}