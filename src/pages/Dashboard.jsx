import '../styles/Dashboard.css'
import { useAuth } from '../context/AuthContext';

function Dashboard() {
  const { user } = useAuth();
  return (
    <div>
        <div id="dashboard-page">
          <h1>Bienvenue</h1>
          <h2>{user}</h2>
        </div>
    </div>
  );
}

export default Dashboard;