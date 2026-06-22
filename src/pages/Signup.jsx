import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:3000/api/users';

export default function Signup() {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      await axios.post(`${API_URL}/register`, formData);
      setMessage('Inscription réussie ! Redirection vers la page de connexion...');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setMessage(`Erreur : ${err.response?.data?.message || 'Une erreur est survenue.'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-sm" style={{ width: '400px' }}>
        <h2 className="card-title text-center mb-4">S'inscrire</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nom</label>
            <input type="text" name="nom" className="form-control" value={formData.nom} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Prénom</label>
            <input type="text" name="prenom" className="form-control" value={formData.prenom} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Adresse email</label>
            <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Mot de passe</label>
            <input type="password" name="password" className="form-control" value={formData.password} onChange={handleChange} required />
          </div>
          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Inscription en cours..." : "Créer mon compte"}
          </button>
        </form>
        {message && <p className="mt-3 text-center">{message}</p>}
      </div>
    </div>
  );
}


















// import React, { useState } from "react";
// import axios from "axios";

// export default function Signup() {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     prenom: "",
//     nom: "",
//     role: "CLIENT", // valeur par défaut
//   });

//   const [message, setMessage] = useState("");

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:3000/api/users/register", formData);
//       setMessage("Inscription réussie !");
//       console.log(res.data);
//     } catch (error) {
//       console.error(error.response?.data || error.message);
//       setMessage("Erreur lors de l'inscription : " + (error.response?.data?.message || "Inconnue"));
//     }
//   };

//   return (
//     <div>
//       <h2>Inscription</h2>
//       <form onSubmit={handleSubmit}>
//         <input type="text" name="prenom" placeholder="Prénom" onChange={handleChange} required />
//         <input type="text" name="nom" placeholder="Nom" onChange={handleChange} />
//         <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
//         <input type="password" name="password" placeholder="Mot de passe" onChange={handleChange} required />
//         <select name="role" onChange={handleChange}>
//           <option value="CLIENT">Client</option>
//           <option value="VISITEUR">Visiteur</option>
//           <option value="ADMIN">Admin</option>
//         </select>
//         <button type="submit">S'inscrire</button>
//       </form>
//       <p>{message}</p>
//     </div>
//   );
// }
