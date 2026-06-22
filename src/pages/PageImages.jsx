import React, { useState } from 'react';
import FormulaireImage from './FormulaireImage';
import ListeImages from './ListeImages';
import FormulaireModification from './FormulaireModification';

export default function PageImages() {
  const [rafraichirListe, setRafraichirListe] = useState(false);
  const [imageAEditer, setImageAEditer] = useState(null);

  const gererSoumissionFormulaire = () => {
    setRafraichirListe(prev => !prev);
    setImageAEditer(null); // Réinitialiser l'état pour revenir au formulaire de création
  };

  const onEditer = (image) => {
    setImageAEditer(image);
  };
  
  return (
    <div className="container mt-5">
      <h1>Gestion des images</h1>
      
      {imageAEditer ? (
        <FormulaireModification 
          image={imageAEditer} 
          onFormSubmit={gererSoumissionFormulaire} 
        />
      ) : (
        <FormulaireImage onFormSubmit={gererSoumissionFormulaire} />
      )}
      
      <hr className="my-5" />
      <ListeImages 
        rafraichirListe={rafraichirListe}
        onEditer={onEditer} 
        onImageSupprimee={gererSoumissionFormulaire}
      />
    </div>
  );
}












// import React, { useState } from 'react';
// import FormulaireImage from './FormulaireImage';
// import ListeImages from './ListeImages';
// import FormulaireModification from './FormulaireModification'; // 1. Importer un nouveau composant

// export default function PageImages() {
//   const [rafraichirListe, setRafraichirListe] = useState(false);
//   const [imageAEditer, setImageAEditer] = useState(null); // 2. Gérer l'état de l'image à modifier

//   const gererSoumissionFormulaire = () => {
//     setRafraichirListe(prev => !prev);
//     setImageAEditer(null); // Réinitialiser le formulaire après la soumission
//   };

//   const onEditer = (image) => {
//     // 3. Remplir l'état avec l'objet image sélectionné
//     setImageAEditer(image);
//   };
  
//   return (
//     <div className="container mt-5">
//       <h1>Gestion des images</h1>
      
//       {/* 4. Afficher soit le formulaire de création, soit le formulaire de mise à jour */}
//       {imageAEditer ? (
//         <FormulaireModification 
//           image={imageAEditer} 
//           onFormSubmit={gererSoumissionFormulaire} 
//         />
//       ) : (
//         <FormulaireImage onFormSubmit={gererSoumissionFormulaire} />
//       )}
      
//       <hr className="my-5" />
//       <ListeImages 
//         rafraichirListe={rafraichirListe}
//         onEditer={onEditer} 
//         onImageSupprimee={gererSoumissionFormulaire}
//       />
//     </div>
//   );
// }
























