import React, { useState } from 'react';
import ListeCommandes from './ListeCommandes';
import FormulaireCommande from './FormulaireCommande';
import FormulaireModificationCommande from './FormulaireModificationCommande';

export default function PageCommandes() {
  const [rafraichir, setRafraichir] = useState(false);
  const [commandeAEditer, setCommandeAEditer] = useState(null);

  const gererSoumissionFormulaire = () => {
    setRafraichir(prev => !prev);
    setCommandeAEditer(null); // Cache le formulaire de modification
  };

  const onEditer = (commande) => {
    setCommandeAEditer(commande);
  };
  
  const onAnnulerModification = () => {
    setCommandeAEditer(null);
  };

  return (
    <div className="container mt-5">
      <h1>Gestion des Commandes</h1>
      
      {commandeAEditer ? (
        <FormulaireModificationCommande 
          commande={commandeAEditer} 
          onFormSubmit={gererSoumissionFormulaire} 
          onCancel={onAnnulerModification}
        />
      ) : (
        <FormulaireCommande onFormSubmit={gererSoumissionFormulaire} />
      )}
      
      <hr className="my-5" />
      <ListeCommandes 
        rafraichir={rafraichir}
        onEditer={onEditer} 
      />
    </div>
  );
}