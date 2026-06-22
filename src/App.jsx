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
  // Rendu JSX de l'application : enveloppe dans PanierProvider pour le contexte panier, BrowserRouter pour les routes, Header, Routes avec les chemins, et Footer
  return (
    <AuthProvider>
      <PanierProvider> 
        <BrowserRouter>
          <Header /> 
          <main style={{ flex: 1, minHeight: 0, paddingBottom: '100px' }}>  {/* ← FIX : wrapper main avec flex:1 pour étirer contenu et pousser footer bas */}
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
        </BrowserRouter>
      </PanierProvider>
    </AuthProvider>
  );
}

export default App;

































// import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import './App.css';
// import Accueil from './pages/Accueil';
// import Signup from './pages/Signup';
// import Login from './pages/Login';
// import Logout from './pages/Logout';
// import PageUsers from './pages/PageUsers';
// import Header from './components/Header';
// import Footer from "./components/Footer";
// import MonProfil from './pages/MonProfil';
// import PageCategories from './pages/PageCategories';
// import PageImages from './pages/PageImages';
// import PageArticles from './pages/PageArticles';
// import PageCatalogue from "./pages/PageCatalogue";
// import PageArticle from "./pages/PageArticle";
// import Apropos from './pages/Apropos';
// import PageCommandes from './pages/PageCommandes';
// import PageLigneCommandes from './pages/PageLigneCommandes';
// import PagePaniers from './pages/PagePaniers';
// import Panier from './pages/Panier';
// import Success from './pages/Success';
// import { PanierProvider } from './contexts/PanierContext'; // Import du provider

// function App() {
//   return (
//     <PanierProvider> 
//       <BrowserRouter>
//         <Header /> 
//         <Routes>
//           <Route path="/" element={<Accueil />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/logout" element={<Logout />} />
//           <Route path="/users" element={<PageUsers />} />
//           <Route path="/profile" element={<MonProfil />} />
//           <Route path="/pageCategories" element={<PageCategories />} />
//           <Route path="/pageImages" element={<PageImages />} />
//           <Route path="/pageArticles" element={<PageArticles />} />
//           <Route path="/pagecommandes" element={<PageCommandes />} />
//           <Route path="/pageCatalogue" element={<PageCatalogue />} />
//           <Route path="/apropos" element={<Apropos />} />
//           <Route path="/pageLignecommandes" element={<PageLigneCommandes />} />
//           <Route path="/pagePaniers" element={<PagePaniers />} />
//           <Route path="/article/:id" element={<PageArticle />} />
//           <Route path="/panier" element={<Panier />} />
//           <Route path="/success" element={<Success />} />
//         </Routes>
//         <Footer />
//       </BrowserRouter>
//     </PanierProvider>
//   );
// }

// export default App;















// import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import './App.css';
// import Accueil from './pages/Accueil';
// import { AuthProvider } from './contexts/AuthContext';
// import { PanierProvider } from './contexts/PanierContext'; // Importez le PanierProvider
// import Signup from './pages/Signup';
// import Login from './pages/Login';
// import Logout from './pages/Logout';
// import PageUsers from './pages/PageUsers';
// import Header from './components/Header'; 
// import Footer from "./components/Footer";
// import MonProfil from './pages/MonProfil';
// import PageCategories from './pages/PageCategories';
// import PageImages from './pages/PageImages';
// import PageArticles from './pages/PageArticles';
// import PageCatalogue from "./pages/PageCatalogue";
// import PageArticle from "./pages/PageArticle";
// import Apropos from './pages/Apropos';
// import PageCommandes from './pages/PageCommandes';
// import PageLigneCommandes from './pages/PageLigneCommandes';
// import PagePaniers from './pages/PagePaniers';

// function App() {
//   return (
//     <BrowserRouter>
//       {/* AuthProvider doit envelopper l'ensemble des composants pour rendre le contexte accessible */}
//       <AuthProvider>
//         {/* PanierProvider doit être à l'intérieur pour avoir accès au token si besoin */}
//         <PanierProvider>
//           <Header /> 
//           <Routes>
//             <Route path="/" element={<Accueil />} />
//             <Route path="/signup" element={<Signup />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/logout" element={<Logout />} />
//             <Route path="/users" element={<PageUsers />} />
//             <Route path="/profile" element={<MonProfil />} />
//             <Route path="/pageCategories" element={<PageCategories />} />
//             <Route path="/pageImages" element={<PageImages />} />
//             <Route path="/pageArticles" element={<PageArticles />} />
//             <Route path="/pagecommandes" element={<PageCommandes />} />
//             <Route path="/catalogue" element={<PageCatalogue />} />
//             <Route path="/apropos" element={<Apropos />} />
//             <Route path="/pageLignecommandes" element={<PageLigneCommandes />} />
//             <Route path="/pagePaniers" element={<PagePaniers />} />
//             <Route path="/article/:id" element={<PageArticle />} />
//           </Routes>
//           <Footer />
//         </PanierProvider>
//       </AuthProvider>
//     </BrowserRouter>
//   );
// }

// export default App;