import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext'; // Importation du hook useAuth
import FormulaireArticle from './FormulaireArticle';
import ListeArticles from './ListeArticles';
import FormulaireModificationArticle from './FormulaireModificationArticle';

export default function PageArticles() {
  const { userRole } = useAuth();
  const isAdmin = userRole === 'ADMIN';

  const [rafraichirListe, setRafraichirListe] = useState(false);
  const [articleAEditer, setArticleAEditer] = useState(null);

  const gererSoumissionFormulaire = () => {
    setRafraichirListe(prev => !prev);
    setArticleAEditer(null);
  };

  const onEditer = (article) => {
    setArticleAEditer(article);
  };
  
  return (
    <div className="container mt-5">
      <h1>Gestion des articles</h1>
      
      {/* Affichage conditionnel des formulaires pour les administrateurs */}
      {isAdmin ? (
        <>
          {articleAEditer ? (
            <FormulaireModificationArticle 
              article={articleAEditer} 
              onFormSubmit={gererSoumissionFormulaire} 
            />
          ) : (
            <FormulaireArticle onFormSubmit={gererSoumissionFormulaire} />
          )}
        </>
      ) : (
        <p>Vous n'avez pas les autorisations nécessaires pour gérer les articles.</p>
      )}

      <hr className="my-5" />

      {/* La liste peut être affichée pour tous les utilisateurs, mais les boutons seront masqués si le rôle est géré dans ListeArticles */}
      <ListeArticles 
        rafraichirListe={rafraichirListe}
        onEditer={onEditer} 
        onArticleSupprimee={gererSoumissionFormulaire}
      />
    </div>
  );
}