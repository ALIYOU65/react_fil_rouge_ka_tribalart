import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { usePanier } from '../contexts/PanierContext';

const API_URL = 'http://localhost:3000/api';

export default function PageArticle() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  const { token, userRole } = useAuth();
  const { mettreAJourPanier } = usePanier();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`${API_URL}/articles/${id}`);
        setArticle(response.data);
      } catch (err) {
        setError("Erreur lors de la récupération de l'article.");
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [id]);

  const ajouterAuPanier = async () => {
    if (!token) {
      alert("Veuillez vous connecter pour ajouter cet article au panier.");
      navigate("/login");
      return;
    }

    if (userRole === "ADMIN") {
      alert("Les administrateurs ne peuvent pas ajouter d'articles à un panier.");
      return;
    }

    try {
      await axios.post(
        `${API_URL}/paniers/add-article`,
        { articleId: article._id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      mettreAJourPanier((prevCount) => prevCount + 1);
      alert("Article ajouté au panier !");
    } catch (err) {
      console.error("Erreur lors de l'ajout au panier:", err);
      alert("Erreur lors de l'ajout de l'article au panier.");
    }
  };

 const achatImmediat = async () => {
  console.log("Token actuel :", token);
  console.log("UserRole :", userRole);

  if (!token) {
    alert("Veuillez vous connecter pour procéder à l'achat.");
    navigate("/login");
    return;
  }

  if (userRole === "ADMIN") {
    alert("Les administrateurs ne peuvent pas faire d'achats.");
    return;
  }

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    };

    console.log("Config envoyée :", config);   

    const response = await axios.post(
      `${API_URL}/commandes/achat-immediat`,
      {
        articleId: article._id,
        quantite: 1
      },
      config
    );

    console.log("Réponse du serveur :", response.data); 

    if (response.data?.url) {
      window.location.href = response.data.url;
    } else {
      alert("Erreur : impossible de récupérer l'URL de paiement.");
    }

  } catch (err) {
    console.error("Erreur complète :", err.response?.data || err);
    alert(err.response?.data?.message || "Erreur lors de la création de la commande.");
  }
};

  if (loading) {
    return <div className="text-center mt-5">Chargement de l'article...</div>;
  }

  if (error || !article) {
    return <div className="text-center mt-5">Article non trouvé.</div>;
  }

  const images = article?.images?.[0]?.images || [];

  return (
    <div className="container mt-5">
      <div className="row">
        {/* Colonne gauche (miniatures + grande image) */}
        <div className="col-md-6 d-flex">
          {/* Miniatures */}
          <div className="d-flex flex-column me-3">
            {images.map((img, index) => (
              <img
                key={index}
                src={img.url}
                alt={article.nom}
                className={`img-thumbnail rounded mb-2 ${
                  index === currentImageIndex ? "border border-primary" : ""
                }`}
                style={{
                  width: "80px",
                  height: "110px",
                  objectFit: "cover",
                  cursor: "pointer",
                }}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>

          {/* Grande image */}
        <div className="flex-grow-1 d-flex justify-content-center align-items-center position-relative">
        {images.length > 0 && (
        <div style={{ position: 'relative', cursor: 'zoom-in' }}>
        <img
        src={images[currentImageIndex].url}
        alt={article.nom}
        className="rounded shadow"
        style={{
          height: '250px',
          maxWidth: '100%',
          objectFit: 'contain',
        }}
        onClick={() => setIsZoomOpen(true)}
      />
      {/* Icône loupe */}
      <div
        onClick={() => setIsZoomOpen(true)}
        style={{
          position: 'absolute',
          bottom: '10px',
          right: '10px',
          backgroundColor: 'rgba(0,0,0,0.6)',
          color: 'white',
          borderRadius: '50%',
          width: '36px',
          height: '36px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          fontSize: '18px',
        }}
        title="Agrandir"
      >
        🔍
      </div>
    </div>
  )}

  {/* Flèches navigation */}
  {images.length > 1 && (
    <>
      <button
        className="position-absolute top-50 start-0 translate-middle-y"
        style={{
          backgroundColor: '#ADD8E6',
          border: 'none',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onClick={() =>
          setCurrentImageIndex(
            (prevIndex) => (prevIndex - 1 + images.length) % images.length
          )
        }
      >
        ‹
      </button>
      <button
        className="position-absolute top-50 end-0 translate-middle-y"
        style={{
          backgroundColor: '#ADD8E6',
          border: 'none',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onClick={() =>
          setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
        }
      >
        ›
      </button>
      </>
    )}
     </div>
          {/* Lightbox / zoom */}
    {isZoomOpen && images.length > 0 && (
     <div
     onClick={() => setIsZoomOpen(false)}
      style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.85)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      cursor: 'zoom-out',
    }}
    >
    <img
      src={images[currentImageIndex].url}
      alt={article.nom}
      style={{
        maxHeight: '90vh',
        maxWidth: '90vw',
        objectFit: 'contain',
        borderRadius: '8px',
      }}
      onClick={(e) => e.stopPropagation()}
      />
      <button
      onClick={() => setIsZoomOpen(false)}
      style={{
        position: 'absolute',
        top: '20px',
        right: '30px',
        background: 'white',
        border: 'none',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        fontSize: '22px',
        cursor: 'pointer',
      }}
      >
      ×
      </button>
      </div>
     )}
        </div>

        {/* Colonne droite (fiche produit + boutons) */}
        <div className="col-md-6 mb-5">
          <div
            className="p-4 d-flex flex-column justify-content-between"
            style={{
              backgroundColor: "#ADD8E6",
              borderRadius: "10px",
              minHeight: "520px",
            }}
          >
            <div>
              <p style={{ color: "white", fontWeight: "bold" }}>
                Prix :{" "}
                <span style={{ color: "red", fontWeight: "bold" }}>
                  {article.prix} €
                </span>
              </p>
              <p style={{ color: "white", fontWeight: "bold" }}>
                Nom : <span style={{ color: "black", fontWeight: "bold" }}>{article.nom}</span>
              </p>
              <p style={{ color: "white", fontWeight: "bold" }}>
                Catégorie :{" "}
                <span style={{ color: "black", fontWeight: "bold" }}>
                  {article.categories.map((cat) => cat.nom).join(", ")}
                </span>
              </p>
              <p style={{ color: "white", fontWeight: "bold" }}>
                Description :{" "}
                <span style={{ color: "black", fontWeight: "normal", whiteSpace: "pre-wrap" }}>
                  {article.description}
                </span>
              </p>
              <p style={{ color: "white", fontWeight: "bold" }}>
                Origine : <span style={{ color: "black", fontWeight: "bold" }}>{article.origine}</span>
              </p>
            </div>

          {token && userRole !== "ADMIN" && (
          <div className="d-grid gap-3 mt-4">
          {article.statut === "Vendu" ? (
          <div className="alert alert-danger text-center fw-bold">
            Cet article a déjà été vendu
         </div>
        ) : (
      <>
        <button
          className="btn"
          style={{
            backgroundColor: "#2563EB",
            color: "white",
            borderRadius: "20px",
            padding: "10px",
          }}
          onClick={ajouterAuPanier}
        >
          Ajouter au panier
        </button>
        <button
          className="btn"
          style={{
            backgroundColor: "#2563EB",
            color: "white",
            borderRadius: "20px",
            padding: "10px",
          }}
          onClick={achatImmediat}
          >
            Achat immédiat
           </button>
          </>
        )}
        </div>
        )}
        </div>
        </div>
       </div>
      </div>
    );
    }


















