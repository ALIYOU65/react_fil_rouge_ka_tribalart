import React, { useState } from 'react';
import ListePaniers from './ListePaniers';
import FormulairePanier from './FormulairePanier';
import FormulaireModificationPanier from './FormulaireModificationPanier';

export default function PagePaniers() {
  const [rafraichir, setRafraichir] = useState(false);
  const [panierAEditer, setPanierAEditer] = useState(null);

  const gererSoumissionFormulaire = () => {
    setRafraichir(prev => !prev);
    setPanierAEditer(null);
  };

  const onEditer = (panier) => {
    setPanierAEditer(panier);
  };
  
  const onAnnulerModification = () => {
    setPanierAEditer(null);
  };

  return (
    <div className="container mt-5">
      <h1>Gestion des Paniers</h1>
      
      {panierAEditer ? (
        <FormulaireModificationPanier 
          panier={panierAEditer} 
          onFormSubmit={gererSoumissionFormulaire} 
          onCancel={onAnnulerModification}
        />
      ) : (
        <FormulairePanier onFormSubmit={gererSoumissionFormulaire} />
      )}
      
      <hr className="my-5" />
      <ListePaniers 
        rafraichir={rafraichir}
        onEditer={onEditer} 
      />
    </div>
  );
}




















// import React, { useState } from 'react';
// import ListePaniers from './ListePaniers';
// import FormulairePanier from './FormulairePanier';
// import FormulaireModificationPanier from './FormulaireModificationPanier';

// export default function PagePaniers() {
//   const [rafraichir, setRafraichir] = useState(false);
//   const [panierAEditer, setPanierAEditer] = useState(null);

//   const gererSoumissionFormulaire = () => {
//     setRafraichir(prev => !prev);
//     setPanierAEditer(null); 
//   };

//   const onEditer = (panier) => {
//     setPanierAEditer(panier);
//   };
  
//   const onAnnulerModification = () => {
//     setPanierAEditer(null);
//   };

//   return (
//     <div className="container mt-5">
//       <h1>Gestion des Paniers</h1>
      
//       {panierAEditer ? (
//         <FormulaireModificationPanier 
//           panier={panierAEditer} 
//           onFormSubmit={gererSoumissionFormulaire} 
//           onCancel={onAnnulerModification}
//         />
//       ) : (
//         <FormulairePanier onFormSubmit={gererSoumissionFormulaire} />
//       )}
      
//       <hr className="my-5" />
//       <ListePaniers 
//         rafraichir={rafraichir}
//         onEditer={onEditer} 
//       />
//     </div>
//   );
// }