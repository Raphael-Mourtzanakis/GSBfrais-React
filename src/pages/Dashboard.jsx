import FraisTable from '../components/FraisTable'
import '../styles/Dashboard.css'
import { useAuth } from '../context/AuthContext';
import {Link} from 'react-router-dom';

/*function Dashboard() {
  const { user } = useAuth();
  return (
    <div id="dashboard-page">
      <h1>Tableau de bord</h1>
      <p className="sous-titre">Bonjour <b className="user-name">{user.nom_visiteur}</b> !</p>
      <FraisTable/>
    </div>
  );
}*/

function Dashboard() {
  const { user } = useAuth();
  return (
    <div id="dashboard-page">
      <h1>Tableau de bord</h1>
      <p className="sous-titre">Bonjour <b className="user-name">Andre</b> !</p>
      <FraisTable/>
    </div>
  );
}

export default Dashboard;