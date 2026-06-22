import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext'; 

const ListeArticles = ({ rafraichirListe, onEditer, onArticleSupprimee }) => {
  const [articles, setArticles] = useState([]);
  const [message, setMessage] = useState('');
  
  // Récupérez le token et le rôle de l'utilisateur
  const { token, userRole } = useAuth(); 
  
  // La logique pour vérifier si l'utilisateur est un ADMIN
  const isAdmin = token && userRole === 'ADMIN';

  const fetchArticles = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/articles/all');
      setArticles(response.data);
      setMessage('');
    } catch (error) {
      console.error("Erreur lors de la récupération des articles :", error);
      setMessage(`Erreur lors de la récupération : ${error.response?.data?.message || error.message}`);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [rafraichirListe, onArticleSupprimee]);

  const handleDelete = async (articleId) => {
  
    if (!isAdmin) {
      console.error("Accès refusé. Non-administrateur.");
      return; 
    }

    const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer cet article ?");
    if (confirmDelete) {
        try {
            await axios.delete(`http://localhost:3000/api/articles/${articleId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setMessage("Article supprimé avec succès !");
            if (onArticleSupprimee) {
                onArticleSupprimee();
            }
        } catch (error) {
            console.error("Erreur lors de la suppression :", error);
            setMessage(`Erreur lors de la suppression : ${error.response?.data?.message || error.message}`);
        }
    }
  };

  return (
    <div className="mt-5">
      <h2 className="mb-4">Liste des articles</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <div className="row">
        {articles.length > 0 ? (
          articles.map((article) => (
            <div key={article._id} className="col-md-6 mb-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{article.nom}</h5>
                  <p className="card-text">
                    <strong>Description:</strong> {article.description}
                  </p>
                  <p className="card-text">
                    <strong>Prix:</strong> {article.prix} €
                  </p>
                  <p className="card-text">
                    <strong>Origine:</strong> {article.origine}
                  </p>
                  <div className="mb-2">
                    <strong>Catégories:</strong>
                    <ul>
                      {article.categories.map(cat => (
                        <li key={cat._id}>{cat.nom}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="mb-3">
                    <strong>Images:</strong>
                    <div className="d-flex flex-wrap">
                      {article.images.length > 0 && article.images[0].images ? (
                        article.images[0].images.map(img => (
                          <img
                            key={img._id}
                            src={img.url}
                            alt={img.alt}
                            className="img-fluid rounded me-2 mb-2"
                            style={{ maxHeight: '100px' }}
                          />
                        ))
                      ) : (
                        <p>Aucune image liée.</p>
                      )}
                    </div>
                  </div>
                  <div className="mt-3">
                    {/* Les boutons s'affichent uniquement si l'utilisateur est un ADMIN */}
                    {isAdmin && (
                      <>
                        <button
                          onClick={() => onEditer(article)}
                          className="btn btn-warning btn-sm me-2"
                        >
                          Modifier
                        </button>
                        <button
                          onClick={() => handleDelete(article._id)}
                          className="btn btn-danger btn-sm"
                        >
                          Supprimer
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Aucun article trouvé.</p>
        )}
      </div>
    </div>
  );
};

export default ListeArticles;