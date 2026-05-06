import '../styles/Table.css'
import '../styles/FraisHorsForfait.css'
import SpecialitesPraticienTable from '../components/SpecialitesPraticienTable'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import {API_URL} from '../services/authService';

function SpecialitesPraticien() {
  const { token } = useAuth();
  const [specialitesPraticien, setSpecialitesPraticien] = useState([]);
  const [specialitesNonAttribuees, setSpecialitesNonAttribuees] = useState([]);
  const [idSpecialiteSelectionnee, setIdSpecialiteSelectionnee] = useState(null);
  const [praticien, setPraticien] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [total, setTotal] = useState(parseFloat(0));

  const handleDelete = async (id_specialite) => {
  	if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette spécialité au praticien ?')) return;
  
  	try {
  		await axios.delete(
  			`${API_URL}Praticien/specialite/supprimer`,
  			{
  				data: {
					id_praticien: id,
					id_specialite: id_specialite
				},
  				headers: { 
                	Authorization: `Bearer ${token}`, 
            	}
  			}
  		);
  		// Met à jour les listes d'éléments
		const response = await axios.get(
            `${API_URL}Praticien/${id}/specialites_non_attribuees/lister`,
            { 
              headers: { 
                Authorization: `Bearer ${token}`, 
              },
            }
          );
  		setSpecialitesPraticien(
  			specialitesPraticien.filter((specialitesPraticien) => specialitesPraticien.id_specialite !== id_specialite)
  		);
		setSpecialitesNonAttribuees(response.data.data);
  	} catch (error) {
  		console.error('Erreur lors de la suppression:', error);
  	}
  };

  const handleAdd = async (id_specialite) => {
  	try {
  		await axios.post(
  			`${API_URL}Praticien/specialite/ajouter`,
  			{
				id_praticien: id,
				id_specialite: id_specialite
			},
			{
  				headers: { 
                	Authorization: `Bearer ${token}`, 
            	}
  			}
  		);
  		// Met à jour les listes d'éléments
  		const response = await axios.get(
            `${API_URL}Praticien/${id}/specialites/lister`,
            { 
              headers: { 
                Authorization: `Bearer ${token}`, 
              },
            }
          );
        setSpecialitesPraticien(response.data.data); // Met à jour l'état avec les données de l'API
		setSpecialitesNonAttribuees(
  			specialitesNonAttribuees.filter((specialitesNonAttribuees) => specialitesNonAttribuees.id_specialite !== id_specialite)
  		);
  	} catch (error) {
  		console.error('Erreur lors de l\'ajout:', error);
  	}
  };

  useEffect(() => { 
    const fetchSpecialitesPraticien = async () => { 
      try {
          const response = await axios.get(
            `${API_URL}Praticien/${id}/specialites/lister`,
            { 
              headers: { 
                Authorization: `Bearer ${token}`, 
              },
            }
          );
        setSpecialitesPraticien(response.data.data); // Met à jour l'état avec les données de l'API

		const response2 = await axios.get(
            `${API_URL}Praticien/${id}/specialites_non_attribuees/lister`,
            { 
              headers: { 
                Authorization: `Bearer ${token}`, 
              },
            }
          );
        setSpecialitesNonAttribuees(response2.data.data); // Met à jour l'état avec les données de l'API

		const response3 = await axios.get(
            `${API_URL}Praticien/obtenir/${id}`,
            { 
              headers: { 
                Authorization: `Bearer ${token}`, 
              },
            }
          );
        setPraticien(response3.data.data);

        setLoading(false); // Arrête le chargement
      } catch (error) {
          console.error('Erreur lors de la récupération des frais :', error);
          setLoading(false); // Arrête le chargement
      }
    }; 
    fetchSpecialitesPraticien(); // Appelle la fonction pour récupérer les données 
  }, []); // Tableau de dépendances vide = exécute une seule fois

  if (loading) return <div className="frais-table-container chargement">Chargement des spécialités du praticien...</div>;

  return (
    <div className="specialites-de-praticien-page">
		<SpecialitesPraticienTable id_praticien={id} specialitesNonAttribuees={specialitesNonAttribuees} specialitesPraticien={specialitesPraticien} idSpecialiteSelectionnee={idSpecialiteSelectionnee} praticien={praticien} handleDelete={handleDelete} handleAdd={handleAdd} />
    </div>
  );
}

export default SpecialitesPraticien;