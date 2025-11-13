import {Link} from 'react-router-dom';
import '../styles/Navbar.css'
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { logoutUser, user } = useAuth();
  return (
    <nav>
      <span id="nom-site">GSB Frais</span>
      {/* Liens temporaires pour tester les routes */}
      <div id="nav-elements">
        <Link to="/">Accueil</Link>
        {user != null && (<Link to="/dashboard">Tableau de bord</Link>)}
      </div>

        {user == null ? (
          <Link to="/login" id="login">Connexion</Link>
        ) : (
          <button onClick={logoutUser} id="logout"> Déconnexion</button>
        )}
    </nav>
  );
}

export default Navbar;

/* 
    ? = alors (condition if else)
    && = alors (condition if)
    : = sinon
    LISTE.map(LIGNE => ) :  Boucle de valeurs de LISTE avec LIGNE pour la valeur de chaque index 
    => = Exécuter la boucle
    VARIABLE.toString() = VARIABLE mais au type String
*/