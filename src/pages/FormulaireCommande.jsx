import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const API_URL = 'http://localhost:3000/api/commandes';

export default function FormulaireCommande({ onFormSubmit }) {
  const { token } = useAuth();

  const [formData, setFormData] = useState({
    numero: '',
    statut: 'EN_ATTENTE',
    prixTotal: '',
    user: '',
    panier: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [allUsers, setAllUsers] = useState([]);
  const [allPaniers, setAllPaniers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        setMessage('Vous devez être connecté.');
        return;
      }

      try {
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };

        const usersRes = await axios.get(
          'http://localhost:3000/api/users/all',
          config
        );
        const paniersRes = await axios.get(
          'http://localhost:3000/api/paniers/all',
          config
        );

        setAllUsers(usersRes.data);
        setAllPaniers(paniersRes.data);
        setMessage('');
      } catch (error) {
        setMessage('Erreur lors de la récupération des utilisateurs et paniers.');
        console.error('Erreur de récupération :', error);
      }
    };

    fetchData();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      await axios.post(`${API_URL}/new`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage('Commande créée avec succès !');
      onFormSubmit();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage(`Erreur : ${err.response?.data?.message || err.message}`);
      setTimeout(() => setMessage(''), 4000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm">
      <h2 className="text-center mb-4">Créer une nouvelle commande</h2>

      <div className="mb-3">
        <label className="form-label">Numéro de commande</label>
        <input
          type="text"
          className="form-control"
          name="numero"
          value={formData.numero}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Statut</label>
        <select
          className="form-control"
          name="statut"
          value={formData.statut}
          onChange={handleChange}
        >
          <option value="EN_ATTENTE">En attente</option>
          <option value="PAYEE">Payée</option>
          <option value="LIVREE">Livrée</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Prix Total</label>
        <input
          type="number"
          className="form-control"
          name="prixTotal"
          value={formData.prixTotal}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Utilisateur</label>
        <select
          className="form-control"
          name="user"
          value={formData.user}
          onChange={handleChange}
          required
        >
          <option value="">Sélectionner un utilisateur</option>
          {allUsers.map((user) => (
            <option key={user._id} value={user._id}>
              {user.prenom} {user.nom}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Panier</label>
        <select
          className="form-control"
          name="panier"
          value={formData.panier}
          onChange={handleChange}
        >
          <option value="">Sélectionner un panier (optionnel)</option>
          {allPaniers.map((panier) => (
            <option key={panier._id} value={panier._id}>
              Panier {panier._id}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" className="btn btn-primary" disabled={loading}>
        {loading ? 'Chargement...' : 'Créer'}
      </button>

      {message && (
        <p
          className="mt-3"
          style={{
            color: message.includes('succès') ? 'green' : 'red',
            fontWeight: 'bold',
          }}
        >
          {message}
        </p>
      )}
    </form>
  );
}


