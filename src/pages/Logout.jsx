import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Logout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    navigate('/login');
  }, [logout, navigate]);

  return null;
}












// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// export default function Logout() {
//   const navigate = useNavigate();

//   useEffect(() => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");

//     navigate("/login");
//   }, [navigate]);

//   return (
//     <div className="text-center mt-5">
//       <h3>Déconnexion en cours...</h3>
//     </div>
//   );
// }

