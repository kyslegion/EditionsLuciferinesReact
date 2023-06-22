import React, { useState, useEffect } from 'react';
import './RecapitulatifAchat.css'
import { Link } from 'react-router-dom';
// Importer les composants nécessaires de PayPal
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

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
    <PayPalScriptProvider options={{ "client-id": "your-client-id" }}>
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
        {/* Ajouter le bouton PayPal ici */}
        <PayPalButtons 
          style={{ layout: "horizontal" }} 
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [{
                description: "Achat de livres",
                items: panier.map((element) => ({
                  name: element.Nom,
                  description: '', // Remplacez par le champ de description du livre dans votre objet `element` s'il existe
                  quantity: '1', // Remplacez par le champ de quantité dans votre objet `element` s'il existe
                  unit_amount: {
                    currency_code: 'EUR', // Remplacez par la devise appropriée
                    value: element.Prix,
                  },
                  category: 'PHYSICAL_GOODS',
                })),
                amount: {
                  currency_code: 'EUR', // Remplacez par la devise appropriée
                  value: calculerTotal().toString(),
                  breakdown: {
                    item_total: {
                      currency_code: 'EUR', // Remplacez par la devise appropriée
                      value: calculerTotal().toString(),
                    },
                  },
                },
              }],
            });
          }}
        />
      </div>
    </PayPalScriptProvider>
  );
}

export default RecapitulatifAchat;
