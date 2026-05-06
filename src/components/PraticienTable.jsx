import { useState, useEffect } from 'react';
import '../styles/Table.css'
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import {API_URL} from '../services/authService';

function PraticienTable() {
  const { token } = useAuth();
  const [praticienList, setPraticienList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => { 
    const fetchPraticien = async () => { 
      try {
          const response = await axios.get(
            `${API_URL}Praticien/lister`,
            { 
              headers: { 
                Authorization: `Bearer ${token}`,
              },
            }
          );
        setPraticienList(response.data.data); // Met à jour l'état avec les données de l'API
        setLoading(false); // Arrête le chargement
      } catch (error) {
          console.error('Erreur lors de la récupération des praticiens :', error);
          setLoading(false); // Arrête le chargement
      }
    }; 
    fetchPraticien(); // Appelle la fonction pour récupérer les données 
  }, []); // Tableau de dépendances vide = exécute une seule fois

  if (loading) return <div className="frais-table-container chargement">Chargement des praticiens...</div>;

  // Logique de filtrage : filtre les frais en fonction du terme de recherche
  const filteredPraticien = praticienList
    .filter((praticien) =>
      praticien.nom_praticien.includes(searchTerm) ||
      praticien.lib_type_praticien.includes(searchTerm)
    );

  return (
    <div className="frais-table-container">
      <h2 className="centered">Liste des Praticiens</h2>

      <div className="filtrage">
        {/* Champ de recherche pour le filtrage */}
        <div className="search-bar">
          <label>
            <legend>Recherche :</legend>
            <input
              type="text"
              placeholder="Rechercher par nom ou type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Met à jour searchTerm
              size="47"
            />
            </label>
        </div>
      </div>

      <table className="frais-table">
        <thead>
          <tr>
			<th>ID</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Adresse</th>
            <th>Code postal</th>
            <th>Ville</th>
            <th>Coéfficient</th>
            <th>Type</th>
            <th>Lieu</th>
            <th>Spécialités</th>
          </tr>
        </thead>
        <tbody>
          {filteredPraticien.map((element, index) => (
            <tr key={element.id}>
			  <td>{element.id_praticien}</td>
              <td>{element.nom_praticien}</td>
              <td>{element.prenom_praticien}</td>
              <td>{element.adresse_praticien}</td>
              <td>{element.cp_praticien}</td>
              <td>{element.ville_praticien}</td>
              <td>{element.coef_notoriete}</td>
			  <td>{element.lib_type_praticien}</td>
			  <td>{element.lieu_type_praticien}</td>
              <td> 
                <button onClick={() => navigate(`/praticien/${element.id_praticien}/specialites/lister`)} className="textButton"> 
                  Voir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PraticienTable;