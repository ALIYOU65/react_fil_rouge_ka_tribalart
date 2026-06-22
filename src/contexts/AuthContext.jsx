import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || null);
  const [userPrenom, setUserPrenom] = useState(localStorage.getItem('userPrenom') || null);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  useEffect(() => {
    if (userRole) {
      localStorage.setItem('userRole', userRole);
    } else {
      localStorage.removeItem('userRole');
    }
  }, [userRole]);

  useEffect(() => {
    if (userPrenom) {
      localStorage.setItem('userPrenom', userPrenom);
    } else {
      localStorage.removeItem('userPrenom');
    }
  }, [userPrenom]);

  const login = (newToken, role, prenom) => {
    setToken(newToken);
    setUserRole(role);
    setUserPrenom(prenom);
  };

  const logout = () => {
    setToken(null);
    setUserRole(null);
    setUserPrenom(null);
  };

  return (
    <AuthContext.Provider value={{ token, userRole, userPrenom, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};































// import React, { createContext, useContext, useState, useEffect } from 'react';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [token, setToken] = useState(localStorage.getItem('token') || null);
//   const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || null);
//   const [userPrenom, setUserPrenom] = useState(localStorage.getItem('userPrenom') || null);

//   useEffect(() => {
//     // Si le token change, met à jour le localStorage
//     if (token) {
//       localStorage.setItem('token', token);
//     } else {
//       localStorage.removeItem('token');
//     }
//   }, [token]);

//   useEffect(() => {
//     // Si le rôle change, met à jour le localStorage
//     if (userRole) {
//       localStorage.setItem('userRole', userRole);
//     } else {
//       localStorage.removeItem('userRole');
//     }
//   }, [userRole]);

//   useEffect(() => {
//     // Si le prénom change, met à jour le localStorage
//     if (userPrenom) {
//       localStorage.setItem('userPrenom', userPrenom);
//     } else {
//       localStorage.removeItem('userPrenom');
//     }
//   }, [userPrenom]);

//   const login = (newToken, role, prenom) => {
//     setToken(newToken);
//     setUserRole(role);
//     setUserPrenom(prenom);
//   };

//   const logout = () => {
//     setToken(null);
//     setUserRole(null);
//     setUserPrenom(null);
//   };

//   return (
//     <AuthContext.Provider value={{ token, userRole, userPrenom, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   return useContext(AuthContext);
// };