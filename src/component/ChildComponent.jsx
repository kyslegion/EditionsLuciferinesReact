import React from 'react';

export default function ChildComponent({ panier, setPanier }) { // panier and setPanier are received as props
  // Function to update panier
  const updatePanier = () => {
    const nouvelElement = { /* votre nouvel élément ici */ };
    setPanier(ancienPanier => [...ancienPanier, nouvelElement]); // update panier using setPanier
  };

  return (
    <div>
      <button onClick={updatePanier}>Mettre à jour le panier</button>
      <div>
        <h2>Contenu du Panier:</h2>
        {panier.map((item, index) => (
          <div key={index}>{/* Affichez les détails de l'item ici */}</div>
        ))}
      </div>
    </div>
  );
}
