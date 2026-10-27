import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

export default function ListeCategories({ onEditer, onCategorieSupprimee, rafraichirListe }) {
  const [categories, setCategories] = useState([]);
  const [chargement, setChargement] = useState(true);

  const recupererCategories = () => {
    axios
      .get('http://localhost:3000/api/categories/all')
      .then((res) => {
        setCategories(res.data);
        setChargement(false);
      })
      .catch((err) => {
        console.error('Erreur lors de la récupération des catégories :', err);
        setChargement(false);
      });
  };

  useEffect(() => {
    recupererCategories();
  }, [rafraichirListe]);

  const gererSuppression = (idCategorie) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?')) {
      axios
        .delete(`http://localhost:3000/api/categories/${idCategorie}`)
        .then(() => {
          console.log('Catégorie supprimée avec succès.');
          if (onCategorieSupprimee) {
            onCategorieSupprimee();
          }
        })
        .catch((err) => {
          console.error('Erreur lors de la suppression de la catégorie :', err);
        });
    }
  };

  if (chargement) {
    return <div className="text-center">Chargement des catégories...</div>;
  }

  return (
    <div className="container mt-5 mb-5 pb-5">
      <h2 className="text-center mb-4">Liste des catégories</h2>
      {categories.length === 0 ? (
        <p className="text-center">Aucune catégorie trouvée.</p>
      ) : (
        <ul className="list-group">
          {categories.map((categorie) => (
            <li key={categorie._id} className="list-group-item d-flex justify-content-between align-items-center">
              {categorie.nom}
              <div>
                <button 
                  onClick={() => onEditer(categorie)} 
                  className="btn btn-warning btn-sm me-2"
                >
                  <FaEdit />
                </button>
                <button 
                  onClick={() => gererSuppression(categorie._id)} 
                  className="btn btn-danger btn-sm"
                >
                  <FaTrashAlt />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}