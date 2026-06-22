import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/commandes';

export default function ListeCommandes({ rafraichir, onEditer }) {
  const [commandes, setCommandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCommandes = async () => {
      try {
        const response = await axios.get(`${API_URL}/all`);
        setCommandes(response.data);
      } catch (err) {
        setError("Impossible de charger les commandes.");
      } finally {
        setLoading(false);
      }
    };
    fetchCommandes();
  }, [rafraichir]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer cette commande ?");
    if (confirmDelete) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        setCommandes(commandes.filter(cmd => cmd._id !== id));
      } catch (err) {
        alert("Erreur lors de la suppression de la commande.");
      }
    }
  };

  if (loading) {
    return <div>Chargement des commandes...</div>;
  }

  if (error) {
    return <div>Erreur: {error}</div>;
  }
  
  return (
    <div className="mt-5">
      <h2 className="mb-4">Liste des commandes</h2>
      {commandes.length === 0 ? (
        <p>Aucune commande trouvée.</p>
      ) : (
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Numéro</th>
              <th>Prix Total</th>
              <th>Statut</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {commandes.map(commande => (
              <tr key={commande._id}>
                <td>{commande.numero}</td>
                <td>{commande.prixTotal} €</td>
                <td>{commande.statut}</td>
                <td>{new Date(commande.date).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => onEditer(commande)} className="btn btn-sm btn-warning me-2">Modifier</button>
                  <button onClick={() => handleDelete(commande._id)} className="btn btn-sm btn-danger">Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}