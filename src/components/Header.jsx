import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { usePanier } from '../contexts/PanierContext';

export default function Header() {
  const { token, userRole, userPrenom } = useAuth();
  const { nombreArticles } = usePanier();
  const isLoggedIn = !!token;
  const isAdmin = userRole === 'ADMIN';

  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const toggleProfileMenu = (e) => {
    e.preventDefault();
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  return (
    <header
      style={{
        width: "100vw",
        margin: 0,
        padding: 0,
      }}
    >
      <nav
        className="navbar navbar-expand-lg"
        style={{
          backgroundColor: "#87CEEB",
          width: "100%",
          margin: 0,
          padding: "0 10px",
        }}
      >
        <div
          className="container-fluid"
          style={{
            maxWidth: "100%",
            width: "100%",
            margin: 0,
            padding: "0 10px",
          }}
        >
          <img 
            src="/images/Logo1.png" 
            alt="Logo" 
            width="80" 
            style={{ margin: "10px 0" }} 
          />

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/" style={{ fontWeight: "bold" }} >
                  Accueil
                </Link>
              </li>

              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ fontWeight: "bold" }}>
                    Pages de gestion
                </a>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to="/catalogue">Catalogue</Link></li>
                  {isAdmin && (
                    <>
                      <li><hr className="dropdown-divider" /></li>
                      <li><Link className="dropdown-item" to="/pageCategories">Gestion de catégorie</Link></li>
                      <li><Link className="dropdown-item" to="/pageImages">Gestion des images</Link></li>
                      <li><Link className="dropdown-item" to="/pageArticles">Gestion des articles</Link></li>
                      <li><hr className="dropdown-divider" /></li>
                      <li><Link className="dropdown-item" to="/pagePaniers">Gestion des paniers</Link></li>
                      <li><Link className="dropdown-item" to="/pageCommandes">Gestion des commandes</Link></li>
                      <li><Link className="dropdown-item" to="/pageLigneCommandes">Gestion des lignes de commande</Link></li>
                      <li><hr className="dropdown-divider" /></li>
                      <li><Link className="dropdown-item" to="/users">Gestion des utilisateurs</Link></li>
                    </>
                  )}
                </ul>
              </li>
            </ul>

            <form className="d-flex" role="recherche">
              <input
                className="form-control me-2"
                type="text"
                placeholder="Recherche"
                aria-label="recherche"
                style={{ 
                  backgroundColor: "#F5F5F5", 
                  borderRadius: "10px"
                }} 
              />
        
              <button 
                className="btn btn-outline-success" 
                type="submit"
                style={{ 
                  backgroundColor: "#2563EB", 
                  borderColor: "#2563EB", 
                  color: "#F5F5F5",
                  borderRadius: "10px" 
                }}
              >
                Recherche
              </button>
            </form>

            <div className="d-flex align-items-center ms-3">
              <div className="icone_panier position-relative me-3">
                <Link to="/panier" style={{ textDecoration: 'none' }}>
                  <img src="/images/icone_panier.png" alt="logo_panier" width="50" />
                  {nombreArticles > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {nombreArticles}
                      <span className="visually-hidden">articles dans le panier</span>
                    </span>
                  )}
                </Link>
              </div>

              <li className="nav-item dropdown list-unstyled">
                <a
                  className="nav-link"
                  href="#"
                  role="button"
                  onClick={toggleProfileMenu}
                  aria-expanded={isProfileMenuOpen}
                  style={{ cursor: 'pointer' }}
                >
                  {isLoggedIn ? (
                    <>
                      <img src="/images/icons8-avatar-30.png" alt="Avatar" width="30" height="30" className="rounded-circle me-1" />
                      {userPrenom}
                    </>
                  ) : (
                    "Mon Compte"
                  )}
                </a>

                {isProfileMenuOpen && (
                  <ul
                    className="dropdown-menu dropdown-menu-end show"
                    style={{ position: 'absolute', inset: 'auto 0px 0px auto', margin: '0px', transform: 'translate3d(0px, 40px, 0px)' }}
                  >
                    {!isLoggedIn ? (
                      <>
                        <li><Link className="dropdown-item" to="/login">Connexion</Link></li>
                        <li><Link className="dropdown-item" to="/signup">Inscription</Link></li>
                      </>
                    ) : (
                      <>
                        <li><Link className="dropdown-item" to="/profile">Mon Profil</Link></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><Link className="dropdown-item" to="/logout">Déconnexion</Link></li>
                    </>
                    )}
                  </ul>
                )}
              </li>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}














