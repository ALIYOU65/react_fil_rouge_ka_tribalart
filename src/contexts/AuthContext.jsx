import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || null);
  const [userPrenom, setUserPrenom] = useState(localStorage.getItem('userPrenom') || null);
  const [userNom, setUserNom] = useState(localStorage.getItem('userNom') || null);

  useEffect(() => {
    if (token) localStorage.setItem('token', token);
    else localStorage.removeItem('token');
  }, [token]);

  useEffect(() => {
    if (userRole) localStorage.setItem('userRole', userRole);
    else localStorage.removeItem('userRole');
  }, [userRole]);

  useEffect(() => {
    if (userPrenom) localStorage.setItem('userPrenom', userPrenom);
    else localStorage.removeItem('userPrenom');
  }, [userPrenom]);

  useEffect(() => {
    if (userNom) localStorage.setItem('userNom', userNom);
    else localStorage.removeItem('userNom');
  }, [userNom]);

  const login = (newToken, role, prenom, nom) => {
    setToken(newToken);
    setUserRole(role);
    setUserPrenom(prenom);
    setUserNom(nom);
  };

  const logout = () => {
    setToken(null);
    setUserRole(null);
    setUserPrenom(null);
    setUserNom(null);
  };

  return (
    <AuthContext.Provider value={{ token, userRole, userPrenom, userNom, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};


