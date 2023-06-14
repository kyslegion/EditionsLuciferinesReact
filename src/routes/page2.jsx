import React, { useState, useEffect } from 'react';
import './page2.css'
import { Link } from 'react-router-dom';
function RecapitulatifAchat() {
  const [panier, setPanier] = useState([]);

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

  // Fonction pour calculer le total des prix du panier
  const calculerTotal = () => {
    let total = 0;
    panier.forEach((element) => {
      total += element.Prix;
    });
    return total;
  };
  return (
    <div id='resume'>
      <h1>Récapitulatif d'achat</h1>
      <Link to="/">
      <h2>Accueil</h2>
      </Link>
    
      <table>
        <thead>
          <tr>
          <th></th>
            <th>Nom</th>
            <th>Prix</th>
          </tr>
        </thead>
        <tbody>
          {panier.map((element) => (
            <tr key={element.ID}>
                <td> <img id="" src={"assets/Livres/Face/" + element.Couverture} alt=""/></td>
              <td>{element.Nom}</td>
              <td>{element.Prix}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="2">Total:</td>
            <td>{calculerTotal()}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default RecapitulatifAchat;
