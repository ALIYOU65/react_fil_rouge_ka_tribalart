import React from 'react';
import { Link } from 'react-router-dom';
import './Accueil.css';

const categoriesData = [
  { nom: 'Masques', image: '/images/Masque_Tsogo_26,5_cm.png', route: '/catalogue?categorie=Masques' },
  { nom: 'Têtes', image: '/images/Tête_Yoruba.png', route: '/catalogue?categorie=Têtes' },
  { nom: 'Statues', image: '/images/Statue_Hemba_54 cm.png', route: '/catalogue?categorie=Statues' },
  { nom: 'Boucliers', image: '/images/bouclier_glagwa_wandala.jpg', route: '/catalogue?categorie=Boucliers' },
  { nom: 'Tissus', image: '/images/Masque_éléphant_Bamiléké.png', route: '/catalogue?categorie=Tissus' },
  { nom: 'Tabourets', image: '/images/Tabouret_Ashanti.jpg', route: '/catalogue?categorie=Tabourets' },
];

export default function Accueil() {
  return (
    <div className="container-fluid accueil-container">

      {/* Bloc du haut : Masques, Têtes, Statues */}
      <div className="categories-top">
        {categoriesData.slice(0, 3).map((cat, index) => (
          <Link to={cat.route} key={index} className="category-item">
            <img src={cat.image} alt={cat.nom} className="category-image" />
            <div className="category-title">{cat.nom}</div>
          </Link>
        ))}
      </div>

      {/* Grande image centrale */}
      <div className="main-image">
        <img src="/images/Danse_kunga.png" alt="Danse kunga" />
      </div>

      {/* Bloc du bas : Boucliers, Tissus, Tabourets */}
      <div className="categories-bottom">
        {categoriesData.slice(3, 6).map((cat, index) => (
          <Link to={cat.route} key={index} className="category-item">
            <img src={cat.image} alt={cat.nom} className="category-image" />
            <div className="category-title">{cat.nom}</div>
          </Link>
        ))}
      </div>

      {/* Section de présentation de l'entreprise */}
      <div className="row justify-content-center text-center mt-5">
        <div className="col-md-10 presentation-text">
          <h1 className="site-title">KA.TRIBALART</h1>
          <p className="lead">
            est une entreprise de vente en ligne d'objets d'art africains issus de différentes ethnies. 
            Elle propose une large variété de pièces authentiques et uniques.{" "}
            <Link to="/apropos">
              Lire plus
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}




























