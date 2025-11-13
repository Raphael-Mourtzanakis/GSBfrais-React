import {Link} from 'react-router-dom';
import '../styles/Navbar.css'
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { logoutUser } = useAuth();
  const { user } = useAuth();
  return (
    <nav>
      <span id="nom-site">GSB Frais</span>

      {/* Liens temporaires pour tester les routes */}
      <div id="nav-elements">
        <Link to="/">Accueil</Link>
        <Link to="/dashboard">Tableau de bord</Link>
      </div>

      <div id="login-logout">
        <button onClick={logoutUser()} id="logout"> Déconnexion</button>
        <Link to="/login" id="login">Connexion</Link>
      </div>
    </nav>
  );
}

export default Navbar;