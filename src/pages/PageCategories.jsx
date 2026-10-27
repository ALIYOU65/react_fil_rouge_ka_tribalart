import { useState } from 'react';
import FormulaireCategorie from './FormulaireCategorie'; 
import ListeCategories from './ListeCategories';

export default function PageCategories() {
  const [categorieAEditer, setCategorieAEditer] = useState(null);
  const [rafraichirListe, setRafraichirListe] = useState(false);

  // Gère le clic sur le bouton "Modifier" pour passer la catégorie au formulaire
  const gererClicEdition = (categorie) => {
    setCategorieAEditer(categorie);
  };

  // Gère la soumission du formulaire ou la suppression pour rafraîchir la liste
  const gererSoumissionFormulaire = () => {
    setCategorieAEditer(null); // Cache le formulaire de modification
    setRafraichirListe((prev) => !prev); // Déclenche un rafraîchissement de la liste
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Gestion des catégories</h1>
      <FormulaireCategorie
        categorieAEditer={categorieAEditer}
        onFormSubmit={gererSoumissionFormulaire}
      />
      <hr className="my-5" />
      <ListeCategories
        onEditer={gererClicEdition}
        onCategorieSupprimee={gererSoumissionFormulaire}
        rafraichirListe={rafraichirListe}
      />
    </div>
  );
}