import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./layout.css";
// import ChildComponent from '../component/ChildComponent'; 
import { PanierProvider } from '../component/PanierContext';
export default function Layout({ children, changeState2 }) {
  const [panier, setPanier] = useState([]);
  const [showPanier, setShowPanier] = useState(false);

  useEffect(() => {
    const updatePanier = () => {
      const storedPanier = localStorage.getItem('panier');
      if (storedPanier) {
        const parsedPanier = JSON.parse(storedPanier);
        if (Array.isArray(parsedPanier)) {
          setPanier(parsedPanier);
        } else {
          console.error('Data retrieved from localStorage is not an array');
        }
      }
    };

    // Update panier on mount
    updatePanier();

    // Update panier when localStorage changes
    window.addEventListener('storage', updatePanier);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('storage', updatePanier);
    };
  }, []); // panier removed from dependencies


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
  // Fonction pour calculer le total des prix du panier
  const calculerTotal = () => {
    let total = 0;
    panier.forEach((element) => {
      total += element.Prix;
    });
    return total;
  };
  return (
    <div>
      <header>
        <span id='headerTitle'>
        <img onClick={changeState2} id="" src={"assets/autres/lf2.png"} alt=""/>
        <h1 onClick={changeState2}>Éditions Luciférines</h1>
        </span>
        
       
        <span onClick={toggleShowPanier} id='cart'>
        {panier.length > 0 && (
            <span id="cart-count">{panier.length}</span>
            )}
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-cart4" viewBox="0 0 16 16">
            <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"></path>
            </svg>
            
        </span>
        
        
      </header>
      <ul>
    {showPanier && (
      <>
        <table>
          <tr>
            <th>Nom</th>
            <th>Prix</th>
            <th>Action</th>
          </tr>
          {panier.map((element) => (
            <tr key={element.ID}>
              <td>{element.Nom}</td>
              <td>{element.Prix}€</td>
              <td>
                <button id="removeButton" onClick={() => removeFromPanier(element.ID)}>Supprimer</button>
              </td>
            </tr>

          ))}
          <tr class="total-row">
            <td>Total :</td>
            <td>{calculerTotal()}€</td>
            <td></td>
          </tr>
        </table>
        <Link id="achatButton" to={{ pathname: "/Achat", state: { panier } }}>
          <button  onClick={handleAchat}>Acheter</button>
        </Link>
      </>
    )}
  </ul>
      <main >
        <PanierProvider>
          {children}
        </PanierProvider>
      </main>

      <footer>
        <p>© 2023 Éditions Luciférines</p>
      </footer>
    </div>
  );
}
