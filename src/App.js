import './App.css'
import {BrowserRouter,Routes,Route,Link} from 'react-router-dom';
import Login from './pages/Login'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <div id="App">
      <BrowserRouter>
        {/* Liens temporaires pour tester les routes */}
        <nav>
          <span id="nom-site">GSB Frais</span>
          <Link to="/">Accueil</Link>
          <Link to="/dashboard">Tableau de bord</Link>
          <Link to="/login" id="login">Connexion</Link>
        </nav>

        {/* Routes de l'application */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;