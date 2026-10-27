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
    <div className="container mt-5 mb-5">
      <h1 className="text-center mb-4">Gestion des images</h1>
      
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











