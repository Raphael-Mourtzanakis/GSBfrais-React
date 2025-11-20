import { React, useState, useEffect } from 'react';
import '../styles/FraisTable.css'
import fraisData from '../data/frais.json'

function FraisTable() {
  const [fraisList, setFraisList] = useState(fraisData);
  const [loading, setLoading] = useState([]);
  useEffect(() => {
    // Simulation d'un appel API avec un délai de 500 ms
    setTimeout(() => {
      setFraisList(fraisData); // Met à jour l'état avec les données du fichier JSON
      setLoading(false); // Met fin à l'état de chargement
    }, 500); // Délai pour simuler un chargement
  }, []); // Tableau de dépendances vide = exécute une seule fois

  if (loading) return <div className="frais-table-container chargement">Chargement des frais...</div>;

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
          </tr>
        </thead>
        <tbody>
          {fraisData.map((element, index) => (
            <tr key={element.id}>
              <td>{element.id_frais}</td>
              <td>{element.id_etat}</td>
              <td>{element.anneemois}</td>
              <td>{element.id_visiteur}</td>
              <td>{element.nbjustificatifs}</td>
              <td>{element.datemodification}</td>
              <td></td>
              <td>{element.montantvalide}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FraisTable;