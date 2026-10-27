import { useAuth } from '../contexts/AuthContext';

export default function MonProfil() {
  const { userPrenom, userNom, userRole } = useAuth();

  const nomComplet = [userPrenom, userNom].filter(Boolean).join(' ') || 'Utilisateur';

  return (
    <div
      style={{
        minHeight: '60vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px 20px',
      }}
    >
      <div
        style={{
          backgroundColor: '#e0f2fe',
          borderRadius: '16px',
          padding: '40px 60px',
          textAlign: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          maxWidth: '500px',
          width: '100%',
        }}
      >
        <h2 style={{ marginBottom: '16px', color: '#1e40af' }}>
          Bienvenue, {nomComplet} !
        </h2>
        <p style={{ fontSize: '18px', margin: 0, color: '#334155' }}>
          Votre rôle est : <strong>{userRole || 'Non défini'}</strong>
        </p>
      </div>
    </div>
  );
}




