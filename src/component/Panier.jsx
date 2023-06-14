import React from 'react';

const Panier = ({ panier }) => {
  return (
    <div>
      <h2>Panier</h2>
      <ul>
        {panier.map((element) => (
          <li key={element.id || element.Nom}>
            {element.Nom} - {element.Prix}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Panier;
