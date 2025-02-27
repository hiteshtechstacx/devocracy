
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

interface User {
  id: string;
  phoneNumber: string;
  aadharNumber: string;
  username?: string;
  profileImage?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (phoneNumber: string, aadharNumber: string, profileImage?: string) => Promise<void>;
  logout: () => void;
  signup: (phoneNumber: string, aadharNumber: string, username: string, profileImage?: string) => Promise<void>;
  updateUserProfile: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem("blockauth_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("blockauth_user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (phoneNumber: string, aadharNumber: string, profileImage?: string): Promise<void> => {
    try {
      setIsLoading(true);
      // In a real app, you would verify the credentials here
      // For demo purposes, we'll just create a user with the provided details
      const mockUser: User = {
        id: `user_${Date.now()}`,
        phoneNumber,
        aadharNumber,
        profileImage
      };
      
      setUser(mockUser);
      localStorage.setItem("blockauth_user", JSON.stringify(mockUser));
      toast.success("Successfully logged in");
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Failed to login. Please try again.");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (phoneNumber: string, aadharNumber: string, username: string, profileImage?: string): Promise<void> => {
    try {
      setIsLoading(true);
      // In a real app, you would register the user on the server here
      const mockUser: User = {
        id: `user_${Date.now()}`,
        phoneNumber,
        aadharNumber,
        username,
        profileImage
      };
      
      setUser(mockUser);
      localStorage.setItem("blockauth_user", JSON.stringify(mockUser));
      toast.success("Successfully registered");
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Failed to register. Please try again.");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserProfile = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem("blockauth_user", JSON.stringify(updatedUser));
      toast.success("Profile updated successfully");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("blockauth_user");
    toast.success("Successfully logged out");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        signup,
        updateUserProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
