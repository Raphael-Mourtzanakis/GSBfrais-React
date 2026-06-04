import PraticienTable from '../components/PraticienTable'
import '../styles/Dashboard.css'
import { useAuth } from '../context/AuthContext';
import {Link} from 'react-router-dom';

function Praticiens() {
  const { user } = useAuth();
  return (
    <div id="dashboard-page">
      <h1>Praticiens</h1>
      <p className="sous-titre">Bonjour <b className="user-name">{user.nom_visiteur}</b> !</p>
	  <div className="Tables">
		<PraticienTable/>
	  </div>
    </div>
  );
}

export default Praticiens;