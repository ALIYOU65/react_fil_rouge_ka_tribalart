import React from 'react';
import '../pages/Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        
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

        {/* Colonne 3 : Image droite + icônes Etsy/Ebay */}
          <div className="phone">
            <p>
              0674524390
            </p>
            </div>
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
















































// export default function Footer() {
//   return (
//     <footer
//       style={{
//         width: "100vw",
//         margin: 0,
//         padding: "20px 0",
//         backgroundColor: "#582900", // marron
//         color: "white",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//       }}
//     >
//       <div
//         className="conteneur_footer"
//         style={{
//           width: "100%",
//           maxWidth: "1200px",
//           display: "flex",
//           justifyContent: "space-between", // étire les 3 colonnes
//           alignItems: "flex-end",          // alignement en bas
//           padding: "0 40px",
//           textAlign: "center",
//         }}
//       >
//         {/* Colonne 1 : Image gauche + icônes sociales */}
//         <div
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "flex-start",
//             gap: "15px",
//           }}
//         >
//           <img src="/images/art_africain1.jpg" alt="art_africain1" width="100" />
//           <div style={{ display: "flex", gap: "10px" }}>
//             <a href="https://www.facebook.com/">
//               <img src="/images/icone_facebook.png" alt="Facebook" width="40" />
//             </a>
//             <a href="https://www.instagram.com/">
//               <img src="/images/icone_instagram.png" alt="Instagram" width="40" />
//             </a>
//           </div>
//         </div>

//         {/* Colonne 2 : Email, image centrale et téléphone */}
//         <div
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             gap: "5px",
//           }}
//         >
//           <p style={{ margin: 0, fontSize: "0.9rem" }}>
//             Email : <strong>KA.TRIBALART@GMAIL.COM</strong>
//           </p>
//           <img
//             src="/images/art_africain.jpg"
//             alt="art_africain"
//             width="160"
//           />
//           <p style={{ margin: 0, fontSize: "0.9rem" }}>
//             Téléphone : <strong>0674524390</strong>
//           </p>
//         </div>

//         {/* Colonne 3 : Image droite + icônes Etsy/Ebay */}
//         <div
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "flex-end",
//             gap: "15px",
//           }}
//         >
//           <img src="/images/art_africain2.jpg" alt="art_africain2" width="100" />
//           <div style={{ display: "flex", gap: "10px" }}>
//             <a href="https://www.ebay.fr/mys/active">
//               <img src="/images/icone_ebay.png" alt="Ebay" width="60" />
//             </a>
//             <a href="https://www.etsy.com/">
//               <img src="/images/icone_etsy.png" alt="Etsy" width="60" />
//             </a>
//           </div>
//         </div>
//       </div>

//       {/* Copyright en bas et centré */}
//       <div className="copyright" style={{ marginTop: "15px" }}>
//         <p
//           style={{
//             margin: 0,
//             fontSize: "0.8rem",
//             color: "#ADD8E6",
//           }}
//         >
//           Copyright © Ka.tribalart, 2025
//         </p>
//       </div>
//     </footer>
//   );
// }


