import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/commandes';

export default function FormulaireModificationCommande({ commande, onFormSubmit, onCancel }) {
    const [formData, setFormData] = useState({
        numero: '',
        statut: '',
        prixTotal: '',
        user: '', 
        panier: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [allUsers, setAllUsers] = useState([]);
    const [allPaniers, setAllPaniers] = useState([]);

    // Récupérer les utilisateurs et les paniers au chargement du composant
    useEffect(() => {
      const fetchData = async () => {
        try {
          const usersRes = await axios.get('http://localhost:3000/api/users/all');
          const paniersRes = await axios.get('http://localhost:3000/api/paniers/all');
          setAllUsers(usersRes.data);
          setAllPaniers(paniersRes.data);
        } catch (error) {
          setMessage("Erreur lors de la récupération des utilisateurs et paniers.");
          console.error("Erreur de récupération :", error);
        }
      };
      fetchData();
    }, []);
    
    useEffect(() => {
        if (commande) {
            setFormData({
                numero: commande.numero || '',
                statut: commande.statut || 'EN_ATTENTE',
                prixTotal: commande.prixTotal || '',
                user: commande.user?._id || '',
                panier: commande.panier?._id || ''
            });
        }
    }, [commande]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setLoading(true);
        try {
            await axios.put(`${API_URL}/${commande._id}`, formData);
            setMessage("Commande mise à jour avec succès !");
            onFormSubmit();
        } catch (err) {
            setMessage(`Erreur : ${err.response?.data?.message || err.message}`);
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm">
            <h2 className="mb-4">Modifier la commande : {commande.numero}</h2>
            <div className="mb-3">
                <label className="form-label">Numéro de commande</label>
                <input type="text" className="form-control" name="numero" value={formData.numero} onChange={handleChange} required />
            </div>
            <div className="mb-3">
                <label className="form-label">Statut</label>
                <select className="form-control" name="statut" value={formData.statut} onChange={handleChange}>
                    <option value="EN_ATTENTE">En attente</option>
                    <option value="PAYEE">Payée</option>
                    <option value="LIVREE">Livrée</option>
                </select>
            </div>
            <div className="mb-3">
                <label className="form-label">Prix Total</label>
                <input type="number" className="form-control" name="prixTotal" value={formData.prixTotal} onChange={handleChange} required />
            </div>
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
              <label className="form-label">Panier</label>
              <select className="form-control" name="panier" value={formData.panier} onChange={handleChange} required>
                <option value="">Sélectionner un panier</option>
                {allPaniers.map(panier => (
                  <option key={panier._id} value={panier._id}>Panier {panier._id}</option>
                ))}
              </select>
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? "Chargement..." : "Mettre à jour"}
            </button>
            <button type="button" onClick={onCancel} className="btn btn-secondary ms-2">
                Annuler
            </button>
            {message && <p className="mt-3">{message}</p>}
        </form>
    );
}