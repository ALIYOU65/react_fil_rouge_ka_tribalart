import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/ligneCommandes';

export default function ListeLigneCommandes({ rafraichir, onEditer }) {
  const [lignes, setLignes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLignesCommandes = async () => {
      try {
        const response = await axios.get(`${API_URL}/all`);
        setLignes(response.data);
      } catch (err) {
        setError("Impossible de charger les lignes de commande.");
      } finally {
        setLoading(false);
      }
    };
    fetchLignesCommandes();
  }, [rafraichir]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer cette ligne de commande ?");
    if (confirmDelete) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        setLignes(lignes.filter(l => l._id !== id));
      } catch (err) {
        alert("Erreur lors de la suppression de la ligne de commande.");
      }
    }
  };

  if (loading) {
    return <div>Chargement des lignes de commande...</div>;
  }

  if (error) {
    return <div>Erreur: {error}</div>;
  }
  
  return (
    <div className="mt-5">
      <h2 className="mb-4">Liste des lignes de commande</h2>
      {lignes.length === 0 ? (
        <p>Aucune ligne de commande trouvée.</p>
      ) : (
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Quantité</th>
              <th>Prix Total</th>
              <th>Article</th>
              <th>Commande</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {lignes.map(ligne => (
              <tr key={ligne._id}>
                <td>{ligne.quantite}</td>
                <td>{ligne.prixTotal} €</td>
                <td>{ligne.article?.nom || "Non trouvé"}</td>
                <td>{ligne.commande?.numero || "Non trouvé"}</td>
                <td>
                  <button onClick={() => onEditer(ligne)} className="btn btn-sm btn-warning me-2">Modifier</button>
                  <button onClick={() => handleDelete(ligne._id)} className="btn btn-sm btn-danger">Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}