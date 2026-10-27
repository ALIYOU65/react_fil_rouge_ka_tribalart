import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/ligneCommandes';

export default function FormulaireLigneCommande({ onFormSubmit }) {
    const [formData, setFormData] = useState({
        quantite: '',
        prixTotal: '',
        article: '', 
        commande: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [allArticles, setAllArticles] = useState([]);
    const [allCommandes, setAllCommandes] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const articlesRes = await axios.get('http://localhost:3000/api/articles/all');
          const commandesRes = await axios.get('http://localhost:3000/api/commandes/all');
          setAllArticles(articlesRes.data);
          setAllCommandes(commandesRes.data);
        } catch (error) {
          setMessage("Erreur lors de la récupération des articles et commandes.");
          console.error("Erreur de récupération :", error);
        }
      };
      fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setLoading(true);
        try {
            await axios.post(`${API_URL}/new`, formData);
            setMessage("Ligne de commande créée avec succès !");
            onFormSubmit();
        } catch (err) {
            setMessage(`Erreur : ${err.response?.data?.message || err.message}`);
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm">
            <h2 className="text-center mb-4">Créer une nouvelle ligne de commande</h2>
            <div className="mb-3">
                <label className="form-label">Quantité</label>
                <input type="number" className="form-control" name="quantite" value={formData.quantite} onChange={handleChange} required />
            </div>
            <div className="mb-3">
                <label className="form-label">Prix Total</label>
                <input type="number" className="form-control" name="prixTotal" value={formData.prixTotal} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Article</label>
              <select className="form-control" name="article" value={formData.article} onChange={handleChange} required>
                <option value="">Sélectionner un article</option>
                {allArticles.map(article => (
                  <option key={article._id} value={article._id}>{article.nom}</option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Commande</label>
              <select className="form-control" name="commande" value={formData.commande} onChange={handleChange} required>
                <option value="">Sélectionner une commande</option>
                {allCommandes.map(commande => (
                  <option key={commande._id} value={commande._id}>Commande n°{commande.numero}</option>
                ))}
              </select>
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? "Chargement..." : "Créer"}
            </button>
            {message && <p className="mt-3">{message}</p>}
        </form>
    );
}