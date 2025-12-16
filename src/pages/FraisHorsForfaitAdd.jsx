import '../styles/FraisAdd.css'
import { useParams } from 'react-router-dom';
import FraisHorsForfaitForm from '../components/FraisHorsForfaitForm'

function FraisHorsForfaitAdd() {
	const { id } = useParams();

	return (
		<div className="frais-hors-forfait-add-page">
			<FraisHorsForfaitForm idFrais={id} unFraisHorsForfait={null}/>
		</div>
	);
}

export default FraisHorsForfaitAdd;