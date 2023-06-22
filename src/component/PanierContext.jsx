import React, { createContext, useState,useEffect } from 'react';

export const PanierContext = createContext();

export const PanierProvider = ({ children }) => {
  const [panier, setPanier] = useState([]);
  let test=68;

  const ajouterAuPanier = (article) => {
    setPanier([...panier, article]);
  };

  useEffect(() => {
    const updatePanier = () => {
      const a = localStorage.getItem('panier');
      if (a) {
        const b = JSON.parse(a);
        if (Array.isArray(b)) {
          setPanier(b);
        } else {
          console.error('Data retrieved from localStorage is not an array');
        }
      }
    };

    updatePanier();
  }, []);
  
  return (
    <PanierContext.Provider value={{ panier, ajouterAuPanier,test }}>
      {children}
    </PanierContext.Provider>
  );
};
