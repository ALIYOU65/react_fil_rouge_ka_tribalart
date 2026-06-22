import { useAuth } from '../contexts/AuthContext';

export default function MonProfil() {
  const { userPrenom, userRole } = useAuth();
  
  return (
    <div style={{ padding: '20px' }}>
      <h2>Bienvenue, {userPrenom} !</h2>
      <p>Votre rôle est : {userRole}</p>
      
    </div>
  );
}
























// import React from 'react';
// import { useAuth } from '../contexts/AuthContext';

// export default function MonProfil() {
//   const { userPrenom, userRole } = useAuth();
  
//   return (
//     <div style={{ padding: '20px' }}>
//       <h2>Bienvenue, {userPrenom} !</h2>
//       <p>Votre rôle est : {userRole}</p>
//       {/* Vous pouvez ajouter ici les informations du profil utilisateur */}
//     </div>
//   );
// }