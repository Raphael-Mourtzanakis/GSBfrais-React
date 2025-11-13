import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css'

export default function Login() {
  // 1. États locaux pour les champs du formulaire
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  // Fonction de soumission du formulaire (à définir)
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login:', login);
    console.log('Password:', password);
  };

  // 5. Rend le formulaire
  return (
    <div id="login-page">
      <div className="login-container">
        <h1>Connexion</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <div>
            <label>Login :</label>
            <input
              type="text"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              required
            />
          </div>

          {/* TODO : compléter le formulaire de connexion */}
        </form>
      </div>
    </div>
  );
}