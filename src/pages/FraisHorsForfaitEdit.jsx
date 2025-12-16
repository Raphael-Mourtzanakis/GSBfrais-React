import '../styles/FraisAdd.css'
import FraisHorsForfaitForm from '../components/FraisHorsForfaitForm'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';

function FraisHorsForfaitEdit() {
	const { id, id2 } = useParams(); // id = id du frais | id2 = id du frais hors forfait
	const API_URL = 'http://gsb.julliand.etu.lmdsio.com/api/';
	const { token } = useAuth();
	const [loading, setLoading] = useState(true);
	const [unFraisHorsForfait, setUnFraisHorsForfait] = useState(null);

	useEffect(() => { 
		const fetchFraisHorsForfait = async () => {
			try { 
				const token = localStorage.getItem('token'); 
				const response = await axios.get(`${API_URL}fraisHF/${id2}`, { headers: { Authorization: `Bearer ${token}` }, }); 
				setUnFraisHorsForfait(response.data); 
			} catch (error) { 
				console.error('Erreur:', error); 
			} finally { 
				setLoading(false); 
			} 
		};
		fetchFraisHorsForfait();
	}, [id2]);

  	if (loading) return <div className="frais-hors-forfait-edit-page chargement">Chargement de la modification de frais hors forfait...</div>;

	return (
		<div className="frais-hors-forfait-edit-page">
			<FraisHorsForfaitForm idFrais={id} unFraisHorsForfait={{unFraisHorsForfait}}/>
		</div>
	);
}

export default FraisHorsForfaitEdit;