import FraisTable from '../components/FraisTable'
import PraticienTable from '../components/PraticienTable'
import '../styles/Dashboard.css'
import { useAuth } from '../context/AuthContext';
import {Link} from 'react-router-dom';

function Dashboard() {
  const { user } = useAuth();
  return (
    <div id="dashboard-page">
      <h1>Tableau de bord</h1>
      <p className="sous-titre">Bonjour <b className="user-name">{user.nom_visiteur}</b> !</p>
	  <div className="Tables">
		<FraisTable/>
		<PraticienTable/>
	  </div>
    </div>
  );
}

export default Dashboard;