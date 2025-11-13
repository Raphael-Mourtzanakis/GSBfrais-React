import '../styles/Dashboard.css'
import { useAuth } from '../context/AuthContext';

function Dashboard() {
  const { user } = useAuth();
  return (
    <div id="dashboard-page">
      {user != null ? (
        <div>
          <h1>Bienvenue</h1>
          <h2>{user}</h2>
        </div>
      ) : (
        <p className="dashboard-text">Tu dois être connecté pour voir ton tableau de bord</p>
      )
      }
    </div>
  );
}

export default Dashboard;