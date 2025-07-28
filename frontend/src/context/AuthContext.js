import React, { createContext, useState, useEffect, useContext  } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(() => localStorage.getItem('accessToken') || null);
  const [refreshToken, setRefreshToken] = useState(() => localStorage.getItem('refreshToken') || null);
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    console.log("storedUser from authcontext",storedUser)
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = (access, refresh, userData) => {
    setAuthToken(access);
    setRefreshToken(refresh);
    setUser(userData);
    localStorage.setItem('accessToken', access);
    localStorage.setItem('refreshToken', refresh);
    localStorage.setItem('user', JSON.stringify(userData));
    console.log("access",access)
    console.log("refresh",refresh)
    console.log("user",JSON.stringify(userData))
  };

  const logout = async() => {
    try {
      const refresh = localStorage.getItem('refreshToken');
      const access = localStorage.getItem('accessToken');

      if (refresh && access) {
        await fetch('http://127.0.0.1:8000/students/user-logout/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${access}`,
          },
          body: JSON.stringify({ refresh }),
        });
      }
    } catch (error) {
      console.error('Error during logout API call:', error);
    } finally {
      // Clear client-side storage and redirect
      setAuthToken(null);
      setRefreshToken(null);
      setUser(null);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      localStorage.clear();
      window.location.href = '/user-login';
    }

    // setAuthToken(null);
    // setRefreshToken(null);
    // setUser(null);
    // localStorage.removeItem('accessToken');
    // localStorage.removeItem('refreshToken');
    // localStorage.removeItem('user');
    // localStorage.clear();
    // window.location.href = '/user-login';
  };

  const refreshAccessToken = async () => {
    try {
        const res = await fetch('http://127.0.0.1:8000/students/token/refresh/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh: refreshToken })
        });

        if (res.ok) {
        const data = await res.json();
        setAuthToken(data.access);
        localStorage.setItem('accessToken', data.access);
        return data.access;
        } else {
        logout();  
        return null;
        }
    } catch (err) {
        console.error("Refresh failed:", err);
        logout();
        return null;
    }
  };

  useEffect(() => {
    const storedAccess = localStorage.getItem('accessToken');
    const storedRefresh = localStorage.getItem('refreshToken');
    const storedUser = localStorage.getItem('user');
    if (storedAccess) setAuthToken(storedAccess);
    if (storedRefresh) setRefreshToken(storedRefresh);
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  return (
    <AuthContext.Provider value={{ authToken, refreshToken, user,login, logout,refreshAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access AuthContext
export const useAuth = () => useContext(AuthContext);