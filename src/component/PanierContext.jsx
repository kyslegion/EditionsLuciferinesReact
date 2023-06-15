import React, { createContext, useState, useContext } from "react";

export const PanierContext = createContext();

export function usePanier() {
    return useContext(PanierContext);
}

export default function PanierProvider({ children }) {
    const [panier, setPanier] = useState([]);

    return (
        <PanierContext.Provider value={{ panier, setPanier }}>
            {children}
        </PanierContext.Provider>
    );
}
