import React, { useState } from 'react';
import axios from 'axios';

const FormulaireImage = ({ onFormSubmit }) => {
  const [nom, setNom] = useState('');
  const [alt, setAlt] = useState('');
  const [fichiers, setFichiers] = useState([{ id: 0, file: null }]); // Utilisez un tableau pour les fichiers
  const [message, setMessage] = useState('');

  const handleFileChange = (e, index) => {
    const nouveauxFichiers = [...fichiers];
    nouveauxFichiers[index].file = e.target.files[0];
    setFichiers(nouveauxFichiers);
  };

  const handleAddField = () => {
    setFichiers([...fichiers, { id: fichiers.length, file: null }]);
  };

  const handleRemoveField = (index) => {
    const nouveauxFichiers = fichiers.filter((_, i) => i !== index);
    setFichiers(nouveauxFichiers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    const formData = new FormData();
    formData.append('nom', nom);
    formData.append('alt', alt);

    // Ajouter tous les fichiers du tableau au FormData
    fichiers.forEach((fichier) => {
      if (fichier.file) {
        formData.append('images', fichier.file);
      }
    });

    try {
      await axios.post('http://localhost:3000/api/images/new', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('Image(s) créée(s) avec succès !');
      setNom('');
      setAlt('');
      setFichiers([{ id: 0, file: null }]); // Réinitialiser les champs
      if (onFormSubmit) {
        onFormSubmit();
      }
    } catch (error) {
      setMessage(`Erreur : ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm">
      <h2 className="mb-4">Créer une nouvelle image</h2>
      <div className="mb-3">
        <label htmlFor="nom" className="form-label">Nom de l'image</label>
        <input
          type="text"
          className="form-control"
          id="nom"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="alt" className="form-label">Texte alternatif</label>
        <input
          type="text"
          className="form-control"
          id="alt"
          value={alt}
          onChange={(e) => setAlt(e.target.value)}
        />
      </div>

      {/* Boucle pour afficher les champs de fichier */}
      {fichiers.map((fichier, index) => (
        <div key={fichier.id} className="mb-3 d-flex align-items-center">
          <input
            type="file"
            className="form-control me-2"
            onChange={(e) => handleFileChange(e, index)}
            required
          />
          {fichiers.length > 1 && (
            <button
              type="button"
              className="btn btn-danger btn-sm"
              onClick={() => handleRemoveField(index)}
            >
              Supprimer
            </button>
          )}
        </div>
      ))}

      <button type="button" className="btn btn-secondary btn-sm mb-3" onClick={handleAddField}>
        Ajouter un autre fichier
      </button>

      <button type="submit" className="btn btn-primary">Créer l'image</button>
      {message && <p className="mt-3">{message}</p>}
    </form>
  );
};

export default FormulaireImage;








