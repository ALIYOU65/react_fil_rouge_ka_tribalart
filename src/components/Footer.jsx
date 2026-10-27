import React from 'react';
import '../pages/Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Colonne 1 : Image gauche + icônes Facebook/Instagram */}
        <div className="footer-column left-column">
          <img src="/images/art_africain1.jpg" alt="art_africain1" width="100" />
            <div className="social-icons">
              <a href="https://www.facebook.com/">
                <img src="/images/icone_facebook.png" alt="Facebook" width="40" />
              </a>
              <a href="https://www.instagram.com/">
                <img src="/images/icone_instagram.png" alt="Instagram" width="40" />
              </a>
            </div>
          </div>
          {/* Adresse Email */}
          <div className="contact-info">
          <p>
              KA.TRIBALART@GMAIL.COM
            </p>
        </div>

        {/* Colonne 2 : Image centrale */}
        <div className="footer-column center-column">
          <img src="/images/art_africain.jpg" alt="art_africain" width="160" />
        <div className="copyright">
        <p> © Ka.tribalart, 2025</p>
        </div>
        </div>
           {/* Numéro téléphonique */}
          <div className="phone">
            <p>
              0674524390
            </p>
            </div>
            {/* Colonne 3 : Image droite + icônes Etsy/Ebay */}
             <div className="footer-column right-column">
              <img src="/images/art_africain2.jpg" alt="art_africain2" width="100" />
            <div className="ecommerce_icons">
              <a href="https://www.ebay.fr/mys/active">
                <img src="/images/icone_ebay.png" alt="Ebay" width="60" />
              </a>
              <a href="https://www.etsy.com/">
                <img src="/images/icone_etsy.png" alt="Etsy" width="60" />
              </a>
            </div>
          </div>
        </div>
    </footer>
  );
}
















































