import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // For dev purposes, use a hardcoded default user if no token is found
  useEffect(() => {
    const initAuth = async () => {
      setLoading(true);
      try {
        if (token) {
          // Set the token in axios defaults for all requests
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

          // In a real app, you'd validate the token here
          // For dev, we'll just create a dummy user if we have a token
          setUser({
            _id: 'dev-user-id',
            username: 'Developer',
            email: 'dev@example.com',
            isAdmin: true
          });
        } else {
          setUser(null);
          delete axios.defaults.headers.common['Authorization'];
        }
      } catch (err) {
        console.error('Auth initialization error:', err);
        setError('Failed to initialize authentication');
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, [token]);

  // Login function
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      // For development purposes, use a simple check
      if (email === 'dev@example.com' && password === 'password') {
        const devToken = 'dev-token-' + Date.now();
        localStorage.setItem('token', devToken);
        setToken(devToken);
        return true;
      } else {
        // In a real app, you'd call your API
        /*
        const response = await axios.post('/api/auth/login', { email, password });
        const { token } = response.data;
        localStorage.setItem('token', token);
        setToken(token);
        */
        throw new Error('Invalid credentials');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Failed to log in');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    delete axios.defaults.headers.common['Authorization'];
  };

  // Value object to be provided by the context
  const value = {
    user,
    token,
    loading,
    error,
    login,
    logout,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;