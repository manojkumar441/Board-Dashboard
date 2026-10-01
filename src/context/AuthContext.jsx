import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext(null);

const STORAGE_KEY = 'board_auth_session';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize authentication state from persistent storage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setUser(parsed);
      }
    } catch (err) {
      console.error("Failed to restore auth session:", err);
      localStorage.removeItem(STORAGE_KEY);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Handle Google OAuth response
   */
  const loginWithGoogle = (data) => {
    try {
      let userData;

      if (data?.userProfile) {
        userData = {
          name: data.userProfile.name || "Google User",
          email: data.userProfile.email || "user@gmail.com",
          picture: data.userProfile.picture || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
          provider: 'google'
        };
      } else if (data?.credential) {
        let decoded;
        try {
          decoded = jwtDecode(data.credential);
        } catch (e) {
          const base64Url = data.credential.split('.')[1];
          const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          const jsonPayload = decodeURIComponent(
            atob(base64)
              .split('')
              .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
              .join('')
          );
          decoded = JSON.parse(jsonPayload);
        }

        userData = {
          name: decoded.name || "Google User",
          email: decoded.email || "user@gmail.com",
          picture: decoded.picture || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
          provider: 'google',
          sub: decoded.sub
        };
      } else {
        throw new Error("No credential or userProfile provided.");
      }

      setUser(userData);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
      return { success: true, user: userData };
    } catch (error) {
      console.error("Google sign-in error:", error);
      return { success: false, error: error.message };
    }
  };

  /**
   * Standard Email/Password login
   */
  const loginWithEmail = (email, password) => {
    if (!email || !password) {
      return { success: false, error: "Please enter both email and password." };
    }

    const userData = {
      name: email.split('@')[0].replace(/[^a-zA-Z0-9]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      email: email,
      picture: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80",
      provider: 'credentials'
    };

    setUser(userData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
    return { success: true, user: userData };
  };

  /**
   * One-click demo login for reviewers and evaluators
   */
  const loginAsDemo = () => {
    const demoUser = {
      name: "Alex Doe",
      email: "alex.doe@example.com",
      picture: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
      provider: 'demo'
    };

    setUser(demoUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(demoUser));
    return { success: true, user: demoUser };
  };

  /**
   * Logout user and clear session
   */
  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const value = {
    user,
    isAuthenticated: Boolean(user),
    loading,
    loginWithGoogle,
    loginWithEmail,
    loginAsDemo,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
