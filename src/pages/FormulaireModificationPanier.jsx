import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const API_URL = 'http://localhost:3000/api/paniers';

export default function FormulaireModificationPanier({ panier, onFormSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    user: '',
    articles: [],
    statut: '',
    montantTotal: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [allUsers, setAllUsers] = useState([]);
  const [allArticles, setAllArticles] = useState([]);
  const { token, userRole } = useAuth();

  useEffect(() => {
    if (panier) {
      setFormData({
        user: panier.user?._id || '',
        articles: panier.articles?.map(a => a._id) || [],
        statut: panier.statut || 'EN_COURS',
        montantTotal: panier.montantTotal || '',
      });
    }

    const fetchData = async () => {
      if (!token || userRole !== 'ADMIN') {
        setMessage("Vous n'êtes pas autorisé à gérer les paniers.");
        return;
      }
      try {
        const usersRes = await axios.get('http://localhost:3000/api/users/all', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const articlesRes = await axios.get('http://localhost:3000/api/articles/all', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setAllUsers(usersRes.data);
        setAllArticles(articlesRes.data);
      } catch (error) {
        setMessage("Erreur lors de la récupération des utilisateurs et articles.");
        console.error("Erreur de récupération :", error);
      }
    };
    fetchData();
  }, [token, userRole, panier]);

  const handleChange = (e) => {
    const { name, value, options } = e.target;
    if (name === "articles") {
      const selectedArticles = Array.from(options).filter(option => option.selected).map(option => option.value);
      setFormData({ ...formData, articles: selectedArticles });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    if (!token || userRole !== 'ADMIN') {
      setMessage("Vous n'avez pas les permissions pour effectuer cette action.");
      setLoading(false);
      return;
    }

    try {
      await axios.put(`${API_URL}/${panier._id}`, formData, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setMessage("Panier mis à jour avec succès !");
      onFormSubmit();
    } catch (err) {
      setMessage(`Erreur : ${err.response?.data?.message || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm">
        <h2 className="mb-4">Modifier le panier</h2>
        {message && <p className="alert alert-info">{message}</p>}
        <div className="mb-3">
          <label className="form-label">Utilisateur</label>
          <select className="form-control" name="user" value={formData.user} onChange={handleChange} required>
            <option value="">Sélectionner un utilisateur</option>
            {allUsers.map(user => (
              <option key={user._id} value={user._id}>{user.nom} {user.prenom}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Statut</label>
          <select className="form-control" name="statut" value={formData.statut} onChange={handleChange} required>
            <option value="EN_COURS">En cours</option>
            <option value="VALIDE">Validé</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Montant Total</label>
          <input type="number" className="form-control" name="montantTotal" value={formData.montantTotal} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Articles (sélection multiple)</label>
          <select multiple className="form-control" name="articles" value={formData.articles} onChange={handleChange}>
            {allArticles.map(article => (
              <option key={article._id} value={article._id}>{article.nom}</option>
            ))}
          </select>
        </div>
        <div className="d-flex justify-content-end">
          <button type="button" onClick={onCancel} className="btn btn-secondary me-2">Annuler</button>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Chargement..." : "Mettre à jour"}
          </button>
        </div>
      </form>
    </div>
  );
}












