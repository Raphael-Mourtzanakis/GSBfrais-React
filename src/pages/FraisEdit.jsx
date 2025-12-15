import '../styles/FraisAdd.css'
import FraisForm from '../components/FraisForm'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';

function FraisEdit() {
  const { id } = useParams();
  const API_URL = 'http://gsb.julliand.etu.lmdsio.com/api/';
  const { user, token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [unFrais, setUnFrais] = useState(null);
  useEffect(() => { 
	const fetchFrais = async () => {
		try { 
			const token = localStorage.getItem('token'); 
			const response = await axios.get(`${API_URL}frais/${id}`, { headers: { Authorization: `Bearer ${token}` }, }); 
			setUnFrais(response.data); 
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
      <FraisForm type="Modifier"/>
    </div>
  );
}

export default FraisEdit;