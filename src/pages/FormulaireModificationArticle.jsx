import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FormulaireModificationArticle = ({ article, onFormSubmit }) => {
  const [nom, setNom] = useState(article.nom);
  const [description, setDescription] = useState(article.description);
  const [prix, setPrix] = useState(article.prix);
  const [origine, setOrigine] = useState(article.origine);
  const [categories, setCategories] = useState(article.categories.map(cat => cat._id));
  const [images, setImages] = useState(article.images.map(img => img._id));
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
        setMessage("Erreur lors de la récupération des catégories et images.");
        console.error("Erreur de récupération :", error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    const articleModifie = {
      nom,
      description,
      prix: Number(prix),
      origine,
      categories,
      images
    };

    try {
      await axios.put(`http://localhost:3000/api/articles/${article._id}`, articleModifie);
      setMessage('Article mis à jour avec succès !');
      onFormSubmit();
    } catch (error) {
      setMessage(`Erreur : ${error.response?.data?.message || error.message}`);
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
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm">
      <h2 className="mb-4">Modifier l'article : {article.nom}</h2>
      <div className="mb-3">
        <label className="form-label">Nom</label>
        <input type="text" className="form-control" value={nom} onChange={(e) => setNom(e.target.value)} required />
      </div>
      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} required />
      </div>
      <div className="mb-3">
        <label className="form-label">Prix</label>
        <input type="number" className="form-control" value={prix} onChange={(e) => setPrix(e.target.value)} />
      </div>
      <div className="mb-3">
        <label className="form-label">Origine</label>
        <input type="text" className="form-control" value={origine} onChange={(e) => setOrigine(e.target.value)} />
      </div>
      <div className="mb-3">
        <label className="form-label">Catégories</label>
        <select multiple className="form-control" onChange={handleCategoryChange} value={categories}>
          {allCategories.map(cat => (
            <option key={cat._id} value={cat._id}>{cat.nom}</option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label">Images</label>
        <select multiple className="form-control" onChange={handleImageChange} value={images}>
          {allImages.map(img => (
            <option key={img._id} value={img._id}>{img.nom}</option>
          ))}
        </select>
      </div>
      <button type="submit" className="btn btn-primary">Mettre à jour l'article</button>
      <button type="button" className="btn btn-link ms-2" onClick={() => onFormSubmit()}>
        Annuler
      </button>
      {message && <p className="mt-3">{message}</p>}
    </form>
  );
};

export default FormulaireModificationArticle;