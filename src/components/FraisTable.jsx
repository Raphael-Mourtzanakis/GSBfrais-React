import { useState, useEffect } from 'react';
import '../styles/FraisTable.css'
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';

function FraisTable() {
  const API_URL = 'http://gsb.julliand.etu.lmdsio.com/api/';
  const { user, token } = useAuth();
  const [fraisList, setFraisList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMontantValideNonNull, setFilterMontantValideNonNull] = useState(false);
  const [filterMontantValideMin, setFilterMontantValideMin] = useState(false);
  const [montantValideMin, setMontantValideMin] = useState(0);
  const navigate = useNavigate();

  useEffect(() => { 
    const fetchFrais = async () => { 
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
        setFraisList(response.data); // Met à jour l'état avec les données de l'API
        setLoading(false); // Arrête le chargement
      } catch (error) {
          console.error('Erreur lors de la récupération des frais :', error);
          setLoading(false); // Arrête le chargement
      }
    }; 
    fetchFrais(); // Appelle la fonction pour récupérer les données 
  }, []); // Tableau de dépendances vide = exécute une seule fois

  if (loading) return <div className="frais-table-container chargement">Chargement des frais...</div>;

  // Logique de filtrage : filtre les frais en fonction du terme de recherche
  const filteredFrais = fraisList
    .filter((frais) => (filterMontantValideMin && (frais.montantvalide > montantValideMin)) || !filterMontantValideMin) // Afficher les frais avec montantvalide supérieur
    .filter((frais) => (filterMontantValideNonNull && !frais.montantvalide) || frais.montantvalide) // Afficher les frais avec montantvalide = null
    .filter((frais) =>
    frais.anneemois.includes(searchTerm) ||
    frais.id_visiteur.toString().includes(searchTerm)
  );

  return (
    <div className="frais-table-container">
      <h2>Liste des Frais</h2>

      <table className="frais-table">
        <thead>
          <tr>
            <th>ID Frais</th>
            <th>ID État</th>
            <th>Année-Mois</th>
            <th>ID Visiteur</th>
            <th>Nombre de justificatifs</th>
            <th>Date de modification</th>
            <th>Montant saisi</th>
            <th>Montant validé</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredFrais.map((element, index) => (
            <tr key={element.id}>
              <td>{element.id_frais}</td>
              <td>{element.id_etat}</td>
              <td>{element.anneemois}</td>
              <td>{element.id_visiteur}</td>
              <td>{element.nbjustificatifs}</td>
              <td>{element.datemodification}</td>
              <td></td>
              <td>{element.montantvalide} {element.montantvalide && "€"}</td>
              <td> 
                <button onClick={() => navigate(`/frais/modifier/${element.id_frais}`)} className="edit-button" > 
                  Modifier
                </button> 
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Link to="/frais/ajouter" className="add-button">Ajouter un frais</Link>

      <div className="filtrage">
        {/* Case à cocher pour afficher/cacher les frais avec montant non validé */}
        <div className="checkbox">
            <div className="afficher-montant-valide">
              <label>
                <input
                  type="checkbox"
                  checked={filterMontantValideNonNull}
                  onChange={(e) => setFilterMontantValideNonNull(e.target.checked)} // Met à jour filterMontantValideNonNull
                />
                <legend>Afficher les frais avec montant non validé</legend>
              </label>
            </div>

            {/* Champ de montant validé minimum */}
            <div className="montant-valide-min">
              <label>
                  <input
                    type="checkbox"
                    checked={filterMontantValideMin}
                    onChange={(e) => setFilterMontantValideMin(e.target.checked)} // Met à jour filterMontantValideMin
                  />
                  <legend>Afficher les frais avec montant validé supérieur à</legend>
              </label>
                <input
                  type="number"
                  placeholder="Insérer un montant..."
                  value={montantValideMin}
                  onChange={(e) => {if (e.target.value >= 0) setMontantValideMin(e.target.value)}} // Met à jour montantValideMin si il est supérieur ou égal à 0
                  min="0"
                  step="0.01"
                />
            </div>
        </div>
        
        {/* Champ de recherche pour le filtrage */}
        <div className="search-bar">
          <label>
            <legend>Recherche :</legend>
            <input
              type="text"
              placeholder="Rechercher par années-mois, ID visiteur ou montant..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Met à jour searchTerm
              size="47"
            />
            </label>
        </div>
      </div>
    </div>
  );
};

export default FraisTable;