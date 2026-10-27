import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const FormulaireArticle = ({ onFormSubmit }) => {
  const { token } = useAuth();

  const [nom, setNom] = useState('');
  const [description, setDescription] = useState('');
  const [prix, setPrix] = useState('');
  const [origine, setOrigine] = useState('');
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState('');
  const [allCategories, setAllCategories] = useState([]);
  const [allImages, setAllImages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesRes = await axios.get('http://localhost:3000/api/categories/all');
        const imagesRes = await axios.get('http://localhost:3000/api/images/all');
        setAllCategories(categoriesRes.data);
        setAllImages(imagesRes.data);
      } catch (error) {
        setMessage('Erreur lors de la récupération des catégories et images.');
        console.error('Erreur de récupération :', error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!token) {
      setMessage('Vous devez être connecté pour créer un article.');
      return;
    }

    const newArticle = {
      nom,
      description,
      prix: Number(prix),
      origine,
      categories,
      images,
    };

    try {
      await axios.post('http://localhost:3000/api/articles/new', newArticle, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      setMessage('Article créé avec succès !');
      setNom('');
      setDescription('');
      setPrix('');
      setOrigine('');
      setCategories([]);
      setImages([]);
      onFormSubmit();
      // Faire disparaître le message après 2 secondes
      setTimeout(() => {
       setMessage('');
    }, 2000);
    } catch (error) {
      setMessage(`Erreur : ${error.response?.data?.message || error.message}`);
      setTimeout(() => setMessage(''), 2000);
    }
  };

  const handleCategoryChange = (e) => {
    const { options } = e.target;
    const selectedCategories = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedCategories.push(options[i].value);
      }
    }
    setCategories(selectedCategories);
  };

  const handleImageChange = (e) => {
    const { options } = e.target;
    const selectedImages = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedImages.push(options[i].value);
      }
    }
    setImages(selectedImages);
  };

  return (
    <>
      <style>
        {`
          .custom-form {
            background-color: #ffffff;
          }
          .centered-title {
            text-align: center;
          }
        `}
      </style>

      <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm custom-form">
        <h2 className="mb-4 centered-title">Créer un nouvel article</h2>

        <div className="mb-3">
          <label className="form-label">Nom</label>
          <input
            type="text"
            className="form-control"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Prix</label>
          <div className="input-group">
            <input
              type="number"
              className="form-control"
              value={prix}
              onChange={(e) => setPrix(e.target.value)}
              min="0"
              step="1"
            />
            <span className="input-group-text">€</span>
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Origine</label>
          <input
            type="text"
            className="form-control"
            value={origine}
            onChange={(e) => setOrigine(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Catégories</label>
          <select multiple className="form-control" onChange={handleCategoryChange}>
            {allCategories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.nom}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Images</label>
          <select multiple className="form-control" onChange={handleImageChange}>
            {allImages.map((img) => (
              <option key={img._id} value={img._id}>
                {img.nom}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Créer l'article
        </button>

        {message && <p className="mt-3" style={{color: message.includes('succès') ? 'green' : 'red', fontWeight: 'bold', }}>{message}</p>}
      </form>
    </>
  );
};

export default FormulaireArticle;




