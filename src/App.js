import './App.css'
import {BrowserRouter,Routes,Route,Link} from 'react-router-dom';
import Login from './pages/Login'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <BrowserRouter>
      {/* Liens temporaires pour tester les routes */}
      <nav>
        <span id="nom-site">GSB Frais</span>
        <Link to="/">Accueil</Link>
        <Link to="/dashboard">Tableau de bord</Link>
        <div id="login-logout">
          <Link to="" id="logout">Déconnexion</Link>
          <Link to="/login" id="login">Connexion</Link>
        </div>
      </nav>

      {/* Routes de l'application */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;