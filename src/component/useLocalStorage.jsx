import React, { useContext } from 'react';
import { PanierContext } from './Layout';  // Assurez-vous que le chemin d'importation est correct

function ChildComponent() {
  const setPanier = useContext(PanierContext);

  // Vous pouvez maintenant utiliser setPanier dans ce composant

  return (
    // Votre rendu ici
  );
}