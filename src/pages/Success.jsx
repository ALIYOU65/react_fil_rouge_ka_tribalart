import React, { useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { usePanier } from '../contexts/PanierContext';
import { useNavigate } from 'react-router-dom';

// Mettez à jour l'URL pour la nouvelle route de finalisation
const API_URL = 'http://localhost:3000/api/paniers';

//  COMPOSANT SUCCESS

export default function Success() {
  const { token, user } = useAuth();
  const { mettreAJourPanier } = usePanier();
  const navigate = useNavigate();

  // USEEFFECT → Finalisation panier après paiement

  useEffect(() => {
    const finaliserPanierApresPaiement = async () => {
      try {
        if (!user || !token) return;

        // Appel à la nouvelle route qui vide le panier ET change son statut
        await axios.post(`${API_URL}/finaliser`, {}, {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        // Mettre à jour l'état local du panier
        mettreAJourPanier(0); 
        console.log("Panier finalisé et vidé après paiement réussi !");
      } catch (err) {
        console.error("Erreur lors de la finalisation du panier :", err);
      }
    };

    finaliserPanierApresPaiement();

    // Redirection automatique après 5 secondes
    const timer = setTimeout(() => navigate('/Catalogue'), 5000);
    return () => clearTimeout(timer);
  }, [token, user, mettreAJourPanier, navigate]);

  // RENDU DU COMPOSANT

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1 style={{ color: 'green' }}>Votre paiement a été un succès !</h1>
      <p>Votre panier a été vidé et votre commande est confirmée.</p>
      <p>Vous allez être redirigé vers la page de catalogue...</p>
    </div>
  );
}



































// import React, { useEffect } from 'react';
// import axios from 'axios';
// import { useAuth } from '../contexts/AuthContext';
// import { usePanier } from '../contexts/PanierContext';
// import { useNavigate } from 'react-router-dom';

// const API_URL = 'http://localhost:3000/api/paniers';

// export default function Success() {
//   const { token, user } = useAuth();
//   const { mettreAJourPanier } = usePanier();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const viderPanier = async () => {
//       try {
//         if (!user || !token) return;

//         await axios.patch(`${API_URL}/vider-mon-panier`, {}, {
//           headers: { 'Authorization': `Bearer ${token}` }
//         });

//         mettreAJourPanier(0); 
//         console.log("Panier vidé après paiement réussi !");
//       } catch (err) {
//         console.error("Erreur lors du vidage du panier :", err);
//       }
//     };

//     viderPanier();

//     const timer = setTimeout(() => navigate('/pageCatalogue'), 5000);
//     return () => clearTimeout(timer);
//   }, [token, user, mettreAJourPanier, navigate]);

//   return (
//     <div style={{ textAlign: 'center', marginTop: '50px' }}>
//       <h1 style={{ color: 'green' }}>Votre paiement a été un succès !</h1>
//       <p>Votre panier a été vidé.</p>
//       <p>Vous allez être redirigé vers la page de catalogue...</p>
//     </div>
//   );
// }





















































