import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import './Catalogue.css';

// Récupère le rôle depuis le localStorage (par exemple après connexion)
// Si rien n'est trouvé → visiteur
const userRole = localStorage.getItem("role") || "visiteur";  

export default function PageCatalogue() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [zoomImage, setZoomImage] = useState(null);
  const itemsPerPage = 5;

  const navigate = useNavigate();
  const location = useLocation();
  
  // Vérifie si l'utilisateur est un administrateur
  const isAdmin = userRole === 'admin';

  const query = new URLSearchParams(location.search);
  const categorie = query.get('categorie');

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const url = categorie
          ? `http://localhost:3000/api/articles/by-category?nom=${categorie}`
          : 'http://localhost:3000/api/articles/all';
        const response = await axios.get(url);
        setArticles(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des articles :", error);
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, [categorie]);

  const handleVoirClick = (articleId) => {
    navigate(`/article/${articleId}`);
  };

  const handleModifierClick = (articleId) => {
    navigate(`/pageArticles?id=${articleId}`);
  };

  const handleDelete = async (articleId) => {
    console.log(`Supprimer l'article avec l'ID: ${articleId}`);
  };

  const handleZoomImage = (imageUrl) => {
    setZoomImage(imageUrl);
  };

  if (loading) {
    return <div>Chargement du catalogue...</div>;
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentArticles = articles.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(articles.length / itemsPerPage);

 return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Catalogue des articles</h1>
      <div className="table-responsive">
        <table className="table table-bordered w-90">
          <thead className="table-header">
            <tr>
              <th>Identifiant</th>
              <th>Nom</th>
              <th>Catégories</th>
              <th>Description</th>
              <th>Origine</th>
              <th style={{ width: '100px' }}>Prix</th>
              <th>Images</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentArticles.length > 0 ? (
              currentArticles.map(article => (
                <tr key={article._id}>
                  <td>{article._id}</td>
                  <td>{article.nom}</td>
                  <td>{article.categories.map(cat => cat.nom).join(', ')}</td>
                  <td>
                    {article.description.substring(0, 30)}...
                    <button
                      className="btn btn-link p-0 ms-1"
                      onClick={() => handleVoirClick(article._id)}
                    >
                      Lire plus
                    </button>
                  </td>
                  <td>{article.origine}</td>
                  <td>{article.prix} €</td>
                  <td>
                    <div className="d-flex justify-content-center">
                      {article.images?.length > 0 && article.images[0].images?.length > 0 ? (
                        <div className="image-container" onClick={() => handleZoomImage(article.images[0].images[0].url)}>
                          <img
                            src={article.images[0].images[0].url}
                            alt={article.nom}
                            className="rounded"
                            style={{ width: '90%' }}
                          />
                          <span className="zoom-icon">🔍</span>
                        </div>
                      ) : (
                        <p>Aucune image.</p>
                      )}
                    </div>
                  </td>
                  <td>
               <div className="d-grid gap-2">
              <button
              className="btn btn-primary btn-sm"
              onClick={() => handleVoirClick(article._id)}
              >
               Voir
             </button>

             {article.statut === "Vendu" && (
            <span className="badge bg-danger mt-1">Vendu</span>
            )}

             {isAdmin && (
             <>
             <button
             className="btn btn-warning btn-sm"
              onClick={() => handleModifierClick(article._id)}
               >
               Modifier
               </button>
               <button
              className="btn btn-danger btn-sm"
               onClick={() => handleDelete(article._id)}
                >
               Supprimer
              </button>
             </>
           )}
           </div>
            </td>
             </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center">Aucun article trouvé.</td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="d-flex justify-content-center mt-4 pagination-container">
          <button
            className="pagination-btn me-2"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Précédent
          </button>
          <span className="btn btn-light border">{currentPage}</span>
          <button
            className="pagination-btn ms-2"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Suivant
          </button>
        </div>
      </div>

      {zoomImage && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }} onClick={() => setZoomImage(null)}>
          <div className="modal-dialog modal-xl modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content bg-transparent border-0">
              <div className="modal-body text-center p-0">
                <img src={zoomImage} alt="Zoomed" className="modal-image" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}













































