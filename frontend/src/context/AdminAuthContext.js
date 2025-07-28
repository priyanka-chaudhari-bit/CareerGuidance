import React, { createContext, useState, useEffect, useContext  } from 'react';
export const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState({
    access_admin: null,
    refresh_admin: null,
    admin_username: null,
  });

  const login = (access_admin, refresh_admin,admin_username) => {
    setAuthData({ access_admin, refresh_admin,admin_username });
    localStorage.setItem('admin_access', access_admin);
    localStorage.setItem('admin_refresh', refresh_admin);
    localStorage.setItem('admin_username', admin_username);
    // localStorage.setItem('admin', JSON.stringify(admin));
  };

  const logout = async() => {
    try {
        await fetch('http://127.0.0.1:8000/admin/admin-logout/', {
          method: 'POST',
          credentials: 'include', 
        });
      } catch (error) {
        console.error("Error during backend logout:", error);
      }
    setAuthData({ access: null, refresh: null });
    localStorage.removeItem('admin_access');
    localStorage.removeItem('admin_refresh');
    localStorage.removeItem('admin_username');
      window.location.href = '/admin-login';

    // localStorage.removeItem('admin');
  };
  useEffect(() => {
    const storedAccess = localStorage.getItem('admin_access');
    const storedRefresh = localStorage.getItem('admin_refresh');
    const storedAdmin = localStorage.getItem('admin_username');
    // const storedAdmin = JSON.parse(localStorage.getItem('admin'));

    if (storedAccess && storedRefresh && storedAdmin) {
      setAuthData({
        access_admin: storedAccess,
        refresh_admin: storedRefresh,
        admin_username: storedAdmin

      });
    }
  }, []);

  return (
    <AdminAuthContext.Provider value={{ ...authData, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};
