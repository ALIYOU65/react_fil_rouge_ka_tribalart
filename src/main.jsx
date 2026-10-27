import React from 'react';
import { createRoot } from 'react-dom/client';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import App from './App.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { PanierProvider } from './contexts/PanierContext.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <PanierProvider>
        <App />
      </PanierProvider>
    </AuthProvider>
  </React.StrictMode>,
);












