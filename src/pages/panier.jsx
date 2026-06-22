import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { usePanier } from '../contexts/PanierContext';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:3000/api/paniers';

export default function Panier() {
  const [panier, setPanier] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token, userRole } = useAuth();
  const { mettreAJourPanier } = usePanier();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token || userRole === 'ADMIN') {
      setError("Vous devez être connecté en tant que client pour voir votre panier.");
      setLoading(false);
      return;
    }

    const fetchPanier = async () => {
      try {
        const response = await axios.get(`${API_URL}/mon-panier`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        setPanier(response.data);
        mettreAJourPanier(response.data ? response.data.articles.length : 0);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setPanier(null);
          mettreAJourPanier(0);
        } else {
          setError("Impossible de charger votre panier.");
          console.error("Erreur de l'API:", err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPanier();
  }, [token, userRole, mettreAJourPanier]);

  const handleRetirerArticle = async (articleId) => {
    try {
      await axios.delete(`${API_URL}/remove-article/${articleId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      const updatedPanierResponse = await axios.get(`${API_URL}/mon-panier`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      setPanier(updatedPanierResponse.data);
      mettreAJourPanier(updatedPanierResponse.data ? updatedPanierResponse.data.articles.length : 0);
    } catch (err) {
      console.error("Erreur lors du retrait de l'article:", err);
      setError("Erreur lors du retrait de l'article.");
    }
  };

  // const handlePaiement = async () => {
  //   try {
  //     if (!panier || panier.articles.length === 0) {
  //       alert("Votre panier est vide.");
  //       return;
  //     }

  //     const articlesToSend = panier.articles.map(item => ({
  //       nom: item.articleId.nom,
  //       prix: item.articleId.prix,
  //       quantite: item.quantite,
  //       _id: item.articleId._id
  //     }));

  //     const response = await axios.post('http://localhost:3000/api/payment/checkout', { articles: articlesToSend }, {
  //       headers: { 'Content-Type': 'application/json' }
  //     });

  //     if (response.data.url) {
  //       window.location.href = response.data.url;
  //     } else {
  //       console.error("Erreur: L'URL de paiement n'a pas été reçue.");
  //       alert("Une erreur est survenue lors de la préparation du paiement.");
  //     }
  //   } catch (error) {
  //     console.error("Erreur de paiement:", error.response?.data);
  //     alert("Erreur lors de la création de la session de paiement.");
  //   }
  // };
  const handlePaiement = async () => {
  try {
    if (!panier || panier.articles.length === 0) {
      alert("Votre panier est vide.");
      return;
    }

    const articlesToSend = panier.articles.map(item => ({
      nom: item.articleId.nom,
      prix: item.articleId.prix,
      quantite: item.quantite,
      _id: item.articleId._id
    }));

    const response = await axios.post(
      "http://localhost:3000/api/payment/checkout",
      { articles: articlesToSend },
      { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` } } // ✅ ajout du token
    );

    if (response.data.url) {
      window.location.href = response.data.url;
    } else {
      console.error("Erreur: L'URL de paiement n'a pas été reçue.");
      alert("Une erreur est survenue lors de la préparation du paiement.");
    }
  } catch (error) {
    console.error("Erreur de paiement:", error.response?.data);
    alert("Erreur lors de la création de la session de paiement.");
  }
};


  if (loading) return <div>Chargement du panier...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container mt-5">
      <h1>Votre Panier</h1>
      {panier && panier.articles.length > 0 ? (
        <div className="row">
          <div className="col-md-8">
            <ul className="list-group">
              {panier.articles.map(item => (
                <li key={item.articleId._id} className="list-group-item d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <img 
                      src={item.articleId.image?.url || 'placeholder.png'} 
                      alt={item.articleId.nom} 
                      style={{ width: '80px', height: '80px', objectFit: 'cover', marginRight: '20px' }} 
                    />
                    <div>
                      <h5>{item.articleId.nom}</h5>
                      <p>Quantité: {item.quantite}</p>
                      <p>Prix unitaire: {item.articleId.prix} €</p>
                    </div>
                  </div>
                  <div>
                    <button 
                      className="btn btn-danger btn-sm" 
                      onClick={() => handleRetirerArticle(item.articleId._id)}
                    >
                      Retirer
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Résumé du Panier</h5>
                <p>Sous-total: {panier.montantTotal} €</p>
                <button className="btn btn-success w-100" onClick={handlePaiement}>
                  Passer à la caisse
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="alert alert-info">Votre panier est vide.</div>
      )}
    </div>
  );
}























// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useAuth } from '../contexts/AuthContext';
// import { usePanier } from '../contexts/PanierContext';
// import { useNavigate } from 'react-router-dom';

// const API_URL = 'http://localhost:3000/api/paniers';

// export default function Panier() {
//   const [panier, setPanier] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const { token, userRole } = useAuth();
//   const { mettreAJourPanier } = usePanier();
//   const navigate = useNavigate();

//   // Ce useEffect s'exécute au premier chargement du composant
//   // ou si le token/rôle utilisateur change.
//   // Il est responsable de récupérer l'état actuel du panier depuis le back-end.
//   useEffect(() => {
//     if (!token || userRole === 'ADMIN') {
//       setError("Vous devez être connecté en tant que client pour voir votre panier.");
//       setLoading(false);
//       return;
//     }

//     const fetchPanier = async () => {
//       try {
//         const response = await axios.get(`${API_URL}/mon-panier`, {
//           headers: { 'Authorization': `Bearer ${token}` }
//         });

//         // Met à jour l'état du panier avec les données du serveur
//         setPanier(response.data);
//         // Met à jour le compteur global du panier
//         mettreAJourPanier(response.data ? response.data.articles.length : 0);
//       } catch (err) {
//         if (err.response && err.response.status === 404) {
//           setPanier(null);
//           mettreAJourPanier(0);
//         } else {
//           setError("Impossible de charger votre panier.");
//           console.error("Erreur de l'API:", err);
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPanier();
//   }, [token, userRole, mettreAJourPanier]);

//   // Cette fonction gère le retrait d'un article du panier.
//   const handleRetirerArticle = async (articleId) => {
//     try {
//       await axios.delete(`${API_URL}/remove-article/${articleId}`, {
//       headers: { 'Authorization': `Bearer ${token}` }
//       });

//       // Après une suppression réussie, on refait un appel pour s'assurer que
//       // l'état du panier est bien synchronisé avec le back-end.
//       const updatedPanierResponse = await axios.get(`${API_URL}/mon-panier`, {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });

//       setPanier(updatedPanierResponse.data);
//       mettreAJourPanier(updatedPanierResponse.data ? updatedPanierResponse.data.articles.length : 0);
//     } catch (err) {
//       console.error("Erreur lors du retrait de l'article:", err);
//       setError("Erreur lors du retrait de l'article.");
//     }
//   };

//   // Cette fonction gère l'ajout d'un article au panier depuis un autre composant (par ex. ArticleDetails).
//   // Vous devez l'exporter ou la passer via les props pour l'utiliser.
//   const handleAjouterAuPanier = async (articleId) => {
//     try {
//       const response = await axios.post(
//         `${API_URL}/add-article`,
//         { articleId },
//         {
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         }
//       );

