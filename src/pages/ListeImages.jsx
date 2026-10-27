import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ListeImages = ({ rafraichirListe, onEditer, onImageSupprimee }) => {
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState('');

  const fetchImages = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/images/all');
      setImages(response.data);
      setMessage('');
    } catch (error) {
      console.error("Erreur lors de la récupération des images :", error);
      setMessage(`Erreur lors de la récupération : ${error.message}`);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [rafraichirListe, onImageSupprimee]);

  const handleDeleteIndividual = async (imageId, docId) => {
    setMessage('');
    try {
      await axios.delete(`http://localhost:3000/api/images/${docId}/${imageId}`);
      setMessage("Image individuelle supprimée avec succès !");
      if (onImageSupprimee) {
        onImageSupprimee();
      }
    } catch (error) {
      console.error("Erreur lors de la suppression de l'image individuelle :", error);
      setMessage(`Erreur lors de la suppression : ${error.response?.data?.message || error.message}`);
    }
  };

  const handleDelete = async (imageId) => {
    try {
      await axios.delete(`http://localhost:3000/api/images/${imageId}`);
      setMessage("Document d'image supprimé avec succès !");
      if (onImageSupprimee) {
        onImageSupprimee();
      }
    } catch (error) {
      console.error("Erreur lors de la suppression du document :", error);
      setMessage(`Erreur lors de la suppression : ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="mt-5 mb-5 pb-4">
      <h2 className="text-center mb-4">Liste des images</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <div className="row">
        {images.length > 0 ? (
          images.map((imageDoc) => (
            <div key={imageDoc._id} className="col-md-4 mb-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{imageDoc.nom}</h5>
                  <p className="card-text">{imageDoc.alt}</p>
                  {imageDoc.images && imageDoc.images.length > 0 && (
                    <div className="d-flex flex-wrap">
                      {imageDoc.images.map((img) => (
                        <div key={img._id} className="position-relative me-2 mb-2">
                          <img
                            src={img.url}
                            alt={imageDoc.alt}
                            className="img-fluid rounded"
                            style={{ maxHeight: '150px' }}
                          />
                          <button
                            className="btn btn-danger btn-sm position-absolute top-0 end-0 rounded-circle"
                            style={{ zIndex: 10, lineHeight: 0.8 }}
                            onClick={() => handleDeleteIndividual(img._id, imageDoc._id)}
                          >
                            &times;
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="mt-3">
                    <button
                      onClick={() => onEditer(imageDoc)}
                      className="btn btn-warning btn-sm me-2"
                    >
                      Modifier la collection
                    </button>
                    <button
                      onClick={() => handleDelete(imageDoc._id)}
                      className="btn btn-danger btn-sm"
                    >
                      Supprimer le document
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Aucune image trouvée.</p>
        )}
      </div>
    </div>
  );
};

export default ListeImages;



























