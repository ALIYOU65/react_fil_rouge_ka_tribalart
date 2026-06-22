import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const API_URL = 'http://localhost:3000/api/users';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const response = await axios.post(`${API_URL}/login`, formData);
      login(response.data.token, response.data.role, response.data.prenom); 
      setMessage('Connexion réussie ! Redirection vers la page d\'accueil...');
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (err) {
      setMessage(`Erreur : ${err.response?.data?.message || 'Vérifiez vos informations de connexion.'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-sm" style={{ width: '400px' }}>
        <h2 className="card-title text-center mb-4">Se connecter</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Adresse email</label>
            <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Mot de passe</label>
            <input type="password" name="password" className="form-control" value={formData.password} onChange={handleChange} required />
          </div>
          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Connexion en cours..." : "Se connecter"}
          </button>
        </form>
        {message && <p className="mt-3 text-center">{message}</p>}
      </div>
    </div>
  );
}
























// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';

// const API_URL = 'http://localhost:3000/api/users';

// export default function Login() {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });
//   const [message, setMessage] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const { login } = useAuth();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage('');
//     try {
//       const response = await axios.post(`${API_URL}/login`, formData);
//       login(response.data.token, response.data.role, response.data.prenom); 
//       setMessage('Connexion réussie ! Redirection vers la page d\'accueil...');
//       setTimeout(() => {
//         navigate('/');
//       }, 1500);
//     } catch (err) {
//       setMessage(`Erreur : ${err.response?.data?.message || 'Vérifiez vos informations de connexion.'}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container d-flex justify-content-center align-items-center vh-100">
//       <div className="card p-4 shadow-sm" style={{ width: '400px' }}>
//         <h2 className="card-title text-center mb-4">Se connecter</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label className="form-label">Adresse email</label>
//             <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
//           </div>
//           <div className="mb-3">
//             <label className="form-label">Mot de passe</label>
//             <input type="password" name="password" className="form-control" value={formData.password} onChange={handleChange} required />
//           </div>
//           <button type="submit" className="btn btn-primary w-100" disabled={loading}>
//             {loading ? "Connexion en cours..." : "Se connecter"}
//           </button>
//         </form>
//         {message && <p className="mt-3 text-center">{message}</p>}
//       </div>
//     </div>
//   );
// }



















