import React, { useState } from 'react';
// import GestionnaireJson from './gestionnaireJson';

export default function BookDetails({ Data, addToCart }) {
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const handleAddToCart = () => {
    let currentPanier = JSON.parse(localStorage.getItem('panier')) || [];
    if (!Array.isArray(currentPanier)) {
      currentPanier = [];
    }

    const newPanier = [...currentPanier, Data];
    
      localStorage.setItem('panier', JSON.stringify(newPanier));
    
      setIsAddedToCart(true);
    };


  return (
    <ul id="BookDetails">
      <li id='image'>
        {/* <img src={"assets/Livres/Arriere/" + Data.Arriere} alt=""/> */}
        <img id="Section1" src={"assets/Livres/Face/" + Data.Couverture} alt="" />
      </li>
      <li id='Presentation'>
        <span>{Data.Presentation}</span>
      </li>
      <li id='info'>
        <span>
          Auteur: {Data.Auteur}
        </span>
        <span>
          Genre: {Data.Genre}
        </span>
        <span>
          Edition: {Data.Edition}
        </span>
        <span>
          Année: {Data.Annee}
        </span>
        <span>
          Nombre de pages: {Data.NbPages + " Pages"}
        </span>
        <span>
          Prix: {Data.Prix + " Euros"}
        </span>
        <button onClick={handleAddToCart} disabled={isAddedToCart}>
          {isAddedToCart ? "Ajouté au panier" : "Acheter"}
        </button>
      </li>
    </ul>
  );
}
