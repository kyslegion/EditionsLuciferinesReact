import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./layout.css";

export default function Layout({ children, changeState2 }) {
  const [panier, setPanier] = useState([]);
  const [showPanier, setShowPanier] = useState(false);

  useEffect(() => {
    const storedPanier = localStorage.getItem('panier');
    if (storedPanier) {
      const parsedPanier = JSON.parse(storedPanier);
      if (Array.isArray(parsedPanier)) {
        setPanier(parsedPanier);
      } else {
        console.error('Data retrieved from localStorage is not an array');
      }
    }
  }, []);

  const removeFromPanier = (id) => {
    const updatedPanier = panier.filter((element) => element.ID !== id);
    setPanier(updatedPanier);
    localStorage.setItem('panier', JSON.stringify(updatedPanier));
  };

  const toggleShowPanier = () => {
    setShowPanier((prevShowPanier) => !prevShowPanier);
  };

  const handleAchat = () => {
    // Logique d'achat ici
    console.log("Achat effectué !");
  };

  return (
    <div>
      <header>
        <h1 onClick={changeState2}>Mon Application</h1>
        <p onClick={toggleShowPanier}>Panier:</p>
        <ul>
          {showPanier && (
            <>
              {panier.map((element) => (
                <li key={element.ID}>
                  <div>{element.Nom}</div>
                  <div>{element.Prix}</div>
                  <button id='removeButton' onClick={() => removeFromPanier(element.ID)}>Supprimer</button>
                </li>
              ))}
            </>
          )}
        </ul>
        <Link to={{ pathname: "/Achat", state: { panier } }}>
          <button id="achatButton" onClick={handleAchat}>Acheter</button>
        </Link>
      </header>

      <main>{children}</main>

      <footer>
        <p>© 2023 Mon Application</p>
      </footer>
    </div>
  );
}
