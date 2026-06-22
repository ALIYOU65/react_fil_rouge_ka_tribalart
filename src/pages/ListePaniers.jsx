import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const API_URL = 'http://localhost:3000/api/paniers';

export default function ListePaniers({ rafraichir, onEditer }) {
  const [paniers, setPaniers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token, userRole } = useAuth();

  const fetchPaniers = async () => {
    if (!token || userRole !== 'ADMIN') {
      setError("Vous n'avez pas les autorisations nécessaires pour accéder à cette page.");
      setLoading(false);
      return;
    }
    try {
      const response = await axios.get(`${API_URL}/all`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setPaniers(response.data);
    } catch (err) {
      setError("Impossible de charger les paniers. " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPaniers();
  }, [rafraichir, token, userRole]);

  const handleDelete = async (id) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce panier ?")) {
      return;
    }
    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setPaniers(paniers.filter(panier => panier._id !== id));
    } catch (err) {
      setError("Erreur lors de la suppression du panier.");
    }
  };

  if (loading) return <div className="text-center mt-5">Chargement des paniers...</div>;
  if (error) return <div className="alert alert-danger mt-5">{error}</div>;

  return (
    <div>
      {paniers.length === 0 ? (
        <p>Aucun panier trouvé.</p>
      ) : (
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>ID Panier</th>
              <th>Utilisateur</th>
              <th>Statut</th>
              <th>Montant Total</th>
              <th>Nombre d'articles</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paniers.map(panier => (
              <tr key={panier._id}>
                <td>{panier._id}</td>
                <td>{panier.user?.nom} {panier.user?.prenom}</td>
                <td>{panier.statut}</td>
                <td>{panier.montantTotal} €</td>
                <td>{panier.articles.length}</td>
                <td>
                  <button onClick={() => onEditer(panier)} className="btn btn-sm btn-info me-2">Modifier</button>
                  <button onClick={() => handleDelete(panier._id)} className="btn btn-sm btn-danger">Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}