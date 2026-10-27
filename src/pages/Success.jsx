import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { usePanier } from '../contexts/PanierContext';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:3000/api/paniers';

export default function Success() {
  const { token } = useAuth();
  const { mettreAJourPanier } = usePanier();
  const navigate = useNavigate();
  const [status, setStatus] = useState('loading'); 
  const [message, setMessage] = useState('Traitement du paiement en cours...');

  useEffect(() => {
    const finaliser = async () => {
      try {
        if (!token) {
          setStatus('error');
          setMessage('Vous devez être connecté.');
          return;
        }
        try {
          const res = await axios.get(`${API_URL}/mon-panier`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          const count = res.data?.articles?.length || 0;
          mettreAJourPanier(count);
        } catch {
          // Panier vide ou introuvable → normal après paiement
          mettreAJourPanier(0);
        }

        setStatus('success');
        setMessage('Votre paiement a été un succès ! Votre commande est confirmée.');
      } catch (err) {
        console.error(err);
        setStatus('error');
        setMessage('Une erreur est survenue lors de la confirmation du paiement.');
      }
    };

    finaliser();

    const timer = setTimeout(() => navigate('/catalogue'), 5000);
    return () => clearTimeout(timer);
  }, [token, mettreAJourPanier, navigate]);

  const isSuccess = status === 'success';
  const isError = status === 'error';

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
          backgroundColor: isError ? '#fee2e2' : '#dcfce7',
          borderRadius: '16px',
          padding: '40px 50px',
          textAlign: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          maxWidth: '520px',
          width: '100%',
        }}
      >
        <h1
          style={{
            color: isError ? '#dc2626' : '#16a34a',
            marginBottom: '16px',
            fontSize: '1.8rem',
          }}
        >
          {isError ? 'Erreur de paiement' : 'Votre paiement a été un succès !'}
        </h1>
        <p style={{ color: '#334155', marginBottom: '8px' }}>{message}</p>
        <p style={{ color: '#64748b', margin: 0 }}>
          Vous allez être redirigé vers le catalogue...
        </p>
      </div>
    </div>
  );
}



