import '../styles/FraisTable.css'
import '../styles/FraisHorsForfait.css'
import FraisHorsForfaitTable from '../components/FraisHorsForfaitTable'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';

function FraisHorsForfait() {
  const API_URL = 'http://gsb.julliand.etu.lmdsio.com/api/';
  const { token } = useAuth();
  const [fraisHorsForfaitList, setFraisHorsForfaitList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [total, setTotal] = useState(parseFloat(0));

  const handleDelete = async (idFraisHF) => {
  	if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette note de frais ?')) return;
  
  	try {
  		await axios.delete(
  			`${API_URL}fraisHF/suppr`,
  			{
  				data: {id_fraishorsforfait: idFraisHF},
  				headers: { 
                	Authorization: `Bearer ${token}`, 
            	}
  			}
  		);
  		// Met à jour fraisHorsForfaitList en ignorant le frais supprimé
  		setFraisHorsForfaitList(
  			fraisHorsForfaitList.filter((fraisHF) => fraisHF.id_fraishorsforfait !== idFraisHF)
  		);
  	} catch (error) {
  		console.error('Erreur lors de la suppression:', error);
  	}
  };

  useEffect(() => { 
    const fetchFraisHF = async () => { 
      try {
        // Requête get à l'API à l'url 'http://gsb.julliand.etu.lmdsio.com/api/fraisHF/liste/{id}
          const response = await axios.get(
            `${API_URL}fraisHF/liste/${id}`,
            { 
              headers: { 
                Authorization: `Bearer ${token}`, 
              },
            }
          );
        setFraisHorsForfaitList(response.data); // Met à jour l'état avec les données de l'API
		
		// Calcul du total des frais hors forfait
		let somme = 0;
		response.data.forEach(
			(fraisHorsForfaitList) => {
				somme += parseFloat(fraisHorsForfaitList.montant_fraishorsforfait); 
			}
		);
		setTotal(somme);

        setLoading(false); // Arrête le chargement
      } catch (error) {
          console.error('Erreur lors de la récupération des frais :', error);
          setLoading(false); // Arrête le chargement
      }
    }; 
    fetchFraisHF(); // Appelle la fonction pour récupérer les données 
  }, []); // Tableau de dépendances vide = exécute une seule fois

  if (loading) return <div className="frais-table-container chargement">Chargement des frais...</div>;

  return (
    <div className="frais-hors-forfait-page">
		<FraisHorsForfaitTable id={id} fraisHorsForfaitList={fraisHorsForfaitList} totalSomme={total} handleDelete={handleDelete} />
    </div>
  );
}

export default FraisHorsForfait;