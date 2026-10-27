import React, { createContext, useContext, useState } from 'react';

const PanierContext = createContext();

export function usePanier() {
  return useContext(PanierContext);
}

export function PanierProvider({ children }) {
  const [nombreArticles, setNombreArticles] = useState(0);

  const mettreAJourPanier = (nouveauNombre) => {
    setNombreArticles(nouveauNombre);
  };

  const value = {
    nombreArticles,
    mettreAJourPanier,
  };

  return (
    <PanierContext.Provider value={value}>
      {children}
    </PanierContext.Provider>
  );
}





















