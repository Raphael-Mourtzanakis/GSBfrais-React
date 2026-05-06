import '../styles/Table.css'
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom';
import { useState } from 'react';

function SpecialitesPraticienTable({id_praticien, specialitesNonAttribuees, specialitesPraticien, praticien, handleDelete, handleAdd}) {
  const navigate = useNavigate();
  const [idSpecialiteSelectionnee, setIdSpecialiteSelectionnee] = useState(null);

  return (
    <div className="frais-hors-forfait-table-container">
		<h2>Liste des spécialites du praticien {praticien.nom_praticien}</h2>

		<div className="ajout-specialité">
			<form>
				<label>
					<legend>Ajouter une spécialité :</legend>
						<select required onChange={(e) => setIdSpecialiteSelectionnee(parseInt(e.target.value))}>
							<option key="0" value=""> --- Sélectionnez une spécialité --- </option>
							{specialitesNonAttribuees.map((element, index) => (
								<option key={`${element.id}`} {...idSpecialiteSelectionnee ? element.id_specialite : "selected"} value={`${element.id_specialite}`}> {element.lib_specialite} </option>
							))}
						</select>
				</label>
			</form>

			<button onClick={() => handleAdd(idSpecialiteSelectionnee)} className="add-button" > 
				Ajouter
			</button>
		</div>

      <table className="frais-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Libellé</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {specialitesPraticien.map((element, index) => (
            <tr key={element.id}>
              <td>{element.id_specialite}</td>
              <td>{element.lib_specialite}</td>
              <td>
				<button onClick={() => handleDelete(element.id_specialite)} className="delete-button" > 
                	Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

		<div className="buttons-bottom">
			<Link to={"/dashboard"} className="back-button">Retour</Link>
		</div>
    </div>
  );
}

export default SpecialitesPraticienTable;