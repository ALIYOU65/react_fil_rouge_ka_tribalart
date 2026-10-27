import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const API_URL = 'http://localhost:3000/api/users';

export default function PageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token, userRole } = useAuth();

  useEffect(() => {
    if (!token || userRole !== 'ADMIN') {
      setLoading(false);
      setError("Vous n'avez pas les autorisations nécessaires pour accéder à cette page.");
      return;
    }

    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${API_URL}/all`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setUsers(response.data);
      } catch (err) {
        setError("Impossible de charger les utilisateurs. Vérifiez que vous êtes connecté en tant qu'administrateur.");
        console.error("Erreur de l'API:", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUsers();
  }, [token, userRole]);

  const handleDelete = async (id) => {
    if (userRole !== 'ADMIN') {
      alert("Vous n'êtes pas autorisé à supprimer des utilisateurs.");
      return;
    }

    const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?");
    if (confirmDelete) {
      try {
        await axios.delete(`${API_URL}/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setUsers(users.filter(user => user._id !== id));
      } catch (err) {
        alert("Erreur lors de la suppression de l'utilisateur.");
      }
    }
  };

  if (loading) {
    return <div>Chargement des utilisateurs...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }
  
  return (
    <div className="container mt-5 mb-5">
      <h2 className="text-center mb-4">Liste des utilisateurs</h2>
      {users.length === 0 ? (
        <p>Aucun utilisateur trouvé.</p>
      ) : (
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Email</th>
              <th>Rôle</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user.nom}</td>
                <td>{user.prenom}</td>
                <td>{user.email}</td>
                <td>{user.role === 'ADMIN' ? 'ADMIN' : ''}</td>
                <td>
                  <button onClick={() => handleDelete(user._id)} className="btn btn-sm btn-danger">Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}























