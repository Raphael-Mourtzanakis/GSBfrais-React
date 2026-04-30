import '../styles/FraisAdd.css'
import FraisForm from '../components/FraisForm'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import {API_URL} from '../services/authService';

function FraisEdit() {
  const { id } = useParams();
  const { user, token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [unFrais, setUnFrais] = useState(null);
  const [desEtats, setDesEtats] = useState(null);
  const [unMontantSaisi, setUnMontantSaisi] = useState(0);

	useEffect(() => { 
		const fetchFrais = async () => {
			try { 
				const token = localStorage.getItem('token'); 
				const response = await axios.get(`${API_URL}Frais/obtenir/${id}/${user.id_visiteur}`, { headers: { Authorization: `Bearer ${token}` }, }); 
				setUnFrais(response.data.data);

				const response2 = await axios.get(`${API_URL}Etat/lister`, { headers: { Authorization: `Bearer ${token}` }, }); 
				setDesEtats(response2.data.data); 

				const response3 = await axios.get(`${API_URL}Frais/${id}/montant-saisi/obtenir/${user.id_visiteur}`, { headers: { Authorization: `Bearer ${token}` }, }); 
				setUnMontantSaisi(response3.data.value);
			} catch (error) { 
				console.error('Erreur:', error);
			} finally { 
				setLoading(false); 
			} 
		};
		fetchFrais();
	}, [id]);

  if (loading) return <div className="frais-edit-page chargement">Chargement de la modification de frais...</div>;

  return (
    <div className="frais-edit-page">
      <h1 className="centered">Modification de frais</h1>
      <FraisForm unFrais={unFrais} desEtats={desEtats} unMontantSaisi={unMontantSaisi}/>
    </div>
  );
}

export default FraisEdit;