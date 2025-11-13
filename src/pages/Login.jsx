import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css'

export default function Login() {
  // 1. États locaux pour les champs du formulaire
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  // Fonction de soumission du formulaire (à définir)
  const handleSubmit = (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    if (loginUser(login, password)) {
      navigate('/dashboard') // Redirige vers /dashboard si succès
    } else {
      alert("Identifiant ou mot de passe incorrect") // Affiche une erreur si échouement
    }
  };

  // 5. Rend le formulaire
  return (
    <div id="login-page">
      <div className="login-container">
        <h1>Connexion</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-element">
            <label>Identifiant : </label><br/>
            <input
              type="text"
              name="login"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              required
            />
          </div>
          <div className="form-element">
            <label>Mot de passe : </label><br/>
            <input
              type="password"
              name="pasword"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <hr/>
          <input
            type="submit"
            value="Se connecter"
          />
        </form>
      </div>
    </div>
  );
}