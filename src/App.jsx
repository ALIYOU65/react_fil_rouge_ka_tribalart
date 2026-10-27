// Importations des dépendances nécessaires : BrowserRouter, Route et Routes depuis react-router-dom pour la configuration des routes
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Accueil from './pages/Accueil';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Logout from './pages/Logout';
import PageUsers from './pages/PageUsers';
import Header from './components/Header';
import Footer from "./components/Footer";
import MonProfil from './pages/MonProfil';
import PageCategories from './pages/PageCategories';
import PageImages from './pages/PageImages';
import PageArticles from './pages/PageArticles';
import PageCatalogue from "./pages/PageCatalogue";
import PageArticle from "./pages/PageArticle";
import Apropos from './pages/Apropos';
import PageCommandes from './pages/PageCommandes';
import PageLigneCommandes from './pages/PageLigneCommandes';
import PagePaniers from './pages/PagePaniers';
import Panier from './pages/Panier';
import Success from './pages/Success';
import { PanierProvider } from './contexts/PanierContext'; 
import { AuthProvider } from './contexts/AuthContext';

// Déclaration du composant principal App qui configure le routage et l'ensemble de l'application
function App() {
  return (
  <AuthProvider>
    <PanierProvider>
      <BrowserRouter>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
          }}
        >
          <Header />
          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Accueil />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/users" element={<PageUsers />} />
              <Route path="/profile" element={<MonProfil />} />
              <Route path="/pageCategories" element={<PageCategories />} />
              <Route path="/pageImages" element={<PageImages />} />
              <Route path="/pageArticles" element={<PageArticles />} />
              <Route path="/pagecommandes" element={<PageCommandes />} />
              <Route path="/catalogue" element={<PageCatalogue />} />
              <Route path="/apropos" element={<Apropos />} />
              <Route path="/pageLignecommandes" element={<PageLigneCommandes />} />
              <Route path="/pagePaniers" element={<PagePaniers />} />
              <Route path="/article/:id" element={<PageArticle />} />
              <Route path="/panier" element={<Panier />} />
              <Route path="/success" element={<Success />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </PanierProvider>
  </AuthProvider>
);
}

export default App;
































