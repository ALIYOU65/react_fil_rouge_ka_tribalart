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
  const [selectedArticles, setSelectedArticles] = useState([]); 
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
        // Par défaut, tous les articles sont sélectionnés
        if (response.data?.articles) {
          setSelectedArticles(response.data.articles.map(item => item.articleId._id));
        }
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
      // Mettre à jour la sélection
      if (updatedPanierResponse.data?.articles) {
        setSelectedArticles(updatedPanierResponse.data.articles.map(item => item.articleId._id));
      } else {
        setSelectedArticles([]);
      }
      mettreAJourPanier(updatedPanierResponse.data ? updatedPanierResponse.data.articles.length : 0);
    } catch (err) {
      console.error("Erreur lors du retrait de l'article:", err);
      setError("Erreur lors du retrait de l'article.");
    }
  };

  const toggleSelection = (articleId) => {
    setSelectedArticles(prev => {
      if (prev.includes(articleId)) {
        return prev.filter(id => id !== articleId);
      } else {
        return [...prev, articleId];
      }
    });
  };

  const handlePaiement = async () => {
    try {
      if (!panier || panier.articles.length === 0) {
        alert("Votre panier est vide.");
        return;
      }

      if (selectedArticles.length === 0) {
        alert("Veuillez sélectionner au moins un article à payer.");
        return;
      }

      // Ne garder que les articles sélectionnés
      const articlesToSend = panier.articles
        .filter(item => selectedArticles.includes(item.articleId._id))
        .map(item => ({
          nom: item.articleId.nom,
          prix: item.articleId.prix,
          quantite: item.quantite,
          _id: item.articleId._id
        }));

      const response = await axios.post(
        "http://localhost:3000/api/payment/checkout",
        { articles: articlesToSend },
        { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` } }
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

  // Calcul du sous-total des articles sélectionnés
  const sousTotalSelectionne = panier?.articles
    ?.filter(item => selectedArticles.includes(item.articleId._id))
    ?.reduce((total, item) => total + (item.articleId.prix * item.quantite), 0) || 0;

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
                    {/* Case à cocher */}
                    <input
                      type="checkbox"
                      className="form-check-input me-3"
                      style={{ width: '18px', height: '18px' }}
                      checked={selectedArticles.includes(item.articleId._id)}
                      onChange={() => toggleSelection(item.articleId._id)}
                    />
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
                <p>Articles sélectionnés : {selectedArticles.length}</p>
                <p><strong>Sous-total : {sousTotalSelectionne} €</strong></p>
                <button
                  className="btn btn-success w-100"
                  onClick={handlePaiement}
                  disabled={selectedArticles.length === 0}
                >
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





