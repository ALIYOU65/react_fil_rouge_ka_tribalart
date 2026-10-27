import axios from 'axios';
import { useState, useEffect } from 'react';

export default function FormulaireCategorie({ categorieAEditer, onFormSubmit }) {
  const [donneesFormulaire, setDonneesFormulaire] = useState({
    nom: '',
  });

  const [message, setMessage] = useState('');

  // S'il y a une catégorie à éditer, on pré-remplit le formulaire
  useEffect(() => {
    if (categorieAEditer) {
      setDonneesFormulaire({
        nom: categorieAEditer.nom,
      });
    } else {
      setDonneesFormulaire({
        nom: '',
      });
    }
  }, [categorieAEditer]);

  function handleChange(e) {
    setDonneesFormulaire({ ...donneesFormulaire, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const estEnEdition = !!categorieAEditer;

    const url = estEnEdition
      ? `http://localhost:3000/api/categories/${categorieAEditer._id}`
      : 'http://localhost:3000/api/categories/new';

    const methode = estEnEdition ? 'put' : 'post';

    axios[methode](url, donneesFormulaire)
      .then((res) => {
        setMessage(
          estEnEdition ? 'Catégorie mise à jour avec succès' : 'Catégorie créée avec succès'
        );
        if (onFormSubmit) {
          onFormSubmit(res.data);
        }
        setDonneesFormulaire({
          nom: '',
        });
      })
      .catch((err) => {
        console.error('Erreur lors de la soumission du formulaire :', err);
        setMessage('Une erreur est survenue.');
      });
  }

  return (
    <div className="container" style={{ maxWidth: "400px" }}>
      <h2 className="text-center mb-4" style={{ whiteSpace: 'nowrap' }}>{categorieAEditer ? 'Modifier la catégorie' : 'Créer une nouvelle catégorie'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nom" className="form-label">Nom de la catégorie</label>
          <input
            onChange={handleChange}
            type="text"
            name="nom"
            id="nom"
            className="form-control"
            value={donneesFormulaire.nom}
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          {categorieAEditer ? 'Mettre à jour' : 'Valider'}
        </button>
      </form>
      {message && <p className="text-center mt-3">{message}</p>}
    </div>
  );
}