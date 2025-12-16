import '../styles/FraisTable.css'
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { useState } from 'react';

function FraisHorsForfaitTable({id, fraisHorsForfaitList}) {
  const navigate = useNavigate();
  const API_URL = 'http://gsb.julliand.etu.lmdsio.com/api/';
  const { user, token } = useAuth();

//const handleDelete = async (idFraisHF) => {
//	if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette note de frais ?')) return;
//
//	try {
//		await axios.delete(
//			`${API_URL}fraisHF/suppr`,
//			{
//				data: {id_fraishorsforfait: idFraisHF},
//				headers: { 
//              	Authorization: `Bearer ${token}`, 
//          	}
//			}
//		);
//		// Met à jour fraisHorsForfaitList en ignorant le frais supprimé
//		setFraisHorsForfaitList(
//			fraisHorsForfaitList.filter((fraisHF) => fraisHF.id_fraishorsforfait !== idFraisHF)
//		);
//	} catch (error) {
//		console.error('Erreur lors de la suppression:', error);
//	}
//};

  return (
    <div className="frais-hors-forfait-table-container">
		<h2>Liste des notes de Frais hors forfait</h2>

      <table className="frais-table">
        <thead>
          <tr>
            <th>ID Frais Hors Forfait</th>
            <th>ID Frais</th>
            <th>Date</th>
            <th>Libellé</th>
            <th>Montant</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {fraisHorsForfaitList.map((element, index) => (
            <tr key={element.id}>
              <td>{element.id_fraishorsforfait}</td>
              <td>{element.id_frais}</td>
              <td>{element.date_fraishorsforfait}</td>
              <td>{element.lib_fraishorsforfait}</td>
              <td>{element.montant_fraishorsforfait}</td>
              <td className="buttons-line"> {/*
                <button onClick={() => navigate(`/frais/${id}/hors-forfait/modifier/${element.id_fraishorsforfait}`)} className="edit-button" > 
                  Modifier
                </button>
				<button onClick={() => handleDelete(element.id_fraishorsforfait)} className="delete-button" > 
                  Supprimer
                </button>
			  	*/}
              </td>
            </tr>
          ))}
					<tr key="1">
						<td>1</td>
						<td>100</td>
						<td>16/12/2025</td>
						<td>Nuit à l'hôtel</td>
						<td>500 €</td>
						<td className="buttons-line"> {/*
							<button onClick={() => navigate(`/frais/${id}/hors-forfait/modifier/1`)} className="edit-button" > 
							Modifier
							</button>
							<button onClick={() => handleDelete(1)} className="delete-button" > 
							Supprimer
							</button>
							*/}
						</td>
					</tr>
        </tbody>
      </table>

	  <Link to={`/frais/${id}/hors-forfait/ajouter`} className="add-button add-frais-hors-frais-button">Ajouter une note de frais</Link>
    </div>
  );
}

export default FraisHorsForfaitTable;