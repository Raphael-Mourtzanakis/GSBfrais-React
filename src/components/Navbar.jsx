import {BrowserRouter,Routes,Route,Link} from 'react-router-dom';
import '../styles/Navbar.css'

function Navbar() {
  return (
    <>
      {/* Liens temporaires pour tester les routes */}
      <nav>
        <span id="nom-site">GSB Frais</span>

        <div id="nav-elements">
          <Link to="/">Accueil</Link>
          <Link to="/dashboard">Tableau de bord</Link>
        </div>
        
        <div id="login-logout">
          <Link to="" id="logout">Déconnexion</Link>
          <Link to="/login" id="login">Connexion</Link>
        </div>
      </nav>
    </>
  );
}

export default Navbar;