import '../styles/FraisTable.css'
import '../styles/FraisHorsForfait.css'
import FraisHorsForfaitTable from '../components/FraisHorsForfaitTable'
import { useParams } from 'react-router-dom';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';

function FraisHorsForfait() {
  const API_URL = 'http://gsb.julliand.etu.lmdsio.com/api/';
  const { user, token } = useAuth();
  const [fraisHorsForfaitList, setFraisHorsForfaitList] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => { 
    const fetchFraisHF = async () => { 
      try {
        // Requête get à l'API à l'url 'http://gsb.julliand.etu.lmdsio.com/api/frais/liste/{id_visiteur}
          const response = await axios.get(
            `${API_URL}frais/liste/${user.id_visiteur}`,
            { 
              headers: { 
                Authorization: `Bearer ${token}`, 
              },
            }
          );
        setFraisHorsForfaitList(response.data); // Met à jour l'état avec les données de l'API
        setLoading(false); // Arrête le chargement
      } catch (error) {
          console.error('Erreur lors de la récupération des frais :', error);
          setLoading(false); // Arrête le chargement
      }
    }; 
    fetchFraisHF(); // Appelle la fonction pour récupérer les données 
  }, []); // Tableau de dépendances vide = exécute une seule fois

  return (
    <div className="frais-hors-forfait-page">
		<FraisHorsForfaitTable id={id} fraisHorsForfaitList={fraisHorsForfaitList}/>
    </div>
  );
}

export default FraisHorsForfait;