//       // Met à jour le panier uniquement après une réponse réussie du serveur
//       setPanier(response.data.panier);
//       mettreAJourPanier(response.data.panier.articles.length);
//       alert("Article ajouté avec succès !");

//     } catch (error) {
//       console.error("Erreur lors de l'ajout au panier:", error.response?.data);
//       alert(error.response?.data.message || 'Erreur lors de l’ajout au panier');
//     }
//   };
  
//   const handlePaiement = () => {
//     navigate('/paiement'); 
//   };

//   if (loading) return <div>Chargement du panier...</div>;
//   if (error) return <div className="alert alert-danger">{error}</div>;

//   return (
//     <div className="container mt-5">
//       <h1>Votre Panier</h1>
//       {panier && panier.articles.length > 0 ? (
//         <div className="row">
//           <div className="col-md-8">
//             <ul className="list-group">
//               {panier.articles.map(item => (
//                 <li key={item.articleId._id} className="list-group-item d-flex justify-content-between align-items-center">
//                   <div className="d-flex align-items-center">
//                     <img 
//                       src={item.articleId.image?.url || 'placeholder.png'} 
//                       alt={item.articleId.nom} 
//                       style={{ width: '80px', height: '80px', objectFit: 'cover', marginRight: '20px' }} 
//                     />
//                     <div>
//                       <h5>{item.articleId.nom}</h5>
//                       <p>Quantité: {item.quantite}</p>
//                       <p>Prix unitaire: {item.articleId.prix} €</p>
//                     </div>
//                   </div>
//                   <div>
//                     <button 
//                       className="btn btn-danger btn-sm" 
//                       onClick={() => handleRetirerArticle(item.articleId._id)}
//                     >
//                       Retirer
//                     </button>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           </div>
//           <div className="col-md-4">
//             <div className="card">
//               <div className="card-body">
//                 <h5 className="card-title">Résumé du Panier</h5>
//                 <p>Sous-total: {panier.montantTotal} €</p>
//                 <button className="btn btn-success w-100" onClick={handlePaiement}>
//                   Passer à la caisse
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <div className="alert alert-info">Votre panier est vide.</div>
//       )}
//     </div>
//   );
// }