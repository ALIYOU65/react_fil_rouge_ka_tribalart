import React, { useState } from 'react';
import ListeLigneCommandes from './ListeLigneCommandes';
import FormulaireLigneCommande from './FormulaireLigneCommande';
import FormulaireModificationLigneCommande from './FormulaireModificationLigneCommande';

export default function PageLigneCommandes() {
  const [rafraichir, setRafraichir] = useState(false);
  const [ligneCommandeAEditer, setLigneCommandeAEditer] = useState(null);

  const gererSoumissionFormulaire = () => {
    setRafraichir(prev => !prev);
    setLigneCommandeAEditer(null); 
  };

  const onEditer = (ligneCommande) => {
    setLigneCommandeAEditer(ligneCommande);
  };
  
  const onAnnulerModification = () => {
    setLigneCommandeAEditer(null);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Gestion des Lignes de Commande</h1>
      
      {ligneCommandeAEditer ? (
        <FormulaireModificationLigneCommande 
          ligneCommande={ligneCommandeAEditer} 
          onFormSubmit={gererSoumissionFormulaire} 
          onCancel={onAnnulerModification}
        />
      ) : (
        <FormulaireLigneCommande onFormSubmit={gererSoumissionFormulaire} />
      )}
      
      <hr className="my-5" />
      <ListeLigneCommandes 
        rafraichir={rafraichir}
        onEditer={onEditer} 
      />
    </div>
  );
}