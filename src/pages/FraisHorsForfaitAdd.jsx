import '../styles/FraisAdd.css'
import FraisHorsForfaitForm from '../components/FraisHorsForfaitForm'
import { useParams } from 'react-router-dom';

function FraisHorsForfaitAdd() {
	const { id } = useParams();

	return (
		<div className="frais-hors-forfait-add-page">
			<FraisHorsForfaitForm idFrais={id} unFraisHorsForfait={null}/>
		</div>
	);
}

export default FraisHorsForfaitAdd;