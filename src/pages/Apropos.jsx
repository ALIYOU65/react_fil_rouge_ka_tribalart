import React from 'react';
import { Link } from 'react-router-dom';
import './Apropos.css';

export default function Apropos() {
  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-lg-8 mx-auto text-center content-section">
          <h1 className="display-4 mb-4">À propos de KA.TRIBALART</h1>
          <p className="lead">
            KA.TRIBALART est une galerie en ligne spécialisée dans la vente d'objets d'art africains authentiques. Notre passion est de connecter les collectionneurs et les amateurs d'art avec des pièces uniques issues des riches cultures et traditions de l'Afrique. Nous travaillons directement avec des artisans et des experts locaux pour garantir l'authenticité et la qualité de chaque pièce de notre collection.
          </p>
          <p>
            Chaque masque, statue ou tissu raconte une histoire et incarne l'héritage d'une ethnie. Notre mission est de vous faire découvrir cet art ancestral et de préserver ces trésors culturels pour les générations futures. Nous nous engageons à offrir une expérience d'achat transparente, sécurisée et éthique, en valorisant le travail des créateurs et en soutenant les communautés locales.
          </p>
          <p>
            Que vous soyez un collectionneur expérimenté ou un novice, notre catalogue vous invite à un voyage au cœur de l'art tribal, une source inépuisable d'inspiration et de beauté.
          </p>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-lg-8 mx-auto content-section">
          <h2 className="mb-4 text-center">Conservation des données : Notre engagement et la réglementation</h2>
          <p className="intro-text">
            Conformément au **Règlement Général sur la Protection des Données (RGPD)**, la durée de conservation de vos données est limitée au temps strictement nécessaire pour l'exécution du contrat, puis archivée pour respecter les obligations légales et comptables.
          </p>
          
          <ul className="data-list">
            <li>
              **Données de commande :** Nom, email, adresse, historique d'achat sont conservés pendant **5 ans** pour répondre à d'éventuels litiges (délai de prescription civile).
            </li>
            <li>
              **Factures :** Les factures, contenant vos données clients, sont conservées pendant **10 ans** en raison d'une obligation légale du Code de commerce.
            </li>
            <li>
              **Données de paiement :** Les données de carte bancaire ne sont pas conservées après la transaction. Elles peuvent être archivées pour une durée maximale de **13 mois** (ou 15 mois pour les cartes à débit différé) en cas de litige.
            </li>
            <li>
              **Données marketing :** Les données utilisées pour la prospection et les newsletters sont conservées **3 ans** après le dernier contact (dernier clic, ouverture de mail, etc.).
            </li>
            <li>
              **Compte client inactif :** Les données sont supprimées ou anonymisées après **3 ans** d'inactivité, à l'exception des données de facturation qui restent archivées 10 ans pour des raisons légales.
            </li>
          </ul>
        </div>
      </div>
      
      <div className="text-center mt-5">
        <Link to="/" className="btn btn-primary">Retour à l'accueil</Link>
      </div>
    </div>
  );
}