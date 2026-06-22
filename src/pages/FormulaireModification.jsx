import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FormulaireModification = ({ image, onFormSubmit }) => {
  const [nom, setNom] = useState(image.nom);
  const [alt, setAlt] = useState(image.alt);
  const [fichiers, setFichiers] = useState([{ id: 0, file: null }]);
  const [message, setMessage] = useState('');

  // S'assure que le formulaire se met à jour si l'image à éditer change
  useEffect(() => {
    setNom(image.nom);
    setAlt(image.alt);
    setFichiers([{ id: 0, file: null }]);
    setMessage('');
  }, [image]);

  const handleFileChange = (e, index) => {
    const nouveauxFichiers = [...fichiers];
    nouveauxFichiers[index].file = e.target.files[0];
    setFichiers(nouveauxFichiers);
  };

  const handleAddField = () => {
    setFichiers([...fichiers, { id: fichiers.length, file: null }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    const formData = new FormData();
    formData.append('nom', nom);
    formData.append('alt', alt);

    fichiers.forEach((fichier) => {
      if (fichier.file) {
        formData.append('images', fichier.file);
      }
    });

    try {
      await axios.put(`http://localhost:3000/api/images/${image._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('Image mise à jour avec succès !');
      if (onFormSubmit) {
        onFormSubmit();
      }
    } catch (error) {
      setMessage(`Erreur : ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm">
      <h2 className="mb-4">Modifier l'image : {image.nom}</h2>
      <div className="mb-3">
        <label htmlFor="nom" className="form-label">Nom de l'image</label>
        <input
          type="text"
          className="form-control"
          id="nom"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
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
      <div className="mb-3">
        <label className="form-label">Images actuelles :</label>
        <div className="d-flex flex-wrap">
          {image.images.map((img) => (
            <img 
              key={img._id} 
              src={img.url} 
              alt={image.alt} 
              style={{ width: '100px' }} 
              className="me-2 mb-2 rounded" 
            />
          ))}
        </div>
      </div>
      
      {fichiers.map((fichier, index) => (
        <div key={fichier.id} className="mb-3 d-flex align-items-center">
          <input
            type="file"
            className="form-control me-2"
            onChange={(e) => handleFileChange(e, index)}
          />
          {fichiers.length > 1 && (
            <button
              type="button"
              className="btn btn-danger btn-sm"
              onClick={() => {
                const nouveauxFichiers = fichiers.filter((_, i) => i !== index);
                setFichiers(nouveauxFichiers);
              }}
            >
              Supprimer
            </button>
          )}
        </div>
      ))}

      <button type="button" className="btn btn-secondary btn-sm mb-3" onClick={handleAddField}>
        Ajouter un nouveau fichier
      </button>

      <button type="submit" className="btn btn-primary">Mettre à jour l'image</button>
      <button type="button" className="btn btn-link ms-2" onClick={() => onFormSubmit()}>
        Annuler
      </button>
      {message && <p className="mt-3">{message}</p>}
    </form>
  );
};

export default FormulaireModification;

















// // Fichier : FormulaireModification.jsx
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const FormulaireModification = ({ image, onFormSubmit }) => {
//   const [nom, setNom] = useState(image.nom);
//   const [alt, setAlt] = useState(image.alt);
//   const [fichiers, setFichiers] = useState([{ id: 0, file: null }]);
//   const [message, setMessage] = useState('');

//   // S'assure que le formulaire se met à jour si l'image à éditer change
//   useEffect(() => {
//     setNom(image.nom);
//     setAlt(image.alt);
//     setFichiers([{ id: 0, file: null }]);
//     setMessage('');
//   }, [image]);

//   const handleFileChange = (e, index) => {
//     const nouveauxFichiers = [...fichiers];
//     nouveauxFichiers[index].file = e.target.files[0];
//     setFichiers(nouveauxFichiers);
//   };

//   const handleAddField = () => {
//     setFichiers([...fichiers, { id: fichiers.length, file: null }]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage('');

//     const formData = new FormData();
//     formData.append('nom', nom);
//     formData.append('alt', alt);

//     fichiers.forEach((fichier) => {
//       if (fichier.file) {
//         formData.append('images', fichier.file);
//       }
//     });

//     try {
//       await axios.put(`http://localhost:3000/api/images/${image._id}`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       setMessage('Image mise à jour avec succès !');
//       if (onFormSubmit) {
//         onFormSubmit();
//       }
//     } catch (error) {
//       setMessage(`Erreur : ${error.response?.data?.message || error.message}`);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm">
//       <h2 className="mb-4">Modifier l'image : {image.nom}</h2>
//       <div className="mb-3">
//         <label htmlFor="nom" className="form-label">Nom de l'image</label>
//         <input
//           type="text"
//           className="form-control"
//           id="nom"
//           value={nom}
//           onChange={(e) => setNom(e.target.value)}
//         />
//       </div>
//       <div className="mb-3">
//         <label htmlFor="alt" className="form-label">Texte alternatif</label>
//         <input
//           type="text"
//           className="form-control"
//           id="alt"
//           value={alt}
//           onChange={(e) => setAlt(e.target.value)}
//         />
//       </div>
//       {/* Afficher les images existantes */}
//       <div className="mb-3">
//         <label className="form-label">Images actuelles :</label>
//         <div className="d-flex flex-wrap">
//           {image.images.map((img) => (
//             <img 
//               key={img._id} 
//               src={img.url} 
//               alt={image.alt} 
//               style={{ width: '100px' }} 
//               className="me-2 mb-2 rounded" 
//             />
//           ))}
//         </div>
//       </div>
      
//       {fichiers.map((fichier, index) => (
//         <div key={fichier.id} className="mb-3 d-flex align-items-center">
//           <input
//             type="file"
//             className="form-control me-2"
//             onChange={(e) => handleFileChange(e, index)}
//           />
//           {fichiers.length > 1 && (
//             <button
//               type="button"
//               className="btn btn-danger btn-sm"
//               onClick={() => {
//                 const nouveauxFichiers = fichiers.filter((_, i) => i !== index);
//                 setFichiers(nouveauxFichiers);
//               }}
//             >
//               Supprimer
//             </button>
//           )}
//         </div>
//       ))}

//       <button type="button" className="btn btn-secondary btn-sm mb-3" onClick={handleAddField}>
//         Ajouter un nouveau fichier
//       </button>

//       <button type="submit" className="btn btn-primary">Mettre à jour l'image</button>
//       <button type="button" className="btn btn-link ms-2" onClick={() => onFormSubmit()}>
//         Annuler
//       </button>
//       {message && <p className="mt-3">{message}</p>}
//     </form>
//   );
// };

// export default FormulaireModification;