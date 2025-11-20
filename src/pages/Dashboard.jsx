import FraisTable from '../components/FraisTable'
import '../styles/Dashboard.css'
import { useAuth } from '../context/AuthContext';

function Dashboard() {
  const { user } = useAuth();
  return (
    <div id="dashboard-page">
      <h1>Tableau de bord</h1>
      <p className="sous-titre">Bonjour <b className="user-name">{user}</b> !</p>
      <FraisTable/>
    </div>
  );
}

export default Dashboard;