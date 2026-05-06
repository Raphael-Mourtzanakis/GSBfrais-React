import '../styles/Table.css'
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom';

function FraisHorsForfaitTable({id, fraisHorsForfaitList, totalSomme, handleDelete}) {
  const navigate = useNavigate();

  return (
    <div className="frais-hors-forfait-table-container">
		<h2>Liste des notes de Frais hors forfait</h2>

      <table className="frais-table">
        <thead>
          <tr>
            <th>ID</th>
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
              <td>{element.date_fraishorsforfait}</td>
              <td>{element.lib_fraishorsforfait}</td>
              <td>{element.montant_fraishorsforfait}</td>
              <td className="buttons-line">
                <button onClick={() => navigate(`/frais/${id}/hors-forfait/modifier/${element.id_fraishorsforfait}`)} className="edit-button" > 
                	Modifier
                </button>
				<button onClick={() => handleDelete(element.id_fraishorsforfait)} className="delete-button" > 
                	Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

	<div className="buttons-bottom">
	  <Link to={`/frais/${id}/hors-forfait/ajouter`} className="add-button add-frais-hors-frais-button">Ajouter une note de frais</Link>
	  <Link to={`/frais/modifier/${id}`} className="back-button">Retour</Link>
	</div>

	  <div className="total">Total : <span className="total-nombre">{totalSomme}</span> €</div>
    </div>
  );
}

export default FraisHorsForfaitTable;